import Dashboard from "@/components/Dashboard/Dashboard";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section >
            <div className="flex max-w-7xl mx-auto p-5 items-center">
                <Dashboard />
                {children}
            </div>
        </section>
    );
}
/*
<div>
                <div>
                    <Link  href="/dashboard/favorites">Favoritos</Link>
                    <Link href="/dashboard/orders" >Ordersss</Link>
                </div>
            </div>
            {children}
*/