"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jenisInfaqSchema } from "@/schemas/jenisinfaq-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputError } from "@/components/InputError";
import { ModalForm } from "@/components/ModalForm";
import { toast } from "sonner";
import { showMultipleErrorToasts } from "@/utlis/toast-error-handle";

export function JenisInfaqForm({
  isModalOpen,
  setIsModalOpen,
  selectedJenisInfaq,
  handleAddJenisInfaq,
  handleEditJenisInfaq,
  isLoading,
}) {
  const isEditMode = !!selectedJenisInfaq;

  const form = useForm({
    resolver: zodResolver(jenisInfaqSchema),
    defaultValues: {
      kode: selectedJenisInfaq?.kode || "",
      nama: selectedJenisInfaq?.nama || "",
    },
  });

  useEffect(() => {
    if (isModalOpen) {
      form.reset({
        kode: selectedJenisInfaq?.kode || "",
        nama: selectedJenisInfaq?.nama || "",
      });
    }
  }, [isModalOpen, selectedJenisInfaq, form]);

  const onSubmit = async (values) => {
    try {
      if (isEditMode) {
        handleEditJenisInfaq(values);
      } else {
        handleAddJenisInfaq(values);
      }
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Terjadi kesalahan saat menyimpan data jenis infaq"
      );
    }
  };

  useEffect(() => {
    const errors = form.formState.errors;

    if (Object.keys(errors).length > 0) {
      const fieldLabels = {
        kode: "Kode Jenis Infaq",
        nama: "Nama Jenis Infaq",
      };

      showMultipleErrorToasts(errors, fieldLabels);
    }
  }, [form.formState.errors]);

  return (
    <ModalForm
      isOpen={isModalOpen}
      onClose={setIsModalOpen}
      title={isEditMode ? "Edit Jenis Infaq" : "Tambah Jenis Infaq"}
      description={
        isEditMode
          ? "Ubah data jenis infaq yang telah ada."
          : "Masukkan data jenis infaq baru ke dalam sistem."
      }
      onSubmit={form.handleSubmit(onSubmit)}
      isLoading={isLoading}
      submitLabel={isEditMode ? "Update" : "Simpan"}
      size="sm"
    >
      <div className="space-y-2">
        <Form {...form}>
          <FormField
            control={form.control}
            name="kode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Kode Jenis Infaq
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan kode jenis infaq"
                    disabled={isLoading}
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <InputError message={form.formState.errors.kode?.message} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Nama Jenis Infaq
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nama jenis infaq"
                    disabled={isLoading}
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <InputError message={form.formState.errors.nama?.message} />
              </FormItem>
            )}
          />
        </Form>
      </div>
    </ModalForm>
  );
}
