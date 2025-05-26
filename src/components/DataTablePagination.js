"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DataTablePagination({ table, pageSizeOptions = [5, 10, 20, 30, 40, 50] }) {
    // Generate pagination buttons
    const generatePaginationButtons = () => {
        const currentPage = table.getState().pagination.pageIndex + 1
        const totalPages = table.getPageCount()
        const buttons = []

        if (totalPages <= 1) return []

        // Tentukan range halaman yang akan ditampilkan
        const maxVisiblePages = 5
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        // Adjust startPage jika endPage sudah mentok
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        // Tambahkan halaman pertama dan ellipsis jika perlu
        if (startPage > 1) {
            buttons.push(
                <Button
                    key={1}
                    variant={1 === currentPage ? "default" : "outline"}
                    className={`h-8 w-8 p-0 cursor-pointer transition-colors ${
                        1 === currentPage
                            ? "bg-[#2C3E9E] hover:bg-[#243280] text-white"
                            : "border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                    onClick={() => table.setPageIndex(0)}
                >
                    1
                </Button>,
            )

            if (startPage > 2) {
                buttons.push(
                    <span key="ellipsis-start" className="flex items-center justify-center h-8 w-8 text-gray-400 select-none">
            ...
          </span>,
                )
            }
        }

        // Tambahkan halaman dalam range
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <Button
                    key={i}
                    variant={i === currentPage ? "default" : "outline"}
                    className={`h-8 w-8 p-0 cursor-pointer transition-colors ${
                        i === currentPage
                            ? "bg-[#2C3E9E] hover:bg-[#243280] text-white"
                            : "border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                    onClick={() => table.setPageIndex(i - 1)}
                >
                    {i}
                </Button>,
            )
        }

        // Tambahkan ellipsis dan halaman terakhir jika perlu
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                buttons.push(
                    <span key="ellipsis-end" className="flex items-center justify-center h-8 w-8 text-gray-400 select-none">
            ...
          </span>,
                )
            }

            buttons.push(
                <Button
                    key={totalPages}
                    variant={totalPages === currentPage ? "default" : "outline"}
                    className={`h-8 w-8 p-0 cursor-pointer transition-colors ${
                        totalPages === currentPage
                            ? "bg-[#2C3E9E] hover:bg-[#243280] text-white"
                            : "border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                    onClick={() => table.setPageIndex(totalPages - 1)}
                >
                    {totalPages}
                </Button>,
            )
        }

        return buttons
    }

    return (
        <div className="border-t border-gray-200 bg-gray-50/30 mt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-700">Baris per halaman</p>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}
                        >
                            <SelectTrigger className="h-8 border-gray-300">
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {pageSizeOptions.map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Menampilkan{" "}
                        <span className="font-medium text-gray-900">
                            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                        </span>{" "} sampai {" "}
                        <span className="font-medium text-gray-900">
                            {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                                table.getFilteredRowModel().rows.length,
                            )}
                        </span> {" "} dari <span className="font-medium text-gray-900">{table.getFilteredRowModel().rows.length}</span> data
                    </div>
                </div>

                <div className="flex items-center space-x-1">
                    {/* First Page Button */}
                    <Button
                        variant="outline"
                        className={`h-8 w-8 p-0 border-gray-300 transition-colors ${
                            !table.getCanPreviousPage()
                                ? "cursor-not-allowed opacity-50"
                                : "cursor-pointer hover:bg-gray-50 hover:border-gray-400"
                        }`}
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to first page</span>
                        {"<<"}
                    </Button>

                    {/* Previous Page Button */}
                    <Button
                        variant="outline"
                        className={`h-8 w-8 p-0 border-gray-300 transition-colors ${
                            !table.getCanPreviousPage()
                                ? "cursor-not-allowed opacity-50"
                                : "cursor-pointer hover:bg-gray-50 hover:border-gray-400"
                        }`}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        {"<"}
                    </Button>

                    {/* Page Number Buttons */}
                    {generatePaginationButtons()}

                    {/* Next Page Button */}
                    <Button
                        variant="outline"
                        className={`h-8 w-8 p-0 border-gray-300 transition-colors ${
                            !table.getCanNextPage()
                                ? "cursor-not-allowed opacity-50"
                                : "cursor-pointer hover:bg-gray-50 hover:border-gray-400"
                        }`}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        {">"}
                    </Button>

                    {/* Last Page Button */}
                    <Button
                        variant="outline"
                        className={`h-8 w-8 p-0 border-gray-300 transition-colors ${
                            !table.getCanNextPage()
                                ? "cursor-not-allowed opacity-50"
                                : "cursor-pointer hover:bg-gray-50 hover:border-gray-400"
                        }`}
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to last page</span>
                        {">>"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
