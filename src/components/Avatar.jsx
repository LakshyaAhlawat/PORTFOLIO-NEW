import React from "react";

export default function UserAvatar({ email }) {
  if (!email) return null;
  // Use the first letter of the email as avatar
  return (
    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xl shadow-lg select-none ml-2">
      {email[0].toUpperCase()}
    </div>
  );
}