"use client";

import { useEffect } from "react";
import {Badge} from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RoleTable({
    roles,
    isLoading,
    openAddModal,
    openEditModal,
    openDeleteAlert,
    fetchRoles,
    searchQuery,
    handleSearch,
}) {
    // Fetch roles on component mount
    useEffect(() => {
        fetchRoles();
    }, [searchQuery]); // Re-fetch when search query changes

    return (
        <Card>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Cari role..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="max-w-4xl"
                                icon={<Search className="h-4 w-4" />}
                            />
                        </div>
                        <Button onClick={openAddModal} className="flex items-center gap-1">
                            <Plus className="h-4 w-4" /> Tambah Role
                        </Button>
                    </div>

                    <div className="rounded-md border">
                        <Table className="w-full table-auto">
                            <TableHeader className="bg-gray-50 text-sm font-medium text-gray-600">
                                <TableRow>
                                    <TableHead className="w-14 text-center py-3">#</TableHead>
                                    <TableHead className="w-44">Kode Role</TableHead>
                                    <TableHead className="w-auto">Nama Role</TableHead>
                                    <TableHead className="w-40">Tanggal Dibuat</TableHead>
                                    <TableHead className="w-34 text-center">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-10">
                                            Loading...
                                        </TableCell>
                                    </TableRow>
                                ) : roles.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-10">
                                            Tidak ada data role
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    roles.map((role, index) => (
                                        <TableRow key={role.id}>
                                            <TableCell className="text-center">{index + 1}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="bg-blue-50 text-[#2C3E9E] border-[#2C3E9E]/30 font-medium">
                                                    {role.role_code}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{role.name}</TableCell>
                                            <TableCell>{role.created_at} ({role.created_at_human})</TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex justify-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => openEditModal(role)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="text-red-500 hover:text-red-500"
                                                        onClick={() => openDeleteAlert(role)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// "use client";
//
// import React, { useEffect, useState } from "react";
// import useRoles from "@/hooks/useRoles";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Plus, Search, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Pencil, Trash2 } from "lucide-react";
//
// export function RoleTable({
//                               roles: initialRoles = [],
//                               isLoading,
//                               openAddModal,
//                               openEditModal,
//                               openDeleteAlert,
//                               fetchRoles,
//                               searchQuery,
//                               handleSearch,
//                           }) {
//     // States for sorting and pagination
//     const [sortField, setSortField] = useState("name");
//     const [sortDirection, setSortDirection] = useState("asc");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     const [roles, setRoles] = useState(initialRoles);
//
//     // Update roles when initialRoles changes
//     useEffect(() => {
//         if (initialRoles && initialRoles.length > 0) {
//             setRoles(initialRoles);
//         }
//     }, [initialRoles]);
//
//     // Calculate pagination
//     const totalItems = roles.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentRoles = roles.slice(indexOfFirstItem, indexOfLastItem);
//
//     // Handle sorting
//     const handleSort = (field) => {
//         const direction = field === sortField && sortDirection === "asc" ? "desc" : "asc";
//         setSortField(field);
//         setSortDirection(direction);
//
//         // Sort the roles
//         const sortedRoles = [...roles].sort((a, b) => {
//             if (direction === "asc") {
//                 return a[field] > b[field] ? 1 : -1;
//             } else {
//                 return a[field] < b[field] ? 1 : -1;
//             }
//         });
//
//         setRoles(sortedRoles);
//     };
//
//     // Fetch roles on component mount
//     useEffect(() => {
//         fetchRoles();
//     }, [searchQuery]);
//
//     // Generate pagination buttons
//     const renderPaginationButtons = () => {
//         if (totalPages <= 1) return null;
//
//         const buttons = [];
//         const maxButtons = 5;
//         let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
//         let endPage = Math.min(totalPages, startPage + maxButtons - 1);
//
//         if (endPage - startPage + 1 < maxButtons) {
//             startPage = Math.max(1, endPage - maxButtons + 1);
//         }
//
//         // First page button
//         buttons.push(
//             <button
//                 key="first"
//                 onClick={() => setCurrentPage(1)}
//                 disabled={currentPage === 1}
//                 className="flex items-center justify-center w-8 h-8 rounded-md text-sm disabled:opacity-50"
//                 title="First Page"
//             >
//                 <ChevronsLeft size={16} />
//             </button>
//         );
//
//         // Previous page button
//         buttons.push(
//             <button
//                 key="prev"
//                 onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                 disabled={currentPage === 1}
//                 className="flex items-center justify-center w-8 h-8 rounded-md text-sm disabled:opacity-50"
//                 title="Previous Page"
//             >
//                 <ChevronLeft size={16} />
//             </button>
//         );
//
//         // Page number buttons
//         for (let i = startPage; i <= endPage; i++) {
//             buttons.push(
//                 <button
//                     key={i}
//                     onClick={() => setCurrentPage(i)}
//                     className={`flex items-center justify-center w-8 h-8 rounded-md text-sm ${
//                         currentPage === i
//                             ? "bg-[#2C3E9E] text-white"
//                             : "bg-white text-gray-700 hover:bg-gray-100"
//                     }`}
//                 >
//                     {i}
//                 </button>
//             );
//         }
//
//         // Next page button
//         buttons.push(
//             <button
//                 key="next"
//                 onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                 disabled={currentPage === totalPages}
//                 className="flex items-center justify-center w-8 h-8 rounded-md text-sm disabled:opacity-50"
//                 title="Next Page"
//             >
//                 <ChevronRight size={16} />
//             </button>
//         );
//
//         // Last page button
//         buttons.push(
//             <button
//                 key="last"
//                 onClick={() => setCurrentPage(totalPages)}
//                 disabled={currentPage === totalPages}
//                 className="flex items-center justify-center w-8 h-8 rounded-md text-sm disabled:opacity-50"
//                 title="Last Page"
//             >
//                 <ChevronsRight size={16} />
//             </button>
//         );
//
//         return buttons;
//     };
//
//     // Sorting indicator component
//     const SortIndicator = ({ field }) => {
//         if (sortField !== field) return null;
//
//         return sortDirection === "asc" ? (
//             <ArrowUp size={14} className="ml-1 text-[#2C3E9E]" />
//         ) : (
//             <ArrowDown size={14} className="ml-1 text-[#2C3E9E]" />
//         );
//     };
//
//     return (
//         <div className="space-y-4">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//                 <div className="relative w-full">
//                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
//                     <Input
//                         placeholder="Cari role..."
//                         value={searchQuery}
//                         onChange={(e) => handleSearch(e.target.value)}
//                         className="pl-8 border-gray-200 focus-visible:ring-[#2C3E9E] focus-visible:border-[#2C3E9E]"
//                     />
//                 </div>
//                 <Button
//                     onClick={openAddModal}
//                     className="bg-[#2C3E9E] hover:bg-[#243280] text-white"
//                 >
//                     <Plus className="h-4 w-4 mr-1" /> Tambah Role
//                 </Button>
//             </div>
//
//             {/* Custom Table */}
//             <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
//                 {/* Table Header */}
//                 <div className="grid grid-cols-5 bg-gray-50 text-sm font-medium text-gray-600 border-b border-gray-200">
//                     <div className="px-4 py-3 text-center">#</div>
//                     <div
//                         className="px-4 py-3 cursor-pointer flex items-center"
//                         onClick={() => handleSort("role_code")}
//                     >
//                         Kode Role <SortIndicator field="role_code" />
//                     </div>
//                     <div
//                         className="px-4 py-3 cursor-pointer flex items-center"
//                         onClick={() => handleSort("name")}
//                     >
//                         Nama Role <SortIndicator field="name" />
//                     </div>
//                     <div
//                         className="px-4 py-3 cursor-pointer flex items-center"
//                         onClick={() => handleSort("created_at")}
//                     >
//                         Tanggal Dibuat <SortIndicator field="created_at" />
//                     </div>
//                     <div className="px-4 py-3 text-center">Aksi</div>
//                 </div>
//
//                 {/* Table Body */}
//                 {isLoading ? (
//                     <div className="py-12 text-center">
//                         <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#2C3E9E] border-t-transparent"></div>
//                         <p className="mt-2 text-gray-500 text-sm">Loading...</p>
//                     </div>
//                 ) : roles.length === 0 ? (
//                     <div className="py-12 text-center">
//                         <p className="text-gray-500 text-sm">Tidak ada data role</p>
//                     </div>
//                 ) : (
//                     <div>
//                         {currentRoles.map((role, index) => (
//                             <div
//                                 key={role.id}
//                                 className="grid grid-cols-5 border-b border-gray-100 text-sm hover:bg-gray-50"
//                             >
//                                 <div className="px-4 py-3 text-center">{indexOfFirstItem + index + 1}</div>
//                                 <div className="px-4 py-3">
//                   <span className="inline-flex items-center rounded-full border border-[#2C3E9E] px-2 py-0.5 text-xs font-medium text-[#2C3E9E]">
//                     {role.role_code}
//                   </span>
//                                 </div>
//                                 <div className="px-4 py-3 font-medium">{role.name}</div>
//                                 <div className="px-4 py-3">
//                                     <div className="flex flex-col">
//                                         <span className="text-xs text-gray-500">{role.created_at}</span>
//                                         <span className="text-xs text-gray-400">{role.created_at_human}</span>
//                                     </div>
//                                 </div>
//                                 <div className="px-4 py-3 flex justify-center gap-1">
//                                     <button
//                                         onClick={() => openEditModal(role)}
//                                         className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-blue-50 hover:text-[#2C3E9E] border-none bg-transparent"
//                                     >
//                                         <Pencil size={14} />
//                                     </button>
//                                     <button
//                                         onClick={() => openDeleteAlert(role)}
//                                         className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-red-50 hover:text-red-500 border-none bg-transparent"
//                                     >
//                                         <Trash2 size={14} />
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//
//             {/* Pagination */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
//                 <div className="flex items-center text-gray-500 text-xs">
//           <span>
//             Menampilkan {indexOfFirstItem + 1} sampai {Math.min(indexOfLastItem, totalItems)} dari {totalItems} data
//           </span>
//                     <div className="flex items-center ml-4">
//                         <span className="mr-2">Items per page:</span>
//                         <select
//                             value={itemsPerPage}
//                             onChange={(e) => {
//                                 setItemsPerPage(Number(e.target.value));
//                                 setCurrentPage(1);
//                             }}
//                             className="border border-gray-200 rounded-md text-xs p-1"
//                         >
//                             <option value={5}>5</option>
//                             <option value={10}>10</option>
//                             <option value={25}>25</option>
//                             <option value={50}>50</option>
//                         </select>
//                     </div>
//                 </div>
//
//                 <div className="flex items-center gap-1 self-end sm:self-auto">
//                     {renderPaginationButtons()}
//                 </div>
//             </div>
//         </div>
//     );
// }

// "use client";
//
// import React, { useEffect, useState } from "react";
// import useRoles from "@/hooks/useRoles";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
// } from "@/components/ui/pagination";
// import { Plus, Search, ArrowUp, ArrowDown, Pencil, Trash2 } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//
// export function RoleTable({
//                               roles: initialRoles = [],
//                               isLoading,
//                               openAddModal,
//                               openEditModal,
//                               openDeleteAlert,
//                               fetchRoles,
//                               searchQuery,
//                               handleSearch,
//                           }) {
//     // States for sorting and pagination
//     const [sortField, setSortField] = useState("name");
//     const [sortDirection, setSortDirection] = useState("asc");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(10);
//     const [roles, setRoles] = useState(initialRoles);
//
//     // Update roles when initialRoles changes
//     useEffect(() => {
//         if (initialRoles && initialRoles.length > 0) {
//             setRoles(initialRoles);
//         }
//     }, [initialRoles]);
//
//     // Calculate pagination
//     const totalItems = roles.length;
//     const totalPages = Math.ceil(totalItems / itemsPerPage);
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentRoles = roles.slice(indexOfFirstItem, indexOfLastItem);
//
//     // Handle sorting
//     const handleSort = (field) => {
//         const direction = field === sortField && sortDirection === "asc" ? "desc" : "asc";
//         setSortField(field);
//         setSortDirection(direction);
//
//         // Sort the roles
//         const sortedRoles = [...roles].sort((a, b) => {
//             if (direction === "asc") {
//                 return a[field] > b[field] ? 1 : -1;
//             } else {
//                 return a[field] < b[field] ? 1 : -1;
//             }
//         });
//
//         setRoles(sortedRoles);
//     };
//
//     // Fetch roles on component mount
//     useEffect(() => {
//         fetchRoles();
//     }, [searchQuery]);
//
//     // Generate pagination buttons
//     const renderPagination = () => {
//         if (totalPages <= 1) return null;
//
//         const maxVisiblePages = 3;
//         const startPage = Math.max(1, currentPage - 1);
//         const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
//         const hasEllipsisStart = startPage > 1;
//         const hasEllipsisEnd = endPage < totalPages;
//
//         return (
//             <Pagination>
//                 <PaginationContent>
//                     <PaginationItem>
//                         <PaginationPrevious
//                             onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                             className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
//                         />
//                     </PaginationItem>
//
//                     {hasEllipsisStart && (
//                         <>
//                             <PaginationItem>
//                                 <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
//                             </PaginationItem>
//                             {startPage > 2 && (
//                                 <PaginationItem>
//                                     <PaginationEllipsis />
//                                 </PaginationItem>
//                             )}
//                         </>
//                     )}
//
//                     {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
//                         <PaginationItem key={page}>
//                             <PaginationLink
//                                 onClick={() => setCurrentPage(page)}
//                                 isActive={currentPage === page}
//                             >
//                                 {page}
//                             </PaginationLink>
//                         </PaginationItem>
//                     ))}
//
//                     {hasEllipsisEnd && (
//                         <>
//                             {totalPages - endPage > 1 && (
//                                 <PaginationItem>
//                                     <PaginationEllipsis />
//                                 </PaginationItem>
//                             )}
//                             <PaginationItem>
//                                 <PaginationLink onClick={() => setCurrentPage(totalPages)}>
//                                     {totalPages}
//                                 </PaginationLink>
//                             </PaginationItem>
//                         </>
//                     )}
//
//                     <PaginationItem>
//                         <PaginationNext
//                             onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                             className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
//                         />
//                     </PaginationItem>
//                 </PaginationContent>
//             </Pagination>
//         );
//     };
//
//     // Sorting indicator component
//     const SortIndicator = ({ field }) => {
//         if (sortField !== field) return null;
//
//         return sortDirection === "asc" ? (
//             <ArrowUp size={14} className="ml-1 text-[#2C3E9E]" />
//         ) : (
//             <ArrowDown size={14} className="ml-1 text-[#2C3E9E]" />
//         );
//     };
//
//     return (
//         <Card className="border-gray-200 shadow-sm">
//             <CardHeader className="pb-3">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//                     <div className="relative w-full sm:max-w-xs">
//                         <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
//                         <Input
//                             placeholder="Cari role..."
//                             value={searchQuery}
//                             onChange={(e) => handleSearch(e.target.value)}
//                             className="pl-8 border-gray-200 focus-visible:ring-[#2C3E9E] focus-visible:border-[#2C3E9E]"
//                         />
//                     </div>
//                     <Button
//                         onClick={openAddModal}
//                         className="bg-[#2C3E9E] hover:bg-[#243280] text-white"
//                     >
//                         <Plus className="h-4 w-4 mr-1" /> Tambah Role
//                     </Button>
//                 </div>
//             </CardHeader>
//             <CardContent className="p-0">
//                 <Table>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead className="text-center w-12">#</TableHead>
//                             <TableHead>
//                                 <div
//                                     className="flex items-center cursor-pointer"
//                                     onClick={() => handleSort("role_code")}
//                                 >
//                                     Kode Role <SortIndicator field="role_code" />
//                                 </div>
//                             </TableHead>
//                             <TableHead className="hidden sm:table-cell">
//                                 <div
//                                     className="flex items-center cursor-pointer"
//                                     onClick={() => handleSort("name")}
//                                 >
//                                     Nama Role <SortIndicator field="name" />
//                                 </div>
//                             </TableHead>
//                             <TableHead className="hidden md:table-cell">
//                                 <div
//                                     className="flex items-center cursor-pointer"
//                                     onClick={() => handleSort("created_at")}
//                                 >
//                                     Tanggal Dibuat <SortIndicator field="created_at" />
//                                 </div>
//                             </TableHead>
//                             <TableHead className="text-center">Aksi</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {isLoading ? (
//                             Array(5).fill(0).map((_, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell className="text-center"><Skeleton className="h-5 w-5 mx-auto" /></TableCell>
//                                     <TableCell><Skeleton className="h-6 w-20" /></TableCell>
//                                     <TableCell className="hidden sm:table-cell"><Skeleton className="h-6 w-32" /></TableCell>
//                                     <TableCell className="hidden md:table-cell"><Skeleton className="h-8 w-24" /></TableCell>
//                                     <TableCell className="text-center">
//                                         <div className="flex justify-center gap-2">
//                                             <Skeleton className="h-8 w-8 rounded-md" />
//                                             <Skeleton className="h-8 w-8 rounded-md" />
//                                         </div>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         ) : roles.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={5} className="text-center py-8 text-gray-500">
//                                     Tidak ada data role
//                                 </TableCell>
//                             </TableRow>
//                         ) : (
//                             currentRoles.map((role, index) => (
//                                 <TableRow key={role.id} className="hover:bg-gray-50">
//                                     <TableCell className="text-center font-medium text-gray-500">
//                                         {indexOfFirstItem + index + 1}
//                                     </TableCell>
//                                     <TableCell>
//                                         <Badge variant="outline" className="bg-blue-50 text-[#2C3E9E] border-[#2C3E9E]/30 font-medium">
//                                             {role.role_code}
//                                         </Badge>
//                                     </TableCell>
//                                     <TableCell className="hidden sm:table-cell font-medium">
//                                         {role.name}
//                                     </TableCell>
//                                     <TableCell className="hidden md:table-cell">
//                                         <div className="flex flex-col">
//                                             <span className="text-xs text-gray-600">{role.created_at}</span>
//                                             <span className="text-xs text-gray-400 mt-1">{role.created_at_human}</span>
//                                         </div>
//                                     </TableCell>
//                                     <TableCell>
//                                         <div className="flex justify-center gap-2">
//                                             <Button
//                                                 variant="ghost"
//                                                 size="icon"
//                                                 onClick={() => openEditModal(role)}
//                                                 className="h-8 w-8 text-gray-500 hover:text-[#2C3E9E] hover:bg-blue-50"
//                                                 title="Edit"
//                                             >
//                                                 <Pencil size={16} />
//                                             </Button>
//                                             <Button
//                                                 variant="ghost"
//                                                 size="icon"
//                                                 onClick={() => openDeleteAlert(role)}
//                                                 className="h-8 w-8 text-gray-500 hover:text-red-500 hover:bg-red-50"
//                                                 title="Delete"
//                                             >
//                                                 <Trash2 size={16} />
//                                             </Button>
//                                         </div>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//
//                 {/* Pagination Controls */}
//                 <div className="px-4 py-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//                     <div className="flex items-center text-gray-500 text-xs">
//             <span>
//               Menampilkan <span className="font-medium">{indexOfFirstItem + 1}</span> sampai <span className="font-medium">{Math.min(indexOfLastItem, totalItems)}</span> dari <span className="font-medium">{totalItems}</span> data
//             </span>
//                         <div className="flex items-center ml-4">
//                             <span className="mr-2">Items per page:</span>
//                             <Select
//                                 value={itemsPerPage.toString()}
//                                 onValueChange={(value) => {
//                                     setItemsPerPage(Number(value));
//                                     setCurrentPage(1);
//                                 }}
//                             >
//                                 <SelectTrigger className="h-7 w-16 text-xs">
//                                     <SelectValue placeholder="10" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="5">5</SelectItem>
//                                     <SelectItem value="10">10</SelectItem>
//                                     <SelectItem value="25">25</SelectItem>
//                                     <SelectItem value="50">50</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                     </div>
//
//                     <div className="self-end sm:self-auto">
//                         {renderPagination()}
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }