"use client"

import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableCaption } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Pencil, Trash2, Search, X } from "lucide-react"

export default function ManajemenFasilitasPage() {
  // State untuk daftar fasilitas
  const [facilities, setFacilities] = useState([
    {
      id: 1,
      kodeFasilitas: "FAS-AULA-001",
      nama: "Aula Utama",
      tipe: "Gedung",
      deskripsi: "Aula serbaguna untuk berbagai acara seperti pernikahan, seminar, dan pengajian akbar.",
      kapasitas: 500,
      hargaHarian: 1500000,
      status: "Tersedia",
    },
    {
      id: 2,
      kodeFasilitas: "FAS-RMR-001",
      nama: "Ruang Rapat Cendekia",
      tipe: "Ruangan",
      deskripsi: "Ruangan nyaman dilengkapi proyektor dan AC, cocok untuk rapat kecil dan diskusi.",
      kapasitas: 20,
      hargaHarian: 300000,
      status: "Tersedia",
    },
    {
      id: 3,
      kodeFasilitas: "FAS-LPN-001",
      nama: "Lapangan Basket/Futsal",
      tipe: "Lapangan",
      deskripsi: "Lapangan outdoor serbaguna untuk olahraga basket dan futsal.",
      kapasitas: 30,
      hargaHarian: 500000,
      status: "Tidak Tersedia",
    },
  ])

  // State untuk input form
  const [kodeFasilitas, setKodeFasilitas] = useState("")
  const [nama, setNama] = useState("")
  const [tipe, setTipe] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [kapasitas, setKapasitas] = useState("")
  const [hargaHarian, setHargaHarian] = useState("")
  const [status, setStatus] = useState("")

  // State untuk kontrol UI
  const [showForm, setShowForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentFacilityId, setCurrentFacilityId] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Fungsi untuk mereset semua input form
  const resetForm = () => {
    setKodeFasilitas("")
    setNama("")
    setTipe("")
    setDeskripsi("")
    setKapasitas("")
    setHargaHarian("")
    setStatus("")
    setIsEditing(false)
    setCurrentFacilityId(null)
    setShowForm(false) // Sembunyikan form setelah reset
  }

  // Fungsi untuk menangani penambahan/pembaruan fasilitas
  const handleSaveFacility = () => {
    // Validasi sederhana
    if (!kodeFasilitas || !nama || !tipe || !deskripsi || !kapasitas || !hargaHarian || !status) {
      alert("Harap lengkapi semua kolom.")
      return
    }

    const newOrUpdatedFacility = {
      id: isEditing ? currentFacilityId : Date.now(),
      kodeFasilitas,
      nama,
      tipe,
      deskripsi,
      kapasitas: parseInt(kapasitas), // Konversi ke number
      hargaHarian: parseFloat(hargaHarian), // Konversi ke number
      status,
    }

    if (isEditing) {
      setFacilities(facilities.map(fac =>
        fac.id === currentFacilityId ? newOrUpdatedFacility : fac
      ))
    } else {
      setFacilities([...facilities, newOrUpdatedFacility])
    }
    resetForm()
  }

  // Fungsi untuk menghapus fasilitas
  const hapusFasilitas = (id) => {
    setFacilities(facilities.filter(fac => fac.id !== id))
  }

  // Fungsi untuk memulai mode edit
  const mulaiEditFasilitas = (facilityToEdit) => {
    setKodeFasilitas(facilityToEdit.kodeFasilitas)
    setNama(facilityToEdit.nama)
    setTipe(facilityToEdit.tipe)
    setDeskripsi(facilityToEdit.deskripsi)
    setKapasitas(facilityToEdit.kapasitas.toString()) // Konversi ke string untuk input
    setHargaHarian(facilityToEdit.hargaHarian.toString()) // Konversi ke string untuk input
    setStatus(facilityToEdit.status)

    setIsEditing(true)
    setCurrentFacilityId(facilityToEdit.id)
    setShowForm(true) // Tampilkan form saat mode edit
  }

  // Filter fasilitas berdasarkan search query
  const filteredFacilities = facilities.filter(fac =>
    fac.kodeFasilitas.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fac.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fac.tipe.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fac.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-6">
      {/* Kartu Daftar Fasilitas */}
      <Card className="rounded-lg shadow-sm">
        <CardHeader className="bg-green-100 p-4 rounded-t-lg flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold text-green-800">Manajemen Fasilitas Masjid</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Input
                placeholder="Cari fasilitas..."
                className="pl-8 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <Button onClick={() => setShowForm(true)} className="flex gap-1 items-center bg-green-600 hover:bg-green-700 text-white">
              <PlusCircle className="w-4 h-4" /> Tambah Data
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Table className="bg-white border rounded-xl shadow-sm">
            {/* Pindahkan TableCaption ke sini, sebagai anak langsung dari Table */}
            <TableCaption className="text-center text-gray-500 text-sm mt-4">Daftar fasilitas</TableCaption>
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead className="w-[120px] text-green-800 font-semibold">Kode Fasilitas</TableHead>
                <TableHead className="text-green-800 font-semibold">Nama</TableHead>
                <TableHead className="text-green-800 font-semibold">Tipe Fasilitas</TableHead>
                <TableHead className="text-green-800 font-semibold">Deskripsi</TableHead>
                <TableHead className="text-green-800 font-semibold">Kapasitas</TableHead>
                <TableHead className="text-green-800 font-semibold">Harga/Hari</TableHead>
                <TableHead className="text-green-800 font-semibold">Status</TableHead>
                <TableHead className="text-right text-green-800 font-semibold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFacilities.length > 0 ? (
                filteredFacilities.map((fac) => (
                  <TableRow key={fac.id} className="hover:bg-green-50">
                    <TableCell className="font-medium">{fac.kodeFasilitas}</TableCell>
                    <TableCell>{fac.nama}</TableCell>
                    <TableCell>{fac.tipe}</TableCell>
                    <TableCell className="max-w-[180px] truncate">{fac.deskripsi}</TableCell>
                    <TableCell>{fac.kapasitas}</TableCell>
                    <TableCell>Rp {fac.hargaHarian.toLocaleString('id-ID')}</TableCell>
                    <TableCell>{fac.status}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" className="flex gap-1 items-center border-green-500 text-green-600 hover:bg-green-100" onClick={() => mulaiEditFasilitas(fac)}>
                        <Pencil className="w-4 h-4" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex gap-1 items-center border-red-500 text-red-600 hover:bg-red-50" onClick={() => hapusFasilitas(fac.id)}>
                        <Trash2 className="w-4 h-4" /> Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500 py-4">
                    Tidak ada data fasilitas.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Form Tambah/Edit Fasilitas (hanya tampil jika showForm true) */}
      {showForm && (
        <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <CardContent className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <CardTitle className="text-xl font-semibold mb-4 flex justify-between items-center">
              {isEditing ? "Edit Fasilitas Masjid" : "Tambah Fasilitas Baru"}
              <Button variant="ghost" size="icon" onClick={resetForm} className="text-gray-500 hover:text-gray-800">
                <X className="w-5 h-5" />
              </Button>
            </CardTitle>
            <div className="space-y-4">
              <Input
                placeholder="Kode Fasilitas"
                value={kodeFasilitas}
                onChange={(e) => setKodeFasilitas(e.target.value)}
              />
              <Input
                placeholder="Nama Fasilitas"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
              <Select onValueChange={setTipe} value={tipe}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Tipe Fasilitas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ruangan">Ruangan</SelectItem>
                  <SelectItem value="Gedung">Gedung</SelectItem>
                  <SelectItem value="Lapangan">Lapangan</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Kapasitas (Angka)"
                type="number"
                value={kapasitas}
                onChange={(e) => setKapasitas(e.target.value)}
              />
              <Input
                placeholder="Harga Harian (Rp)"
                type="number"
                value={hargaHarian}
                onChange={(e) => setHargaHarian(e.target.value)}
              />
              <Select onValueChange={setStatus} value={status}>
                <SelectTrigger>
                  <SelectValue placeholder="Status Fasilitas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tersedia">Tersedia</SelectItem>
                  <SelectItem value="Tidak Tersedia">Tidak Tersedia</SelectItem>
                  <SelectItem value="Dalam Perbaikan">Dalam Perbaikan</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Deskripsi Fasilitas"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={resetForm}>Batal</Button>
              <Button onClick={handleSaveFacility} className="bg-green-600 hover:bg-green-700 text-white">
                {isEditing ? "Simpan Perubahan" : "Simpan Fasilitas"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}