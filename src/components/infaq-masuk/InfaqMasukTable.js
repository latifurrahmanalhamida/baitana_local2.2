"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  Plus,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export function InfaqMasukTable({
  data,
  isLoading,
  openAddModal,
  openEditModal,
  openDeleteAlert,
  fetchData,
  searchQuery,
  handleSearch,
}) {
  const [sortField, setSortField] = useState("kodeTransaksi");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  useEffect(() => {
    handleSort(sortField, sortDirection);
  }, [data]);

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (field, direction = null) => {
    const newDirection =
      direction ||
      (field === sortField && sortDirection === "asc" ? "desc" : "asc");
    setSortField(field);
    setSortDirection(newDirection);

    const sorted = [...data].sort((a, b) => {
      const aValue = a[field]?.toString().toLowerCase();
      const bValue = b[field]?.toString().toLowerCase();
      return newDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
    setSortedData(sorted);
  };

  const SortIndicator = ({ field }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ArrowUp size={14} className="ml-1 text-[#2C3E9E]" />
    ) : (
      <ArrowDown size={14} className="ml-1 text-[#2C3E9E]" />
    );
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const maxVisible = 3;
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, start + maxVisible - 1);
    const hasStartEllipsis = start > 1;
    const hasEndEllipsis = end < totalPages;

    return (
      <Pagination>
        <PaginationContent>
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft size={18} />
          </button>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            />
          </PaginationItem>
          {hasStartEllipsis && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(1)}>
                  1
                </PaginationLink>
              </PaginationItem>
              {start > 2 && <PaginationEllipsis />}
            </>
          )}
          {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
            (page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          {hasEndEllipsis && (
            <>
              {totalPages - end > 1 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
            />
          </PaginationItem>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight size={17} />
          </button>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Input
              placeholder="Cari pemasukan infaq..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="max-w-2xl"
            />
            <Button onClick={openAddModal}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Pemasukan
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10 text-center">#</TableHead>
                  <TableHead
                    onClick={() => handleSort("kodeTransaksi")}
                    className="cursor-pointer"
                  >
                    Kode Transaksi <SortIndicator field="kodeTransaksi" />
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("jenisInfaqNama")}
                    className="cursor-pointer"
                  >
                    Jenis Infaq <SortIndicator field="jenisInfaqNama" />
                  </TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : currentData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      Tidak ada data pemasukan infaq
                    </TableCell>
                  </TableRow>
                ) : (
                  currentData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">
                        {indexOfFirstItem + index + 1}
                      </TableCell>
                      <TableCell>{item.kodeTransaksi}</TableCell>
                      <TableCell>{item.jenisInfaqNama}</TableCell>
                      <TableCell>{item.jumlah}</TableCell>
                      <TableCell>{item.note}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => openEditModal(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500"
                            onClick={() => openDeleteAlert(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 gap-3 border-t">
            <div className="text-xs text-gray-500">
              Menampilkan {indexOfFirstItem + 1} -{" "}
              {Math.min(indexOfLastItem, totalItems)} dari {totalItems} data
              <div className="ml-4 inline-flex items-center">
                <span className="mr-2">Per halaman:</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="h-7 w-16 text-xs">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="self-end sm:self-auto">{renderPagination()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  Plus,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export function InfaqMasukTable({
  data,
  isLoading,
  openAddModal,
  openEditModal,
  openDeleteAlert,
  fetchData,
  searchQuery,
  handleSearch,
}) {
  const [sortField, setSortField] = useState("kodeTransaksi");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  useEffect(() => {
    handleSort(sortField, sortDirection);
  }, [data]);

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (field, direction = null) => {
    const newDirection =
      direction ||
      (field === sortField && sortDirection === "asc" ? "desc" : "asc");
    setSortField(field);
    setSortDirection(newDirection);

    const sorted = [...data].sort((a, b) => {
      const aValue = a[field]?.toString().toLowerCase();
      const bValue = b[field]?.toString().toLowerCase();
      return newDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
    setSortedData(sorted);
  };

  const SortIndicator = ({ field }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ArrowUp size={14} className="ml-1 text-[#2C3E9E]" />
    ) : (
      <ArrowDown size={14} className="ml-1 text-[#2C3E9E]" />
    );
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const maxVisible = 3;
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, start + maxVisible - 1);
    const hasStartEllipsis = start > 1;
    const hasEndEllipsis = end < totalPages;

    return (
      <Pagination>
        <PaginationContent>
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft size={18} />
          </button>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            />
          </PaginationItem>
          {hasStartEllipsis && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(1)}>
                  1
                </PaginationLink>
              </PaginationItem>
              {start > 2 && <PaginationEllipsis />}
            </>
          )}
          {Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
            (page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          {hasEndEllipsis && (
            <>
              {totalPages - end > 1 && <PaginationEllipsis />}
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
            />
          </PaginationItem>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight size={17} />
          </button>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Input
              placeholder="Cari pemasukan infaq..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="max-w-2xl"
            />
            <Button onClick={openAddModal}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Pemasukan
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10 text-center">#</TableHead>
                  <TableHead
                    onClick={() => handleSort("kodeTransaksi")}
                    className="cursor-pointer"
                  >
                    Kode Transaksi <SortIndicator field="kodeTransaksi" />
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("jenisInfaqNama")}
                    className="cursor-pointer"
                  >
                    Jenis Infaq <SortIndicator field="jenisInfaqNama" />
                  </TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : currentData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      Tidak ada data pemasukan infaq
                    </TableCell>
                  </TableRow>
                ) : (
                  currentData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">
                        {indexOfFirstItem + index + 1}
                      </TableCell>
                      <TableCell>{item.kodeTransaksi}</TableCell>
                      <TableCell>{item.jenisInfaqNama}</TableCell>
                      <TableCell>{item.jumlah}</TableCell>
                      <TableCell>{item.note}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => openEditModal(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500"
                            onClick={() => openDeleteAlert(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 gap-3 border-t">
            <div className="text-xs text-gray-500">
              Menampilkan {indexOfFirstItem + 1} -{" "}
              {Math.min(indexOfLastItem, totalItems)} dari {totalItems} data
              <div className="ml-4 inline-flex items-center">
                <span className="mr-2">Per halaman:</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="h-7 w-16 text-xs">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="self-end sm:self-auto">{renderPagination()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}