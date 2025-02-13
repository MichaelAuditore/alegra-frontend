export type Recipe = {
    id: string;
    key_name: string;
    description: string;
    ingredients: object;
    image_url: string;
}

export type User = {
    name: string;
    email: string;
    id: number;
}

export type Purchase = {
    key_name: string;
    purchasedStock: number;
    purchasedDate: string;
}

export type PurchaseResponse = {
    purchases: Purchase[];
    total: number;
}

export type Order = {
    id: string;
    key_name: string;
    ingredients: Record<string, number>;
};

export type OrderResponse = {
    total: number;
    orders: Order[];
}

export type OrderStatusResponse = {
    total: number;
    orders: OrderStatus[];
}

export type OrderStatusRequest = {
    status: OrderStatusType;
    limit: number;
    offset: number;
}

export type OrderStatusType = "pending" | "cooking" | "ready" | "unknown";

export type OrderStatus = {
    order_id: string;
    progress_status: OrderStatusType;
    last_updated: string;
    recipe: {
        id: string;
        key_name: string;
        description: string;
        image_url: string;
        ingredients: Record<string, number>;
    };
}

export type Ingredient = {
    _id: string;
    key_name: string;
    stock: string;
    image_url: string;
}