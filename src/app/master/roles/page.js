"use client";

import { RoleTable } from "@/components/roles/RoleTable";
import { RoleForm } from "@/components/roles/RoleForm";
import { DeleteAlert } from "@/components/roles/DeleteAlert";

export default function RolePage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Manajemen Role</h1>
            <RoleTable />
            <RoleForm />
            <DeleteAlert />
        </div>
    );
}