import { ReactNode, createContext, useContext, useState } from 'react';

type ShoppingCartContext = {
    getItemQuantity: (id: string) => number
    increaseCartQuantity: (id: string) => void
    decreaseCartQuantity: (id: string) => void
    removeFromCart: (id: string) => void
    totalCartQuantity: number
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

type CartItem = {
    id: string
    quantity: number
}

type ShoppingCartProviderProps = {
    children: ReactNode
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {

    const [cartItems, setCartItmes] = useState<CartItem[]>([])

    const totalCartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    function getItemQuantity(id: string) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: string) {
        setCartItmes(currentItems => {
            if (currentItems.find(item => item.id)) {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            } else {
                return [...currentItems, { id, quantity: 1 }]
            }
        })
    }

    function decreaseCartQuantity(id: string) {
        setCartItmes(currentItems => {
            if (currentItems.find(item => item.id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id: string) {
        setCartItmes(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }

    return <ShoppingCartContext.Provider value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        totalCartQuantity,
        cartItems,
    }}>
        {children}
    </ShoppingCartContext.Provider>
}

