"use client";

import { useEffect } from "react";
import { useRole } from "@/context/RoleContext";
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

export function RoleTable() {
    const {
        roles,
        isLoading,
        openAddModal,
        openEditModal,
        openDeleteAlert,
        fetchRoles,
        searchQuery,
        handleSearch
    } = useRole();

    // Fetch roles on component mount
    useEffect(() => {
        fetchRoles();
    }, [searchQuery]); // Re-fetch when search query changes

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Cari role..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="max-w-sm"
                        icon={<Search className="h-4 w-4" />}
                    />
                </div>
                <Button onClick={openAddModal} className="flex items-center gap-1">
                    <Plus className="h-4 w-4" /> Tambah Role
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12 text-center">No</TableHead>
                            <TableHead>Nama Role</TableHead>
                            <TableHead className="w-24 text-right">Aksi</TableHead>
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
                                    <TableCell>{role.name}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
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
    );
}