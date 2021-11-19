from collections import defaultdict
from pprint import pprint
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
        #richard missingggGGGG
        # print("friends in acomp",friends)
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
        dataList=[]
        for i in clossness:
            recom[i].sort()
            # print("recom ",recom)
            for user in recom[i]:
                data={}
                data["user"]=user
                data["closeness"]=str(i)
                dataList.append(data)
        return dataList

    def delete(self,tr,idx,name):
        if(idx==len(name)):
            tr.pop("end")
            return tr
        self.delete(tr[name[idx]],idx+1,name)

    def remove(self,name):
        tr=self.trie
        tr=self.delete(tr,0,name)
        # pprint.pprint(tr)