import React, {useEffect, useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import manuImg from "../../assets/menu/banner3.jpg";
import Cover from "../Shared/Cover/Cover.jsx";
import useMenu from "../../Hooks/useMenu.jsx";
import ProductCard from "./ProductCard/ProductCard.jsx";

const Shop = () => {
    const [menu] = useMenu();
    const [dessertItems, setDessertItems] = useState([])
    const [soupItems, setSoupItems] = useState([])
    const [saladItems, setSaladItems] = useState([])
    const [pizzaItems, setPizzaItems] = useState([])
    useEffect(() => {
        const dessertItemsCategory = menu.filter(item => item.category === 'dessert');
        const soupItemsCategory = menu.filter(item => item.category === 'soup');
        const saladItemsCategory = menu.filter(item => item.category === 'salad');
        const pizzaItemsCategory = menu.filter(item => item.category === 'pizza');
        setDessertItems(dessertItemsCategory);
        setSoupItems(soupItemsCategory);
        setSaladItems(saladItemsCategory);
        setPizzaItems(pizzaItemsCategory);
    }, [menu])
    return (
        <div>
            <Cover
                img={manuImg}
                title={'our shop'}
                subTitle={"Provident cupiditate voluptatem et in."}
            ></Cover>
            <div>
                <Tabs>
                    <TabList>
                        <Tab>Dessert</Tab>
                        <Tab>Soup</Tab>
                        <Tab>Salad</Tab>
                        <Tab>Pizza</Tab>
                    </TabList>

                    <TabPanel>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {
                                dessertItems.map(item => <ProductCard
                                    key={item._id}
                                    item={item}
                                ></ProductCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {
                                soupItems.map(item => <ProductCard
                                    key={item._id}
                                    item={item}
                                ></ProductCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {
                                saladItems.map(item => <ProductCard
                                    key={item._id}
                                    item={item}
                                ></ProductCard>)
                            }
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {
                                pizzaItems.map(item => <ProductCard
                                    key={item._id}
                                    item={item}
                                ></ProductCard>)
                            }
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Shop;