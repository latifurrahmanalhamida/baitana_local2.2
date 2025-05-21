// Harusnya berada di file page.jsx
"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table"; // Pastikan path ini benar
import { Button } from "@/components/ui/button"; // Pastikan path ini benar
import { Input } from "@/components/ui/input"; // Pastikan path ini benar
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Pastikan path ini benar
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // Pastikan path ini benar
import { Label } from "@/components/ui/label"; // Pastikan path ini benar
import { Plus, Pencil, Trash2 } from "lucide-react";

// Data contoh awal untuk Jenis Infaq
const initialData = [
  { id: "1", kode: "INF-001", nama: "Infaq Pendidikan" },
  { id: "2", kode: "INF-002", nama: "Infaq Kesehatan" },
  { id: "3", kode: "INF-003", nama: "Pembangunan Masjid" },
  { id: "4", kode: "INF-004", nama: "Infaq Yatim Piatu" },
  { id: "5", kode: "INF-005", nama: "Bencana Alam" },
];

export default function JenisInfaqPage() {
  const [dataJenisInfaq, setDataJenisInfaq] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingJenisInfaq, setEditingJenisInfaq] = useState(null);
  const [jenisInfaqToDelete, setJenisInfaqToDelete] = useState(null);

  // State untuk form input "Jenis Infaq"
  const [inputKode, setInputKode] = useState("");
  const [inputNama, setInputNama] = useState(""); // Kembali ke inputNama

  const filteredData = useMemo(() => {
    return dataJenisInfaq.filter(
      (item) =>
        (item.kode && item.kode.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.nama && item.nama.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [dataJenisInfaq, searchTerm]);

  const resetFormInputs = () => {
    setInputKode("");
    setInputNama("");
  };

  const handleAddJenisInfaq = () => {
    if (!inputKode.trim() || !inputNama.trim()) {
      alert("Kode Jenis Infaq dan Nama Jenis Infaq tidak boleh kosong!");
      return;
    }
    const newJenisInfaq = {
      id: (dataJenisInfaq.length + 1).toString(),
      kode: inputKode,
      nama: inputNama,
    };
    setDataJenisInfaq([...dataJenisInfaq, newJenisInfaq]);
    resetFormInputs();
    setIsAddDialogOpen(false);
  };

  const handleOpenEditDialog = (jenisInfaq) => {
    setEditingJenisInfaq(jenisInfaq);
    setInputKode(jenisInfaq.kode);
    setInputNama(jenisInfaq.nama);
    setIsEditDialogOpen(true);
  };

  const handleEditJenisInfaq = () => {
    if (!editingJenisInfaq || !inputKode.trim() || !inputNama.trim()) {
      alert("Kode Jenis Infaq dan Nama Jenis Infaq tidak boleh kosong!");
      return;
    }
    setDataJenisInfaq(
      dataJenisInfaq.map((item) =>
        item.id === editingJenisInfaq.id
          ? { ...item, kode: inputKode, nama: inputNama }
          : item
      )
    );
    resetFormInputs();
    setEditingJenisInfaq(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteJenisInfaq = () => {
    if (!jenisInfaqToDelete) return;
    setDataJenisInfaq(dataJenisInfaq.filter((item) => item.id !== jenisInfaqToDelete.id));
    setJenisInfaqToDelete(null);
  };

  return (
    <div className="p-6 bg-green-50 rounded-xl shadow-md min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold text-green-900">
          Manajemen Jenis Infaq {/* Judul disesuaikan kembali */}
        </h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Cari jenis infaq..." // Placeholder disesuaikan
            className="w-full sm:w-[240px] bg-white border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="mr-2 h-4 w-4" /> Tambah Data
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]"> {/* Disesuaikan kembali jika perlu */}
              <DialogHeader>
                <DialogTitle>Tambah Jenis Infaq Baru</DialogTitle>
                <DialogDescription>
                  Masukkan kode dan nama untuk jenis infaq baru.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="kode-add" className="text-right">Kode Jenis</Label>
                  <Input id="kode-add" value={inputKode} onChange={(e) => setInputKode(e.target.value)} className="col-span-3" placeholder="Contoh: INF-00X"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nama-add" className="text-right">Nama Jenis</Label>
                  <Input id="nama-add" value={inputNama} onChange={(e) => setInputNama(e.target.value)} className="col-span-3" placeholder="Contoh: Infaq Pendidikan"/>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => { setIsAddDialogOpen(false); resetFormInputs(); }}>Batal</Button>
                <Button type="button" onClick={handleAddJenisInfaq} className="bg-green-600 hover:bg-green-700 text-white">Simpan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Table className="bg-white border rounded-xl shadow-sm">
        <TableCaption className="text-sm text-gray-500">
          Daftar Jenis Infaq {/* Caption disesuaikan */}
        </TableCaption>
        <TableHeader className="bg-green-100">
          <TableRow>
            <TableHead className="text-green-800 w-[30%]">Kode Jenis Infaq</TableHead>
            <TableHead className="text-green-800 w-[50%]">Nama Jenis Infaq</TableHead>
            <TableHead className="text-green-800 text-center w-[20%]">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <TableRow key={item.id} className="hover:bg-green-50">
                <TableCell className="text-gray-700">{item.kode}</TableCell>
                <TableCell className="text-gray-700">{item.nama}</TableCell>
                <TableCell className="flex justify-center gap-2 py-3">
                  <Dialog open={isEditDialogOpen && editingJenisInfaq?.id === item.id} onOpenChange={(open) => {
                    if (!open) {
                      setEditingJenisInfaq(null);
                      setIsEditDialogOpen(false);
                      resetFormInputs();
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-700 border-green-600 hover:bg-green-100 hover:text-green-800"
                        onClick={() => handleOpenEditDialog(item)}
                      >
                        <Pencil className="w-4 h-4 mr-1" /> Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Jenis Infaq</DialogTitle>
                        <DialogDescription>
                          Ubah kode atau nama untuk jenis infaq ini.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="kode-edit" className="text-right">Kode Jenis</Label>
                            <Input id="kode-edit" value={inputKode} onChange={(e) => setInputKode(e.target.value)} className="col-span-3"/>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nama-edit" className="text-right">Nama Jenis</Label>
                            <Input id="nama-edit" value={inputNama} onChange={(e) => setInputNama(e.target.value)} className="col-span-3"/>
                          </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => { setIsEditDialogOpen(false); setEditingJenisInfaq(null); resetFormInputs(); }}>Batal</Button>
                        <Button type="button" onClick={handleEditJenisInfaq} className="bg-green-600 hover:bg-green-700 text-white">Simpan Perubahan</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setJenisInfaqToDelete(item)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Hapus
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Anda yakin ingin menghapus?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini tidak dapat diurungkan. Ini akan menghapus data jenis infaq <span className="font-semibold">{jenisInfaqToDelete?.nama} ({jenisInfaqToDelete?.kode})</span> secara permanen.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setJenisInfaqToDelete(null)}>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={handleDeleteJenisInfaq}
                        >
                          Ya, Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-sm text-gray-500 h-24"> {/* colSpan disesuaikan menjadi 3 */}
                Tidak ada data jenis infaq. {/* Pesan disesuaikan */}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
