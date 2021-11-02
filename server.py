#CSC 468: Group Project
#Author: Kyle Arick Kassen
#Group Name: DataVizWhiz
#Members: Kyle Kassen, Vi Nguyen, Thang Tran, Ximan Liu
#Reference: Professor Eli T. Brown | CSC 468, Week 7 Live Lecture
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