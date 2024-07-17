from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

# Association table for many-to-many relationship between Recipe and Tag
recipe_tag_association = db.Table('recipe_tag_association',
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True),
    db.Column('user_note', db.String)
)

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)  # Added email field
    password_hash = db.Column(db.String(128), nullable=False)

    # Relationships
    recipes = db.relationship('Recipe', back_populates='author')
    comments = db.relationship('Comment', back_populates='author')
    favorites = db.relationship('Favorite', back_populates='user')
    ratings = db.relationship('Rating', back_populates='user')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)

class Recipe(db.Model):
    __tablename__ = 'recipe'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Relationships
    author = db.relationship('User', back_populates='recipes')
    comments = db.relationship('Comment', back_populates='recipe', cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', back_populates='recipe', cascade='all, delete-orphan')
    ratings = db.relationship('Rating', back_populates='recipe', cascade='all, delete-orphan')
    tags = db.relationship('Tag', secondary=recipe_tag_association, back_populates='recipes')

    def __repr__(self):
        return '<Recipe {}>'.format(self.name)

class Comment(db.Model):
    __tablename__ = 'comment'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)

    # Relationships
    author = db.relationship('User', back_populates='comments')
    recipe = db.relationship('Recipe', back_populates='comments')

    def __repr__(self):
        return '<Comment {}>'.format(self.content[:20])

class Favorite(db.Model):
    __tablename__ = 'favorite'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)

    # Relationships
    user = db.relationship('User', back_populates='favorites')
    recipe = db.relationship('Recipe', back_populates='favorites')

    def __repr__(self):
        return '<Favorite user_id={} recipe_id={}>'.format(self.user_id, self.recipe_id)

class Rating(db.Model):
    __tablename__ = 'rating'
    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)

    # Relationships
    user = db.relationship('User', back_populates='ratings')
    recipe = db.relationship('Recipe', back_populates='ratings')

    def __repr__(self):
        return '<Rating {}>'.format(self.score)

class Tag(db.Model):
    __tablename__ = 'tag'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    # Relationships
    recipes = db.relationship('Recipe', secondary=recipe_tag_association, back_populates='tags')

    def __repr__(self):
        return '<Tag {}>'.format(self.name)
