"use client";

import { useState } from "react";
import FormAcara from "@/components/role/event/FormAcara";
import { columns } from "@/components/role/event/table/columns";
import { DataTable } from "@/components/role/event/table/DataTable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function Page() {
  const [data, setData] = useState([
    { id: 1, kodeAcara: "KJSBH001", nama: "Kajian Subuh", deskripsi: "Kajian rutin setelah sholat subuh.", lokasi: "Ruang Utama Masjid", jenisAcara: "Keagamaan" },
    { id: 2, kodeAcara: "SHJMT001", nama: "Sholat Jumat", deskripsi: "Pelaksanaan sholat Jumat berjamaah.", lokasi: "Masjid Raya", jenisAcara: "Keagamaan" },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (event) => {
    if (event.id) {
      setData((prev) => prev.map((e) => (e.id === event.id ? event : e)));
    } else {
      setData((prev) => [...prev, { ...event, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setData((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Manajemen Acara</h1>
        <Button onClick={() => { setSelectedEvent(null); setShowForm(true); }}>
          <PlusCircle className="w-4 h-4 mr-2" /> Tambah Acara
        </Button>
      </div>

      <DataTable columns={columns({ onEdit: setSelectedEvent, onDelete: handleDelete, openForm: () => setShowForm(true) })} data={data} />

      {showForm && (
        <FormAcara
          initialData={selectedEvent}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { useState } from "react";
// import { PlusCircle, Trash2, Pencil, Search, X } from "lucide-react";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// export default function ManajemenAcaraPage() {
//   const [events, setEvents] = useState([
//     { id: 1, kodeAcara: "KJSBH001", nama: "Kajian Subuh", deskripsi: "Kajian rutin setelah sholat subuh.", lokasi: "Ruang Utama Masjid", jenisAcara: "Keagamaan" },
//     { id: 2, kodeAcara: "SHJMT001", nama: "Sholat Jumat", deskripsi: "Pelaksanaan sholat Jumat berjamaah.", lokasi: "Masjid Raya", jenisAcara: "Keagamaan" },
//     { id: 3, kodeAcara: "BIMBL001", nama: "Bimbingan Belajar Anak", deskripsi: "Program bimbingan belajar gratis.", lokasi: "Ruang Kelas TK Islam", jenisAcara: "Edukasi" },
//     { id: 4, kodeAcara: "DONOR001", nama: "Donor Darah Rutin", deskripsi: "Kerja sama dengan PMI untuk .", lokasi: "Area Serbaguna", jenisAcara: "Sosial" },
//   ]);

//   const [showForm, setShowForm] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentEventId, setCurrentEventId] = useState(null);

//   const [kodeAcara, setKodeAcara] = useState("");
//   const [nama, setNama] = useState("");
//   const [deskripsi, setDeskripsi] = useState("");
//   const [lokasi, setLokasi] = useState("");
//   const [jenisAcara, setJenisAcara] = useState("");

//   const [searchQuery, setSearchQuery] = useState("");

//   const resetForm = () => {
//     setKodeAcara("");
//     setNama("");
//     setDeskripsi("");
//     setLokasi("");
//     setJenisAcara("");
//     setIsEditing(false);
//     setCurrentEventId(null);
//     setShowForm(false);
//   };

//   const handleSaveAcara = () => {
//     if (!kodeAcara || !nama || !deskripsi || !lokasi || !jenisAcara) {
//       alert("Harap lengkapi semua kolom.");
//       return;
//     }
//     const newOrUpdatedEvent = {
//       id: isEditing ? currentEventId : Date.now(),
//       kodeAcara,
//       nama,
//       deskripsi,
//       lokasi,
//       jenisAcara,
//     };
//     if (isEditing) {
//       setEvents(events.map(event =>
//         event.id === currentEventId
//           ? newOrUpdatedEvent
//           : event
//       ));
//     } else {
//       setEvents([...events, newOrUpdatedEvent]);
//     }
//     resetForm();
//   };

//   const hapusAcara = (id) => {
//     if (confirm("Apakah Anda yakin ingin menghapus acara ini?")) {
//       setEvents(events.filter((e) => e.id !== id));
//     }
//   };

//   const mulaiEditAcara = (eventToEdit) => {
//     setKodeAcara(eventToEdit.kodeAcara);
//     setNama(eventToEdit.nama);
//     setDeskripsi(eventToEdit.deskripsi);
//     setLokasi(eventToEdit.lokasi);
//     setJenisAcara(eventToEdit.jenisAcara);
//     setIsEditing(true);
//     setCurrentEventId(eventToEdit.id);
//     setShowForm(true);
//   };

//   const filteredEvents = events.filter(event =>
//     event.kodeAcara.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     event.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     event.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     event.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     event.jenisAcara.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="w-full space-y-6">
//       <Card className="rounded-lg shadow-sm">
//         <CardHeader className="bg-green-100 p-4 rounded-t-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <CardTitle className="text-xl font-semibold text-green-800">Manajemen Acara</CardTitle>
//           <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
//             <div className="relative w-full sm:w-[240px]">
//               <Input
//                 placeholder="Cari acara..."
//                 className="pl-8 bg-white"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
//             </div>
//             <Button onClick={() => { setIsEditing(false); setShowForm(true);}} className="flex gap-1 items-center bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
//               <PlusCircle className="w-4 h-4" /> Tambah Data
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent className="p-0 sm:p-6">
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader className="bg-green-50">
//                 {/* INI YANG DIUBAH: Baris TableRow dibuat sangat kompak */}
//                 <TableRow>
//                   <TableHead className="w-[120px] text-green-800 font-semibold">Kode Acara</TableHead>
//                   <TableHead className="text-green-800 font-semibold">Nama</TableHead>
//                   <TableHead className="text-green-800 font-semibold">Deskripsi</TableHead>
//                   <TableHead className="text-green-800 font-semibold">Lokasi</TableHead>
//                   <TableHead className="text-green-800 font-semibold">Jenis Acara</TableHead>
//                   <TableHead className="text-center w-[180px] text-green-800 font-semibold">Aksi</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredEvents.length > 0 ? (
//                   filteredEvents.map((event) => (
//                     // INI YANG DIUBAH: Baris TableRow dibuat sangat kompak
//                     <TableRow key={event.id} className="hover:bg-green-50">
//                       <TableCell className="font-medium">{event.kodeAcara}</TableCell>
//                       <TableCell>{event.nama}</TableCell>
//                       <TableCell className="max-w-[250px] truncate">{event.deskripsi}</TableCell>
//                       <TableCell>{event.lokasi}</TableCell>
//                       <TableCell>{event.jenisAcara}</TableCell>
//                       <TableCell className="text-center">
//                         <div className="flex justify-center items-center gap-2">
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="flex items-center gap-1 border-green-500 text-gray-700 hover:bg-green-50 hover:text-green-600 focus-visible:ring-green-400"
//                             onClick={() => mulaiEditAcara(event)}
//                           >
//                             <Pencil className="w-4 h-4 text-green-600" /> Edit
//                           </Button>
//                           <Button
//                             size="sm"
//                             className="flex items-center gap-1 bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-400"
//                             onClick={() => hapusAcara(event.id)}
//                           >
//                             <Trash2 className="w-4 h-4" /> Hapus
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   // INI YANG DIUBAH: Baris TableRow dibuat sangat kompak
//                   <TableRow>
//                     <TableCell colSpan={6} className="text-center text-gray-500 py-4">
//                       Tidak ada data acara.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//           <div className="text-center text-gray-500 text-sm mt-4 pb-4 sm:pb-0">Daftar acara</div>
//         </CardContent>
//       </Card>

//       {showForm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
//           <Card className="w-full max-w-lg bg-white rounded-lg shadow-xl">
//             <CardHeader className="p-4 border-b">
//               <CardTitle className="text-lg font-semibold flex justify-between items-center">
//                 {isEditing ? "Edit Acara" : "Tambah Acara Baru"}
//                 <Button variant="ghost" size="icon" onClick={resetForm} className="text-gray-500 hover:text-gray-800">
//                   <X className="w-5 h-5" />
//                 </Button>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="p-4 sm:p-6 space-y-4">
//               <Input
//                 placeholder="Kode Acara"
//                 value={kodeAcara}
//                 onChange={(e) => setKodeAcara(e.target.value)}
//                 className="border-gray-300 focus:border-green-500"
//               />
//               <Input
//                 placeholder="Nama Acara"
//                 value={nama}
//                 onChange={(e) => setNama(e.target.value)}
//                 className="border-gray-300 focus:border-green-500"
//               />
//               <Textarea
//                 placeholder="Deskripsi Acara"
//                 value={deskripsi}
//                 onChange={(e) => setDeskripsi(e.target.value)}
//                 rows={3}
//                 className="border-gray-300 focus:border-green-500"
//               />
//               <Input
//                 placeholder="Lokasi Acara"
//                 value={lokasi}
//                 onChange={(e) => setLokasi(e.target.value)}
//                 className="border-gray-300 focus:border-green-500"
//               />
//               <Select onValueChange={setJenisAcara} value={jenisAcara}>
//                 <SelectTrigger className="border-gray-300 focus:border-green-500">
//                   <SelectValue placeholder="Pilih Jenis Acara" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Keagamaan">Keagamaan</SelectItem>
//                   <SelectItem value="Sosial">Sosial</SelectItem>
//                   <SelectItem value="Edukasi">Edukasi</SelectItem>
//                   <SelectItem value="Penggalangan Dana">Penggalangan Dana</SelectItem>
//                 </SelectContent>
//               </Select>
//               <div className="mt-6 flex justify-end gap-3">
//                 <Button variant="outline" onClick={resetForm} className="border-gray-300 text-gray-700 hover:bg-gray-50">Batal</Button>
//                 <Button onClick={handleSaveAcara} className="bg-green-600 hover:bg-green-700 text-white">
//                   {isEditing ? "Simpan Perubahan" : "Tambah Acara"}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// }