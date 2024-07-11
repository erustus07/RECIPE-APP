#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Recipe, Comment, Favorite, Rating, Tag, recipe_tag_association

if __name__ == '__main__':
    fake = Faker()

    with app.app_context():
        print("Starting seed...")

        # Drop all tables and create them again
        db.drop_all()
        db.create_all()

        # Create users
        users = []
        for _ in range(10):
            user = User(
                name=fake.name(),
                password=fake.password()
            )
            db.session.add(user)
            users.append(user)

        # Create tags
        tags = []
        for _ in range(5):
            tag = Tag(
                name=fake.word()
            )
            db.session.add(tag)
            tags.append(tag)

        # Commit users and tags to get IDs
        db.session.commit()

        # Create recipes
        recipes = []
        for _ in range(20):
            recipe = Recipe(
                name=fake.sentence(nb_words=3),
                description=fake.paragraph(),
                ingredients=fake.text(),
                instructions=fake.text(),
                user=rc(users)  # Randomly choose a user
            )
            
            db.session.add(recipe)
            recipes.append(recipe)
        
        db.session.commit()  # Commit recipes to get IDs

        # Associate recipes with tags
        for recipe in recipes:
            num_tags = randint(1, 3)
            selected_tags = set()  # Use a set to ensure unique tags
            while len(selected_tags) < num_tags:
                selected_tags.add(rc(tags))
            for tag in selected_tags:
                stmt = recipe_tag_association.insert().values(
                    recipe_id=recipe.id,
                    tag_id=tag.id,
                    user_submittable_attribute=fake.word()  # Provide a value for user_submittable_attribute
                )
                db.session.execute(stmt)
        
        db.session.commit()  # Commit associations

        # Create comments
        for _ in range(50):
            comment = Comment(
                content=fake.sentence(),
                user=rc(users),
                recipe=rc(recipes)
            )
            db.session.add(comment)

        # Create favorites
        for _ in range(30):
            favorite = Favorite(
                user=rc(users),
                recipe=rc(recipes)
            )
            db.session.add(favorite)

        # Create ratings
        for _ in range(40):
            rating = Rating(
                score=randint(1, 5),
                user=rc(users),
                recipe=rc(recipes)
            )
            db.session.add(rating)

        db.session.commit()

        print("Seeding completed.")
