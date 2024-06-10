'use client';
import { createOrder } from "@/helpers/orders.helper";
import { IProduct, userSession } from "@/types";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cart = () => {

    const [cart, setCart] = useState<IProduct[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [userData, setUserData] = useState<userSession>();

    useEffect(() => {
        /**The window object and localStorage are only available in the browser environment. 
         * If this check passes, it means the code is running in the browser, not on the server. 
         * */
        if (typeof window !== "undefined" && window.localStorage) {
            /**
             * , parses it from JSON string back into a JavaScript object
             */
            const userData: userSession = JSON.parse(localStorage.getItem("userSession")!);
            setUserData(userData);
            if (!userData?.token) {
                redirect("/login");
            }
        }

        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (storedCart) {
            let totalCart = 0;
            storedCart?.map((item: IProduct) => {
                totalCart = totalCart + item.price;
            })
            setTotal(totalCart);
            setCart(storedCart);
        }
    }, []);

    const handleClick = async () => {
        try {
            const idProducts = new Set(cart.map((product) => product.id));
            await createOrder(Array.from(idProducts), userData?.token!);
            toast.success('Buy successfully', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored", 
                });

            //alert("Buy successfully");
            setCart([]);
            setTotal(0);
            localStorage.setItem("cart", "[]");
        } catch (error: any) {
            console.error(error);
            throw new Error(error.message);
        }
    };

    return (
        <>
            <div className="w-full items-center justify-center flex flex-col ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full p-5">
                    <div className="bg-blue-300 border p-4 rounded shadow-xl">
                        <p  className="font-bold">item</p>
                    </div>
                    <div className="bg-yellow-300  border p-4 rounded shadow-xl">
                        <p className="font-bold">Quantity</p>
                    </div>
                    <div className="bg-green-300 border p-4 rounded shadow-xl">
                        <p className="font-bold">Price</p>
                    </div>
                    <div className="bg-gray-300 border p-4 rounded shadow-xl">
                        <p className="font-bold">Subtotal</p>
                    </div>
                </div>
                <hr />



                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full p-5">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <>
                                <div key={item.id}  >
                                    <p className="border p-4 rounded shadow-xl" >{item.name}</p>
                                </div>
                                <div>
                                    <p className="border p-4 rounded shadow-xl">1</p>
                                </div>
                                <div>
                                    <p className="border p-4 rounded shadow-xl" >$ {item.price}</p>
                                </div>
                                <div >
                                    <p className="border p-4 rounded shadow-xl" >$ {item.price}</p>
                                </div>
                            </>
                        ))
                    ) : (
                        <div>
                            <p>You dont have products yet</p>
                        </div>
                    )}

                </div>


            </div>
            <div className="w-full flex flex-col items-end px-10 py-2">
                <p className="font-bold px-4">Total: ${total}</p>
                <button onClick={handleClick} className="bg-[#93df99] text-white px-6 py-2 rounded-full hover:bg-[#77f68a] mt-4">Check out</button>
            </div>


            <ToastContainer />
        </>
    );
};

export default Cart;
