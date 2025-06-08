import * as React from "react";

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="relative">
                {/* Outer ring */}
                <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-blue-600"></div>
                {/* Inner ring */}
                <div
                    className="absolute top-2 left-2 w-12 h-12 border-4 border-transparent rounded-full animate-spin border-t-green-500"
                    style={{
                        animationDirection: "reverse",
                        animationDuration: "0.8s",
                    }}
                ></div>
            </div>
            <div className="text-center space-y-2">
                <p className="text-lg font-medium text-gray-700">Memuat data transaksi...</p>
                <p className="text-sm text-gray-500">Mohon tunggu sebentar</p>
            </div>
        </div>
    );
}