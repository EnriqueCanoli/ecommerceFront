export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number;
}

export interface ICategory {
    name: string;
}

interface Announcement {
    url: string;
}

export interface SliderProps {
    announcements: Announcement[];
}


export interface LoginProps{
    email: string,
    password:string
}

export interface LoginErrorsProps{
    email?: string,
    password?:string
}


export interface RegisterProps{
    email: string,
    password:string,
    name:string,
    address:string,
    phone:string
}

export interface RegisterErrorsProps{
    email?: string,
    password?:string,
    name?:string,
    address?:string,
    phone?:string
}


export interface userSession{
    token:string,
    userData: {
        email: string,
        id:number,
        password:string,
        name:string,
        address:string,
        phone:string
    }

}


export interface IOrders{
    id:number;
    status:string;
    date:Date;
    products: IProduct;
}