"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  User
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {useAuth} from "@/context/AuthContext";
import {useState} from "react";

export function NavUser({
  user
}) {
  const API_URL = "http://localhost:8000"
  const { isMobile } = useSidebar();
  const { logout } = useAuth();
  const [confirmLogoutDialogOpen, setConfirmLogoutDialogOpen] = useState(false);

  const handleLogout = async () => {
    setConfirmLogoutDialogOpen(true);
  }

  const handleConfirmLogout = async () => {
    setConfirmLogoutDialogOpen(false);
    logout();
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-10 w-10 rounded-full">
                {/* Periksa user.photo sebelum mengakses */}
                <AvatarImage src={user.photo ? `${API_URL}/storage/${user.photo}` : ''} alt={user.name || 'User Avatar'} />
                <AvatarFallback className="rounded-lg">
                  {user.name // Gunakan logika inisial di sini
                      ? user.name
                          .split(" ")
                          .slice(0, 2)
                          .map((word) => word.charAt(0))
                          .join(" ")
                          .toUpperCase()
                      : <User className="h-5 w-5" />}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* Periksa user.photo sebelum mengakses */}
                  <AvatarImage src={user.photo ? `${API_URL}/storage/${user.photo}` : ''} alt={user.name || 'User Avatar'} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {user.name // Logika inisial yang sama
                        ? user.name
                            .split(" ")
                            .slice(0, 2)
                            .map((word) => word.charAt(0))
                            .join(" ")
                            .toUpperCase()
                        : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      {/* Dialog Konfirmasi Logout */}
      {confirmLogoutDialogOpen && (
          <AlertDialog open={confirmLogoutDialogOpen} onOpenChange={setConfirmLogoutDialogOpen}>
            <AlertDialogContent className="!max-w-xl">
              <AlertDialogHeader>
                <AlertDialogTitle className={"text-center"}>Konfirmasi Logout</AlertDialogTitle>
                <AlertDialogDescription className={"text-center"}>
                  Apakah Anda yakin ingin keluar dari akun Anda?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <div className="flex w-full justify-center gap-4">
                  <AlertDialogCancel onClick={() => setConfirmLogoutDialogOpen(false)}>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={handleConfirmLogout} className={"bg-red-500 hover:bg-red-600"}>
                    Logout
                  </AlertDialogAction>
                </div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
      )}
    </SidebarMenu>
  );
}
