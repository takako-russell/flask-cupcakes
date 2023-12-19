"""Flask app for Cupcakes"""
from flask import Flask,render_template,redirect,request,flash,jsonify,url_for
from models import db,Cupcake,connect_db
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'abdfasdfasdf'
app.config['CORS_HEADERS'] = 'Content-Type'

connect_db(app)
# app.app_context().push()
# db.create_all()


@app.route("/")
def show_cupcakes():
    
    
    return render_template("show_cupcakes.html")



@app.route("/api/cupcakes")
def get_all_cupcakes():    
    
    cupcakes = [c.serialize() for c in Cupcake.query.all()]
 
    return jsonify(cupcakes=cupcakes)


@app.route("/api/cupcakes/<int:cupcake_id>")
def get_cupcake(cupcake_id):
    
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    
    return render_template("edit_form.html",cupcake=cupcake)
    
    
@app.route("/api/cupcakes", methods=["POST"])
def create_cupcake():
    data = request.json
    
    new_cupcake = Cupcake(flavor = data["flavor"],size = data["size"],rating = data["rating"],image=data['image'] or None)
    db.session.add(new_cupcake)
    db.session.commit()
    
    return (jsonify(cupcake = new_cupcake.serialize()),201)


@app.route("/api/cupcakes/<int:cupcake_id>", methods=["PATCH"])
@cross_origin()
def patch_cupcake(cupcake_id):
    
    data = request.json
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    
    cupcake.flavor = data["flavor"]
    cupcake.size = data["size"]
    cupcake.rating = data["rating"]
    cupcake.image = data["image"]
    
    db.session.add(cupcake)
    db.session.commit()
    
    return jsonify(cupcake=cupcake.serialize())
    
    
@app.route("/api/cupcakes/<int:cupcake_id>", methods=["DELETE"])
def delete_cupcake(cupcake_id):
    
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    
    db.session.delete(cupcake)
    db.session.commit()
    
    return jsonify(message = "deleted")