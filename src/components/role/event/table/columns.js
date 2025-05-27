import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export const columns = ({ onEdit, onDelete, openForm }) => [
  { accessorKey: "kodeAcara", header: "Kode Acara" },
  { accessorKey: "nama", header: "Nama" },
  { accessorKey: "deskripsi", header: "Deskripsi" },
  { accessorKey: "lokasi", header: "Lokasi" },
  { accessorKey: "jenisAcara", header: "Jenis Acara" },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => { onEdit(row.original); openForm(); }}>
          <Pencil className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="destructive" onClick={() => onDelete(row.original.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];