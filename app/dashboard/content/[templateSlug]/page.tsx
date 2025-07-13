"use client";
import React, { useContext, useState } from "react";
import FormSection from "./_components/FormSection";
import OutputSection from "./_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { runGeminiStream } from "@/utils/AiModal";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

interface PageProps {
  params: {
    templateSlug: string;
  };
}

export default function CreateNewContent({ params }: PageProps) {
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");

  const { totalUsage } = useContext(TotalUsageContext);
  const { setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);
  const { user } = useUser();
  const router = useRouter();

  const selectedTemplate: TEMPLATE | undefined = Templates.find(
    (item) => item.slug === params.templateSlug
  );

  const generateAIContent = async (formData: any) => {
    if (totalUsage >= 10000) {
      router.push("/dashboard/billing");
      console.log("Please Upgrade!");
      return;
    }

    setLoading(true);
    setAiOutput("");

    const SelectedPrompt = selectedTemplate?.aiPrompt;
    const FinalAIPrompt = JSON.stringify(formData) + "," + SelectedPrompt;

    let fullResult = "";

    await runGeminiStream(FinalAIPrompt, (chunk: string) => {
      fullResult += chunk;
      setAiOutput((prev) => prev + chunk);
    });

    await saveInDb(JSON.stringify(formData), selectedTemplate?.slug, fullResult);
    setLoading(false);
    setUpdateCreditUsage(Date.now());
  };

  const saveInDb = async (formData: any, slug: string | undefined, aiResp: string) => {
    await db.insert(AIOutput).values({
      formData,
      templateSlug: slug,
      aiResponse: aiResp,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("MM/DD/yyyy"),
    });
  };

  return (
    <div className="p-10">
      <Link href={"/dashboard"}>
        <Button className="cursor-pointer">
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => generateAIContent(v)}
          loading={loading}
        />
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}
