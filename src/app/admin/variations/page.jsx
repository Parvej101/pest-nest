"use client";
import { useEffect, useState } from "react";
import { FiEdit, FiPlusCircle, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const VariationsPage = () => {
  const [name, setName] = useState("");
  const [variations, setVariations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const fetchVariations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/variations");
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setVariations(data.data);
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchVariations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId ? `/api/variations/${editingId}` : "/api/variations";
    const method = editingId ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingId ? editingName : name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      Swal.fire(
        "Success!",
        `Variation successfully ${editingId ? "updated" : "created"}!`,
        "success"
      );
      setName("");
      setEditingId(null);
      setEditingName("");
      await fetchVariations();
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };
  const handleEdit = (variation) => {
    setEditingId(variation._id);
    setEditingName(variation.name);
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/variations/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error((await res.json()).error);
        Swal.fire("Deleted!", "Variation has been deleted.", "success");
        await fetchVariations();
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Variations</h1>
      <div className="bg-base-100 p-6 rounded-lg shadow-md mb-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
        >
          <input
            type="text"
            value={editingId ? editingName : name}
            onChange={(e) =>
              editingId
                ? setEditingName(e.target.value)
                : setName(e.target.value)
            }
            placeholder="Variation title (e.g., Color, Size)"
            className="input input-bordered w-full"
            required
          />
          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary">
              {editingId ? (
                "Update"
              ) : (
                <>
                  <FiPlusCircle /> Create
                </>
              )}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-16">S.N.</th>
              <th>Title</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="3" className="text-center py-8">
                  <span className="loading loading-spinner"></span>
                </td>
              </tr>
            ) : (
              variations.map((variation, index) => (
                <tr key={variation._id}>
                  <th>{index + 1}</th>
                  <td>{variation.name}</td>
                  <td className="text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(variation)}
                        className="btn btn-ghost btn-sm btn-circle"
                      >
                        <FiEdit className="text-info" />
                      </button>
                      <button
                        onClick={() => handleDelete(variation._id)}
                        className="btn btn-ghost btn-sm btn-circle"
                      >
                        <FiTrash2 className="text-error" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default VariationsPage;
