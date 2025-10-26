"use client";

const ContactSettingsForm = ({ settings, setSettings }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 border-b border-base-300 pb-4">
        Contact Information
      </h2>
      <div className="space-y-4">
        {/* ... Phone Number এবং Support Email অপরিবর্তিত ... */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Phone Number</span>
          </label>
          <input
            type="text"
            name="contactPhone"
            value={settings.contactPhone || ""}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        {/* পরিবর্তন: WhatsApp নম্বর যোগ করার জন্য নতুন ফিল্ড */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">WhatsApp Number</span>
          </label>
          <input
            type="text"
            name="contactWhatsapp"
            value={settings.contactWhatsapp || ""}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="e.g., 8801..."
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Support Email</span>
          </label>
          <input
            type="email"
            name="contactEmail"
            value={settings.contactEmail || ""}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Store Address</span>
          </label>
          <textarea
            name="contactAddress"
            value={settings.contactAddress || ""}
            onChange={handleChange}
            className="textarea textarea-bordered h-24"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ContactSettingsForm;
