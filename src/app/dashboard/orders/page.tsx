'use client';
import { getOrder } from "@/helpers/orders.helper";
import { IOrders, userSession } from "@/types";
import React, { useEffect, useState } from "react";

const Orders = () => {
    const [userData, setUserData] = useState<userSession>();
    const [orders, setOrders] = useState<IOrders[]>([])

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const userData = localStorage.getItem("userSession")
            setUserData(JSON.parse(userData!))
        }
    }, [])

    useEffect(() => {
        const fetchDate = async () => {
            const orders = await getOrder(userData?.token!);
            setOrders(orders);
        }

        userData?.token && fetchDate()

    }, [userData?.token])

    return (
        <div className="w-full min-h-screen bg-gray-300 border-2 border-black py-10 md:py-20 px-3">
            {
                orders?.length > 0 ? (
                    orders?.map((orden) => {
                        return (
                            <div key={orden.id} className="mt-4">
                                <div className="bg-green-300 flex flex-row border p-4 md:p-8 md:px-20 rounded shadow-xl m-4 space-x-4">
                                    <p className="font-bold">Orden ID: </p> 
                                    <p>{orden.id}</p>
                                    <p className="font-bold">Date:</p>
                                    <p>{new Date(orden.date).toLocaleDateString()}</p>
                                    <p className="font-bold">Status: </p>
                                    <p>{orden.status}</p> 
                                    <p className="font-bold">Products: </p>
                                    {orden.products.map((product) => (
                                    <div key={product.id} className="flex flex-row justify-between">
                                        <p>{product.name}</p>
                                    </div>
                                ))}
                                </div>
                                

                            </div>
                        )
                    })
                ) : (
                    <div>
                        <p>No orders to show</p>
                    </div>
                )
            }
        </div>
    )
}

export default Orders;
