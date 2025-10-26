"use client";

const AnnouncementSettingsForm = ({ settings, setSettings }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 border-b border-base-300 pb-4">
        Announcement Bar
      </h2>
      <div className="space-y-4">
        <div className="form-control">
          <label className="label">
            {/* <span className="label-text font-semibold">Announcement Text</span> */}
            {/* <span className="label-text-alt">Leave empty to hide the bar</span> */}
          </label>
          <input
            type="text"
            name="announcementText"
            value={settings.announcementText || ""}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="e.g., Free shipping on orders over 1000৳!"
          />
        </div>
      </div>
    </div>
  );
};

export default AnnouncementSettingsForm;
