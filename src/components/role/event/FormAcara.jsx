"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function FormAcara({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState({
    id: null,
    kodeAcara: "",
    nama: "",
    deskripsi: "",
    lokasi: "",
    jenisAcara: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-md shadow-md p-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">{form.id ? "Edit Acara" : "Tambah Acara"}</h2>

        <div className="space-y-3">
          <Input placeholder="Kode Acara" name="kodeAcara" value={form.kodeAcara} onChange={handleChange} />
          <Input placeholder="Nama Acara" name="nama" value={form.nama} onChange={handleChange} />
          <Textarea placeholder="Deskripsi" name="deskripsi" value={form.deskripsi} onChange={handleChange} />
          <Input placeholder="Lokasi" name="lokasi" value={form.lokasi} onChange={handleChange} />
          <Select value={form.jenisAcara} onValueChange={(val) => setForm({ ...form, jenisAcara: val })}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih Jenis Acara" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Keagamaan">Keagamaan</SelectItem>
              <SelectItem value="Sosial">Sosial</SelectItem>
              <SelectItem value="Edukasi">Edukasi</SelectItem>
              <SelectItem value="Penggalangan Dana">Penggalangan Dana</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>Batal</Button>
          <Button onClick={() => onSave(form)}>{form.id ? "Simpan" : "Tambah"}</Button>
        </div>
      </div>
    </div>
  );
}