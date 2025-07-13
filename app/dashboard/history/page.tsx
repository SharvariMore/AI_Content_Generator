"use client";
import { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import Templates from "@/app/(data)/Templates";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  Search,
  Trash2,
  Copy,
} from "lucide-react";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";
import { toast } from "sonner";

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

const ITEMS_PER_PAGE = 5;
const getTemplateBySlug = (slug: string) =>
  Templates.find((t) => t.slug === slug);

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
  const fileName = `${templateName.replace(
    /[^a-z0-9]/gi,
    " "
  )} (${dateStr}).docx`;
  const blob = await Packer.toBlob(doc);
  saveAs(blob, fileName);
};

function History() {
  const { user } = useUser();
  const [history, setHistory] = useState<HISTORY[]>([]);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingExport, setPendingExport] = useState<HISTORY | null>(null);
  const [pendingDelete, setPendingDelete] = useState<HISTORY | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    setLoading(true);
    const data = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress));

    const cleaned = data.map((item) => ({
      ...item,
      aiResponse: item.aiResponse ?? "",
      createdBy: item.createdBy ?? "",
      createdAt: item.createdAt ?? "",
    }));

    setHistory(cleaned.reverse());
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleDelete = async () => {
    if (pendingDelete) {
      await db.delete(AIOutput).where(eq(AIOutput.id, pendingDelete.id));
      setHistory((prev) => prev.filter((item) => item.id !== pendingDelete.id));
      toast.success("Item Deleted Successfully!");
      setShowDeleteModal(false);
      setPendingDelete(null);
    }
  };

  const filtered = history.filter((item) => {
    const template = getTemplateBySlug(item.templateSlug)?.name || "";
    const matchesSearch = template.toLowerCase().includes(search.toLowerCase());
    const matchesDate = dateFilter
      ? moment(item.createdAt).format("YYYY-MM-DD") === dateFilter
      : true;
    return matchesSearch && matchesDate;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">History</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
          <Input
            placeholder="Search Templates..."
            className="pl-10 bg-white"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <Input
          type="date"
          className="w-full md:w-1/4 bg-white"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <LoaderCircle className="w-10 h-10 text-primary animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500 text-center py-10 font-semibold text-lg">
          ☹️ No History Found!
        </p>
      ) : (
        <>
          <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-2 font-semibold text-md bg-gray-200 rounded">
            <div>TEMPLATE</div>
            <div>AI RESPONSE</div>
            <div>DATE</div>
            <div>WORDS</div>
            <div>ACTIONS</div>
          </div>

          <div className="grid gap-3">
            {currentItems.map((item) => {
              const template = getTemplateBySlug(item.templateSlug);
              return (
                <div
                  key={item.id}
                  className="grid md:grid-cols-5 gap-4 items-start md:items-center bg-white p-4 rounded shadow-sm text-sm"
                >
                  <div className="flex items-center gap-2 font-medium">
                    <img
                      src={template?.icon ?? "/icons/default.png"}
                      alt={template?.name ?? item.templateSlug}
                      className="w-6 h-6 object-contain"
                    />
                    <span>{template?.name ?? item.templateSlug}</span>
                  </div>
                  <div className="text-gray-700 line-clamp-3">
                    {item.aiResponse.slice(0, 200)}...
                  </div>
                  <div>
                    {item.createdAt
                      ? moment(item.createdAt).format("MM/DD/YYYY")
                      : "—"}
                  </div>
                  <div>{item.aiResponse?.split(/\s+/).length}</div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-primary text-white"
                      onClick={() => {
                        navigator.clipboard.writeText(item.aiResponse);

                        setPendingExport(item);
                        setShowExportModal(true);
                      }}
                    >
                      <Copy className="w-4 h-4 mr-1" /> Copy
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => {
                        setPendingDelete(item);
                        setShowDeleteModal(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-1 cursor-pointer" />Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ArrowLeft />
                Previous
              </Button>
              <span className="text-sm text-gray-600 font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
                <ArrowRight />
              </Button>
            </div>
          )}
        </>
      )}

      {/* Export Modal */}
      {showExportModal && pendingExport && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-3">Export to Word?</h2>
            <p className="mb-5 text-gray-700">
              Do you want to export this content as a Word document?
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowExportModal(false)}
              >
                No
              </Button>
              <Button
                onClick={() => {
                  if (pendingExport) {
                    navigator.clipboard.writeText(pendingExport.aiResponse);
                    toast.success("Copied to clipboard!");
                    exportToWord(
                      pendingExport.aiResponse,
                      getTemplateBySlug(pendingExport.templateSlug)?.name ??
                        pendingExport.templateSlug
                    );
                  }
                  setShowExportModal(false);
                  setPendingExport(null);
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && pendingDelete && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-3">Confirm Delete</h2>
            <p className="mb-5 text-gray-700">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;
