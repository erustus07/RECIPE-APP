#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
import os

# Local imports
from models import db, User, Recipe, Comment, Favorite, Rating, Tag

# Define the base directory
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# Define the database URI
DATABASE_URI = os.environ.get("DATABASE_URI", f"sqlite:///{os.path.join(BASE_DIR, 'instance', 'app.db')}")

# Instantiate the Flask app
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

bcrypt = Bcrypt(app)

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

@app.route('/')
def home():
    return "Welcome to the Recipe Sharing Platform!"


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('name') or not data.get('password'):
        return jsonify({"message": "Invalid input"}), 400

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(name=data['name'], password=hashed_password)
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User registered successfully!"}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "Username already exists"}), 409

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('name') or not data.get('password'):
        return jsonify({"message": "Invalid input"}), 400

    user = User.query.filter_by(name=data['name']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({"message": "Login successful"}), 200

    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def manage_user(user_id):
    user = User.query.get_or_404(user_id)

    if request.method == 'GET':
        return jsonify({
            'name': user.name,
        })

    if request.method == 'PUT':
        data = request.get_json()
        if not data or not data.get('name'):
            return jsonify({"message": "Invalid input"}), 400

        user.name = data['name']
        db.session.commit()
        return jsonify({"message": "User updated successfully"}), 200

    if request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"}), 200

@app.route('/recipes', methods=['POST', 'GET'])
def manage_recipes():
    if request.method == 'POST':
        data = request.get_json()
        if not data or not data.get('name') or not data.get('description') or not data.get('ingredients') or not data.get('instructions'):
            return jsonify({"message": "Invalid input"}), 400

        new_recipe = Recipe(
            name=data['name'],
            description=data['description'],
            ingredients=data['ingredients'],
            instructions=data['instructions'],
            user_id=data['user_id']  # Note: This should be managed by the system, not user input
        )
        db.session.add(new_recipe)
        db.session.commit()
        return jsonify({"message": "Recipe created successfully!"}), 201

    if request.method == 'GET':
        search = request.args.get('search')
        if search:
            recipes = Recipe.query.filter(Recipe.name.ilike(f'%{search}%')).all()
        else:
            recipes = Recipe.query.all()
        return jsonify([{
            'id': recipe.id,
            'name': recipe.name,
            'description': recipe.description,
            'ingredients': recipe.ingredients,
            'instructions': recipe.instructions
        } for recipe in recipes])

@app.route('/recipes/<int:recipe_id>', methods=['GET', 'PUT', 'DELETE'])
def manage_single_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)

    if request.method == 'GET':
        return jsonify({
            'name': recipe.name,
            'description': recipe.description,
            'ingredients': recipe.ingredients,
            'instructions': recipe.instructions
        })

    if request.method == 'PUT':
        data = request.get_json()
        if not data or not data.get('name') or not data.get('description') or not data.get('ingredients') or not data.get('instructions'):
            return jsonify({"message": "Invalid input"}), 400

        recipe.name = data['name']
        recipe.description = data['description']
        recipe.ingredients = data['ingredients']
        recipe.instructions = data['instructions']
        db.session.commit()
        return jsonify({"message": "Recipe updated successfully"}), 200

    if request.method == 'DELETE':
        db.session.delete(recipe)
        db.session.commit()
        return jsonify({"message": "Recipe deleted successfully"}), 200

@app.route('/comments', methods=['POST', 'GET'])
def manage_comments():
    if request.method == 'POST':
        data = request.get_json()
        if not data or not data.get('content') or not data.get('recipe_id'):
            return jsonify({"message": "Invalid input"}), 400

        new_comment = Comment(
            content=data['content'],
            user_id=data['user_id'],  # Note: This should be managed by the system, not user input
            recipe_id=data['recipe_id']
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify({"message": "Comment created successfully!"}), 201

    if request.method == 'GET':
        comments = Comment.query.all()
        return jsonify([{
            'id': comment.id,
            'content': comment.content,
            'user_id': comment.user_id,
            'recipe_id': comment.recipe_id
        } for comment in comments])

@app.route('/comments/<int:comment_id>', methods=['GET', 'PUT', 'DELETE'])
def manage_single_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)

    if request.method == 'GET':
        return jsonify({
            'content': comment.content,
            'user_id': comment.user_id,
            'recipe_id': comment.recipe_id
        })

    if request.method == 'PUT':
        data = request.get_json()
        if not data or not data.get('content'):
            return jsonify({"message": "Invalid input"}), 400

        comment.content = data['content']
        db.session.commit()
        return jsonify({"message": "Comment updated successfully"}), 200

    if request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()
        return jsonify({"message": "Comment deleted successfully"}), 200

@app.route('/tags', methods=['POST', 'GET'])
def manage_tags():
    if request.method == 'POST':
        data = request.get_json()
        if not data or not data.get('name'):
            return jsonify({"message": "Invalid input"}), 400

        new_tag = Tag(name=data['name'])
        db.session.add(new_tag)
        db.session.commit()
        return jsonify({"message": "Tag created successfully!"}), 201

    if request.method == 'GET':
        tags = Tag.query.all()
        return jsonify([{'id': tag.id, 'name': tag.name} for tag in tags])

@app.route('/favorites', methods=['POST', 'GET'])
def manage_favorites():
    if request.method == 'POST':
        data = request.get_json()
        if not data or not data.get('recipe_id'):
            return jsonify({"message": "Invalid input"}), 400

        new_favorite = Favorite(user_id=data['user_id'], recipe_id=data['recipe_id'])  # Note: This should be managed by the system, not user input
        db.session.add(new_favorite)
        db.session.commit()
        return jsonify({"message": "Favorite added successfully!"}), 201

    if request.method == 'GET':
        favorites = Favorite.query.all()
        return jsonify([{
            'id': favorite.id,
            'recipe_id': favorite.recipe_id
        } for favorite in favorites])

@app.route('/ratings', methods=['POST', 'GET'])
def manage_ratings():
    if request.method == 'POST':
        data = request.get_json()
        if not data or not data.get('score') or not data.get('recipe_id'):
            return jsonify({"message": "Invalid input"}), 400

        new_rating = Rating(score=data['score'], user_id=data['user_id'], recipe_id=data['recipe_id'])  # Note: This should be managed by the system, not user input
        db.session.add(new_rating)
        db.session.commit()
        return jsonify({"message": "Rating added successfully!"}), 201

    if request.method == 'GET':
        ratings = Rating.query.all()
        return jsonify([{
            'id': rating.id,
            'score': rating.score,
            'user_id': rating.user_id,
            'recipe_id': rating.recipe_id
        } for rating in ratings])

if __name__ == '__main__':
    app.run(port=5555)
