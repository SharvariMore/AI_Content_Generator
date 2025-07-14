import CreateNewContent from "./ClientPage";

interface PageProps {
  params: {
    templateSlug: string;
  };
}

export default function Page({ params }: PageProps) {
  return <CreateNewContent params={params} />;
}
