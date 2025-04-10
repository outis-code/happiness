import os
from dotenv import load_dotenv

load_dotenv()

DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_NAME', 'poultry_farm_management')
}
from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_NAME', 'poultry_farm_management')
}

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database connection
def get_db():
    return mysql.connector.connect(**DB_CONFIG)

# API Endpoints
@app.route('/api/birds/total', methods=['GET'])
def get_total_birds():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT COUNT(*) AS total FROM birds")
    result = cursor.fetchone()
    db.close()
    return jsonify(result)

@app.route('/api/vaccinations', methods=['GET', 'POST'])
def vaccinations():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    if request.method == 'GET':
        cursor.execute("SELECT * FROM vaccinations")
        result = cursor.fetchall()
        return jsonify(result)
    
    elif request.method == 'POST':
        data = request.json
        cursor.execute(
            """INSERT INTO vaccinations 
            (bird_id, vaccine_id, vaccination_date) 
            VALUES (%s, %s, %s)""",
            (data['bird_id'], data['vaccine_id'], data['date'])
        )
        db.commit()
        return jsonify({"success": True}), 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)
# Removed misplaced JavaScript code. Ensure it is placed in a separate .js file.
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://your-frontend-domain.com", "http://localhost:5500"]
    }
})
