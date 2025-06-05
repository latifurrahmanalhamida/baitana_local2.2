"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { financeIncomeSchema, photoFileSchema } from "@/schemas/finance-income-schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {CalendarIcon, FileIcon, ImageOff, Upload, X} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { ModalForm } from "@/components/ModalForm"
import { toast } from "sonner"
import { showMultipleErrorToasts } from "@/utlis/toast-error-handle"
import {Badge} from "@/components/ui/badge";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "http://localhost:8000/";

const getFileTypeFromUrl = (urlOrName) => {
    if (!urlOrName || typeof urlOrName !== 'string') {
        return '';
    }
    const parts = urlOrName.split('.');
    const extension = parts.length > 1 ? parts.pop().toLowerCase() : '';

    switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'webp':
        case 'bmp':
        case 'svg':
            return `image/${extension === 'jpg' ? 'jpeg' : extension}`;
        case 'pdf':
            return 'application/pdf';
        default:
            return '';
    }
};

export function FinanceIncomeForm({
    isModalOpen,
    setIsModalOpen,
    selectedFinanceIncome,
    handleAddFinanceIncome,
    handleEditFinanceIncome,
    isLoading,
    financeCategories = [],
}) {
    const isEditMode = !!selectedFinanceIncome
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [imageLoadError, setImageLoadError] = useState(false);

    const form = useForm({
        resolver: zodResolver(financeIncomeSchema),
        defaultValues: {
            date: new Date(),
            finance_category_id: "",
            description: "",
            amount: "",
        },
    })

    useEffect(() => {
        if (isModalOpen) {
            const initialDate = selectedFinanceIncome?.date
                ? new Date(selectedFinanceIncome.date)
                : new Date();

            form.reset({
                date: initialDate,
                finance_category_id: selectedFinanceIncome?.finance_category?.id?.toString() || "",
                description: selectedFinanceIncome?.description || "",
                amount: selectedFinanceIncome?.amount || "",
            })

            if (selectedFinanceIncome?.transaction_receipt) {
                setPreviewUrl(`${BASE_URL}${selectedFinanceIncome.transaction_receipt}`)
            } else {
                setPreviewUrl(null)
            }
            setSelectedFile(null)
            setImageLoadError(false);
        } else {
            form.reset({
                date: new Date(),
                finance_category_id: "",
                description: "",
                amount: "",
            });
            setSelectedFile(null);
            setPreviewUrl(null);
            setIsCalendarOpen(false);
            setImageLoadError(false);
        }
    }, [isModalOpen, selectedFinanceIncome, form])

    const handleFileSelect = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                photoFileSchema.parse({ file });
                setSelectedFile(file);

                const reader = new FileReader();
                reader.onload = (e) => {
                    setPreviewUrl(e.target?.result);
                };
                reader.readAsDataURL(file);
                setImageLoadError(false);
            } catch (error) {
                if (error instanceof z.ZodError) {
                    if (error.errors && error.errors.length > 0) {
                        toast.error(error.errors[0].message);
                    } else {
                        toast.error("Validasi file gagal: Terjadi kesalahan yang tidak diketahui.");
                        console.error("ZodError tanpa pesan yang jelas:", error);
                    }
                } else {
                    toast.error("Terjadi kesalahan saat memproses file.");
                    console.error("Error non-Zod:", error);
                }
                setSelectedFile(null);
                setPreviewUrl(null);
                setImageLoadError(false);
                return;
            }
        } else {
            setSelectedFile(null);
            setPreviewUrl(null);
            setImageLoadError(false);
        }
    };

    // Remove selected file
    const removeFile = () => {
        setSelectedFile(null)
        if (isEditMode && selectedFinanceIncome?.transaction_receipt) {
            setPreviewUrl(`${BASE_URL}${selectedFinanceIncome.transaction_receipt}`)
        } else {
            setPreviewUrl(null)
        }
        setImageLoadError(false);
    }

    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const onSubmit = async (values) => {
        try {
            const formData = new FormData()
            formData.append("date", format(values.date, "dd-MM-yyyy") || "")
            formData.append("finance_category_id", values.finance_category_id || "")
            formData.append("description", values.description || "")
            formData.append("amount", values.amount || "")

            if (selectedFile) {
                formData.append("transaction_receipt", selectedFile)
            }

            if (isEditMode) {
                await handleEditFinanceIncome(formData)
            } else {
                await handleAddFinanceIncome(formData)
            }

            form.reset({
                date: new Date(),
                finance_category_id: "",
                description: "",
                amount: "",
            });
            setSelectedFile(null);
            setPreviewUrl(null);
        } catch (error) {
            toast.error(error.message || "Terjadi kesalahan saat menyimpan data")
        }
    }

    const onInvalidSubmit = (errors) => {
        const fieldLabels = {
            date: "Tanggal",
            finance_category_id: "Kategori Keuangan",
            description: "Deskripsi",
            amount: "Jumlah",
            transaction_receipt: "Bukti Transaksi",
        }
        showMultipleErrorToasts(errors, fieldLabels)
    }

    const renderTransactionReceiptPreview = () => {
        const fileToPreview = selectedFile || selectedFinanceIncome;

        const currentPreviewUrl = selectedFile ? previewUrl : (selectedFinanceIncome?.transaction_receipt ? `${BASE_URL}${selectedFinanceIncome.transaction_receipt}` : null);

        if (!fileToPreview || !currentPreviewUrl) {
            return null;
        }

        const fileName = fileToPreview.name || selectedFinanceIncome?.transaction_receipt?.split('/').pop() || 'Unknown File';

        const determinedType = fileToPreview.type || getFileTypeFromUrl(currentPreviewUrl || fileName);

        const isImage = determinedType.startsWith("image/");
        const isValidPreviewUrl = typeof currentPreviewUrl === 'string' && currentPreviewUrl !== '';

        return (
            <div className="flex flex-col items-center gap-2 text-sm pt-2">
                {isImage && isValidPreviewUrl && !imageLoadError ? (
                    <>
                        <div className="relative border border-gray-200 rounded-2xl overflow-hidden">
                            <Image
                                src={currentPreviewUrl}
                                alt={`Pratinjau ${fileName}`}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="h-auto w-auto max-w-full max-h-64 "
                                onError={() => {
                                    setImageLoadError(true);
                                }}
                            />
                        </div>
                        <span className="text-xs">{fileName}</span>
                    </>
                ) : (
                    <>
                        {isImage ? (
                            <ImageOff className="h-20 w-20 text-gray-400" />
                        ) : (
                            <FileIcon className="h-20 w-20 text-gray-400" />
                        )}
                        <span className="text-xs">{fileName}</span>
                    </>
                )}
            </div>
        );
    };

    return (
        <ModalForm
            isOpen={isModalOpen}
            onClose={setIsModalOpen}
            title={isEditMode ? "Edit Pemasukan Keuangan" : "Tambah Pemasukan Keuangan"}
            description={isEditMode ? "Ubah informasi transaksi pemasukan keuangan yang sudah ada." : "Buat transaksi pemasukan keuangan baru untuk sistem."}
            onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)}
            isLoading={isLoading}
            submitLabel={isEditMode ? "Update" : "Simpan"}
            size="xl"
        >
            <Form {...form}>
                <div className="flex flex-col md:flex-row gap-x-8">
                    <div className="w-full md:w-1/2 flex flex-col space-y-4">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tanggal</FormLabel>
                                    <div>
                                        <FormControl>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                                onClick={() => setIsCalendarOpen(!isCalendarOpen)} // Mengubah state visibilitas saat diklik
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value instanceof Date ? (
                                                    format(field.value, "d MMM yyyy", { locale: id })
                                                ) : (
                                                    <span>Pilih tanggal</span>
                                                )}
                                            </Button>
                                        </FormControl>

                                        {/* Tampilkan atau sembunyikan kalender berdasarkan state isCalendarOpen */}
                                        {isCalendarOpen && (
                                            <div className="absolute bg-white border rounded-md shadow-lg p-2 mt-1 z-50"> {/* Sesuaikan styling dan z-index */}
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={(date) => {
                                                        field.onChange(date);
                                                        setIsCalendarOpen(false); // Tutup kalender setelah tanggal dipilih
                                                    }}
                                                    initialFocus
                                                    fromDate={isEditMode ? undefined : new Date()}
                                                    toDate={isEditMode ? new Date() : undefined}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="finance_category_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kategori Keuangan</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                                        <FormControl>
                                            <SelectTrigger className="h-10 w-full">
                                                <SelectValue placeholder="Pilih kategori" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {financeCategories.map((financeCategory) => (
                                                <SelectItem key={financeCategory.id} value={financeCategory.id.toString()}>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="font-medium">{financeCategory.name_upper_first}</span>
                                                        <span className="text-xs text-muted-foreground">({financeCategory.finance_category_code})</span>
                                                        <Badge
                                                            variant="outline"
                                                            className={`text-xs px-1 
                                                                ${financeCategory.type === 'expense'
                                                                    ? 'bg-orange-50 text-orange-700 border-orange-300'
                                                                    : 'bg-blue-50 text-[#2C3E9E] border-[#2C3E9E]/30'
                                                                }`
                                                            }
                                                        >
                                                            {financeCategory.type_upper_first}
                                                        </Badge>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi</FormLabel>
                                    <FormControl>
                                        <Textarea rows={3} placeholder="Tuliskan deskripsi pemasukan" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jumlah</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Masukkan jumlah uang" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full md:w-1/2 flex justify-center items-center text-center border border-gray-200 rounded-lg">
                        <div className="p-4">
                            <label className="text-sm font-medium">Bukti Transaksi</label>
                            {renderTransactionReceiptPreview()}
                            <div className="flex flex-col justify-center items-center space-y-2 mt-2">
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => document.getElementById("transaction-receipt")?.click()}
                                    >
                                        <Upload className="h-4 w-4 mr-1" />
                                        {selectedFile || previewUrl ? "Ganti File" : "Upload File"}
                                    </Button>

                                    {(selectedFile) && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={removeFile}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <X className="h-4 w-4 mr-1" />
                                            Hapus
                                        </Button>
                                    )}
                                </div>

                                <p className="text-xs text-muted-foreground mt-1">
                                    JPG, JPEG, PNG, WEBP, atau PDF. Maksimal 2MB.
                                </p>
                            </div>
                            <input
                                id="transaction-receipt"
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                            <FormMessage />
                        </div>
                    </div>
                </div>
            </Form>
        </ModalForm>
    )
}
