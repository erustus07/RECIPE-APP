from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Table, Column, Integer, ForeignKey

from config import db

# Models go here!

#Association table for the many-to-many relationship
recipe_tag_association = Table('recipe_tag', db.Model.metadata,
    Column('recipe_id', Integer, ForeignKey('recipe.id'), primary_key=True),
    Column('tag_id', Integer, ForeignKey('tag.id'), primary_key=True),
    Column('user_submittable_attribute', db.String, nullable=False)
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    recipes = db.relationship('Recipe', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')
    favorites = db.relationship('Favorite', back_populates='user')
    ratings = db.relationship('Rating', back_populates='user')

class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipe'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    user = db.relationship('User', back_populates='recipes')
    comments = db.relationship('Comment', back_populates='recipe')
    favorites = db.relationship('Favorite', back_populates='recipe')
    ratings = db.relationship('Rating', back_populates='recipe')
    tags = db.relationship('Tag', secondary=recipe_tag_association, back_populates='recipes')

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comment'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)

    user = db.relationship('User', back_populates='comments')
    recipe = db.relationship('Recipe', back_populates='comments')

class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorite'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)

    user = db.relationship('User', back_populates='favorites')
    recipe = db.relationship('Recipe', back_populates='favorites')

class Rating(db.Model, SerializerMixin):
    __tablename__ = 'rating'

    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)

    user = db.relationship('User', back_populates='ratings')
    recipe = db.relationship('Recipe', back_populates='ratings')

class Tag(db.Model, SerializerMixin):
    __tablename__ = 'tag'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    recipes = db.relationship('Recipe', secondary=recipe_tag_association, back_populates='tags')