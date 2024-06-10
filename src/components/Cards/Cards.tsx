// Cards.js
import React from "react";
import Card from "../Card/Card";
import { IProduct } from "@/types";
import Link from "next/link";

const Cards = ({ products }: { products: IProduct[] }) => {
    return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                {products &&
                    products.map((product) => {
                        return (
                            <Link key={product.id} href={`/product/${product.id}`}>
                                <div className="cursor-pointer">
                                    <Card key={product.id} {...product} />
                                </div>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
};

export default Cards;
