from graph import Graph
import pickle


g = Graph()
g.addEdge("Astra", "Rich")
g.addEdge("Astra", "Richard")
g.addEdge("Astra", "Rick")
g.addEdge("Rich", "Rambo")
g.addEdge("Richard", "Adam")
g.addEdge("Richard", "Ashok")
g.addEdge("Rambo", "Rick")
g.addEdge("Rick", "Mighil")
g.addEdge("Rick", "Aravindh")
g.addEdge("Rick", "Jayesh")
g.addEdge("Rich", "Rishi")
g.addEdge("Rich", "Hareesh")
g.addEdge("Rich", "Karthi")
g.addEdge("Mighil", "Adam")
g.addEdge("Richard", "Rishi")
g.addEdge("Jayesh", "Hareesh")
g.addEdge("Ashok", "Aravindh")
g.addEdge("Rambo", "Karthi")

# friends=g.bfs("Astra")
# tr=g.friendTrie("Astra")
# pprint.pprint(tr.trie)
# print(friends)
# tr.autoComplete("Astra","R",friends)
# tr.remove("Adam")

with open('data.pkl', 'wb') as output:
    pickle.dump(g, output, pickle.HIGHEST_PROTOCOL)

