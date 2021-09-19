import React from 'react'
import { Categories, PizzaBlock, PizzaLoadingBlock, SortPopup } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaToCart } from '../redux/actions/cart';


const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const sortItems = [
    { name: 'популярности', type: 'popular', order: 'desc' },
    { name: 'цене', type: 'price', order: 'desc' },
    { name: 'алфавиту', type: 'name', order: 'asc' },
]

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({ pizzas }) => pizzas.items);
    const cartItems = useSelector(({ cart }) => cart.items);
    const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
    const { category, sortBy } = useSelector(({ filters }) => filters);

    console.log(cartItems)


    React.useEffect(() => {
        dispatch(fetchPizzas(sortBy, category))
    }, [category, sortBy]);

    const onSelectCategory = React.useCallback(index => {
        dispatch(setCategory(index))
    }, []);

    const onClickSortType = React.useCallback(type => {
        dispatch(setSortBy(type))
    }, []);

    const handleAddPizzaToCart = obj => {
        dispatch(addPizzaToCart(obj))
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={category} onClickCategory={onSelectCategory} items={categoryNames} />

                <SortPopup activeSortType={sortBy.type} items={sortItems} onClickSortType={onClickSortType} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoaded
                        ? items.map((obj, index) => (
                            <PizzaBlock
                                onClickAddPizza={handleAddPizzaToCart}
                                key={obj.id} 
                                addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                                {...obj}
                            />
                        ))
                        : Array(10).fill(0).map((_, index) => <PizzaLoadingBlock key={index} />)
                }


            </div>
        </div>
    )
}

export default Home
