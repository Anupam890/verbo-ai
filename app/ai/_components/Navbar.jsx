import React from "react";
import { Button } from "@/components/ui/button";
import { Share, Clock } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const Navbar = ({ searchInputData }) => {
  return (
    <div className="flex p-2 items-center border-b-2 justify-between bg-white text-black">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-gray-500" />
        <h3 className="font-semibold">Memory Limit</h3>
      </div>
      <div className="flex items-center gap-4">
        <Button className="flex items-center gap-1">
          <Share className="h-4 w-4" />
          Share
        </Button>
        <UserButton
          userProfileMode="navigation"
          appearance={{
            elements: {
              userButtonAvatarBox: "w-15 h-15",
              userButtonAvatar: "w-15 h-15",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
