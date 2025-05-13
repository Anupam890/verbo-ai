"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Command,
  Cpu,
  Globe,
  Paperclip,
  Mic,
  AudioLines,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { aiModels } from "@/services/SharedModel";
import { supabase } from "@/services/supabase";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const Chatbox = () => {
  const [userSearch, setUserSearch] = useState("");
  const [userResearch, setUserResearch] = useState("");
  const [searchType, setsearchType] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  const onhandleSearch = async () => {
    setLoading(true);
    const chatId = uuidv4();
    const { data, error } = await supabase
      .from("chatHistory")
      .insert([
        {
          searchInput: userSearch,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          type: searchType,
          chatId: chatId,
        },
      ])
      .select();
    setLoading(false);

    router.push("/ai/" + chatId);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div>
        <h2 className="text-4xl font-semibold">Verbo AI</h2>
      </div>
      <div className="mt-4 md:p-2 p-4 w-full max-w-2xl border rounded-2xl bg-white">
        <div className="flex items-end justify-between">
          <Tabs defaultValue="Search" className="w-[400px]">
            <TabsContent value="Search" className="w-full p-4 outline-none">
              <input
                type="text"
                className="w-full p-4 outline-none"
                placeholder="Ask Anything."
                onChange={(e) => setUserSearch(e.target.value)}
                value={userSearch}
              />
            </TabsContent>
            <TabsContent value="Research" className="w-full p-4 outline-none">
              <input
                type="text"
                className="w-full p-4 outline-none"
                placeholder="Research Anything."
                onChange={(e) => setUserResearch(e.target.value)}
                value={userResearch}
              />
            </TabsContent>
            <TabsList>
              <TabsTrigger
                value="Search"
                className="text-[#039368] cursor-pointer"
              >
                <Search className="h-4 w-4" />
                Search
              </TabsTrigger>
              <TabsTrigger
                value="Research"
                className="text-[#039368] cursor-pointer"
              >
                <Command className="h-4 w-4" />
                Research
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex gap-2 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button className="bg-white cursor-pointer hover:bg-gray-100">
                  <Cpu className="text-gray-500 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                {aiModels.map((model, index) => (
                  <DropdownMenuItem key={index}>
                    <div>
                      <h2 className="text-gray-800">{model.name}</h2>
                      <p className="text-gray-800">{model.description}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-white cursor-pointer hover:bg-gray-100">
              <Globe className="text-gray-500 h-5 w-5" />
            </Button>
            <Button className="bg-white cursor-pointer hover:bg-gray-100">
              <Paperclip className="text-gray-500 h-5 w-5" />
            </Button>
            <Button className="bg-white cursor-pointer hover:bg-gray-100">
              <Mic className="text-gray-500 h-5 w-5" />
            </Button>
            <Button
              className="bg-white cursor-pointer hover:bg-gray-100"
              onClick={() => userSearch && onhandleSearch()}
            >
              {!userSearch && !userResearch ? (
                <AudioLines className="text-gray-500 h-5 w-5" />
              ) : (
                <ArrowRight
                  disabled={loading}
                  className="text-gray-500 h-5 w-5"
                />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
