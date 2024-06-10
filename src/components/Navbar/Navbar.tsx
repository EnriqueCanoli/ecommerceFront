'use client';
import { userSession } from "@/types";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {

    const [userData, setUserData] = useState<userSession>();

    //Es un hook que me devuelve path en el que me encuentro
    const pathname = usePathname();
    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const userData = localStorage.getItem("userSession");
            setUserData(JSON.parse(userData!));
        }
    }, [pathname]);

    const handleLogOut = () => {
        localStorage.clear();

    };

    return (
        <div>
            <nav className="bg-gray-800 p-4 ">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <img className="w-16" src="https://cdn-icons-png.flaticon.com/128/3714/3714797.png" alt="logo" />
                        <button className="ml-4 md:hidden text-white focus:outline-none">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {
                            userData?.token ? (
                                <>
                                    <input
                                        type="text" className="border border-gray-300 rounded-l-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="Buscar..."
                                    />
                                    <Link href="/" className="text-white">Home</Link>
                                    <Link className="text-white" href="/dashboard">Dashboard</Link>

                                    <Link className="text-white" href="/cart">Cart</Link>
                                    <Link onClick={handleLogOut} href="/login" className="bg-[#e19b9b] text-white px-6 py-2 rounded-full hover:bg-[#ee7474]">Log out</Link>

                                </>


                            ) : (
                                <>
                                    <input
                                        type="text" className="border border-gray-300 rounded-l-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        placeholder="Buscar..."
                                    />
                                    <Link href="/" className="text-white">Home</Link>

                                    <Link href="/login" className="bg-[#a6c1ee] text-white px-6 py-2 rounded-full hover:bg-[#87acec] ">Sing in</Link>
                                    <Link href="/register" className="bg-[#9be1c4] text-white px-6 py-2 rounded-full hover:bg-[#87ecd3]">Sing up</Link>
                                </>
                            )
                        }


                    </div>
                </div>
                {/* Mobile menu */}
                {
                    userData?.token ? (
                        <div className="md:hidden mt-4">
                            <Link href="/" className="block px-4 py-2 text-white">Home</Link>
                            <Link className="block px-4 py-2 text-white" href="/dashboard">Dashboard</Link>

                            <Link className="block px-4 py-2 text-white" href="/cart">Cart</Link>
                            <Link onClick={handleLogOut} href="/login" className="block px-4 py-2 text-white">Log out</Link>

                        </div>
                    ) : (

                        <div className="md:hidden mt-4">
                            <Link href="/" className="block px-4 py-2 text-white">Home</Link>
                            <Link href="/login" className="block px-4 py-2 text-white">Sing in</Link>
                            <Link href="/register" className="block px-4 py-2 text-white">Sing up</Link>
                        </div>
                    )
                }


            </nav>
        </div>

    );
};

export default Navbar;
