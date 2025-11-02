"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        setUsers(data.data);
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      Swal.fire("Success!", "User role updated.", "success");
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  // --- নতুন handleDeleteUser ফাংশন যোগ করা হয়েছে ---
  const handleDeleteUser = async (userId, userName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${userName}. You won't be able to revert this!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/users/${userId}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error((await res.json()).error);
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );
          Swal.fire("Deleted!", "The user has been deleted.", "success");
        } catch (err) {
          Swal.fire("Error!", err.message, "error");
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-lg loading-spinner"></span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
        <table className="table w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>

              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image
                          src={user.image || "/images/default-avatar.png"}
                          alt={user.name}
                          width={48}
                          height={48}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <select
                    className="select select-bordered select-sm"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    // --- পরিবর্তন: অ্যাডমিন যেন নিজের role পরিবর্তন করতে না পারে ---
                    disabled={session?.user?.id === user._id}
                  >
                    <option value="user">User</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td className="text-center">
                  {/* অ্যাডমিন যেন নিজেকে ডিলিট করতে না পারে */}
                  {session?.user?.id !== user._id && (
                    <button
                      className="btn btn-ghost btn-sm btn-circle"
                      onClick={() => handleDeleteUser(user._id, user.name)}
                    >
                      <FiTrash2 className="text-error" size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;
