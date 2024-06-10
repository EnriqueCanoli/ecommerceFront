'use client'
import { userSession } from "@/types";
import React, { useEffect, useState } from "react";


const Dashboard = () => {
    const [userData, setUserData] = useState<userSession>();

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const userData = localStorage.getItem("userSession")
            setUserData(JSON.parse(userData!))
        }
    }, [])

    return (
        <div className="w-full h-screen bg-gray-300 border-2 border-black py-10 md:py-20 px-3">
            <div className="max-w-lg mx-auto">
                <div className="w-full">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <div className="flex justify-center">
                            <img className="rounded-full" src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg" alt="" width="100" />
                        </div>
                        <div className="text-center mt-4">
                            <h1 className="text-2xl mt-2">Welcome {userData?.userData.name} </h1>
                            <div className="px-4 text-sm mt-4">
                                <p className="text-justify"></p>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between mt-6 px-4 space-y-4 md:space-y-0">
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-lg">{userData?.userData.address} </span>
                                    <span className="text-sm text-blue-800">Address</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-lg">{userData?.userData.email} </span>
                                    <span className="text-sm text-blue-800">Email</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="font-bold text-lg">{userData?.userData.phone}</span>
                                    <span className="text-sm text-blue-800">Phone</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
