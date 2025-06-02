"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { financeCategorySchema } from "@/schemas/finance-category-schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ModalForm } from "@/components/ModalForm";
import { showMultipleErrorToasts } from "@/utlis/toast-error-handle";
import {toast} from "sonner";

export function FinanceCategoryForm({
    isModalOpen,
    setIsModalOpen,
    selectedFinanceCategory,
    handleAddFinanceCategory,
    handleEditFinanceCategory,
    isLoading,
}) {
    const isEditMode = !!selectedFinanceCategory;

    const form = useForm({
        resolver: zodResolver(financeCategorySchema),
        defaultValues: {
            name: selectedFinanceCategory?.name || "",
            type: selectedFinanceCategory?.type || ""
        },
    });

    useEffect(() => {
        if (isModalOpen) {
            form.reset({
                name: selectedFinanceCategory?.name || "",
                type: selectedFinanceCategory?.type || ""
            });
        }
    }, [isModalOpen, selectedFinanceCategory, form]);

    const onSubmit = async (values) => {
        try {
            if (isEditMode) {
                handleEditFinanceCategory(values);
            } else {
                handleAddFinanceCategory(values);
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
                name: "Nama Kategori Keuangan",
                type: "Tipe Keuangan"
            }

            showMultipleErrorToasts(errors, fieldLabels);
        }
    }, [form.formState.errors])

    return (
        <ModalForm
            isOpen={isModalOpen}
            onClose={setIsModalOpen}
            title={isEditMode ? "Edit Kategori Keuangan" : "Tambah Kategori Keuangan"}
            description={isEditMode ? "Ubah informasi kategori keuanangan yang sudah ada." : "Buat kategori keuangan baru untuk sistem."}
            onSubmit={form.handleSubmit(onSubmit)}
            isLoading={isLoading}
            submitLabel={isEditMode ? "Update" : "Simpan"}
            size="sm"
        >
            <div className="space-y-4 pb-4">
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium">Nama Kategori Keuangan</FormLabel>
                                <FormControl>
                                    <Input placeholder="Masukkan nama kategori keuangan" disabled={isLoading} className="h-10" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium">Tipe Keuangan</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                                    <FormControl>
                                        <SelectTrigger className="h-10 w-full">
                                            <SelectValue placeholder="Pilih tipe" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="expense">
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium">Expense</span>
                                                <span className="text-xs text-muted-foreground">(Pengeluaran)</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="income">
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium">Income</span>
                                                <span className="text-xs text-muted-foreground">(Pemasukan)</span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>
            </div>
        </ModalForm>
    );
}