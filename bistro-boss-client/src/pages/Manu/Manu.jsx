import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import Cover from "../Shared/Cover/Cover.jsx";
import manuImg from "../../assets/menu/banner3.jpg";
import PopularMenu from "../Home/PopularMenu/PopularMenu.jsx";
import useMenu from "../../Hooks/useMenu.jsx";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import MenuItem from "../Shared/MenuItem/MenuItem.jsx";

const Manu = () => {
    const [menu] = useMenu();
    const [dessertItems, setDessertItems] = useState([])
    const [soupItems, setSoupItems] = useState([])
    const [saladItems, setSaladItems] = useState([])
    const [pizzaItems, setPizzaItems] = useState([])
    const [offeredItems, setOfferedItems] = useState([])
    useEffect(() => {
        const dessertItemsCategory = menu.filter(item => item.category === 'dessert');
        const soupItemsCategory = menu.filter(item => item.category === 'soup');
        const saladItemsCategory = menu.filter(item => item.category === 'salad');
        const pizzaItemsCategory = menu.filter(item => item.category === 'pizza');
        const offeredItemsCategory = menu.filter(item => item.category === 'offered');
        setDessertItems(dessertItemsCategory);
        setSoupItems(soupItemsCategory);
        setSaladItems(saladItemsCategory);
        setPizzaItems(pizzaItemsCategory);
        setOfferedItems(offeredItemsCategory);
    }, [menu])
    return (
        <div>
            <Helmet>
                <title>bistro boss - manu</title>
            </Helmet>
            <Cover
                img={manuImg}
                title={'our manu'}
                subTitle={"Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi"}
            ></Cover>
            <SectionTitle heading={"TODAY'S OFFER"} subHeading={"Don't miss"}></SectionTitle>
            <div className="grid md:grid-cols-2 gap-10">
                {
                    offeredItems.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
        </div>
    );
};

export default Manu;