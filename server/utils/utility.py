
def minDistance(dist,queue, number_map):
    # Initialize min value and min_index as -1
    minimum = float("Inf")
    min_index = ""
        
    # from the dist array,pick one which
    # has min value and is till in queue
    for key in dist.keys():
        if dist[key] < minimum and key in queue:
            minimum = dist[key]
            min_index = key
    return min_index

pathList = []
def printSolution(dist, parent, src):
    global pathList
    print("Vertex \t\tDistance from Source\tPath")
    friends = {}
    for i in dist.keys():
        # print("\n%s --> %s \t\t%d \t\t\t\t\t" % (src, i, dist[i]), end = ' ')
        printPath(parent,i)
        # print('\n')
        friends[i] = pathList
        pathList = []
    # print(friends)
    return friends
    
def printPath(parent, j):
    global pathList
    #Base Case : If j is source
    if parent[j] == -1 : 
        # print(j, end=' ')
        pathList.append(j)
        return
    printPath(parent , parent[j])
    # print(j, end=' ')
    pathList.append(j)