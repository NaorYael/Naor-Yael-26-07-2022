export interface ProductsResponseData {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number
    rating: Rating;
    title: string;
}

export interface Rating {
    rate: number;
    count: number;
}
