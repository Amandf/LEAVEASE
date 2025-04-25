"use client";

import { TbLogout2 } from "react-icons/tb";
import { signOut } from "next-auth/react";

const LogoutBtn = () => {
  return (
    <div
      className="p-1 bg-blue-600 text-white rounded-full dark:bg-slate-600 cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        signOut({ callbackUrl: `/` });
      }}
    >
      <TbLogout2 size={24} />
    </div>
  );
};

export default LogoutBtn;