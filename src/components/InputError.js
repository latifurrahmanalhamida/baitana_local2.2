// src/components/ui/input-error.jsx
"use client";

import { cn } from "@/lib/utils";

export function InputError({ message, className, ...props }) {
    if (!message) return null;

    return (
        <p
            className={cn("text-sm text-red-500 mt-1", className)}
            {...props}
        >
            {message}
        </p>
    );
}