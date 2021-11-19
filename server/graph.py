from collections import defaultdict
from trie import Trie
import pprint

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

    def bfs(self,name):
        q=[]
        visited={}
        names=list(self.graph.keys())
        friends={}
        for i in range(len(names)):
            visited[names[i]]=-1
        q.append(name)
        visited[name]=0
        while(len(q)>0):
            adj=self.graph[q[0]]
            for i in range(len(adj)):
                if(visited[adj[i]]==-1):
                    visited[adj[i]]=visited[q[0]]+1
                    q.append(adj[i])
                    print("Friend: "+adj[i]+", Closeness: "+str(visited[adj[i]]))
                    friends[adj[i]]=visited[q[0]]+1
            q.pop(0)
        return friends

    def friendTrie(self):
        tr=Trie()
        users=list(self.graph.keys())
        for i in range(len(users)):
            tr.insert(users[i])
        pprint.pprint(tr.trie)
        return tr