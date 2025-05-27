"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/schemas/event-schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/InputError";
import { ModalForm } from "@/components/ModalForm";
import { showMultipleErrorToasts } from "@/utlis/toast-error-handle";
import { toast } from "sonner";

export function EventForm({
   isModalOpen,
   setIsModalOpen,
   selectedEvent,
   handleAddEvent,
   handleEditEvent,
   isLoading,
}) {
    const isEditMode = !!selectedEvent;

    const form = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: selectedEvent?.title || "",
        },
    });

    useEffect(() => {
        if (isModalOpen) {
            form.reset({
                title: selectedEvent?.title || "",
            });
        }
    }, [isModalOpen, selectedEvent, form]);

    const onSubmit = async (values) => {
        try {
            if (isEditMode) {
                handleEditEvent(values);
            } else {
                handleAddEvent(values);
            }
            form.reset();
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Terjadi kesalahan saat menyimpan data acara");
        }
    };

    useEffect(() => {
        const errors = form.formState.errors;

        if (Object.keys(errors).length > 0) {
            const fieldLabels = {
                title: "Nama Acara",
            };

            showMultipleErrorToasts(errors, fieldLabels);
        }
    }, [form.formState.errors]);

    return (
        <ModalForm
            isOpen={isModalOpen}
            onClose={setIsModalOpen}
            title={isEditMode ? "Edit Acara" : "Tambah Acara Baru"}
            description={isEditMode ? "Ubah informasi acara yang sudah ada." : "Buat acara baru untuk sistem."}
            onSubmit={form.handleSubmit(onSubmit)}
            isLoading={isLoading}
            submitLabel={isEditMode ? "Update" : "Simpan"}
            size="sm"
        >
            <div className="space-y-2">
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium">Nama Acara</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Masukkan nama acara"
                                        disabled={isLoading}
                                        className="h-10"
                                        {...field}
                                    />
                                </FormControl>
                                <InputError message={form.formState.errors.title?.message} />
                            </FormItem>
                        )}
                    />
                </Form>
            </div>
        </ModalForm>
    );
}
