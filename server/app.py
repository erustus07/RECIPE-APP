#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
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

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

# Example route
@app.route("/")
def index():
    return "<h1>Recipe Sharing Platform</h1>"


if __name__ == "__main__":
    app.run(port=5555, debug=True)