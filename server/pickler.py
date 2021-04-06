from graph import Graph
import pickle


g = Graph()
g.addEdge("Mighil", "Karthi")
g.addEdge("Mighil", "Likith")
g.addEdge("Mighil", "Tanmaay")
g.addEdge("Karthi", "Kirthi")
g.addEdge("Likith", "Vaibhav")
g.addEdge("Likith", "Ashok")
g.addEdge("Kirthi", "Tanmaay")
g.addEdge("Tanmaay", "Vishaal")
g.addEdge("Tanmaay", "Aravind")
g.addEdge("Tanmaay", "Jayesh")
g.addEdge("Karthi", "Rishi")
g.addEdge("Karthi", "Sanjheevi")
g.addEdge("Karthi", "Ramanish")
g.addEdge("Vishaal", "Vaibhav")
g.addEdge("Likith", "Rishi")
g.addEdge("Jayesh", "Sanjheevi")
g.addEdge("Ashok", "Aravind")
g.addEdge("Kirthi", "Ramanish")

with open('data.pkl', 'wb') as output:
    pickle.dump(g, output, pickle.HIGHEST_PROTOCOL)

