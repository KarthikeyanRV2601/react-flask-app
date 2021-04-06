from collections import defaultdict
class Graph:
    def __init__(self):
        self.graph = defaultdict(list)

    def addEdge(self,u,v):
        if v not in self.graph[u]:
            self.graph[u].append(v)
            self.graph[v].append(u)
            return 1
        return -1

    def printGraph(self):
        print(self.graph)

    def getFriends(self, u):
        return self.graph[u]