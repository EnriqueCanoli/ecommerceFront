'use client'

import categoriesToPreLoad from "@/helpers/category";
import { getProductById } from "@/helpers/product.helper";
import { IProduct, userSession } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DetailProduct = ({ params }: { params: { productId: string } }) => {
    const router = useRouter();
    const [product, setProduct] = useState<IProduct>();
    const [userData, setUserData] = useState<userSession>();

    useEffect(() => {


        if (typeof window !== "undefined" && window.localStorage) {
            const userData = localStorage.getItem("userSession")
            setUserData(JSON.parse(userData!))
        }
        const fetchDate = async () => {
            const product = await getProductById(params.productId);
            setProduct(product)
        }

        fetchDate()

    }, [])


    const handleAddToCart = (e: any) => {
        if (!userData?.token) {
            alert("you must be logged to buy")
        } else {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]")
            const productExist = cart.some((product: IProduct) => {
                if (product.id === Number(e?.target?.id)) return true;
                return false;
            })

            if (productExist) {
                toast.error('This product already exist', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                //alert('This product already exist')
                //router.push("/cart");
            } else {
                cart.push(product)
                localStorage.setItem("cart", JSON.stringify(cart));
                //alert("you add a new item")
                toast.info('you add a new item', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
               // router.push("/cart");
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/** <!-- Card left -->*/}
                <div className="overflow-hidden">
                    <div className="flex flex-col">
                        {/** <!-- Image display -->*/}
                        <div className="flex flex-wrap">
                            <img src={product?.image} alt="shoe image" className="w-full" />
                        </div>
                    </div>
                </div>
                {/*<!-- Card right -->*/}
                <div className="px-4 py-8">
                    <h2 className="text-3xl font-semibold text-gray-800 capitalize">{product?.name}</h2>
                    <a href="#" className="block text-sm uppercase font-medium text-white bg-blue-500 py-1 px-2 rounded mt-2 hover:opacity-90">official store</a>
                    <div className="mt-4">
                        <p className="text-sm text-red-500">Price: <span className="font-semibold">{product?.price}</span></p>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-xl">About this item:</h2>
                        <p className="text-sm text-gray-800 opacity-75 mt-2">{product?.description}</p>
                        <ul className="mt-10">
                            <li className="flex items-center text-sm text-gray-800 opacity-75"><span className="font-semibold">Available:</span> <span className="ml-1">{product?.stock}</span></li>
                            <li className="flex items-center text-sm text-gray-800 opacity-75"><span className="font-semibold">Shipping Area:</span> <span className="ml-1">All over the world</span></li>
                            <li className="flex items-center text-sm text-gray-800 opacity-75"><span className="font-semibold">Shipping Fee:</span> <span className="ml-1">Free</span></li>
                        </ul>
                    </div>
                    {
                        userData?.token ? (
                            <div className="flex items-center mt-10">
                                <button id={product?.id.toString()} onClick={handleAddToCart} type="button" className="bg-green-500 text-white py-1 px-4 rounded-md hover:opacity-90">Buy now <i className="fas fa-shopping-cart ml-1"></i></button>
                            </div>
                        ) : (
                            <div className="bg-yellow-100 flex justify-center mt-4">
                                <span className="text-red-500">Sign in to make a purshase</span>
                            </div>
                            
                        )
                    }

                </div>
            </div>
            <ToastContainer />
        </div>

    )
}

export default DetailProduct;
