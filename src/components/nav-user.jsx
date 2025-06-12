// "use client"
//
// import {
//   BadgeCheck,
//   Bell,
//   ChevronsUpDown,
//   CreditCard,
//   LogOut,
//   Sparkles,
//   User
// } from "lucide-react"
//
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import {useAuth} from "@/context/AuthContext";
// import {useState} from "react";
//
// export function NavUser({
//   user
// }) {
//   const { isMobile } = useSidebar();
//   const { logout } = useAuth();
//   const [confirmLogoutDialogOpen, setConfirmLogoutDialogOpen] = useState(false);
//
//   const handleLogout = async () => {
//     setConfirmLogoutDialogOpen(true);
//   }
//
//   const handleConfirmLogout = async () => {
//     setConfirmLogoutDialogOpen(false);
//     logout();
//   }
//
//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <SidebarMenuButton
//               size="lg"
//               className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-hover:text-black group">
//               <Avatar className="h-10 w-10 rounded-full">
//                 {/* Periksa user.photo sebelum mengakses */}
//                 <AvatarImage src={user.photo ? user.photo : ''} alt={user.name || 'User Avatar'} />
//                 <AvatarFallback className="font-bold border border-gray-200 ">
//                   {user.name // Gunakan logika inisial di sini
//                       ? user.name
//                           .split(" ")
//                           .slice(0, 2)
//                           .map((word) => word.charAt(0))
//                           .join("")
//                           .toUpperCase()
//                       : <User className="h-5 w-5" />}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="grid flex-1 text-left text-sm leading-tight text-white group-hover:text-black">
//                 <span className="truncate font-medium">{user.name}</span>
//                 <span className="truncate text-xs">{user.email}</span>
//               </div>
//               <ChevronsUpDown className="ml-auto size-4" />
//             </SidebarMenuButton>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent
//             className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
//             side={isMobile ? "bottom" : "right"}
//             align="end"
//             sideOffset={4}>
//             <DropdownMenuLabel className="p-0 font-normal">
//               <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//                 <Avatar className="h-8 w-8 rounded-lg">
//                   {/* Periksa user.photo sebelum mengakses */}
//                   <AvatarImage src={user.photo ? user.photo : ''} alt={user.name || 'User Avatar'} />
//                   <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
//                     {user.name // Logika inisial yang sama
//                         ? user.name
//                             .split(" ")
//                             .slice(0, 2)
//                             .map((word) => word.charAt(0))
//                             .join("")
//                             .toUpperCase()
//                         : <User className="h-4 w-4" />}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="grid flex-1 text-left text-sm leading-tight">
//                   <span className="truncate font-medium">{user.name}</span>
//                   <span className="truncate text-xs">{user.email}</span>
//                 </div>
//               </div>
//             </DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuGroup>
//               <DropdownMenuItem>
//                 <Sparkles />
//                 Upgrade to Pro
//               </DropdownMenuItem>
//             </DropdownMenuGroup>
//             <DropdownMenuSeparator />
//             <DropdownMenuGroup>
//               <DropdownMenuItem>
//                 <User />
//                 Profile
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <Bell />
//                 Notifications
//               </DropdownMenuItem>
//             </DropdownMenuGroup>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem onClick={handleLogout}>
//               <LogOut />
//               Log out
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </SidebarMenuItem>
//
//       {/* Dialog Konfirmasi Logout */}
//       {confirmLogoutDialogOpen && (
//           <AlertDialog open={confirmLogoutDialogOpen} onOpenChange={setConfirmLogoutDialogOpen}>
//             <AlertDialogContent className="!max-w-xl">
//               <AlertDialogHeader>
//                 <AlertDialogTitle className={"text-center"}>Konfirmasi Logout</AlertDialogTitle>
//                 <AlertDialogDescription className={"text-center"}>
//                   Apakah Anda yakin ingin keluar dari akun Anda?
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <div className="flex w-full justify-center gap-4">
//                   <AlertDialogCancel onClick={() => setConfirmLogoutDialogOpen(false)}>Batal</AlertDialogCancel>
//                   <AlertDialogAction onClick={handleConfirmLogout} className={"bg-red-500 hover:bg-red-600"}>
//                     Logout
//                   </AlertDialogAction>
//                 </div>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
//       )}
//     </SidebarMenu>
//   );
// }

// components/NavUser.jsx
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

  // Handle case where user is null (not logged in) or loading
  // This helps prevent errors if user object is not yet available
  if (!user) {
    return (
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="text-white/90">
              <Avatar className="h-10 w-10 rounded-full">
                <AvatarFallback className="font-bold border border-gray-200">
                  <User className="h-5 w-5 text-white/60" />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight text-white">
                <span className="truncate font-medium">Loading...</span>
                <span className="truncate text-xs"></span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
    );
  }


  return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                  size="lg"
                  // Sesuaikan kelas hover dan active state dengan tema NavMain
                  className="
                text-white/90 hover:text-white hover:bg-white/15
                data-[state=open]:bg-white/20 data-[state=open]:text-white
                transition-all duration-200 rounded-lg font-medium group
              "
              >
                <Avatar className="h-10 w-10 rounded-full">
                  <AvatarImage src={user.photo || ''} alt={user.name || 'User Avatar'} />
                  <AvatarFallback className="font-bold border border-gray-200 bg-blue-100 text-blue-600"> {/* Blue background for fallback */}
                    {user.name
                        ? user.name
                            .split(" ")
                            .slice(0, 2)
                            .map((word) => word.charAt(0))
                            .join("")
                            .toUpperCase()
                        : <User className="h-5 w-5 text-blue-600" />} {/* Icon color adjusted */}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium text-white group-hover:text-white">{user.name}</span> {/* Text color adjusted */}
                  <span className="truncate text-xs text-white/70 group-hover:text-white/90">{user.email}</span> {/* Text color adjusted */}
                </div>
                <ChevronsUpDown className="ml-auto size-4 text-white/60 group-hover:text-white/90" /> {/* Icon color adjusted */}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                // Ukuran dan sudut membulat dropdown
                className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 rounded-lg bg-white p-2 text-gray-800 shadow-lg border border-gray-200"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-3 py-2 text-left text-sm"> {/* Adjust padding here */}
                  <Avatar className="h-9 w-9 rounded-lg"> {/* Slightly larger avatar in dropdown */}
                    <AvatarImage src={user.photo || ''} alt={user.name || 'User Avatar'} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
                      {user.name
                          ? user.name
                              .split(" ")
                              .slice(0, 2)
                              .map((word) => word.charAt(0))
                              .join("")
                              .toUpperCase()
                          : <User className="h-4 w-4 text-blue-600" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-gray-900">{user.name}</span> {/* Darker text for name */}
                    <span className="truncate text-xs text-gray-600">{user.email}</span> {/* Slightly muted for email */}
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-100 my-2" /> {/* Lighter separator */}
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md cursor-pointer transition-colors duration-200">
                  <Sparkles className="size-4" /> {/* Icon size */}
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-gray-100 my-2" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md cursor-pointer transition-colors duration-200">
                  <User className="size-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md cursor-pointer transition-colors duration-200">
                  <Bell className="size-4" />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="bg-gray-100 my-2" />
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md cursor-pointer transition-colors duration-200">
                <LogOut className="size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>

        {/* Dialog Konfirmasi Logout (Tetap sama, warnanya sudah sesuai dengan red-500) */}
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