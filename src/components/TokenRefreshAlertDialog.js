"use client";

import { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import apiClient from "@/lib/apiClient";

export function TokenRefreshAlertDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [oldToken, setOldToken] = useState("");
    const [newToken, setNewToken] = useState("");

    useEffect(() => {
        apiClient.registerTokenRefreshedCallback((oldTok, newTok) => {
            setOldToken(oldTok);
            setNewToken(newTok);
            setIsOpen(true);
        });

        return () => {
            apiClient.registerTokenRefreshedCallback(null); // Unregister callback on unmount
        };
    }, []);

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Token Diperbarui!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Token akses Anda telah berhasil diperbarui secara otomatis.
                        <br />
                        <br />

                        **Token Lama:** <span className="break-all font-mono text-sm">{oldToken}</span>
                        <br />
                        <br />
                        <br />
                        **Token Baru:** <span className="break-all font-mono text-sm">{newToken}</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setIsOpen(false)}>
                        Mengerti
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}