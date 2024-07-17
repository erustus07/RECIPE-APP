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
        {
            title: "Avocado Toast",
            image: "/images/avocado-toast.jpg",
            description: "Simple and tasty avocado toast with a sprinkle of salt and pepper.",
            ingredients: ["2 slices bread", "1 avocado", "Salt", "Pepper"],
            instructions: "Toast bread, mash avocado, spread on toast, sprinkle with salt and pepper.",
            rating: 4.4,
        },
        {
            title: "Grilled Cheese Sandwich",
            image: "/images/grilled-cheese.jpg",
            description: "A classic grilled cheese sandwich with melted cheddar cheese.",
            ingredients: ["2 slices bread", "2 slices cheddar cheese", "Butter"],
            instructions: "Butter bread, place cheese between slices, grill until golden brown.",
            rating: 4.5,
        },
        {
            title: "Mango Smoothie",
            image: "/images/mango-smoothie.jpg",
            description: "A refreshing mango smoothie with yogurt and honey.",
            ingredients: ["1 mango", "1 cup yogurt", "1 tbsp honey"],
            instructions: "Blend all ingredients until smooth.",
            rating: 4.6,
        },
        {
            title: "Veggie Stir Fry",
            image: "/images/veggie-stir-fry.jpg",
            description: "A colorful veggie stir fry with bell peppers, broccoli, and carrots.",
            ingredients: ["1 bell pepper", "1 cup broccoli", "2 carrots", "Soy sauce"],
            instructions: "Stir fry veggies, add soy sauce to taste.",
            rating: 4.5,
        },
        {
            title: "Chicken Soup",
            image: "/images/chicken-soup.jpg",
            description: "A warm and comforting chicken soup with vegetables.",
            ingredients: ["500g chicken", "2 carrots", "2 celery stalks", "1 onion", "Chicken broth"],
            instructions: "Cook chicken and veggies in broth until tender.",
            rating: 4.8,
        },
        {
            title: "Apple Pie",
            image: "/images/apple-pie.jpg",
            description: "A classic apple pie with a flaky crust and sweet apple filling.",
            ingredients: ["Pie crust", "6 apples", "1 cup sugar", "2 tsp cinnamon"],
            instructions: "Fill crust with apples and sugar mixture, bake at 375°F for 45 minutes.",
            rating: 4.7,
        },
        {
            title: "Chicken Alfredo",
            image: "/images/chicken-alfredo.jpg",
            description: "A creamy chicken Alfredo pasta with garlic and Parmesan.",
            ingredients: ["200g fettuccine", "200g chicken", "1 cup cream", "2 garlic cloves", "Parmesan cheese"],
            instructions: "Cook pasta and chicken, mix with cream and garlic, top with Parmesan.",
            rating: 4.8,
        },
        {
            title: "Banana Bread",
            image: "/images/banana-bread.jpg",
            description: "A moist and delicious banana bread with walnuts.",
            ingredients: ["3 bananas", "1 cup sugar", "2 cups flour", "1 tsp baking soda", "1/2 cup walnuts"],
            instructions: "Mix ingredients, bake at 350°F for 60 minutes.",
            rating: 4.9,
        },
        {
            title: "Shrimp Scampi",
            image: "/images/shrimp-scampi.jpg",
            description: "A flavorful shrimp scampi with garlic and lemon.",
            ingredients: ["200g shrimp", "2 garlic cloves", "1 lemon", "1/4 cup butter", "Parsley"],
            instructions: "Cook shrimp with garlic and butter, add lemon juice and parsley.",
            rating: 4.7,
        },
        {
            title: "Fish Tacos",
            image: "/images/fish-tacos.jpg",
            description: "Crispy fish tacos with cabbage slaw and lime crema.",
            ingredients: ["200g fish", "8 taco shells", "Cabbage", "Lime crema"],
            instructions: "Cook fish, fill taco shells with fish, slaw, and crema.",
            rating: 4.6,
        },
        {
            title: "French Toast",
            image: "/images/french-toast.jpg",
            description: "Classic French toast served with maple syrup and powdered sugar.",
            ingredients: ["4 slices bread", "2 eggs", "1/2 cup milk", "Cinnamon", "Maple syrup"],
            instructions: "Dip bread in egg mixture, cook on griddle until golden brown.",
            rating: 4.8,
        },
        {
            title: "Tomato Soup",
            image: "/images/tomato-soup.jpg",
            description: "A creamy tomato soup with basil and a hint of garlic.",
            ingredients: ["6 tomatoes", "1 onion", "2 garlic cloves", "Basil", "Cream"],
            instructions: "Cook tomatoes, onion, and garlic, blend with basil and cream.",
            rating: 4.5,
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

