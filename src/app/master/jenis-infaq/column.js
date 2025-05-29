"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2 } from "lucide-react";

export const createColumns = (openEditModal, openDeleteAlert) => [
  {
    id: "index",
    header: () => <div className="text-center font-semibold">#</div>,
    cell: ({ row, table }) => {
      const originalData = table.options.data;
      const currentRowId = row.original.id;
      const originalIndex =
        originalData.findIndex((item) => item.id === currentRowId) + 1;
      return (
        <div className="text-center font-medium text-muted-foreground">
          {originalIndex}
        </div>
      );
    },
    enableSorting: false,
    size: 60,
  },
  {
    accessorKey: "kode_jenis_infaq",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start"
      >
        Kode Jenis Infaq
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="bg-blue-50 text-[#2C3E9E] border-[#2C3E9E]/30 font-medium px-3 py-1"
      >
        {row.getValue("kode_jenis_infaq")}
      </Badge>
    ),
    size: 180,
  },
  {
    accessorKey: "nama_jenis_infaq",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start"
      >
        Nama Jenis Infaq
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium text-gray-900">
        {row.getValue("nama_jenis_infaq")}
      </div>
    ),
    size: 400,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start"
      >
        Tanggal Dibuat
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900">
            {data.created_at}
          </div>
          <div className="text-xs text-muted-foreground">
            {data.created_at_human}
          </div>
        </div>
      );
    },
    size: 180,
  },
  {
    id: "actions",
    header: () => <div className="text-center font-semibold">Aksi</div>,
    cell: ({ row }) => {
      const jenis = row.original;

      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openEditModal(jenis)}
            className="h-8 px-3 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openDeleteAlert(jenis)}
            className="h-8 px-3 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      );
    },
    enableSorting: false,
    size: 80,
  },
];
