import categoriesToPreLoad from '@/helpers/category';
import { IProduct } from '@/types';
import React from 'react'

const Card: React.FC<IProduct> = ({ name, price, image, description, stock, categoryId }) => {
    return (
        <div className='flex flex-col justify-between bg-white text-gray-700 w-72 min-h-[10rem] shadow-2xl rounded-md overflow-hidden'>
            <div className="w-70 h-48">
                <img className='w-full h-full object-contain' src={image} alt="Imagen del producto" />
            </div>
            <div className='p-5 flex flex-col gap-3'>
                <div className='flex items-center gap-2'>
                    <span className='px-3 py-1 rounded-full text-xs bg-gray-200 '>Stock: {stock}</span>
                    <span className='px-3 py-1 rounded-full text-xs bg-gray-200 '>{categoriesToPreLoad[categoryId].name}</span>
                </div>
                <h2 className=' text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap font-bold'>{name}</h2>
                <div>
                    <span className='text-xl font-bold'>
                    ${price}
                    </span>
                    <div className='flex items-center gap-2 mt-1'>
                        <span className='text-sm opacity-80'>{description}</span>
                    </div>
                </div>
                <div className='mt-5 flex gap-2'>
                    <button className='bg-yellow-500/80 hover:bg-yellow-500/100 px-6 py-2 rounded-md text-white font-bold tracking-wider trasition'>add to cart</button>
                </div>


            </div>


        </div>
    )
}

export default Card;