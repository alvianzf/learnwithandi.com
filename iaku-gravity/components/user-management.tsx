
"use client";

import { useEffect, useState } from 'react';

interface User {
  id: number;
  username: string;
  role: string;
  createdAt: string;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ username: '', role: '' });
  const [message, setMessage] = useState('');

  const fetchUsers = () => {
    setLoading(true);
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setUsers(data);
        setLoading(false);
      })
      .catch(_ => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setEditForm({ username: user.username, role: user.role });
    setMessage('');
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...editForm })
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(users.map(u => u.id === editingId ? { ...u, ...data } : u));
        setEditingId(null);
        setMessage('User updated');
      } else {
        setMessage(data.error || 'Update failed');
      }
    } catch (e) {
      setMessage('Update failed');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setMessage('');
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div className="space-y-4">
      {message && <p className="text-sm font-bold text-center">{message}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {editingId === user.id ? (
                    <input
                      className="border p-1 rounded text-black"
                      value={editForm.username}
                      onChange={e => setEditForm({ ...editForm, username: e.target.value })}
                    />
                  ) : user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {editingId === user.id ? (
                    <select
                      className="border p-1 rounded text-black"
                      value={editForm.role}
                      onChange={e => setEditForm({ ...editForm, role: e.target.value })}
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  ) : (
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                      {user.role}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingId === user.id ? (
                    <div className="space-x-2">
                      <button onClick={handleSave} className="text-green-600 hover:text-green-900">Save</button>
                      <button onClick={handleCancel} className="text-gray-600 hover:text-gray-900">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
