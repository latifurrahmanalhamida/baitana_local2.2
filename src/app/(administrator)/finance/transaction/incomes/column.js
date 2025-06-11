"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {ArrowUpDown, Calendar, Eye, FileX, Pencil, Trash2} from "lucide-react"

export const createColumns = (openEditModal, openDeleteAlert, openPreviewReceiptModal) => [
    {
        id: "index",
        header: () => <div className="text-center font-semibold">#</div>,
        cell: ({ row, table }) => {
            const filteredRows = table.getFilteredRowModel().rows;
            const currentRowId = row.original.id;
            const currentIndex = filteredRows.findIndex(r => r.original.id === currentRowId) + 1;
            return <div className="text-center font-medium text-muted-foreground">{currentIndex}</div>;
        },
        enableSorting: false,
        size: 60,
    },
    {
        accessorKey: "income_transaction",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start hover:cursor-pointer"
                >
                    Kode Transaksi
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const financeIncome = row.original
            return (
                <div className="space-y-1">
                    <Badge variant="outline" className="bg-blue-50 text-[#2C3E9E] border-[#2C3E9E]/30 text-xs px-1">
                        {financeIncome.income_transaction}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {financeIncome.date_idn_format}
                    </div>
                </div>
            )
        },
        size: 150,
    },
    {
        accessorKey: "finance_category",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="h-auto p-0 font-semibold hover:bg-transparent hover:cursor-pointer"
                    >
                        Kategori
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const financeIncome = row.original
            return (
                <div className="flex justify-center">
                    <Badge variant="outline" className="flex flex-col items-center justify-center bg-green-50 text-green-700 text-xs border-green-200 font-medium px-3 py-1">
                        <span>
                            {financeIncome?.finance_category?.name_upper_first ?? "No Finance Category"}
                        </span>
                        <span className="text-[10px] text-blue-700">
                            ({financeIncome?.finance_category?.type_upper_first ?? "No Finance Category"})
                        </span>
                    </Badge>
                </div>
            )
        },
        size: 100,
    },
    {
        accessorKey: "description",
        header: () => <div className="px-2 font-semibold">Deskripsi</div>,
        cell: ({ row }) => {
            return <div className="font-medium text-gray-900 text-xs text-justify w-[210px] max-w-[210px] whitespace-normal break-words">{row.getValue("description")}</div>
        },
        size: 100,
    },
    {
        accessorKey: "amount_idn_format",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="h-auto p-0 font-semibold hover:bg-transparent text-center justify-center hover:cursor-pointer"
                    >
                        Jumlah
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            return <div className="font-medium text-gray-900 text-xs text-end">{row.getValue("amount_idn_format")}</div>
        },
        size: 100,
    },
    {
        accessorKey: "transaction_receipt",
        header: () => <div className="text-center font-semibold">Bukti Transaksi</div>,
        cell: ({ row }) => {
            const receiptPath = row.original.transaction_receipt;
            if (receiptPath) {
                return (
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openPreviewReceiptModal(row.original)}
                            className="h-8 px-3 text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-700 hover:border-gray-400 cursor-pointer"
                        >
                            <Eye className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                )
            }
            return <div className="flex flex-col justify-center items-center text-muted-foreground space-y-1">
                <FileX className="w-4 h-4" />
                <span className="text-xs text-center">Tidak ada</span>
            </div>;
        },
        size: 100,
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start hover:cursor-pointer"
                >
                    Tanggal Dibuat
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const role = row.original
            return (
                <div className="space-y-1">
                    <div className="text-xs font-medium text-gray-900">{role.created_at}</div>
                    <div className="text-xs text-muted-foreground">{role.created_at_human}</div>
                </div>
            )
        },
        size: 180,
    },
    {
        id: "actions",
        header: () => <div className="text-center font-semibold">Aksi</div>,
        cell: ({ row }) => {
            const financeIncome = row.original

            return (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(financeIncome)}
                        className="h-8 px-3 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDeleteAlert(financeIncome)}
                        className="h-8 px-3 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            )
        },
        enableSorting: false,
        size: 60,
    },
]
