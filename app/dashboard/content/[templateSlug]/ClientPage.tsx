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

interface Props {
  params: {
    templateSlug: string;
  };
}

export default function CreateNewContent({ params }: Props) {
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");

  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);

  const { user } = useUser();
  const router = useRouter();

  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === params.templateSlug
  );

  const generateAIContent = async (formData: any) => {
    if (totalUsage >= 10000) {
      router.push("/dashboard/billing");
      return;
    }
    setLoading(true);
    setAiOutput("");

    const prompt = selectedTemplate?.aiPrompt;
    const finalPrompt = JSON.stringify(formData) + "," + prompt;

    let fullResult = "";
    await runGeminiStream(finalPrompt, (chunk: string) => {
      fullResult += chunk;
      setAiOutput((prev) => prev + chunk);
    });

    await db.insert(AIOutput).values({
      formData: JSON.stringify(formData),
      templateSlug: selectedTemplate?.slug,
      aiResponse: fullResult,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("MM/DD/yyyy"),
    });

    setLoading(false);
    setUpdateCreditUsage(Date.now());
  };

  return (
    <div className="p-10">
      <Link href={"/dashboard"}>
        <Button>
          <ArrowLeft className="mr-2" />
          Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={generateAIContent}
          loading={loading}
        />
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}
