import {instance} from './axios-instance'
import {AxiosResponse} from 'axios'

export type ShopProductResponse = {
    id?: string,
    productName?: string,
    price?: number,
    productType?: string,
    rating?: number
}

export type ShopResponse = {
    products: ShopProductResponse[],
    minPrice: number,
    maxPrice: number,
    productTotalCount: number,
    page: number,
    pageCount: number,
}

export type GetShopQueryParams = {
    productName?: string
    min?: number
    max?: number
    sortProducts?: number
    page?: number
    pageCount?: number
}

export type NewProduct = {
    product: ShopProductResponse
}

export type DeleteProduct = {
    id: string
}

export const shopAPI = {
    getProducts: (payload?: GetShopQueryParams) => instance
        .get<ShopResponse>('/shop', {params: payload}),

    createProduct: (payload: NewProduct) => instance
        .post<NewProduct, AxiosResponse<ShopProductResponse>>('/shop', payload),

    deleteProduct: (payload: DeleteProduct) => instance
        .delete<ShopProductResponse>('/shop', {params: payload}),

    updateProduct: (payload: NewProduct) => instance
        .put<NewProduct, AxiosResponse<ShopProductResponse>>('/shop', payload),

    createOrder: (payload: NewProduct) => instance
        .post<NewProduct, AxiosResponse<ShopProductResponse>>('/shop/buy', payload),

    rateProduct: (payload: ShopProductResponse) => instance
        .put<ShopProductResponse, AxiosResponse<ShopProductResponse>>('/shop/rating', payload)
}
