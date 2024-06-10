'use client';

import { validateRegister } from "@/helpers/formValidation";
import React, { useState, useEffect } from "react";
import { RegisterErrorsProps, RegisterProps } from "@/types";
import { register } from "@/helpers/auth.helper";
import { useRouter } from "next/navigation";

const Register = () => {
    const router = useRouter();

    const [dataUser, setDataUser] = useState<RegisterProps>({
        email: "",
        password: "",
        name: "",
        address: "",
        phone: ""
    });
    const [errorUser, setErrorUser] = useState<RegisterErrorsProps>({
        email: "",
        password: "",
        name: "",
        address: "",
        phone: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataUser({
            ...dataUser,
            [event.target.name]: event.target.value
        })

    }

    const hanldeSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            console.log(dataUser)
            await register(dataUser);
            //redirigir al usuario
            router.push("/login")
        } catch (error: any) {
            throw new Error(error)
        }

    }

    useEffect(() => {
        const errors = validateRegister(dataUser);
        setErrorUser(errors)
    }, [dataUser])

    return (
        <section className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-blue-100 flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center">
                {/** image */}
                <div className="sm:block block w-1/2 ">
                    <img className="rounded-2xl" src="https://images.pexels.com/photos/5082580/pexels-photo-5082580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="register photo" />
                </div>
                {/**Form */}
                <div className="md:w-1/2  px-8 md:px-16">
                    <h2 className="font-bold text-2xl text-[#002D74]">Register</h2>
                    <p className="text-xs  text-[#002D74]">Register in the app</p>
                    <form onSubmit={hanldeSubmit} className="flex flex-col gap-4 ">
                        <div className="mt-2">
                            <label className="p-2" htmlFor="email-address">Email</label>
                            <input className="rounded-xl border" type="email" name="email" id="email-address" value={dataUser.email} onChange={handleChange} required placeholder="example@hotmail.com" />
                            {errorUser.email && <p className="text-xs text-red-600">{errorUser.email}</p>}
                        </div>
                        <div>
                            <label className="p-2" htmlFor="password">Password</label>
                            <input className="rounded-xl border" type="password" name="password" id="password" value={dataUser.password} onChange={handleChange} required placeholder="***************" />
                            {errorUser.password && <p className="text-xs text-red-600">{errorUser.password}</p>}
                        </div>
                        <div>
                            <label className="p-2" htmlFor="address">Address</label>
                            <input className="rounded-xl border" type="text" name="address" id="address" value={dataUser.address} onChange={handleChange} required />
                            {errorUser.address && <p className="text-xs text-red-600">{errorUser.address}</p>}
                        </div>
                        <div>
                            <label className="p-2" htmlFor="name">Name</label>
                            <input className="rounded-xl border" type="text" name="name" id="name" value={dataUser.name} onChange={handleChange} required />
                            {errorUser.name && <p className="text-xs text-red-600">{errorUser.name}</p>}
                        </div>
                        <div>
                            <label className="p-2" htmlFor="phone">Phone</label>
                            <input className="rounded-xl border" type="text" name="phone" id="phone" value={dataUser.phone} onChange={handleChange} />
                            {errorUser.phone && <p className="text-xs text-red-600">{errorUser.phone}</p>}
                        </div>
                        <div>
                            <button className="py-2 px-20 bg-green-300 border rounded-xl hover:scale-110 duration-300" type="submit">Register</button>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default Register;