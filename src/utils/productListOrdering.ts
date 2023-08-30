export enum ProductListOrder {
    ID,
    TITLE_ASCENDING,
    TITLE_DESCENDING,
    PRICE_ASCENDING,
    PRICE_DESCENDING,
    STOCK_ASCENDING,
    STOCK_DESCENDING,
}

export function getProductListOrderingQueryValues(ordering: ProductListOrder): string[] {
    let key = ''
    let value = ''

    switch (ordering) {
        case ProductListOrder.ID: key = 'id'; value = 'asc'; break;
        case ProductListOrder.TITLE_ASCENDING: key = 'title'; value = 'asc'; break;
        case ProductListOrder.TITLE_DESCENDING: key = 'title'; value = 'desc'; break;
        case ProductListOrder.PRICE_ASCENDING: key = 'price-jpy'; value = 'asc'; break;
        case ProductListOrder.PRICE_DESCENDING: key = 'price-jpy'; value = 'desc'; break;
        case ProductListOrder.STOCK_ASCENDING: key = 'stock'; value = 'asc'; break;
        case ProductListOrder.STOCK_DESCENDING: key = 'stock'; value = 'desc'; break;
    }

    return [key, value]
}