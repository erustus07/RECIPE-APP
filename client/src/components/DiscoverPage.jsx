import React from 'react';
import './DiscoverPage.css';

const DiscoverPage = () => {
    const mockRecipes = [
        {
            title: "Chocolate Cake",
            image: "/images/chocolate-cake.jpg",
            description: "A delicious chocolate cake with rich chocolate frosting.",
        },
        {
            title: "Caesar Salad",
            image: "/images/caesar-salad.jpg",
            description: "A classic Caesar salad with romaine lettuce, croutons, and Caesar dressing.",
        },
        {
            title: "Spaghetti Carbonara",
            image: "/images/spaghetti-carbonara.jpg",
            description: "A traditional Italian pasta dish with eggs, cheese, pancetta, and pepper.",
        },
    ];

    return (
        <div className="discover-container">
            <h1>Discover Recipes</h1>
            <div className="card-container">
                {mockRecipes.map((recipe, index) => (
                    <div className="card" key={index}>
                        <img src={recipe.image} alt={recipe.title} className="card-image" />
                        <div className="card-content">
                            <h2>{recipe.title}</h2>
                            <p>{recipe.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiscoverPage;
