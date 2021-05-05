from flask import Flask, render_template, redirect, url_for, request, jsonify
from bs4 import BeautifulSoup
import requests
import sys
import pickle
from utils.utility import minDistance, printSolution, credentials, userDp



app = Flask(__name__)


with open('data.pkl', 'rb') as input:
    g = pickle.load(input)

@app.route('/friends/<string:name>', methods=['GET'])
def friends(name):
    return jsonify({
        'friends': g.getFriends(name)
    })

@app.route('/get_dp', methods=['GET'])
def get_dp():
    return jsonify(userDp)


@app.route('/login', methods=['POST'])
def login():
    data = request.json
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

@app.route('/feed', methods=['GET'])
def getFeed():
    Datas=[]
    url="https://unsplash.com/s/photos/landscapes"
    html_doc = requests.get(url).text
    soup = BeautifulSoup(html_doc,'html.parser')
    images=soup.find_all('img',{"class":"_2UpQX"})
    url="https://www.briantracy.com/blog/personal-success/26-motivational-quotes-for-success/"
    html_doc = requests.get(url).text
    soup = BeautifulSoup(html_doc,'html.parser')
    quotes=soup.find_all('h3')
    for i in range(min(len(images),len(quotes))):
        temp={}
        temp['src'] = images[i].get('src')
        tempText= quotes[i].text[3:].replace("”","")
        tempText= tempText.replace("“","")
        if '–' in tempText:
            tempText=tempText[:tempText.index('–')]
        temp['quote']=tempText
        Datas.append(temp)

    
    return jsonify(Datas)


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

    dist[data['src']] = 0 


    while(queue):

        u = minDistance(dist, queue, number_map)
        print(u)
        queue.remove(u)

        for x in g.getFriends(u):
            if(x in queue):
                if(dist[u] + 1) < dist[x]:
                    dist[x] = dist[u] + 1
                    parent[x] = u

    friends = printSolution(dist, parent, data['src'])

    return jsonify(friends)


if __name__== '__main__':
    app.run()
