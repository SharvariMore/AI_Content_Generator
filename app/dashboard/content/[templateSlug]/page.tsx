import dynamic from "next/dynamic";

const CreateNewContent = dynamic(() => import("./ClientPage"), { ssr: false });

interface PageProps {
  params: {
    templateSlug: string;
  };
}

export default function Page({ params }: PageProps) {
  return <CreateNewContent params={params} />;
}
