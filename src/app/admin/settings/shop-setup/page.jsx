"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// আমরা পরের ধাপে এই কম্পোনেন্টটি তৈরি করব
import Link from "next/link";
import AnnouncementSettingsForm from "../components/AnnouncementSettingsForm";
import ContactSettingsForm from "../components/ContactSettingsForm";
import FooterSettingsForm from "../components/FooterSettingsForm";
import MapSettingsForm from "../components/MapSettingsForm";
import VideoSettingsForm from "../components/VideoSettingsForm";

const ShopSetupPage = () => {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // প্রাথমিক সেটিংস লোড করা
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        setSettings(data.data);
      } catch (err) {
        Swal.fire("Error!", "Could not load settings.", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // পরিবর্তনগুলো সেভ করা
  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      Swal.fire("Success!", "Settings saved successfully!", "success");
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-lg loading-spinner"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* পরিবর্তন: নতুন হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Shop Setup</h1>
          <div className="text-sm breadcrumbs mt-1">
            <ul>
              <li>
                <Link href="/admin">Home</Link>
              </li>
              <li>
                <Link href="/admin/settings">Settings</Link>
              </li>
              <li>Shop Setup</li>
            </ul>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleSaveChanges}
          disabled={isSaving}
        >
          {isSaving ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Save All Changes"
          )}
        </button>
      </div>

      <div className="divider"></div>

      {settings && (
        <ContactSettingsForm settings={settings} setSettings={setSettings} />
      )}

      <AnnouncementSettingsForm settings={settings} setSettings={setSettings} />

      <MapSettingsForm settings={settings} setSettings={setSettings} />

      <FooterSettingsForm settings={settings} setSettings={setSettings} />

      <VideoSettingsForm settings={settings} setSettings={setSettings} />
    </div>
  );
};

export default ShopSetupPage;
