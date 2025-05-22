// "use client";
//
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { Skeleton } from "@/components/ui/skeleton";
//
// export default function AuthGuard({ children }) {
//     const { token, loading } = useAuth();
//     const router = useRouter();
//
//     useEffect(() => {
//         if (!loading && !token) {
//             router.push("/auth/login");
//         }
//     }, [loading, token]);
//
//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <Skeleton className="w-[300px] h-[200px] rounded-xl" />
//             </div>
//         );
//     }
//
//     if (!token) return null;
//
//     return <>{children}</>;
// }