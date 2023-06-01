import React from 'react';

const ProductCard = ({item}) => {
    const {name, image, price, recipe} = item;
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="bg-[#111827] text-white absolute right-12 top-6 py-1 px-2 rounded">${price}</p>
            <div className="card-body text-center">
                <h2 className="text-2xl font-bold">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center mt-4">
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;