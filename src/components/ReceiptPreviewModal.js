import {ModalForm} from "@/components/ModalForm";
import Image from "next/image";
import {FileIcon} from "lucide-react";
import {useEffect} from "react";

export function ReceiptPreviewModal({ isOpen, onClose, receiptPath }) {
    if (!isOpen || !receiptPath) {
        return null;
    }

    const isImage = /\.(jpeg|jpg|png|gif|webp|svg)$/i.test(receiptPath);
    const fileName = receiptPath.split("/").pop();
    const fileExtension = fileName.split(".").pop()?.toLowerCase();

    const fullUrl = receiptPath;

    return (
        <ModalForm
            isOpen={isOpen}
            onClose={onClose}
            title="Bukti Transaksi"
            size="md"
            hideSubmitButton={true}
        >
            <div className="flex flex-col items-center justify-center p-2">
                {isImage ? (
                    <div className="relative flex justify-center items-center max-h-[60vh] max-w-full overflow-auto">
                        <Image
                            src={fullUrl}
                            alt="Bukti Transaksi"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="h-auto w-auto max-h-[60vh] max-w-full rounded-lg shadow-md border-2 border-gray-200"
                            onError={(e) => {
                                e.currentTarget.style.display = "none";
                                const parentDiv = e.currentTarget.parentNode;
                                if (parentDiv) {
                                    parentDiv.innerHTML = `
                                        <div class="flex flex-col items-center gap-2 text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-off"><line x1="2" x2="22" y1="2" y2="22"/><path d="M10.3 5H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4"/><path d="M18.8 13.4L10 5.6"/><path d="M7.4 9.8 4 7v10a2 2 0 0 0 2 2h10"/></svg>
                                            <p class="text-sm">Gambar tidak dapat dimuat</p>
                                        </div>
                                    `;
                                }
                            }}
                        />
                    </div>
                ) : (
                    // --- Tampilkan file non-gambar ---
                    <div className="flex flex-col items-center gap-2">
                        <FileIcon className="h-24 w-24 text-gray-400" />
                        <p className="text-lg font-semibold text-gray-700">File Dokumen</p>
                        <a
                            href={fullUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                        >
                            Unduh {fileName} ({fileExtension?.toUpperCase()})
                        </a>
                    </div>
                )}
            </div>
        </ModalForm>
    );
}