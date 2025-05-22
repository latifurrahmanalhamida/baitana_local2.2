"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd, LayoutDashboardIcon,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/role/nav-main"
import { NavProjects } from "@/components/role/nav-projects"
// import { NavUser } from "@/components/role/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
// import {useAuth} from "@/context/AuthContext";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Infaq",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Infaq Masuk",
          url: "/role/InfaqIncome",
        },
        {
          title: "Infaq Keluar",
          url: "/role/InfaqOut",
        },
      ],
    },
    {
      title: "Reservasi",
      url: "/role/reservation",
      icon: Bot,
    },
    {
      title: "Acara",
      url: "/role/event",
      icon: BookOpen,
      
    },
    {
      title: "Jadwal Acara",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Fasilitas",
      url: "/role/facilities",
      icon: BookOpen,

    },
    {
      title: "News",
      url: "/role/news",
      icon: Settings2,
      
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}


export function AppSidebar({
  ...props
}) {
    // const { user } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser/> */}
        {/* <NavUser user={user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
