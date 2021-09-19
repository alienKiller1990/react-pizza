

const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
};

const getTotalPrice = arr => arr.reduce((sum, obj) => sum + obj.price, 0);


const cart = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_PIZZA_CART': {
            const currentPizzaItems = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload]

            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems)
                }
            }


            const totalCount = Object.keys(newItems).reduce((sum, key) => {
                return newItems[key].items.length + sum;
            }, 0)
            const totalPrice = Object.keys(newItems).reduce((sum, key) => {
                return newItems[key].totalPrice + sum;
            }, 0)


            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            };
        }

        case 'CLEAR_CART':
            return {
                totalPrice: 0,
                totalCount: 0,
                items: {}
            }

        case 'REMOVE_CART_ITEM':
            const newItems = {
                ...state.items
            };

            const currentTotalPrice = newItems[action.payload].totalPrice;
            const currentTotalCount = newItems[action.payload].items.length;

            delete newItems[action.payload];

            return {
                ...state,
                items: newItems,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount
            };

        case 'PLUS_CART_ITEM': {
            
            const newItems = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0],
            ]
            
            const totalCount = newItems.length;
            const totalPrice = newItems.reduce((sum, key) => {
                return key.price + sum;
            }, 0);
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload] : {
                        items: newItems,
                        totalPrice: getTotalPrice(newItems)
                    }
                },
                totalCount,
                totalPrice
            }
        }   
        case 'MINUS_CART_ITEM': {
            
            const oldItems = state.items[action.payload].items;
            const newItems = oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems
            
            const totalCount = newItems.length;
            const totalPrice = newItems.reduce((sum, key) => {
                return key.price + sum;
            }, 0);
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload]: {
                        items: newItems,
                        totalPrice: getTotalPrice(newItems)
                    }
                },
                totalCount,
                totalPrice
            }
        }

        default:
            return state
    }



}

export default cart