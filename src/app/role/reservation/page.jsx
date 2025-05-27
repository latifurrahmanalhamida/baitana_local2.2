"use client"

import { useState, useEffect } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, Trash2, Search, X, Upload, FileUp } from "lucide-react"

export default function ManajemenReservasiPage() {
  const [reservasi, setReservasi] = useState([
    {
      id: 1,
      kodeReservasi: "RSV-001",
      fasilitas: "Aula Utama",
      tanggalMulai: "2024-06-01",
      tanggalSelesai: "2024-06-01",
      jamMulai: "08:00",
      jamSelesai: "12:00",
      status: "Di Setujui",
      jumlah: 500000,
      note: "Acara pernikahan",
      namaLengkap: "Budi Santoso",
      noTelepon: "081234567890",
      email: "budi.santoso@example.com",
      buktiPembayaran: "https://via.placeholder.com/150/A7F3D0/047857?text=Bukti1",
    },
    {
      id: 2,
      kodeReservasi: "RSV-002",
      fasilitas: "Ruang Rapat Cendekia",
      tanggalMulai: "2024-06-05",
      tanggalSelesai: "2024-06-05",
      jamMulai: "13:00",
      jamSelesai: "17:00",
      status: "Menunggu",
      jumlah: 150000,
      note: "Rapat pengurus DKM",
      namaLengkap: "Siti Aminah",
      noTelepon: "087654321098",
      email: "siti.aminah@example.com",
      buktiPembayaran: "https://via.placeholder.com/150/A7F3D0/047857?text=Bukti2",
    },
    {
      id: 3,
      kodeReservasi: "RSV-003",
      fasilitas: "Lapangan Basket/Futsal",
      tanggalMulai: "2024-06-10",
      tanggalSelesai: "2024-06-10",
      jamMulai: "19:00",
      jamSelesai: "21:00",
      status: "Ditolak",
      jumlah: 250000,
      note: "Latihan futsal, bentrok jadwal",
      namaLengkap: "Ahmad Fauzi",
      noTelepon: "085000111222",
      email: "ahmad.fauzi@example.com",
      buktiPembayaran: "https://via.placeholder.com/150/A7F3D0/047857?text=Bukti3",
    },
    {
      id: 4,
      kodeReservasi: "RSV-004",
      fasilitas: "Aula Utama",
      tanggalMulai: "2024-05-20",
      tanggalSelesai: "2024-05-20",
      jamMulai: "09:00",
      jamSelesai: "15:00",
      status: "Selesai",
      jumlah: 600000,
      note: "Acara pengajian akbar",
      namaLengkap: "Dewi Lestari",
      noTelepon: "081122334455",
      email: "dewi.lestari@example.com",
      buktiPembayaran: "https://via.placeholder.com/150/A7F3D0/047857?text=Bukti4",
    },
  ]);

  const [kodeReservasi, setKodeReservasi] = useState("");
  const [fasilitas, setFasilitas] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [status, setStatus] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [note, setNote] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [buktiPembayaranPreviewUrl, setBuktiPembayaranPreviewUrl] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReservasiId, setCurrentReservasiId] = useState(null);

  const daftarFasilitas = [
    "Aula Utama",
    "Ruang Rapat Cendekia",
    "Lapangan Basket/Futsal",
    "Perpustakaan Masjid",
  ];

  useEffect(() => {
    return () => {
      if (buktiPembayaranPreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(buktiPembayaranPreviewUrl);
      }
    };
  }, [buktiPembayaranPreviewUrl]);

  const resetForm = () => {
    setKodeReservasi("");
    setFasilitas("");
    setTanggalMulai("");
    setTanggalSelesai("");
    setJamMulai("");
    setJamSelesai("");
    setStatus(""); // Pastikan status juga direset
    setJumlah("");
    setNote("");
    setNamaLengkap("");
    setNoTelepon("");
    setEmail("");
    setSelectedFile(null);
    setBuktiPembayaranPreviewUrl("");
    setIsEditing(false);
    setCurrentReservasiId(null);
    setShowForm(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setBuktiPembayaranPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setBuktiPembayaranPreviewUrl("");
    }
  };

  const handleSaveReservasi = async () => {
    // Validasi status hanya jika dalam mode editing
    if (!kodeReservasi || !fasilitas || !tanggalMulai || !tanggalSelesai || !jamMulai || !jamSelesai || !jumlah || !namaLengkap || !noTelepon || !email) {
      alert("Harap lengkapi semua kolom wajib.");
      return;
    }
    // Tambahkan validasi status jika isEditing
    if (isEditing && !status) {
        alert("Harap pilih status reservasi.");
        return;
    }


    let finalBuktiPembayaranUrl = buktiPembayaranPreviewUrl;

    if (selectedFile) {
      console.warn("Simulasi: File akan diunggah. Dalam aplikasi nyata, ini akan dikirim ke backend dan mengembalikan URL.");
      finalBuktiPembayaranUrl = `https://via.placeholder.com/150/A7F3D0/047857?text=Uploaded!`;
    } else if (isEditing && currentReservasiId) {
        const existingReservasi = reservasi.find(item => item.id === currentReservasiId);
        if (existingReservasi) {
            finalBuktiPembayaranUrl = existingReservasi.buktiPembayaran;
        }
    } else {
        finalBuktiPembayaranUrl = "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=No+Bukti";
    }

    const newOrUpdatedReservasi = {
      id: isEditing ? currentReservasiId : Date.now(),
      kodeReservasi,
      fasilitas,
      tanggalMulai,
      tanggalSelesai,
      jamMulai,
      jamSelesai,
      status: isEditing ? status : "Menunggu", // Set status default 'Menunggu' jika bukan edit
      jumlah: parseFloat(jumlah),
      note,
      namaLengkap,
      noTelepon,
      email,
      buktiPembayaran: finalBuktiPembayaranUrl,
    };

    if (isEditing) {
      setReservasi(reservasi.map(item =>
        item.id === currentReservasiId ? newOrUpdatedReservasi : item
      ));
    } else {
      setReservasi([...reservasi, newOrUpdatedReservasi]);
    }
    resetForm();
  };

  const hapusReservasi = (id) => {
    setReservasi(reservasi.filter(item => item.id !== id));
  };

  const mulaiEditReservasi = (reservasiToEdit) => {
    setKodeReservasi(reservasiToEdit.kodeReservasi);
    setFasilitas(reservasiToEdit.fasilitas);
    setTanggalMulai(reservasiToEdit.tanggalMulai);
    setTanggalSelesai(reservasiToEdit.tanggalSelesai);
    setJamMulai(reservasiToEdit.jamMulai);
    setJamSelesai(reservasiToEdit.jamSelesai);
    setStatus(reservasiToEdit.status); // Set status saat edit
    setJumlah(reservasiToEdit.jumlah.toString());
    setNote(reservasiToEdit.note);
    setNamaLengkap(reservasiToEdit.namaLengkap);
    setNoTelepon(reservasiToEdit.noTelepon);
    setEmail(reservasiToEdit.email);
    setBuktiPembayaranPreviewUrl(reservasiToEdit.buktiPembayaran);
    setSelectedFile(null);

    setIsEditing(true);
    setCurrentReservasiId(reservasiToEdit.id);
    setShowForm(true);
  };

  const filteredReservasi = reservasi.filter(item =>
    item.kodeReservasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.fasilitas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.noTelepon.includes(searchTerm)
  );

  return (
    <div className="w-full max-w-7xl mx-auto mt-8 space-y-6">
      <Card className="rounded-lg shadow-sm">
        <CardHeader className="bg-green-100 p-4 rounded-t-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-semibold text-green-800">Manajemen Reservasi Masjid</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-[240px]">
              <Input
                placeholder="Cari reservasi..."
                className="pl-8 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <Button onClick={() => setShowForm(true)} className="flex gap-1 items-center bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
              <Plus className="w-4 h-4" /> Tambah Reservasi
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Table className="bg-white border rounded-xl shadow-sm">
            <TableCaption className="text-center text-gray-500 text-sm mt-4">Daftar reservasi fasilitas masjid</TableCaption>
            <TableHeader className="bg-green-50">
              <TableRow>
                <TableHead className="text-green-800 w-[120px]">Kode RSV</TableHead>
                <TableHead className="text-green-800">Fasilitas</TableHead>
                <TableHead className="text-green-800">Tgl. Mulai</TableHead>
                <TableHead className="text-green-800">Tgl. Selesai</TableHead>
                <TableHead className="text-green-800">Jam Mulai</TableHead>
                <TableHead className="text-green-800">Jam Selesai</TableHead>
                <TableHead className="text-green-800">Jumlah</TableHead>
                <TableHead className="text-green-800">Status</TableHead>
                <TableHead className="text-green-800">Nama</TableHead>
                <TableHead className="text-green-800">No. Telp</TableHead>
                <TableHead className="text-green-800">Email</TableHead>
                <TableHead className="text-center text-green-800">Bukti</TableHead>
                <TableHead className="text-center w-[120px] text-green-800">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservasi.length > 0 ? (
                filteredReservasi.map((item) => (
                  <TableRow key={item.id} className="hover:bg-green-50">
                    <TableCell className="font-medium">{item.kodeReservasi}</TableCell>
                    <TableCell>{item.fasilitas}</TableCell>
                    <TableCell>{item.tanggalMulai}</TableCell>
                    <TableCell>{item.tanggalSelesai}</TableCell>
                    <TableCell>{item.jamMulai}</TableCell>
                    <TableCell>{item.jamSelesai}</TableCell>
                    <TableCell>Rp {item.jumlah.toLocaleString('id-ID')}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${item.status === "Di Setujui" ? "bg-green-100 text-green-800" :
                          item.status === "Menunggu" ? "bg-yellow-100 text-yellow-800" :
                          item.status === "Ditolak" ? "bg-red-100 text-red-800" :
                          item.status === "Selesai" ? "bg-blue-100 text-blue-800" :
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>{item.namaLengkap}</TableCell>
                    <TableCell>{item.noTelepon}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell className="flex justify-center">
                      {item.buktiPembayaran && item.buktiPembayaran !== "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=No+Bukti" ? (
                        <a href={item.buktiPembayaran} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                          <img src={item.buktiPembayaran} alt="Bukti" className="w-8 h-8 object-cover rounded-md" />
                        </a>
                      ) : (
                        <div className="text-gray-500 text-xs flex items-center justify-center w-8 h-8">N/A</div>
                      )}
                    </TableCell>
                    <TableCell className="flex justify-center gap-2">
                      <Button variant="outline" size="sm" className="flex gap-1 items-center border-green-500 text-green-600 hover:bg-green-100" onClick={() => mulaiEditReservasi(item)}>
                        <Pencil className="w-4 h-4" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex gap-1 items-center border-red-500 text-red-600 hover:bg-red-50" onClick={() => hapusReservasi(item.id)}>
                        <Trash2 className="w-4 h-4" /> Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={13} className="text-center text-gray-500 py-4">
                    Tidak ada data reservasi yang cocok.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showForm && (
        <Card className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <CardContent className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative overflow-y-auto max-h-[90vh]">
            <CardTitle className="text-xl font-semibold mb-4 flex justify-between items-center">
              {isEditing ? "Edit Reservasi" : "Tambah Reservasi Baru"}
              <Button variant="ghost" size="icon" onClick={resetForm} className="text-gray-500 hover:text-gray-800">
                <X className="w-5 h-5" />
              </Button>
            </CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Detail Reservasi</h3>
                <Input
                  placeholder="Kode Reservasi (misal: RSV-001)"
                  value={kodeReservasi}
                  onChange={(e) => setKodeReservasi(e.target.value)}
                />
                <Select onValueChange={setFasilitas} value={fasilitas}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Fasilitas" />
                  </SelectTrigger>
                  <SelectContent>
                    {daftarFasilitas.map((f, index) => (
                      <SelectItem key={index} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-[140px]">
                    <label htmlFor="tanggalMulai" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                    <Input
                      id="tanggalMulai"
                      type="date"
                      value={tanggalMulai}
                      onChange={(e) => setTanggalMulai(e.target.value)}
                    />                
                  </div>
                  <div className="w-[140px]">
                    <label htmlFor="tanggalSelesai" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai</label>
                    <Input
                      id="tanggalSelesai"
                      type="date"
                      value={tanggalSelesai}
                      onChange={(e) => setTanggalSelesai(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-[80px]">
                    <label htmlFor="jamMulai" className="block text-sm font-medium text-gray-700 mb-1">Jam Mulai</label>
                    <Input
                      id="jamMulai"
                      type="time"
                      value={jamMulai}
                      onChange={(e) => setJamMulai(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-[80px]">
                    <label htmlFor="jamSelesai" className="block text-sm font-medium text-gray-700 mb-1">Jam Selesai</label>
                    <Input
                      id="jamSelesai"
                      type="time"
                      value={jamSelesai}
                      onChange={(e) => setJamSelesai(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                {/* KONDISI UNTUK MENAMPILKAN SELECT STATUS */}
                {isEditing && ( // Hanya render jika isEditing true
                  <Select onValueChange={setStatus} value={status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Menunggu">Menunggu</SelectItem>
                      <SelectItem value="Di Setujui">Di Setujui</SelectItem>
                      <SelectItem value="Ditolak">Ditolak</SelectItem>
                      <SelectItem value="Selesai">Selesai</SelectItem>
                    </SelectContent>
                  </Select>
                )}
                {/* AKHIR KONDISI UNTUK MENAMPILKAN SELECT STATUS */}
                <div>
                    <label htmlFor="jumlah" className="block text-sm font-medium text-gray-700 mb-1">Jumlah (Rp) *Tambahkan ke Saldo Infaq</label>
                    <Input
                        id="jumlah"
                        type="number"
                        placeholder="Jumlah (Rp)"
                        value={jumlah}
                        onChange={(e) => setJumlah(e.target.value)}
                    />
                </div>
                <Textarea
                  placeholder="Catatan/Note Reservasi"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Data Pemesan</h3>
                <Input
                  placeholder="Nama Lengkap Pemesan"
                  value={namaLengkap}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                />
                <Input
                  placeholder="Nomor Telepon"
                  type="tel"
                  value={noTelepon}
                  onChange={(e) => setNoTelepon(e.target.value)}
                />
                <Input
                  placeholder="Email Pemesan"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div>
                  <label htmlFor="buktiPembayaranFile" className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Bukti Pembayaran
                  </label>
                  <Input
                    id="buktiPembayaranFile"
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="file:text-green-600 file:bg-green-50 file:border-green-200 file:rounded-md file:py-1 file:px-2 file:mr-2 file:cursor-pointer"
                  />
                  {buktiPembayaranPreviewUrl && (
                    <div className="mt-4 text-center p-2 border border-gray-200 rounded-md bg-gray-50">
                      {buktiPembayaranPreviewUrl.startsWith("blob:") ||
                       buktiPembayaranPreviewUrl.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                        <>
                          <img src={buktiPembayaranPreviewUrl} alt="Preview Bukti Pembayaran" className="max-w-[150px] max-h-[150px] object-contain mx-auto rounded-md border" />
                          <p className="text-xs text-gray-500 mt-1">Preview Gambar</p>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                          <FileUp className="w-12 h-12 text-green-500" />
                          <p className="text-sm text-gray-600 mt-2">File Terpilih:</p>
                          <p className="text-xs text-gray-500 break-all">{selectedFile ? selectedFile.name : buktiPembayaranPreviewUrl.substring(buktiPembayaranPreviewUrl.lastIndexOf('/') + 1)}</p>
                          <a href={buktiPembayaranPreviewUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-sm mt-1">Lihat File</a>
                        </div>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => { setSelectedFile(null); setBuktiPembayaranPreviewUrl(""); }} className="mt-2 text-red-500 hover:text-red-700">
                        <X className="w-4 h-4 mr-1" /> Hapus File
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={resetForm}>Batal</Button>
              <Button onClick={handleSaveReservasi} className="bg-green-600 hover:bg-green-700 text-white">
                {isEditing ? "Simpan Perubahan" : "Simpan Reservasi"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

