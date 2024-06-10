'use client';

import { validateLogin } from "@/helpers/formValidation";
import React, { useState, useEffect } from "react";
import { LoginErrorsProps } from "@/types";
import { login } from "@/helpers/auth.helper";
import { useRouter } from "next/navigation";
import { setCookie } from 'nookies'
import { NextApiRequest, NextApiResponse } from "next";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const router = useRouter();
    const [dataUser, setDataUser] = useState({
        email: "",
        password: ""
    });
    const [errorUser, setErrorUser] = useState<LoginErrorsProps>({
        email: "",
        password: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDataUser({
            ...dataUser,
            [event.target.name]: event.target.value // Fixed assignment here
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            console.log(dataUser)
            const response = await login(dataUser);
            const{token, user} = response;
            localStorage.setItem('userSession', JSON.stringify({token, userData:user}))
            setCookie(null, 'userSession', token, { path: '/' });
            router.push("/dashboard")
        } catch (error:any) {
            toast.warn('Failed to login', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
        

    };

    useEffect(() => {
        const errors = validateLogin(dataUser);
        setErrorUser(errors);
    }, [dataUser]);

    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-blue-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                {/**form */}
                <div className="md:w-1/2 px-8 md:px-16">
                    <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
                    <p className="text-xs mt-4 text-[#002D74]">If you already a member, easily log in</p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="p-2 mt-8" htmlFor="email-address">Email</label>
                            <input className="rounded-xl border" type="email" name="email" id="email-address" value={dataUser.email}   onChange={handleChange} required placeholder="example@hotmail.com" />
                            {errorUser.email && <p className="text-xs text-red-600">{errorUser.email}</p>}
                        </div>
                        <div>
                            <label className="p-2" htmlFor="password">Password</label>
                            <input className="rounded-xl border w-full" type="password" name="password" id="password" value={dataUser.password} onChange={handleChange} required placeholder="****************" />
                            {errorUser.password && <p className="text-xs text-red-600">{errorUser.password}</p>}
                        </div>
                        <div>
                            <button className="bg-[#002D74] rounded-xl text-white py-2 px-20 hover:scale-105 duration-300" type="submit">Login</button>
                        </div>
                    </form>

                    <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
                        <a href="#">Forgot your password?</a>
                    </div>

                    <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                        <p>Dont have an account?</p>
                        <Link className="py-2 px-5 bg-green-300 border rounded-xl hover:scale-110 duration-300"  href="/register">Register</Link>
                    </div>
                </div>
                {/**Image */}
                <div className="sm:block hidden w-1/2">
                    <img className="rounded-2xl" src="https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="login_photo" />
                </div>
            </div>
            <ToastContainer />
        </section>
        
    );
};

export default Login;
