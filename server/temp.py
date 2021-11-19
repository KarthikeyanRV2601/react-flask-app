from collections import defaultdict

import pprint
class Trie:
    def __init__(self):
        self.trie=defaultdict(list)

    def insert(self,name):
        tr=self.trie
        for i in range(len(name)):
            if(name[i] not in tr):
                tr[name[i]]={}
            tr=tr[name[i]]
        tr["end"]=True

    def aComp(self,tr,user,name,friends,recom):
        names=list(tr.keys())
        for k in names:
            if(user==name):
                continue
            if(k=="end"):
                if(friends[name] not in recom):
                    recom[friends[name]]=[]
                recom[friends[name]].append(name)
                return recom
            self.aComp(tr[k],user,name+k,friends,recom)
        return recom

    def autoComplete(self,user,name,friends):
        tr=self.trie
        for i in range(len(name)):
            if(name[i] not in tr):
                print("No user found")
                return
            tr=tr[name[i]]
        recom={}
        recom=self.aComp(tr,user,name,friends,recom)
        clossness=list(recom.keys())
        #print(clossness)
        for i in clossness:
            recom[i].sort()
            for friends in recom[i]:
                print("Friend name: "+friends,"Closeness: "+str(i))

    def delete(self,tr,idx,name):
        if(idx==len(name)):
            tr.pop("end")
            return tr
        self.delete(tr[name[idx]],idx+1,name)

    def remove(self,name):
        tr=self.trie
        tr=self.delete(tr,0,name)
        pprint.pprint(tr)

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

    def friendTrie(self,name):
        tr=Trie()
        users=list(self.graph.keys())
        for i in range(len(users)):
            tr.insert(users[i])
        pprint.pprint(tr.trie)
        return tr

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
friends=g.bfs("Astra")
tr=g.friendTrie("Astra")
pprint.pprint(tr.trie)
print(friends)
tr.autoComplete("Astra","R",friends)
tr.remove("Adam")