import { AppSidebar } from "@/components/role/app-sidebar"
import { ChartAreaInteractive } from "@/components/role/chart-area-interactive"
import { DataTable } from "@/components/role/data-table"
import { SectionCards } from "@/components/role/section-cards"
import { SiteHeader } from "@/components/role/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Chicle } from "next/font/google"
import { Children } from "react"

// import data from "./data.json"

export default function Page({children}) {
  return (

        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)"
            }
          }>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  {/* <SectionCards /> */}
                  <div className="flex flex-1 flex-col">{children}  </div>
                  <div className="px-4 lg:px-6">
                    {/* <ChartAreaInteractive /> */}
                  </div>
                  {/* <DataTable /> */}
                  {/* <DataTable data={data} /> */}
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
  );
}
