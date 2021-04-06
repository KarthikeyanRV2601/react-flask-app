from flask import Flask, render_template, redirect, url_for, request, jsonify
import sys
import pickle
from utils.utility import minDistance, printSolution
# from graph import Graph
app = Flask(__name__)
credentials={
    "Mighil":"mighil",
    "Karthi":"karthi",
    "Likith":"likith",
    "Tanmaay":"tanmaay",
    "Vishaal":"vishaal",
    "Rishi":"rishi",
    "Sanjheevi":"sanjheevi",
}
Username=""

with open('data.pkl', 'rb') as input:
    g = pickle.load(input)

# print(g.getFriends("Ass"))

# print(len(g.graph))
# for x in g.graph.keys():
#     print(x)
@app.route('/friends/<string:name>', methods=['GET'])
def friends(name):
    return jsonify({
        'friends': g.getFriends(name)
    })

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    print(data)
    keys = credentials.keys()
    if data["user_name"] not in keys:
        return jsonify({
            'status': 'failure'
        })
    actual = credentials[data["user_name"]]
    if(actual == data["password"]):
        return jsonify({
            'status': "success"
        })
    return jsonify({
        'status': 'failure'
    })

@app.route('/add', methods=['POST'])
def addFriend():
    data = request.json
    if(g.addEdge(data["u"], data["v"]) == 1):
        with open('data.pkl', 'wb') as output:
            pickle.dump(g, output, pickle.HIGHEST_PROTOCOL)
        return jsonify(data)
    return jsonify({ "msg": "They are already friends"})

@app.route('/mutual', methods=['POST'])
def mutual():
    data = request.json
    number_map = {}
    i = 0
    queue = []
    num_nodes = len(g.graph)

    dist = {}
    parent = {}
    for x in g.graph.keys():
        number_map[i] = x
        dist[x] = float('inf')
        queue.append(x)
        parent[x] = -1
        i += 1
    # print("Parent")
    # print(parent)
    dist[data['src']] = 0 
    # print("dist")
    # print(dist) 
    # print(number_map)
    # print(dist)

    while(queue):

        u = minDistance(dist, queue, number_map)
        print(u)
        queue.remove(u)

        for x in g.getFriends(u):
            if(x in queue):
                if(dist[u] + 1) < dist[x]:
                    dist[x] = dist[u] + 1
                    parent[x] = u
    # print(parent)
    friends = printSolution(dist, parent, data['src'])
    # print(friends)
    # print(dist)
    return jsonify(friends)

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         Username = request.form['username']
        
#         Password=request.form['password']
#         if(credentials[Username]==Password):
#             return render_template('index.html', name=Username) 
        
#     return render_template('login.html')

if __name__== '__main__':
    app.run()
