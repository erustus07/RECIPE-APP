import React, { useState } from 'react';
import './DiscoverPage.css';

const DiscoverPage = () => {
    const mockRecipes = [
        {
            title: "Chocolate Cake",
            image: "/images/chocolate-cake.jpg",
            description: "A delicious chocolate cake with rich chocolate frosting.",
            ingredients: ["2 cups flour", "1 cup sugar", "1 cup cocoa powder", "2 tsp baking powder", "1 tsp vanilla extract"],
            instructions: "Mix all ingredients and bake at 350°F for 30 minutes.",
            rating: 4.5,
        },
        {
            title: "Caesar Salad",
            image: "/images/caesar-salad.jpg",
            description: "A classic Caesar salad with romaine lettuce, croutons, and Caesar dressing.",
            ingredients: ["1 head romaine lettuce", "1 cup croutons", "1/2 cup Caesar dressing", "1/4 cup Parmesan cheese"],
            instructions: "Toss lettuce with dressing, top with croutons and Parmesan.",
            rating: 4.0,
        },
        {
            title: "Spaghetti Carbonara",
            image: "/images/spaghetti-carbonara.jpg",
            description: "A traditional Italian pasta dish with eggs, cheese, pancetta, and pepper.",
            ingredients: ["200g spaghetti", "100g pancetta", "2 eggs", "50g Parmesan cheese", "Black pepper"],
            instructions: "Cook pasta, mix with beaten eggs, cheese, and cooked pancetta.",
            rating: 4.8,
        },
        {
            title: "Margherita Pizza",
            image: "/images/margherita-pizza.jpg",
            description: "A simple and classic Margherita pizza with fresh tomatoes, mozzarella, and basil.",
            ingredients: ["Pizza dough", "2 tomatoes", "200g mozzarella", "Fresh basil leaves"],
            instructions: "Top dough with tomatoes, mozzarella, and basil. Bake at 475°F for 10 minutes.",
            rating: 4.2,
        },
        {
            title: "Beef Tacos",
            image: "/images/beef-tacos.jpg",
            description: "Tasty beef tacos with fresh salsa and guacamole.",
            ingredients: ["200g ground beef", "8 taco shells", "Salsa", "Guacamole"],
            instructions: "Cook beef, fill taco shells with beef, salsa, and guacamole.",
            rating: 4.6,
        },
        {
            title: "Pancakes",
            image: "/images/pancakes.jpg",
            description: "Fluffy pancakes served with maple syrup and fresh berries.",
            ingredients: ["2 cups flour", "2 tbsp sugar", "2 tsp baking powder", "1 1/2 cups milk", "2 eggs"],
            instructions: "Mix ingredients, cook on griddle until golden brown.",
            rating: 4.9,
        },
        {
            title: "Greek Salad",
            image: "/images/greek-salad.jpg",
            description: "A refreshing Greek salad with cucumbers, tomatoes, olives, and feta cheese.",
            ingredients: ["2 cucumbers", "4 tomatoes", "1 cup olives", "200g feta cheese"],
            instructions: "Chop vegetables, toss with olives and feta.",
            rating: 4.3,
        },
        {
            title: "Butter Chicken",
            image: "/images/butter-chicken.jpg",
            description: "A rich and creamy butter chicken served with naan bread.",
            ingredients: ["500g chicken", "200ml cream", "100g butter", "Spices"],
            instructions: "Cook chicken with spices, add butter and cream.",
            rating: 4.7,
        },
    ];

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStars = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStars;

        return (
            <>
                {'★'.repeat(fullStars)}
                {halfStars ? '☆' : ''}
                {'☆'.repeat(emptyStars)}
            </>
        );
    };

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
                        <div className="card-hover-content">
                            <h2>{recipe.title}</h2>
                            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                            <p><strong>Instructions:</strong> {recipe.instructions}</p>
                            <p><strong>Rating:</strong> {renderStars(recipe.rating)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiscoverPage;
