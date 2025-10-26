"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { FiUploadCloud, FiX } from "react-icons/fi";

const FooterSettingsForm = ({ settings, setSettings }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadSuccess = (result) => {
    setSettings((prev) => ({
      ...prev,
      paymentMethodsImageSrc: result.info.secure_url,
    }));
  };

  const handleRemoveImage = () => {
    setSettings((prev) => ({ ...prev, paymentMethodsImageSrc: null }));
  };

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 border-b border-base-300 pb-4">
        Footer Settings
      </h2>
      <div className="space-y-6">
        {/* পরিবর্তন: Tagline এবং Payment Image এখন পাশাপাশি */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Footer Tagline</span>
            </label>
            <input
              type="text"
              name="footerTagline"
              value={settings.footerTagline || ""}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="Your Pet's Happiness Starts Here"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Payment Methods Image
              </span>
            </label>
            <div className="flex items-center gap-4">
              <CldUploadButton
                options={{ maxFiles: 1, folder: "pet-nest/settings" }}
                onSuccess={handleUploadSuccess}
                uploadPreset="pet-nest-preset"
                className="btn btn-outline btn-sm"
              >
                <FiUploadCloud /> Upload
              </CldUploadButton>
              {settings.paymentMethodsImageSrc && (
                <div className="relative h-8 w-64 rounded-md">
                  <Image
                    src={settings.paymentMethodsImageSrc}
                    alt="Payment Methods Preview"
                    fill
                    className="object-contain"
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

        <div className="divider"></div>

        <h3 className="font-semibold pt-2">Social Media Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Facebook URL</span>
            </label>
            <input
              type="url"
              name="socialFacebook"
              value={settings.socialFacebook || ""}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="https://facebook.com/yourpage"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Instagram URL</span>
            </label>
            <input
              type="url"
              name="socialInstagram"
              value={settings.socialInstagram || ""}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="https://instagram.com/yourprofile"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">YouTube URL</span>
            </label>
            <input
              type="url"
              name="socialYoutube"
              value={settings.socialYoutube || ""}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="https://youtube.com/yourchannel"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">TikTok URL</span>
            </label>
            <input
              type="url"
              name="socialTiktok"
              value={settings.socialTiktok || ""}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="https://tiktok.com/@yourprofile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSettingsForm;
