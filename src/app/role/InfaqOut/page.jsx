"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

export default function TabelPengeluaranInfaq() {
  const data = [
    {
      kode: "PGL-001",
      jumlah: 50000,
      note: "Bantuan korban banjir",
      bukti: "/images/bukti1.jpg"
    },
    {
      kode: "PGL-002",
      jumlah: 75000,
      note: "Pembelian bahan makanan",
      bukti: "/images/bukti2.jpg"
    },
    {
      kode: "PGL-003",
      jumlah: 100000,
      note: "Pengobatan warga",
      bukti: "/images/bukti3.jpg"
    },
  ]

  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = data.filter(item =>
    item.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.note.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6 bg-green-50 rounded-xl shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold text-green-900">Pengeluaran Infaq</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Cari transaksi..."
            className="w-full sm:w-[240px] bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="mr-2 h-4 w-4" /> Tambah Data
          </Button>
        </div>
      </div>

      <Table className="bg-white border rounded-xl shadow-sm">
        <TableCaption className="text-sm text-muted-foreground">
          Daftar pengeluaran infaq 
        </TableCaption>
        <TableHeader className="bg-green-100">
          <TableRow>
            <TableHead className="text-green-800 w-[220px]">Kode Transaksi Infaq</TableHead>
            <TableHead className="text-green-800 text-right">Jumlah (Rp)</TableHead>
            <TableHead className="text-green-800">Note</TableHead>
            <TableHead className="text-green-800 text-center w-[160px]">Bukti Transaksi</TableHead>
            <TableHead className="text-green-800 text-center w-[120px]">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((item, index) => (
            <TableRow key={index} className="hover:bg-green-50">
              <TableCell>{item.kode}</TableCell>
              <TableCell className="text-right">{item.jumlah.toLocaleString('id-ID')}</TableCell>
              <TableCell>{item.note}</TableCell>
              <TableCell className="flex justify-center">
                {/* Menampilkan gambar bukti transaksi */}
                <img src={item.bukti} alt={`Bukti transaksi ${item.kode}`} className="h-16 w-24 object-cover rounded-md" />
              </TableCell>
             <TableCell className="text-center">
  <div className="flex justify-center gap-2">
    <Button variant="outline" size="sm" className="text-green-700 border-green-600 hover:bg-green-100">
      <Pencil className="w-4 h-4 mr-1" /> Edit
    </Button>
    <Button variant="destructive" size="sm">
      <Trash2 className="w-4 h-4 mr-1" /> Hapus
    </Button>
  </div>
</TableCell>

            </TableRow>
          ))}
          {filteredData.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                Tidak ada data yang cocok.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
