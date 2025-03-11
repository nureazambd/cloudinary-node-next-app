"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';

// interface
interface User {
  _id: string;
  name: string;
  imageUrl: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('photo', image);
    }

    try {
      await axios.post('http://localhost:5000/api/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setName('');
      setImage(null);
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    } else {
      setImage(null); // Explicitly set to null if no file is selected
    }
  };

  return (
    // html code
    <div>
      <h1>User Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          onChange={handleImageChange} // Use the new handler
        />
        <button type="submit">Add User</button>
      </form>

      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - <img src={user.imageUrl} alt={user.name} style={{ maxWidth: '100px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
}