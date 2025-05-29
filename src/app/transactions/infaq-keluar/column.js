// /app/master/infaq-keluar/columns.js

'use client'

import { ArrowUpDown, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
// DataTableColumnHeader can be used if you prefer its styling for headers
// import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';

export const createColumns = (openEditModal, openDeleteAlert) => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    id: 'index',
    header: () => <div className="text-center font-semibold">#</div>,
    cell: ({ row, table }) => {
      // This calculates index based on current page and page size if server-side pagination is used
      // For client-side, a simpler (row.index + 1) might suffice or use original data index
      const pageIndex = table.getState().pagination.pageIndex
      const pageSize = table.getState().pagination.pageSize
      return (
        <div className="text-center font-medium text-muted-foreground">
          {pageIndex * pageSize + row.index + 1}
        </div>
      )
    },
    enableSorting: false,
    size: 60,
  },
  {
    accessorKey: 'kodeTransaksi',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start"
      >
        Kode Transaksi
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="bg-green-50 text-green-700 border-green-700/30 font-medium px-3 py-1"
      >
        {row.getValue('kodeTransaksi')}
      </Badge>
    ),
    size: 180,
  },
  {
    accessorKey: 'jumlah',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start"   
      >
        Jumlah
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('jumlah'))
      const formatted = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(amount)
      return <div className="font-medium text-gray-800">{formatted}</div>
    },
    size: 150,
  },
  {
    accessorKey: 'note',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start"
      >
        Catatan
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-gray-600 truncate max-w-[250px]">
        {row.getValue('note') || '-'}
      </div>
    ),
    size: 300,
  },
  {
    accessorKey: 'buktiTransaksi',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} // Assuming buktiTransaksi might be sortable by presence or name
        className="h-auto p-0 font-semibold hover:bg-transparent text-left justify-start"
      >
        Bukti Transaksi
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const url = row.getValue('buktiTransaksi')
      return url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Lihat Bukti
        </a>
      ) : (
        <span className="text-muted-foreground italic">Tidak ada</span>
      )
    },
    enableSorting: false, // Typically, you wouldn't sort by a link/image
    size: 150,
  },
  {
    id: 'actions',
    header: () => <div className="text-center font-semibold">Aksi</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const infaq = row.original
      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openEditModal(infaq)}
            className="h-8 px-3 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openDeleteAlert(infaq)}
            className="h-8 px-3 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      )
    },
    enableSorting: false,
    size: 100,
  },
]