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
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    return []

def save(todo):
    with open(DATA_FILE, 'w') as f:
        json.dump(todo, f, indent=4)

@app.route("/api/todo", methods=['GET'])
def get_todo():
    return jsonify(load_data())

@app.route("/api/todo", methods=["POST"])
def add_todo():
    data = request.json
    task_name = data.get('task', '').strip()
    if not task_name:
        return jsonify({"error": "Task cannot be empty"}), 400
    todo = load_data()
    new_todo = {
        "id": str(uuid.uuid4()),
        "task": task_name,
        "complete": False
    }
    todo.append(new_todo)
    save(todo)
    return jsonify(new_todo), 201

@app.route("/api/todo/<todo_id>", methods=["PUT"])  
def update_todo(todo_id):
    data = request.json
    todo = load_data()
    for task in todo:
        if task['id'] == todo_id:
            new_task = data.get('task', task["task"]).strip()
            if not new_task:
                return jsonify({"error": "Task cannot be empty"}), 400
            task['task'] = new_task
            task['complete'] = data.get('complete', task["complete"])
            save(todo)
            return jsonify(task)
    return jsonify({"error": "Task not found"}), 404

@app.route("/api/todo/<todo_id>", methods=["DELETE"])
def delete_task(todo_id):
    todo = load_data()
    for task in todo:
        if task['id'] == todo_id:
            todo.remove(task)
            save(todo)
            return jsonify({"message": "Deleted Successfully"})
    return jsonify({"error": "Task not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)
