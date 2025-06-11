"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {newsCategorySchema} from "@/schemas/news-category-schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/InputError";
import { ModalForm } from "@/components/ModalForm";
import { showMultipleErrorToasts } from "@/utlis/toast-error-handle";
import {toast} from "sonner";

export function NewsCategoryForm({
    isModalOpen,
    setIsModalOpen,
    selectedNewsCategory,
    handleAddNewsCategory,
    handleEditNewsCategory,
    isLoading,
}) {
    const isEditMode = !!selectedNewsCategory;

    const form = useForm({
        resolver: zodResolver(newsCategorySchema),
        defaultValues: {
            name: selectedNewsCategory?.name || "",
        },
    });

    useEffect(() => {
        if (isModalOpen) {
            form.reset({
                name: selectedNewsCategory?.name || "",
            });
        }
    }, [isModalOpen, selectedNewsCategory, form]);

    const onSubmit = async (values) => {
        try {
            if (isEditMode) {
                handleEditNewsCategory(values);
            } else {
                handleAddNewsCategory(values);
            }
            form.reset();
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Terjadi kesalahan saat menyimpan data");
        }
    };

    useEffect(() => {
        const errors = form.formState.errors

        if (Object.keys(errors).length > 0) {
            const fieldLabels = {
                name: "Nama Kategori Berita"
            }

            showMultipleErrorToasts(errors, fieldLabels);
        }
    }, [form.formState.errors])

    return (
        <ModalForm
            isOpen={isModalOpen}
            onClose={setIsModalOpen}
            title={isEditMode ? "Edit Kategori Berita" : "Tambah Kategori Berita Baru"}
            description={isEditMode ? "Ubah informasi kategori berita yang sudah ada." : "Buat kategori berita baru untuk sistem."}
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
                                <FormLabel className="text-sm font-medium">Kategori Berita</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan nama kategori berita" disabled={isLoading} className="h-10" {...field} />
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