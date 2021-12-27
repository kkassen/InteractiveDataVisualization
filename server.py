#Author: Kyle Arick Kassen
#Reference: Professor Eli T. Brown, DePaul University
#instructions:
    #1) open terminal under directory
    #2) $set FLASK_APP= server.py
    #3) $python -m flask run
    #4) type in browser: http://localhost:5000/filename.html

from flask import Flask, send_from_directory
app = Flask(__name__)

@app.route('/<path:path>')
def startup(path):
    return send_from_directory('.', path)
