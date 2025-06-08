"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export function DateRangeFilter({ onApplyFilter }) {
    const { handleSubmit, control, watch, setValue } = useForm({
        defaultValues: {
            startDate: undefined,
            endDate: undefined,
        },
    });

    const startDate = watch("startDate");
    const endDate = watch("endDate");

    const isClearingFilter = useRef(false);

    const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
    const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);

    const debouncedStartDate = useDebounce(startDate, 500);
    const debouncedEndDate = useDebounce(endDate, 500);

    // --- Logika Auto-Submit yang Diperbarui ---
    useEffect(() => {
        if (isClearingFilter.current) {
            isClearingFilter.current = false;
            return;
        }

        // if (debouncedStartDate && debouncedEndDate) {
        //     // Opsional: Validasi jika startDate harus <= endDate
        //     if (debouncedStartDate > debouncedEndDate) {
        //         console.warn("Tanggal mulai tidak boleh setelah tanggal selesai. Tidak auto-submit.");
        //         return;
        //     }
        //
        //     const formattedStartDate = format(debouncedStartDate, "yyyy-MM-dd");
        //     const formattedEndDate = format(debouncedEndDate, "yyyy-MM-dd");
        //
        //     console.log("DateRangeFilter: Auto-submitting with:", { formattedStartDate, formattedEndDate });
        //     onApplyFilter({
        //         startDate: formattedStartDate,
        //         endDate: formattedEndDate,
        //     });
        // }
        // Jika hanya satu tanggal yang ada, atau keduanya undefined, tidak ada auto-submit
        // Pengguna harus menekan "Apply Filter" secara manual
    }, [debouncedStartDate, debouncedEndDate, onApplyFilter]);

    // --- Logika Manual Submit ---
    const onSubmit = (data) => {
        const formattedStartDate = data.startDate
            ? format(data.startDate, "yyyy-MM-dd")
            : null;
        const formattedEndDate = data.endDate
            ? format(data.endDate, "yyyy-MM-dd")
            : null;

        // Validasi untuk manual submit
        if (data.startDate && data.endDate && data.startDate > data.endDate) {
            alert("Tanggal mulai tidak boleh setelah tanggal selesai.");
            return;
        }
        onApplyFilter({ startDate: formattedStartDate, endDate: formattedEndDate });
    };

    // --- Logika Clear Filter ---
    const handleClearFilter = () => {
        isClearingFilter.current = true;
        setValue("startDate", undefined);
        setValue("endDate", undefined);
        onApplyFilter({ startDate: null, endDate: null });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-6 border rounded-xl bg-card text-card-foreground shadow-sm"
        >
            <h3 className="text-lg font-semibold">Filter by Date Range</h3>
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
                {/* Start Date Picker */}
                <div className="flex-1"> {/* Ubah w-1/3 ke flex-1 untuk responsivitas */}
                    <Label htmlFor="startDate" className="mb-2 text-sm font-normal">Tanggal Mulai</Label>
                    <Controller
                        control={control}
                        name="startDate"
                        render={({ field }) => (
                            <Popover
                                open={isStartDatePickerOpen}
                                onOpenChange={setIsStartDatePickerOpen}
                            >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pilih tanggal mulai</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(date) => {
                                            field.onChange(date);
                                            setIsStartDatePickerOpen(false); // Tutup popover
                                        }}
                                        initialFocus
                                        toDate={endDate}
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                </div>

                {/* End Date Picker */}
                <div className="flex-1"> {/* Ubah w-1/3 ke flex-1 untuk responsivitas */}
                    <Label htmlFor="endDate" className="mb-2 text-sm font-normal">Tanggal Selesai</Label>
                    <Controller
                        control={control}
                        name="endDate"
                        render={({ field }) => (
                            <Popover
                                open={isEndDatePickerOpen}
                                onOpenChange={setIsEndDatePickerOpen}
                            >
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pilih tanggal selesai</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(date) => {
                                            field.onChange(date);
                                            setIsEndDatePickerOpen(false); // Tutup popover
                                        }}
                                        initialFocus
                                        fromDate={startDate}
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                </div>
                <div className="flex-1 hidden md:block"></div> {/* Untuk alignment responsif */}
            </div>

            <div className="flex gap-2 justify-start">
                <Button type="button" variant="outline" className="cursor-pointer" onClick={handleClearFilter}>
                    Clear Filter
                </Button>
                <Button type="submit" className="bg-[#2C3E9E] hover:bg-[#243280] cursor-pointer">Apply Filter</Button>
            </div>
        </form>
    );
}