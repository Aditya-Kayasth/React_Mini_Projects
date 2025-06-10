from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid
import json 
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = 'data.json'
def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE,'r') as f:
            return json.load(f)

    return []

todo = load_data()

def save(todo):
    with open(DATA_FILE,'w') as f:
        json.dump(todo,f, indent=4)

# Show Todo
@app.route("/api/todo", methods=['GET'])
def get_todo():
    return jsonify(todo)

# Add Todo
@app.route("/api/todo", methods=["POST"])
def add_todo():
    data = request.json
    new_todo = {
        "id": str(uuid.uuid4()),
        "task": data.get('task', ""),   
        "complete": False
    }
    todo.append(new_todo)
    save(todo)
    return jsonify(new_todo), 201

# Update Todo
@app.route("/api/todo/<todo_id>", methods=["PUT"])  
def update_todo(todo_id):
    data = request.json
    for task in todo:
        if task['id'] == todo_id:
            task['task'] = data.get('task', task["task"])           
            task['complete'] = data.get('complete', task["complete"]) 
            save(todo)# 
            return jsonify(task)
    return jsonify({"error": "Task not found"}), 404

# Delete Todo 
@app.route("/api/todo/<todo_id>", methods=["DELETE"])
def delete_task(todo_id):
    for task in todo:
        if task['id'] == todo_id:
            todo.remove(task)
            save(todo)
            return jsonify({"message": "Deleted Successfully"})
    return jsonify({"error": "Task not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)
