"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";


export function User() {

  const { logout ,user } = useAuth(); 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative w-11 h-11 rounded-full bg-[#3b37ff] hover:bg-[#0679f6]"
        >
          <Avatar className="w-11 h-11">
            <AvatarImage
              className="p-0.5 rounded-full"
              src={user?.image ?? "/icons/user.png"}
              alt={user?.name}
            />
            <AvatarFallback className="text-xl text-white bg-[#3b37ff] hover:bg-[#0679f6]">
              {user?.name[0] ?? "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[300px] bg-[#121212] border-none shadow-md"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col">
            <p className="text-sm font-medium leading-[1.5] truncate text-white">
              {user?.name}
            </p>
            <p className="text-xs leading-[1.5] text-muted-foreground truncate">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <div className="px-2 py-1.5">
          <Button
            size="sm"
            variant="secondary"
            className="w-full gap-1 items-center"
            onClick={() => logout()}
          >
            <span className="text-black">Logout</span>
            <LogOut size={20} color="black" />
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
