"use client"

import {
  LayoutDashboardIcon,
  SquareTerminal,
  BookOpen,
  Settings2,
  PieChart
} from "lucide-react";

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader, SidebarMenu, SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {useAuth} from "@/context/AuthContext";
import Image from "next/image";

const data = {
  navGroups: [ // Mengubah nama dari navMain menjadi navGroups untuk kejelasan
    {
      label: "Dashboard", // Label untuk SidebarGroupLabel
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboardIcon,
        },
      ],
    },
    {
      label: "Master Data", // Label untuk SidebarGroupLabel
      items: [
        {
          title: "Master Data", // Ini adalah menu utama 'Master Data' yang bisa di-expand
          url: "#",
          icon: SquareTerminal,
          isActive: true,
          // Menggunakan 'subItems' untuk kejelasan
          subItems: [
            {
              title: "Fasilitas",
              url: "/master/facilities", // Mengganti URL ke /master/facilities
            },
            {
              title: "Kategori Berita",
              url: "/master/news/categories",
            },
            {
              title: "Kategori Keuangan",
              url: "/master/finance/categories",
            },
            {
              title: "Role",
              url: "/master/roles",
            },
            {
              title: "User",
              url: "/master/users",
            },
          ],
        },
      ],
    },
    {
      label: "Transaksi Keuangan", // Label untuk SidebarGroupLabel
      items: [
        {
          title: "Transaksi Keuangan", // Ini adalah menu utama 'Transaksi Keuangan' yang bisa di-expand
          url: "#",
          icon: SquareTerminal,
          subItems: [ // Menggunakan 'subItems'
            {
              title: "Keuangan Masuk",
              url: "/finance/transaction/incomes",
            },
            {
              title: "Keuangan Keluar",
              url: "/finance/transaction/expenses",
            },
            {
              title: "Rekapitulasi Keuangan",
              url: "/finance/recapitulations",
            },
          ],
        },
      ],
    },
    {
      label: "Jadwal dan Acara", // Label untuk SidebarGroupLabel
      items: [
        {
          title: "Jadwal dan Acara",
          url: "/events/schedule", // Mengganti URL ke /events/schedule
          icon: BookOpen,
        },
      ],
    },
    {
      label: "Berita", // Label untuk SidebarGroupLabel
      items: [
        {
          title: "Berita",
          url: "/news", // Mengganti URL ke /news
          icon: Settings2,
        },
      ],
    },
    {
      label: "Laporan", // Menambahkan grup untuk 'Laporan'
      items: [
        {
          title: "Laporan",
          url: "/reports", // Contoh URL untuk halaman laporan
          icon: PieChart, // Contoh ikon untuk laporan
        },
      ],
    },
  ],
};


export function AppSidebar({
  ...props
}) {
  const { user, authLoading } = useAuth();

  return (
      <Sidebar
          collapsible="icon"
          {...props}
          className="bg-gradient-to-b from-[#2C3E9E] via-[#2C3E9E] to-[#1e2b6b] shadow-xl"
      >
        <SidebarHeader className="bg-gradient-to-r from-[#2C3E9E] to-[#3d4fb8] border-b border-blue-200/20">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex justify-center items-center rounded-xl p-2 bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300">
              <img
                  src="/images/logo-baitana-temp-white.png"
                  alt="Logo Baitana"
                  width={80}
                  height={80}
                  className="w-40 md:w-48 h-auto drop-shadow-sm"
              />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0 bg-gradient-to-b from-[#2C3E9E] via-[#2C3E9E] to-[#1e2b6b] scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent p-0">
        <NavMain data={data}/>
      </SidebarContent>
      {/*<SidebarContent>*/}
      {/*  <NavMain data={data}/>*/}
      {/*  /!*<NavProjects projects={data.projects} />*!/*/}
      {/*</SidebarContent>*/}
        <SidebarFooter className="bg-gradient-to-r from-[#1e2b6b] to-[#2C3E9E] border-t border-blue-200/20">
          {!authLoading && user ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-md">
                <NavUser user={user}/>
              </div>
          ) : (
              <div className="h-16 flex items-center justify-center text-white/70 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-sm font-medium">Loading user...</span>
                </div>
              </div>
          )}
        </SidebarFooter>
      {/*<SidebarFooter>*/}
      {/*  {!authLoading && user ? (*/}
      {/*      <NavUser user={user}/>*/}
      {/*  ) : (*/}
      {/*      <div className="h-16 flex items-center justify-center text-muted-foreground">*/}
      {/*        Loading user...*/}
      {/*      </div>*/}
      {/*  )}*/}
      {/*</SidebarFooter>*/}
      {/*<SidebarRail />*/}
        <SidebarRail className="bg-blue-300/20" />
    </Sidebar>
  );
}
