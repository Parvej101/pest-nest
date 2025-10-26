"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { FiUploadCloud, FiX } from "react-icons/fi";

const MapSettingsForm = ({ settings, setSettings }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadSuccess = (result) => {
    setSettings((prev) => ({ ...prev, mapImageSrc: result.info.secure_url }));
  };

  const handleRemoveImage = () => {
    setSettings((prev) => ({ ...prev, mapImageSrc: null }));
  };

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 border-b border-base-300 pb-4">
        Map Settings
      </h2>

      {/* পরিবর্তন: Grid লেআউট ব্যবহার করে দুটি সেকশনকে পাশাপাশি আনা হয়েছে */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* বাম দিকের কলাম: ইনপুট ফিল্ড */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Google Maps URL</span>
          </label>
          <input
            type="url"
            name="mapLink"
            value={settings.mapLink || ""}
            onChange={handleChange}
            className="input input-bordered w-full" // w-full নিশ্চিত করে যে এটি কলামের পুরো জায়গা নেবে
            placeholder="https://maps.google.com/..."
          />
        </div>

        {/* ডান দিকের কলাম: ছবি আপলোড এবং প্রিভিউ */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Map Screenshot Image
            </span>
          </label>
          <div className="flex items-center gap-4">
            <CldUploadButton
              options={{ maxFiles: 1, folder: "pet-nest/settings" }}
              onSuccess={handleUploadSuccess}
              uploadPreset="pet-nest-preset"
              className="btn btn-outline btn-sm"
            >
              <FiUploadCloud /> Upload Image
            </CldUploadButton>

            {settings.mapImageSrc && (
              <div className="relative w-48 h-24 rounded-md">
                <Image
                  src={settings.mapImageSrc}
                  alt="Map Preview"
                  fill
                  className="object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="btn btn-xs btn-circle btn-error absolute -top-2 -right-2"
                >
                  <FiX />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSettingsForm;
