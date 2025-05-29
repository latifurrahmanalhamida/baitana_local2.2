"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { infaqMasukSchema } from "@/schemas/infaqmasuk-schema";
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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function InfaqMasukForm({
  isModalOpen,
  setIsModalOpen,
  selectedData,
  handleAdd,
  handleEdit,
  isLoading,
  jenisInfaqs = [],
}) {
  const isEditMode = !!selectedData;

  const form = useForm({
    resolver: zodResolver(infaqMasukSchema),
    defaultValues: {
      kode: selectedData?.kode || "",
      jenis_id: selectedData?.jenis_id || "",
      jumlah: selectedData?.jumlah || "",
      note: selectedData?.note || "",
    },
  });

  useEffect(() => {
    if (isModalOpen) {
      form.reset({
        kode: selectedData?.kode || "",
        jenis_id: selectedData?.jenis_id || "",
        jumlah: selectedData?.jumlah || "",
        note: selectedData?.note || "",
      });
    }
  }, [isModalOpen, selectedData, form]);

  const onSubmit = async (values) => {
    try {
      if (isEditMode) {
        handleEdit(values);
      } else {
        handleAdd(values);
      }
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Terjadi kesalahan saat menyimpan data infaq masuk"
      );
    }
  };

  useEffect(() => {
    const errors = form.formState.errors;
    if (Object.keys(errors).length > 0) {
      const fieldLabels = {
        kode: "Kode Transaksi",
        jenis_id: "Jenis Infaq",
        jumlah: "Jumlah",
        note: "Catatan",
      };
      showMultipleErrorToasts(errors, fieldLabels);
    }
  }, [form.formState.errors]);

  return (
    <ModalForm
      isOpen={isModalOpen}
      onClose={setIsModalOpen}
      title={isEditMode ? "Edit Infaq Masuk" : "Tambah Infaq Masuk"}
      description={
        isEditMode
          ? "Ubah data pemasukan infaq yang telah ada."
          : "Masukkan data pemasukan infaq baru ke dalam sistem."
      }
      onSubmit={form.handleSubmit(onSubmit)}
      isLoading={isLoading}
      submitLabel={isEditMode ? "Update" : "Simpan"}
      size="sm"
    >
      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="kode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Transaksi</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan kode transaksi"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <InputError message={form.formState.errors.kode?.message} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jenis_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Infaq</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full h-10">
                      <SelectValue placeholder="Pilih jenis infaq" />
                    </SelectTrigger>
                    <SelectContent>
                      {jenisInfaqs.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.nama}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <InputError message={form.formState.errors.jenis_id?.message} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jumlah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Masukkan jumlah"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <InputError message={form.formState.errors.jumlah?.message} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catatan</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Catatan tambahan"
                    rows={3}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <InputError message={form.formState.errors.note?.message} />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </ModalForm>
  );
}