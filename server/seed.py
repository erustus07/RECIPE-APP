#!/usr/bin/env python3

# Standard library imports
from random import randint

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
    # Original 10 recipes...
    {
        'title': 'Spaghetti Carbonara',
        'description': 'Classic Italian pasta dish',
        'ingredients': 'Pasta, eggs, pancetta, Parmesan cheese',
        'instructions': 'Boil pasta. Fry pancetta. Mix eggs and cheese. Combine all.',
        'user_id': 1,
        'tags': [0, 3],
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
    # 50 more recipes...
    {
        'title': 'Lasagna',
        'description': 'Layered pasta dish with meat and cheese',
        'ingredients': 'Lasagna noodles, ground beef, ricotta cheese, mozzarella cheese, tomato sauce',
        'instructions': 'Layer noodles, meat, and cheese. Bake until bubbly.',
        'user_id': 11,
        'tags': [0, 3],
        'note': 'Perfect for a hearty meal.'
    },
    {
        'title': 'Margarita Pizza',
        'description': 'Classic pizza with tomatoes and mozzarella',
        'ingredients': 'Pizza dough, tomatoes, mozzarella cheese, basil, olive oil',
        'instructions': 'Top dough with tomatoes and cheese. Bake until crust is golden.',
        'user_id': 12,
        'tags': [1, 4],
        'note': 'Simple yet delicious.'
    },
    {
        'title': 'Grilled Cheese Sandwich',
        'description': 'Classic comfort food',
        'ingredients': 'Bread, butter, cheese',
        'instructions': 'Butter bread, add cheese, and grill until golden.',
        'user_id': 13,
        'tags': [3, 5],
        'note': 'Perfect with tomato soup.'
    },
    {
        'title': 'Lemon Chicken',
        'description': 'Zesty and flavorful chicken dish',
        'ingredients': 'Chicken breasts, lemon, garlic, thyme, olive oil',
        'instructions': 'Marinate chicken in lemon and herbs. Grill until cooked through.',
        'user_id': 14,
        'tags': [2, 6],
        'note': 'Great for a light dinner.'
    },
    {
        'title': 'Tiramisu',
        'description': 'Classic Italian dessert',
        'ingredients': 'Ladyfingers, mascarpone cheese, coffee, cocoa powder',
        'instructions': 'Layer ladyfingers and cheese. Chill and dust with cocoa.',
        'user_id': 15,
        'tags': [7, 8],
        'note': 'Best served chilled.'
    },
    {
        'title': 'Eggplant Parmesan',
        'description': 'Vegetarian Italian dish with eggplant and cheese',
        'ingredients': 'Eggplant, Parmesan cheese, tomato sauce, mozzarella cheese',
        'instructions': 'Layer fried eggplant with cheese and sauce. Bake until bubbly.',
        'user_id': 16,
        'tags': [0, 4],
        'note': 'Delicious and satisfying.'
    },
    {
        'title': 'Beef Stew',
        'description': 'Hearty and comforting stew with beef and vegetables',
        'ingredients': 'Beef, potatoes, carrots, onions, beef broth',
        'instructions': 'Simmer beef and vegetables in broth until tender.',
        'user_id': 17,
        'tags': [1, 5],
        'note': 'Perfect for a cold day.'
    },
    {
        'title': 'French Toast',
        'description': 'Sweet breakfast dish with bread and eggs',
        'ingredients': 'Bread, eggs, milk, cinnamon, syrup',
        'instructions': 'Dip bread in egg mixture. Cook on griddle until golden.',
        'user_id': 18,
        'tags': [4, 7],
        'note': 'Serve with fresh fruit.'
    },
    {
        'title': 'Guacamole',
        'description': 'Creamy avocado dip',
        'ingredients': 'Avocados, lime, cilantro, onion, salt',
        'instructions': 'Mash avocados and mix with other ingredients.',
        'user_id': 19,
        'tags': [1, 6],
        'note': 'Perfect with tortilla chips.'
    },
    {
        'title': 'Chicken Alfredo',
        'description': 'Creamy pasta dish with chicken and Alfredo sauce',
        'ingredients': 'Chicken, fettuccine, Alfredo sauce, Parmesan cheese',
        'instructions': 'Cook pasta and chicken. Toss with sauce and cheese.',
        'user_id': 20,
        'tags': [0, 3],
        'note': 'Rich and satisfying.'
    },
    {
        'title': 'Fruit Salad',
        'description': 'Refreshing mix of fresh fruits',
        'ingredients': 'Assorted fresh fruits, honey, lime juice',
        'instructions': 'Chop fruits and toss with honey and lime.',
        'user_id': 21,
        'tags': [1, 4],
        'note': 'Perfect for a healthy snack.'
    },
    {
        'title': 'Stuffed Peppers',
        'description': 'Bell peppers stuffed with meat and rice',
        'ingredients': 'Bell peppers, ground beef, rice, tomato sauce, cheese',
        'instructions': 'Stuff peppers with meat mixture. Bake until tender.',
        'user_id': 22,
        'tags': [2, 5],
        'note': 'Great for a complete meal.'
    },
    {
        'title': 'Apple Pie',
        'description': 'Classic American dessert with apples and cinnamon',
        'ingredients': 'Pie crust, apples, sugar, cinnamon, butter',
        'instructions': 'Fill crust with apple mixture. Bake until golden.',
        'user_id': 23,
        'tags': [7, 8],
        'note': 'Serve warm with ice cream.'
    },
    {
        'title': 'Quiche Lorraine',
        'description': 'Savory pie with eggs, cheese, and bacon',
        'ingredients': 'Pie crust, eggs, cream, bacon, cheese',
        'instructions': 'Mix filling and pour into crust. Bake until set.',
        'user_id': 24,
        'tags': [0, 3],
        'note': 'Great for brunch.'
    },
    {
        'title': 'Beef Stroganoff',
        'description': 'Russian dish with beef and creamy sauce',
        'ingredients': 'Beef, mushrooms, onions, sour cream, egg noodles',
        'instructions': 'Cook beef and mushrooms. Add sour cream and serve over noodles.',
        'user_id': 25,
        'tags': [1, 5],
        'note': 'Rich and hearty.'
    },
    {
        'title': 'Clam Chowder',
        'description': 'Creamy soup with clams and potatoes',
        'ingredients': 'Clams, potatoes, onions, cream, bacon',
        'instructions': 'Cook clams and vegetables. Add cream and simmer.',
        'user_id': 26,
        'tags': [2, 6],
        'note': 'Best served with crusty bread.'
    },
    {
        'title': 'Fried Rice',
        'description': 'Quick and easy dish with rice and vegetables',
        'ingredients': 'Rice, vegetables, soy sauce, eggs, garlic',
        'instructions': 'Stir-fry rice and vegetables with soy sauce and eggs.',
        'user_id': 27,
        'tags': [0, 6],
        'note': 'Perfect for using leftover rice.'
    },
    {
        'title': 'Fish Tacos',
        'description': 'Mexican-style tacos with fish and toppings',
        'ingredients': 'Fish fillets, tortillas, cabbage, salsa, lime',
        'instructions': 'Cook fish. Assemble tacos with fish and toppings.',
        'user_id': 28,
        'tags': [1, 3],
        'note': 'Light and flavorful.'
    },
    {
        'title': 'Bruschetta',
        'description': 'Italian appetizer with tomatoes and basil',
        'ingredients': 'Baguette, tomatoes, basil, garlic, olive oil',
        'instructions': 'Top toasted bread with tomato mixture.',
        'user_id': 29,
        'tags': [1, 7],
        'note': 'Great for entertaining.'
    },
    {
        'title': 'Banana Bread',
        'description': 'Moist and sweet bread with bananas',
        'ingredients': 'Bananas, flour, sugar, eggs, butter',
        'instructions': 'Mix ingredients and bake until golden.',
        'user_id': 30,
        'tags': [4, 8],
        'note': 'Perfect for breakfast or snack.'
    },
    {
        'title': 'Chili',
        'description': 'Spicy stew with meat and beans',
        'ingredients': 'Ground beef, beans, tomatoes, chili powder, onions',
        'instructions': 'Simmer all ingredients until flavors blend.',
        'user_id': 31,
        'tags': [2, 5],
        'note': 'Top with cheese and sour cream.'
    },
    {
        'title': 'Pad Thai',
        'description': 'Thai noodle dish with peanuts and vegetables',
        'ingredients': 'Rice noodles, tofu, peanuts, bean sprouts, lime',
        'instructions': 'Stir-fry noodles with tofu and vegetables. Top with peanuts.',
        'user_id': 32,
        'tags': [0, 6],
        'note': 'Tart and flavorful.'
    },
    {
        'title': 'Meatloaf',
        'description': 'Classic American dish with ground beef',
        'ingredients': 'Ground beef, breadcrumbs, eggs, ketchup, onions',
        'instructions': 'Mix ingredients and bake until cooked through.',
        'user_id': 33,
        'tags': [1, 5],
        'note': 'Great for family dinners.'
    },
    {
        'title': 'Gazpacho',
        'description': 'Cold Spanish soup with tomatoes and cucumbers',
        'ingredients': 'Tomatoes, cucumbers, bell peppers, onions, olive oil',
        'instructions': 'Blend all ingredients and chill before serving.',
        'user_id': 34,
        'tags': [2, 6],
        'note': 'Refreshing and light.'
    },
    {
        'title': 'Brownies',
        'description': 'Rich chocolate dessert',
        'ingredients': 'Chocolate, butter, sugar, eggs, flour',
        'instructions': 'Mix ingredients and bake until set.',
        'user_id': 35,
        'tags': [4, 8],
        'note': 'Serve with ice cream.'
    },
    {
        'title': 'Roast Chicken',
        'description': 'Classic roast chicken with herbs',
        'ingredients': 'Whole chicken, rosemary, garlic, lemon, olive oil',
        'instructions': 'Season chicken and roast until golden and cooked through.',
        'user_id': 36,
        'tags': [0, 3],
        'note': 'Juicy and flavorful.'
    },
    {
        'title': 'Pumpkin Soup',
        'description': 'Creamy soup with pumpkin and spices',
        'ingredients': 'Pumpkin, cream, onions, garlic, nutmeg',
        'instructions': 'Cook pumpkin and blend with other ingredients.',
        'user_id': 37,
        'tags': [2, 6],
        'note': 'Perfect for fall.'
    },
    {
        'title': 'Shrimp Scampi',
        'description': 'Garlicky shrimp dish with pasta',
        'ingredients': 'Shrimp, garlic, lemon, butter, pasta',
        'instructions': 'Cook shrimp with garlic and lemon. Toss with pasta.',
        'user_id': 38,
        'tags': [1, 3],
        'note': 'Light and tasty.'
    },
    {
        'title': 'Minestrone',
        'description': 'Italian vegetable soup with pasta',
        'ingredients': 'Vegetables, pasta, beans, tomatoes, broth',
        'instructions': 'Simmer all ingredients until tender.',
        'user_id': 39,
        'tags': [0, 6],
        'note': 'Hearty and filling.'
    },
    {
        'title': 'Beef Wellington',
        'description': 'Beef wrapped in pastry with mushrooms',
        'ingredients': 'Beef tenderloin, puff pastry, mushrooms, mustard',
        'instructions': 'Wrap beef and mushrooms in pastry. Bake until golden.',
        'user_id': 40,
        'tags': [2, 5],
        'note': 'Elegant and impressive.'
    },
    {
        'title': 'Omelette',
        'description': 'Egg dish with cheese and vegetables',
        'ingredients': 'Eggs, cheese, bell peppers, onions, mushrooms',
        'instructions': 'Cook eggs and fold in cheese and vegetables.',
        'user_id': 41,
        'tags': [4, 7],
        'note': 'Quick and easy.'
    },
    {
        'title': 'Baked Ziti',
        'description': 'Pasta dish with tomato sauce and cheese',
        'ingredients': 'Ziti, tomato sauce, ricotta cheese, mozzarella cheese',
        'instructions': 'Mix pasta and sauce. Top with cheese and bake.',
        'user_id': 42,
        'tags': [0, 3],
        'note': 'Perfect for a crowd.'
    },
    {
        'title': 'Spinach Salad',
        'description': 'Healthy salad with spinach and berries',
        'ingredients': 'Spinach, strawberries, almonds, feta cheese, balsamic vinaigrette',
        'instructions': 'Toss all ingredients together.',
        'user_id': 43,
        'tags': [1, 6],
        'note': 'Light and refreshing.'
    },
    {
        'title': 'Barbecue Ribs',
        'description': 'Tender ribs with barbecue sauce',
        'ingredients': 'Pork ribs, barbecue sauce, spices',
        'instructions': 'Cook ribs until tender. Baste with sauce and grill.',
        'user_id': 44,
        'tags': [2, 5],
        'note': 'Sticky and delicious.'
    },
    {
        'title': 'Hummus',
        'description': 'Creamy dip with chickpeas and tahini',
        'ingredients': 'Chickpeas, tahini, garlic, lemon, olive oil',
        'instructions': 'Blend all ingredients until smooth.',
        'user_id': 45,
        'tags': [0, 6],
        'note': 'Great with pita bread.'
    },
    {
        'title': 'Chicken Parmesan',
        'description': 'Breaded chicken with tomato sauce and cheese',
        'ingredients': 'Chicken breasts, breadcrumbs, tomato sauce, mozzarella cheese',
        'instructions': 'Bread and fry chicken. Top with sauce and cheese. Bake until bubbly.',
        'user_id': 46,
        'tags': [1, 3],
        'note': 'Classic Italian dish.'
    },
    {
        'title': 'Cornbread',
        'description': 'Southern bread with cornmeal',
        'ingredients': 'Cornmeal, flour, sugar, eggs, milk',
        'instructions': 'Mix ingredients and bake until golden.',
        'user_id': 47,
        'tags': [4, 8],
        'note': 'Perfect side dish.'
    },
    {
        'title': 'Lasagna',
        'description': 'Layered pasta dish with meat and cheese',
        'ingredients': 'Lasagna noodles, ground beef, ricotta cheese, tomato sauce, mozzarella cheese',
        'instructions': 'Layer ingredients and bake until bubbly.',
        'user_id': 48,
        'tags': [0, 3],
        'note': 'Comfort food at its best.'
    },
    {
        'title': 'Fruit Salad',
        'description': 'Refreshing mix of fruits',
        'ingredients': 'Assorted fruits, honey, mint',
        'instructions': 'Mix fruits and drizzle with honey.',
        'user_id': 49,
        'tags': [1, 6],
        'note': 'Perfect for a summer day.'
    },
    {
        'title': 'Peking Duck',
        'description': 'Chinese roast duck with crispy skin',
        'ingredients': 'Duck, soy sauce, hoisin sauce, pancakes, scallions',
        'instructions': 'Roast duck until skin is crispy. Serve with pancakes and sauce.',
        'user_id': 50,
        'tags': [2, 5],
        'note': 'Impressive and flavorful.'
    },
    {
        'title': 'Greek Salad',
        'description': 'Salad with cucumbers, tomatoes, and feta cheese',
        'ingredients': 'Cucumbers, tomatoes, olives, feta cheese, olive oil',
        'instructions': 'Toss all ingredients together.',
        'user_id': 51,
        'tags': [1, 6],
        'note': 'Healthy and delicious.'
    },
    {
        'title': 'Chicken Pot Pie',
        'description': 'Savory pie with chicken and vegetables',
        'ingredients': 'Pie crust, chicken, carrots, peas, cream',
        'instructions': 'Mix filling and pour into crust. Bake until golden.',
        'user_id': 52,
        'tags': [0, 3],
        'note': 'Comforting and hearty.'
    },
    {
        'title': 'Eggplant Parmesan',
        'description': 'Breaded eggplant with tomato sauce and cheese',
        'ingredients': 'Eggplant, breadcrumbs, tomato sauce, mozzarella cheese',
        'instructions': 'Bread and fry eggplant. Top with sauce and cheese. Bake until bubbly.',
        'user_id': 53,
        'tags': [1, 3],
        'note': 'Delicious vegetarian dish.'
    },
    {
        'title': 'French Toast',
        'description': 'Sweet breakfast dish with bread and eggs',
        'ingredients': 'Bread, eggs, milk, cinnamon, syrup',
        'instructions': 'Dip bread in egg mixture and cook until golden.',
        'user_id': 54,
        'tags': [4, 8],
        'note': 'Serve with fresh fruit.'
    },
    {
        'title': 'Shepherd\'s Pie',
        'description': 'Savory pie with meat and mashed potatoes',
        'ingredients': 'Ground lamb, mashed potatoes, vegetables, gravy',
        'instructions': 'Layer meat and vegetables with mashed potatoes. Bake until golden.',
        'user_id': 55,
        'tags': [2, 5],
        'note': 'Hearty and filling.'
    }
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
                tag = Tag.query.filter_by(name=tag_name).first()
                # Check if association already exists
                existing_association = db.session.query(recipe_tag_association).filter_by(recipe_id=recipe.id, tag_id=tag.id).first()
                if not existing_association:
                    association = recipe_tag_association.insert().values(recipe_id=recipe.id, tag_id=tag.id, user_note=user_note)
                    db.session.execute(association)
            
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
