import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/aitSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) return null;

  return (
    <header
      className="bg-white border-b border-slate-200 px-6 py-4
        flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <h1 className="text-Ig font-semibold text-slate-900">
          TeamTaskManager
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(logout())}
          className="text-sm font-medium text-black hover:text-white px-3 py-1.5 rounded-md border hover:bg-black transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
