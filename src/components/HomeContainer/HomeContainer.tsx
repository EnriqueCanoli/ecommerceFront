/**
 * Componente del servidor, se generá la información en el servidor
 */
import React from "react";
import Cards from "../Cards/Cards";
import Slider from "../Slider/Slider";
import announce from "@/helpers/publicity";
import topRating from "@/helpers/topRating";
import { getProductsDB } from "@/helpers/product.helper";

const HomeContainer =  async () => {
    const products = await getProductsDB();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-1 md:col-span-2">
                <Slider announcements={announce} />
            </div>
            <div className="col-span-1 md:col-span-1">
                <Slider announcements={topRating} />
            </div>
            <div className="col-span-1 md:col-span-3">
                <Cards products={products} />
            </div>
        </div>
    );
};

export default HomeContainer;
