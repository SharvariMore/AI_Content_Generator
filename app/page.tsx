"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader className="w-20 h-20 animate-spin text-primary" />
    </div>
  );
}
