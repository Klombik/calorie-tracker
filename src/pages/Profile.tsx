import React, { useEffect, useState } from "react";

export const Profile = () => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);
  }, []);

  const handleSave = () => {
    localStorage.setItem("username", username);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your name"
        className="p-2 border rounded w-full mb-4"
      />
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </div>
  );
};
