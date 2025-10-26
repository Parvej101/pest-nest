"use client";

const PolicySettingsForm = ({ settings, setSettings }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6 border-b border-base-300 pb-4">
        Policy Page Links
      </h2>
      <div className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Privacy Policy URL</span>
          </label>
          <input
            type="url"
            name="policyPrivacyLink"
            value={settings.policyPrivacyLink || ""}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="/privacy-policy"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Return & Refund Policy URL
            </span>
          </label>
          <input
            type="url"
            name="policyRefundLink"
            value={settings.policyRefundLink || ""}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="/refund-policy"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Terms & Conditions URL
            </span>
          </label>
          <input
            type="url"
            name="policyTermsLink"
            value={settings.policyTermsLink || ""}
            onChange={handleChange}
            className="input input-bordered"
            placeholder="/terms"
          />
        </div>
      </div>
    </div>
  );
};

export default PolicySettingsForm;
