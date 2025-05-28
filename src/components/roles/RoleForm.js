"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roleSchema } from "@/schemas/role-schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/InputError";
import { ModalForm } from "@/components/ModalForm";
import { showMultipleErrorToasts } from "@/utlis/toast-error-handle";
import {toast} from "sonner";

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

    // Reset form when modal opens/closes or selected roles changes
    useEffect(() => {
        if (isModalOpen) {
            form.reset({
                name: selectedRole?.name || "",
            });
        }
    }, [isModalOpen, selectedRole, form]);

    const onSubmit = async (values) => {
        try {
            if (isEditMode) {
                handleEditRole(values);
            } else {
                handleAddRole(values);
            }
            form.reset();
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Terjadi kesalahan saat menyimpan data");
        }
    };

    // Toast error handler untuk multiple errors
    useEffect(() => {
        const errors = form.formState.errors

        if (Object.keys(errors).length > 0) {
            const fieldLabels = {
                name: "Nama Role"
            }

            showMultipleErrorToasts(errors, fieldLabels);
        }
    }, [form.formState.errors])

    return (
        <ModalForm
            isOpen={isModalOpen}
            onClose={setIsModalOpen}
            title={isEditMode ? "Edit Role" : "Tambah Role Baru"}
            description={isEditMode ? "Ubah informasi roles yang sudah ada." : "Buat roles baru untuk sistem."}
            onSubmit={form.handleSubmit(onSubmit)}
            isLoading={isLoading}
            submitLabel={isEditMode ? "Update" : "Simpan"}
            size="sm"
        >
            <div className="space-y-2">
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium">Nama Role</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan nama role" disabled={isLoading} className="h-10" {...field} />
                                </FormControl>
                                <InputError message={form.formState.errors.name?.message} />
                            </FormItem>
                        )}
                    />
                </Form>
            </div>
        </ModalForm>
    );
}