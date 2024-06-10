'use client';
import { userSession } from '@/types';
import React, { useEffect, useState } from 'react';
import Link from "next/link";

const Dashboard = () => {
    const [userData, setUserData] = useState<userSession>();
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const userData = localStorage.getItem("userSession")
            setUserData(JSON.parse(userData!))
        }
    }, [])


    return (
        <div className="flex ">
            <div
                className={` ${open ? "w-72" : "w-20 "} bg-blue-600 h-screen p-5  pt-8 relative duration-300`} >
                <img src="https://cdn-icons-png.flaticon.com/128/54/54623.png" className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
                <div className="flex gap-x-4 items-center">
                    <img src="https://cdn-icons-png.flaticon.com/128/9966/9966194.png" className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"} w-8 h-8`} />
                    <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`} > Dashboard</h1>
                </div>
                <ul className="pt-6">
                    <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-md items-center gap-x-4 mt-2 `}>
                        <Link className={`${!open && "hidden"} origin-left duration-200`} href="/dashboard/" >Profile</Link>
                    </li>
                    <li className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 mt-2 `}>
                        <Link className={`${!open && "hidden"} origin-left duration-200`} href="/dashboard/orders" >Orders</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;


//<h1>Bienvenido {userData?.userData?.name}</h1>
