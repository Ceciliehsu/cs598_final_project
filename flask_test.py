from flask import Flask, jsonify, render_template
import json
import mysql.connector

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

def get_connection():
    mydb = mysql.connector.connect(
    host="localhost",
    user="web",
    password="Abc12345678@",
    database="parking_space"
    )
    return mydb

@app.route('/get-data', methods=['GET'])
def get_data():
    mydb = get_connection()
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM Availability")  # Adjust the query to your needs
    data = mycursor.fetchall()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)