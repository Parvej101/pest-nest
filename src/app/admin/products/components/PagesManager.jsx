"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// React Quill ডায়নামিকভাবে ইম্পোর্ট করতে হবে, কারণ এটি client-side only
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Quill-এর CSS
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// আমাদের ট্যাবের কনফিগারেশন
const TABS = [
  { name: "Privacy Policy", slug: "privacy-policy" },
  { name: "Return & Refund", slug: "refund-policy" },
  { name: "Terms & Conditions", slug: "terms" },
];

const PagesManager = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].slug);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // যখনই ট্যাব পরিবর্তন হবে, নতুন কন্টেন্ট fetch করা হবে
  useEffect(() => {
    const fetchPageContent = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/pages/${activeTab}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setContent(data.data.content);
          }
        } else {
          // যদি পেজটি এখনও তৈরি না হয়ে থাকে, এডিটর খালি দেখানো হবে
          setContent("");
        }
      } catch (err) {
        console.error("Failed to fetch page content:", err);
        setContent("");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPageContent();
  }, [activeTab]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const currentTab = TABS.find((t) => t.slug === activeTab);
      const res = await fetch(`/api/pages/${activeTab}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: currentTab.name, content }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      Swal.fire(
        "Success!",
        `${currentTab.name} page has been saved.`,
        "success"
      );
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-base-300 pb-4 mb-6">
        <h2 className="text-xl font-bold">Manage Page Content</h2>
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <span className="loading loading-spinner"></span>
          ) : (
            `Save ${TABS.find((t) => t.slug === activeTab).name}`
          )}
        </button>
      </div>

      {/* Tab Buttons */}
      <div className="tabs tabs-boxed mb-4">
        {TABS.map((tab) => (
          <a
            key={tab.slug}
            className={`tab ${activeTab === tab.slug ? "tab-active" : ""}`}
            onClick={() => setActiveTab(tab.slug)}
          >
            {tab.name}
          </a>
        ))}
      </div>

      {/* Rich Text Editor */}
      <div className="bg-white text-black rounded-md min-h-[300px]">
        {isLoading ? (
          <div className="p-4 text-center">
            <span className="loading loading-spinner"></span>
          </div>
        ) : (
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            style={{ height: "300px" }}
          />
        )}
      </div>
    </div>
  );
};

export default PagesManager;
