import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../_components/AppSidebar";
import Provider from "./Provider";

export function layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <Provider>{children}</Provider>
    </SidebarProvider>
  );
}

export default layout;
