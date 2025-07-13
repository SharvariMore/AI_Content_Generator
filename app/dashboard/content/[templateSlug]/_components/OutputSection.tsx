"use client";
import React, { useEffect, useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";
import { toast } from "sonner"; // ✅ import toast

interface PROPS {
  aiOutput: string;
}

const exportToWord = async (content: string, templateName: string) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [new Paragraph(content)],
      },
    ],
  });

  const dateStr = new Date().toLocaleDateString("en-US").replaceAll("/", "-");
  const safeTemplateName = templateName.replace(/[^a-z0-9]/gi, " ");
  const fileName = `${safeTemplateName} (${dateStr}).docx`;

  const blob = await Packer.toBlob(doc);
  saveAs(blob, fileName);
};

function OutputSection({ aiOutput }: PROPS) {
  const editorRef: any = useRef();
  const [showModal, setShowModal] = useState(false);
  const [pendingContent, setPendingContent] = useState("");

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  }, [aiOutput]);

  const handleCopyClick = () => {
    if (!aiOutput || aiOutput.trim() === "") {
      toast.warning("Please Fill at Least One Field Before Copying!");
      return;
    }

    navigator.clipboard.writeText(aiOutput);
    setPendingContent(aiOutput);
    setShowModal(true);
  };

  return (
    <div className="bg-white shadow-lg border">
      <div className="flex justify-between items-center p-5 rounded-lg">
        <h2 className="font-medium text-lg">Your Result: </h2>
        <Button className="cursor-pointer flex gap-2" onClick={handleCopyClick}>
          <Copy className="w-4 h-4" />
          Copy
        </Button>
      </div>

      <Editor
        ref={editorRef}
        initialValue="Your Result Appears Here!"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={() =>
          console.log(editorRef.current.getInstance().getMarkdown())
        }
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-3">Export to Word?</h2>
            <p className="mb-5 text-gray-700">
              Do you want to export this AI Response as a Word document?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowModal(false);
                  setPendingContent("");
                }}
              >
                No
              </Button>
              <Button
                className="bg-primary text-white"
                onClick={() => {
                  if (!pendingContent.trim()) {
                    toast.warning("Cannot Export Empty Content!");
                    return;
                  }
                  exportToWord(pendingContent, "AI Output");
                  toast.success("Copied Content Successfully!");
                  setShowModal(false);
                  setPendingContent("");
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OutputSection;
