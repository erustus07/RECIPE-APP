#!/usr/bin/env python3

# Standard library imports
from random import randint, sample

# SQLAlchemy imports
from sqlalchemy import insert 

# Local imports
from app import app, db
from models import User, Recipe, Comment, Favorite, Rating, Tag, recipe_tag_association

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")

        # Drop all tables and create them again
        db.drop_all()
        db.create_all()

        # Create users with names
        user_names = [
            'Alice', 'Bob', 'Charlie', 'Diana', 'Eve',
            'Frank', 'Grace', 'Hannah', 'Isaac', 'Julia'
        ]
        users = []
        for name in user_names:
            username = name.lower()
            email = f'{username}@example.com'
            user = User(username=username, email=email)
            user.set_password('Password123!')
            users.append(user)
            db.session.add(user)
        db.session.commit()

        # Create tags
        tag_names = [
            'healthy', 'vegetarian', 'lunch', 'dinner', 'snack',
            'breakfast', 'quick meal', 'dessert', 'seafood', 'soup',
            'spicy', 'gluten-free', 'vegan', 'low-carb', 'high-protein'
        ]
        tags = []
        for tag_name in tag_names:
            tag = Tag(name=tag_name)
            tags.append(tag)
            db.session.add(tag)
        db.session.commit()

        # Create recipes
        recipes_data = [
            {
                'title': 'Spaghetti Carbonara',
                'description': 'Classic Italian pasta dish',
                'ingredients': 'Pasta, eggs, pancetta, Parmesan cheese',
                'instructions': 'Boil pasta. Fry pancetta. Mix eggs and cheese. Combine all.',
                'user_id': 1,
                'tags': [0, 3],  # Tags indices from tag_names list
                'note': 'Classic recipe, great for family dinners.'
            },
            {
                'title': 'Chicken Curry',
                'description': 'Spicy Indian chicken dish',
                'ingredients': 'Chicken, curry paste, coconut milk, vegetables',
                'instructions': 'Cook chicken. Add curry paste and coconut milk. Simmer with vegetables.',
                'user_id': 2,
                'tags': [2, 5, 10],
                'note': 'Add extra spice for a hotter version.'
            },
            {
                'title': 'Chocolate Cake',
                'description': 'Decadent dessert for chocolate lovers',
                'ingredients': 'Flour, sugar, cocoa powder, eggs, butter',
                'instructions': 'Mix dry ingredients. Beat eggs and butter. Bake until done.',
                'user_id': 3,
                'tags': [7],
                'note': 'Top with whipped cream for serving.'
            },
            {
                'title': 'Caesar Salad',
                'description': 'Fresh and tangy salad with Caesar dressing',
                'ingredients': 'Romaine lettuce, croutons, Parmesan cheese, Caesar dressing',
                'instructions': 'Toss lettuce, croutons, and cheese. Add dressing and mix well.',
                'user_id': 4,
                'tags': [1, 4],
                'note': 'Best served chilled.'
            },
            {
                'title': 'Beef Tacos',
                'description': 'Mexican street food favorite',
                'ingredients': 'Beef, tortillas, salsa, cheese, lettuce, tomatoes',
                'instructions': 'Cook beef. Warm tortillas. Assemble tacos with beef and toppings.',
                'user_id': 5,
                'tags': [1, 3, 9],
                'note': 'Authentic recipe with a twist.'
            },
            {
                'title': 'Vegetable Stir-Fry',
                'description': 'Quick and healthy vegetable dish',
                'ingredients': 'Assorted vegetables, soy sauce, garlic, ginger',
                'instructions': 'Stir-fry vegetables with garlic and ginger. Add soy sauce and cook until tender.',
                'user_id': 6,
                'tags': [0, 6, 12],
                'note': 'Great way to use up leftover veggies.'
            },
            {
                'title': 'Cheeseburger',
                'description': 'Classic American burger with cheese',
                'ingredients': 'Beef patty, cheese, lettuce, tomato, onion, bun',
                'instructions': 'Grill or fry patty. Assemble with cheese and toppings on bun.',
                'user_id': 7,
                'tags': [3, 5],
                'note': 'Juicy and delicious.'
            },
            {
                'title': 'Pancakes',
                'description': 'Fluffy pancakes for breakfast',
                'ingredients': 'Flour, milk, eggs, butter, syrup',
                'instructions': 'Mix batter ingredients. Cook pancakes on griddle until golden brown.',
                'user_id': 8,
                'tags': [4, 5],
                'note': 'Serve hot with maple syrup.'
            },
            {
                'title': 'Caprese Salad',
                'description': 'Simple Italian salad with tomatoes and mozzarella',
                'ingredients': 'Tomatoes, mozzarella cheese, basil, olive oil, balsamic vinegar',
                'instructions': 'Slice tomatoes and cheese. Arrange with basil leaves. Drizzle with oil and vinegar.',
                'user_id': 9,
                'tags': [1, 7],
                'note': 'Use fresh ingredients for best taste.'
            },
            {
                'title': 'Sushi Rolls',
                'description': 'Japanese sushi rolls with fish and vegetables',
                'ingredients': 'Sushi rice, nori, fish (salmon/tuna), cucumber, avocado',
                'instructions': 'Prepare sushi rice. Lay out nori, add rice and fillings. Roll tightly and slice.',
                'user_id': 10,
                'tags': [8, 10],
                'note': 'Great for sushi lovers.'
            },
        ]

        for recipe_data in recipes_data:
            recipe = Recipe(
                name=recipe_data['title'],
                description=recipe_data['description'],
                ingredients=recipe_data['ingredients'],
                instructions=recipe_data['instructions'],
                user_id=recipe_data['user_id']
            )
            db.session.add(recipe)
            db.session.commit()  # Commit recipe to get recipe.id

            # Assign tags to recipes with user notes
            for tag_index in recipe_data['tags']:
                tag_name = tag_names[tag_index]
                user_note = recipe_data['note']
                recipe.tags.append(Tag.query.filter_by(name=tag_name).first())

            db.session.commit()

        # Create comments
        comments = [
            Comment(content='Delicious recipe! Loved it.', user_id=1, recipe_id=1),
            Comment(content='Easy to follow instructions.', user_id=2, recipe_id=1),
            Comment(content='Great flavor combination.', user_id=3, recipe_id=2),
            Comment(content='Perfect dessert for any occasion.', user_id=4, recipe_id=3),
            Comment(content='My family enjoyed this salad.', user_id=5, recipe_id=4),
            Comment(content='Authentic taste, just like in Mexico.', user_id=6, recipe_id=5),
            Comment(content='Healthy and satisfying meal.', user_id=7, recipe_id=6),
            Comment(content='Juicy burger, loved the cheese.', user_id=8, recipe_id=7),
            Comment(content='Best pancakes ever!', user_id=9, recipe_id=8),
            Comment(content='Simple yet so delicious.', user_id=10, recipe_id=9),
        ]
        for comment in comments:
            db.session.add(comment)
        db.session.commit()

        # Create favorites
        favorites = []
        for i in range(1, 11):
            favorite = Favorite(
                user_id=randint(1, 10),
                recipe_id=randint(1, len(recipes_data))
            )
            favorites.append(favorite)
            db.session.add(favorite)
        db.session.commit()

        # Create ratings
        ratings = []
        for i in range(1, 11):
            rating = Rating(
                score=randint(1, 5),
                user_id=randint(1, 10),
                recipe_id=randint(1, len(recipes_data))
            )
            ratings.append(rating)
            db.session.add(rating)
        db.session.commit()

        print("Seeding done!")
