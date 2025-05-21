"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roleSchema } from "@/schemas/role-schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputError } from "@/components/InputError";
import { ModalForm } from "@/components/ModalForm";

export function RoleForm({
   isModalOpen,
   setIsModalOpen,
   selectedRole,
   handleAddRole,
   handleEditRole,
   isLoading,
}) {
    const isEditMode = !!selectedRole;

    const form = useForm({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            name: selectedRole?.name || "",
        },
    });

    // Reset form when modal opens/closes or selected role changes
    useEffect(() => {
        if (isModalOpen) {
            form.reset({
                name: selectedRole?.name || "",
            });
        }
    }, [isModalOpen, selectedRole, form]);

    const onSubmit = (e) => {
        e.preventDefault();
        form.handleSubmit((values) => {
            if (isEditMode) {
                handleEditRole(values);
            } else {
                handleAddRole(values);
            }
        })();
    };

    return (
        <ModalForm
            isOpen={isModalOpen}
            onClose={setIsModalOpen}
            title={isEditMode ? "Edit Role" : "Tambah Role Baru"}
            onSubmit={onSubmit}
            isLoading={isLoading}
            submitLabel={isEditMode ? "Update" : "Simpan"}
            size="sm"
        >
            <div className="space-y-2">
                <Label htmlFor="name">Nama Role</Label>
                <Input
                    id="name"
                    placeholder="Masukkan nama role"
                    {...form.register("name")}
                    disabled={isLoading}
                />
                <InputError message={form.formState.errors.name?.message} />
            </div>
        </ModalForm>
    );
}