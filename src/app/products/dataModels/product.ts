export interface IProduct {
    title: string,
    price: number,
    description: string,
    image: string,
    category: string,
    id: number,
    isAddedToCart?: boolean
}

export interface ICategory {
    Id: number,
    CategoryType: string
}
