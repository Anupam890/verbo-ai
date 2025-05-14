"use client";
import {
  Plus,
  Search,
  Compass,
  Archive,
  ArrowUpRight,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";

const MenuItems = [
  {
    title: "New Chat",
    icon: <Plus className="text-gray-300" />,
    link: "/",
  },
  {
    title: "Search",
    icon: <Search className="text-gray-300" />,
    link: "/search",
  },
  {
    title: "Discover",
    icon: <Compass className="text-gray-300" />,
    link: "/discover",
  },
  {
    title: "Library",
    icon: <Archive className="text-gray-300" />,
    link: "/library",
  },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const userData = useUser();

  return (
    <Sidebar className="bg-gray-900 h-full w-64">
      <SidebarHeader className="bg-gray-800 flex items-center justify-center p-4">
        <h3 className="text-white font-bold text-3xl">Verbo AI</h3>
      </SidebarHeader>
      <SidebarContent className="bg-gray-900">
        <SidebarGroup>
          <SidebarContent className="p-4">
            <SidebarMenu>
              {MenuItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.link}
                      className={`flex items-center gap-3 p-3 rounded-lg transition ${
                        pathname === item.link ? "font-bold text-white" : ""
                      }`}
                    >
                      {item.icon}
                      <span className="text-gray-300 font-medium">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 bg-gray-900 text-white ">
        <div>
          <h2 className="text-xl font-bold">Try Pro</h2>
          <p>Upgrade for Image upload, smarter AI and many more Copilot.</p>
          <button className=" cursor-pointer mt-4 bg-[#039368] text-white py-2 px-3 rounded-lg">
            <span className="flex items-center gap-2">
              <ArrowUpRight className="text-white" />
              Learn More
            </span>
          </button>
        </div>
        
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
