"use client";

const VideoSettingsForm = ({ settings, setSettings }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const videoSrc = `https://www.youtube.com/embed/${
    settings.videoShowcaseId || ""
  }?controls=0&showinfo=0&rel=0`;

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 border-b border-base-300 pb-4">
        Video Showcase Settings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* বাম দিকের কলাম: ইনপুট ফিল্ড */}
        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">YouTube Video ID</span>
            </label>
            <input
              type="text"
              name="videoShowcaseId"
              value={settings.videoShowcaseId || ""}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="e.g., KId3r5dVwGk"
            />
            <label className="label">
              <span className="label-text-alt">
                Only the 11-character ID from the YouTube URL.
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Button Link</span>
            </label>
            <input
              type="text"
              name="videoShowcaseLink"
              value={settings.videoShowcaseLink || ""}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="/shop"
            />
          </div>
        </div>

        {/* ডান দিকের কলাম: ভিডিও প্রিভিউ */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Video Preview</span>
          </label>
          {settings.videoShowcaseId && (
            <div className="aspect-video w-full bg-base-300 rounded-lg overflow-hidden">
              <iframe
                src={videoSrc}
                title="YouTube video preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoSettingsForm;
