"use client";

import {
    Dialog,
    DialogDescription,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"

export function ModalForm({
    isOpen,
    onClose,
    title,
    description,
    children,
    onSubmit,
    isLoading,
    submitLabel = "Simpan",
    size = "sm",
}) {
    const sizeClass = {
        sm: "sm:max-w-[425px]",
        md: "sm:max-w-[550px]",
        lg: "sm:max-w-[725px]",
        xl: "sm:max-w-[900px]",
        "2xl": "sm:max-w-[1024px]",
        "3xl": "sm:max-w-[1280px]",
    };
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={`${sizeClass[size]} gap-2`}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {description && (
                    <DialogDescription className="text-muted-foreground p-0">
                        {description}
                    </DialogDescription>
                )}

                <form onSubmit={onSubmit} className="space-y-4 py-2">
                    {children}

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onClose(false)}
                            disabled={isLoading}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={isLoading} className="bg-[#2C3E9E] hover:bg-[#243280]">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {submitLabel}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}