import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className="p-5 shadow-sm bg-white border-b-2 flex justify-between items-center">
      <div className="flex gap-2 items-center p-2 rounded-md max-w-lg text-primary font-bold text-3xl">
        {/* <Search />
        <input type="text" placeholder="Search..." className="outline-none" /> */}
         <span className="animate-pulse transition-transform duration-300 hover:scale-105">
          AI Content Generator
        </span>
      </div>
      <div className="flex gap-5 items-center">
        <h2 className="bg-primary p-1 rounded-full text-xs text-white px-2">
          💎Join Membership just for $0.83/Month
        </h2>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
