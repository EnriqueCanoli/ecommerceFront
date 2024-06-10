import { IProduct } from "@/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export async function getProductsDB(){
    try {
        console.log(apiUrl)
        const res = await fetch(`${apiUrl}/products`,{
            method: 'GET',
            headers:{
                'ngrok-skip-browser-warning': 'true'
            },
            next: {revalidate: 3600} /**Validar la informacion cada hora */
        })
        const products: IProduct[] = await res.json();
        return products;
    } catch (error:any) {
        throw new Error(error);
    }
}

export async function getProductById(id:string){
    try {
        const products = await getProductsDB();
        const product = products.find((product) => product.id.toString() === id)
        if(!product) throw new Error('Product not found')
        return product;
    } catch (error:any) {
        throw new Error(error);
    }

}