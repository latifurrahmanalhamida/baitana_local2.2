'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { ModalForm } from '@/components/ModalForm' // Assuming ModalForm is a reusable component
import { infaqKeluarSchema } from '@/schemas/infaqkeluar-schema'

export function InfaqKeluarForm({
  isModalOpen,
  setIsModalOpen,
  selectedData,
  handleAdd,
  handleEdit,
  isLoading,
}) {
  const isEditMode = !!selectedData

  const form = useForm({
    resolver: zodResolver(infaqKeluarSchema),
    defaultValues: {
      kodeTransaksi: '',
      jumlah: undefined, // Use undefined for number inputs for better control
      note: '',
      buktiTransaksi: undefined, // FileList or undefined
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form

  useEffect(() => {
    if (isModalOpen) {
      if (selectedData) {
        // Edit mode
        reset({
          kodeTransaksi: selectedData.kodeTransaksi,
          jumlah: Number(selectedData.jumlah) || undefined,
          note: selectedData.note || '',
          buktiTransaksi: undefined, // File input is always reset, user re-uploads if changing
        })
      } else {
        // Add mode
        reset({
          kodeTransaksi: '',
          jumlah: undefined,
          note: '',
          buktiTransaksi: undefined,
        })
      }
    }
  }, [isModalOpen, selectedData, reset])

  const onSubmit = async (dataFromForm) => {
    const newFile = dataFromForm.buktiTransaksi?.[0] // Get File from FileList

    // Construct payload, ensuring only relevant fields are included
    const payload = {
      kodeTransaksi: dataFromForm.kodeTransaksi,
      jumlah: dataFromForm.jumlah,
      note: dataFromForm.note,
      // buktiTransaksi will be set below
    }

    if (newFile instanceof File) {
      payload.buktiTransaksi = newFile // Pass the File object
    } else if (isEditMode && selectedData?.buktiTransaksi) {
      // No new file uploaded, retain existing one if in edit mode
      payload.buktiTransaksi = selectedData.buktiTransaksi
    } else {
      // No new file and (not edit mode or no existing file)
      payload.buktiTransaksi = null // Or undefined, depending on API expectation
    }

    try {
      if (isEditMode) {
        await handleEdit(payload)
      } else {
        await handleAdd(payload)
      }
      // Modal closure is typically handled by the hook after successful operation
      // Form reset is handled by the useEffect when isModalOpen changes or on success.
    } catch (error) {
      // Error toast is shown by the hook.
      // The hook re-throws the error, so it can be caught here if needed for form-specific error handling.
      console.error('Form submission error:', error)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <ModalForm
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title={isEditMode ? 'Edit Pengeluaran Infaq' : 'Tambah Pengeluaran Infaq'}
      description={
        isEditMode
          ? 'Ubah detail data pengeluaran infaq.'
          : 'Masukkan detail data untuk pengeluaran infaq baru.'
      }
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
      submitLabel={isEditMode ? 'Update' : 'Tambah'}
      size="lg" // Or your preferred size
    >
      {/* Using Card and CardContent for consistent styling if ModalForm doesn't provide it */}
      <Card className="border-none shadow-none">
        <CardContent className="p-0 space-y-4">
          <form className="space-y-4"> {/* onSubmit is handled by ModalForm */}
            <div className="space-y-2">
              <Label htmlFor="kodeTransaksi">Kode Transaksi Pengeluaran</Label>
              <Input
                id="kodeTransaksi"
                {...register('kodeTransaksi')}
                disabled={isEditMode || isLoading}
              />
              {errors.kodeTransaksi && (
                <p className="text-sm text-red-500">{errors.kodeTransaksi.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jumlah">Jumlah</Label>
              <Input
                id="jumlah"
                type="number"
                {...register('jumlah', { valueAsNumber: true })}
                disabled={isLoading}
              />
              {errors.jumlah && (
                <p className="text-sm text-red-500">{errors.jumlah.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Note</Label>
              <Textarea
                id="note"
                {...register('note')}
                disabled={isLoading}
              />
              {errors.note && (
                <p className="text-sm text-red-500">{errors.note.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="buktiTransaksi">Bukti Transaksi (.png/.jpg)</Label>
              <Input
                id="buktiTransaksi"
                type="file"
                accept="image/png, image/jpeg"
                {...register('buktiTransaksi')} // RHF returns FileList
                disabled={isLoading}
              />
              {errors.buktiTransaksi && (
                <p className="text-sm text-red-500">{errors.buktiTransaksi.message}</p>
              )}
            </div>
            {/* Submit and Cancel buttons are part of ModalForm component */}
          </form>
        </CardContent>
      </Card>
    </ModalForm>
  )
}