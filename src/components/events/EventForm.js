"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/schemas/event-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { InputError } from "@/components/InputError";
import { ModalForm } from "@/components/ModalForm";
import { showMultipleErrorToasts } from "@/utlis/toast-error-handle";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      kodeAcara: selectedEvent?.kodeAcara || "",
      title: selectedEvent?.title || "",
      deskripsi: selectedEvent?.deskripsi || "",
      lokasi: selectedEvent?.lokasi || "",
      jenisAcaraId: selectedEvent?.jenisAcaraId || "",
    },
  });

  useEffect(() => {
    if (isModalOpen) {
      form.reset({
        kodeAcara: selectedEvent?.kodeAcara || "",
        title: selectedEvent?.title || "",
        deskripsi: selectedEvent?.deskripsi || "",
        lokasi: selectedEvent?.lokasi || "",
        jenisAcaraId: selectedEvent?.jenisAcaraId || "",
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
      toast.error(
        error.message || "Terjadi kesalahan saat menyimpan data acara"
      );
    }
  };

  useEffect(() => {
    const errors = form.formState.errors;

    if (Object.keys(errors).length > 0) {
      const fieldLabels = {
        kodeAcara: "Kode Acara",
        title: "Nama Acara",
        deskripsi: "Deskripsi",
        lokasi: "Lokasi",
        jenisAcaraId: "Jenis Acara",
      };

      showMultipleErrorToasts(errors, fieldLabels);
    }
  }, [form.formState.errors]);

  return (
    <ModalForm
      isOpen={isModalOpen}
      onClose={setIsModalOpen}
      title={isEditMode ? "Edit Acara" : "Tambah Acara Baru"}
      description={
        isEditMode
          ? "Ubah informasi acara yang sudah ada."
          : "Buat acara baru untuk sistem."
      }
      onSubmit={form.handleSubmit(onSubmit)}
      isLoading={isLoading}
      submitLabel={isEditMode ? "Update" : "Simpan"}
      size="sm"
    >
      <div className="space-y-4">
        <Form {...form}>
          {/* Kode Acara */}
          <FormField
            control={form.control}
            name="kodeAcara"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Acara</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Misal: AC001"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <InputError message={form.formState.errors.kodeAcara?.message} />
              </FormItem>
            )}
          />

          {/* Nama Acara */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Acara</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nama acara"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <InputError message={form.formState.errors.title?.message} />
              </FormItem>
            )}
          />

          {/* Deskripsi */}
          <FormField
            control={form.control}
            name="deskripsi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Deskripsi singkat acara"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <InputError message={form.formState.errors.deskripsi?.message} />
              </FormItem>
            )}
          />

          {/* Lokasi */}
          <FormField
            control={form.control}
            name="lokasi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lokasi</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan lokasi acara"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <InputError message={form.formState.errors.lokasi?.message} />
              </FormItem>
            )}
          />

          {/* Jenis Acara */}
          <FormField
            control={form.control}
            name="jenisAcaraId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Acara</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis acara" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pengajian">Pengajian</SelectItem>
                    <SelectItem value="kajian">Kajian</SelectItem>
                    <SelectItem value="bakti-sosial">Bakti Sosial</SelectItem>
                    {/* Sesuaikan pilihan jenis acara sesuai kebutuhan */}
                  </SelectContent>
                </Select>
                <InputError message={form.formState.errors.jenisAcaraId?.message} />
              </FormItem>
            )}
          />
        </Form>
      </div>
    </ModalForm>
  );
}
