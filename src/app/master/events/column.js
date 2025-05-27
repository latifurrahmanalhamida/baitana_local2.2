"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react"

export const createColumns = (openEditModal, openDeleteAlert) => [
  {
    id: "index",
    header: () => <div className="text-center font-semibold">#</div>,
    cell: ({ row, table }) => {
      const originalData = table.options.data
      const currentRowId = row.original.id
      const originalIndex = originalData.findIndex(item => item.id === currentRowId) + 1
      return <div className="text-center font-medium text-muted-foreground">{originalIndex}</div>
    },
    enableSorting: false,
    size: 60,
  },
  {
    accessorKey: "kode_acara",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start"
      >
        Kode Acara
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="bg-blue-50 text-[#2C3E9E] border-[#2C3E9E]/30 font-medium px-3 py-1">
        {row.getValue("kode_acara")}
      </Badge>
    ),
    size: 150,
  },
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start"
      >
        Nama
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-medium text-gray-900">{row.getValue("nama")}</div>,
    size: 200,
  },
  {
    accessorKey: "deskripsi",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start"
      >
        Deskripsi
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-muted-foreground text-sm">{row.getValue("deskripsi")}</div>,
    size: 300,
  },
  {
    accessorKey: "lokasi",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start"
      >
        Lokasi
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-sm text-gray-900">{row.getValue("lokasi")}</div>,
    size: 200,
  },
  {
    accessorKey: "jenis_acara",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start"
      >
        Jenis Acara
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("jenis_acara")
      const colorMap = {
        Keagamaan: "bg-green-50 text-green-700 border-green-200",
        Sosial: "bg-yellow-50 text-yellow-700 border-yellow-200",
        Edukasi: "bg-purple-50 text-purple-700 border-purple-200",
        "Penggalangan Dana": "bg-red-50 text-red-700 border-red-200",
      }
      return (
        <Badge variant="outline" className={`px-3 py-1 font-medium ${colorMap[value] || ""}`}>
          {value}
        </Badge>
      )
    },
    size: 180,
  },
  {
    id: "actions",
    header: () => <div className="text-center font-semibold">Aksi</div>,
    cell: ({ row }) => {
      const event = row.original
      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openEditModal(event)}
            className="h-8 px-3 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openDeleteAlert(event)}
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
