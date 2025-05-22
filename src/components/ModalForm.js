"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ModalForm({
    isOpen,
    onClose,
    title,
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
            <DialogContent className={sizeClass[size]}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4 py-4">
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
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Loading..." : submitLabel}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}