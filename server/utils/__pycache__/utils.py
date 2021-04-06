
def minDistance(dist,queue, number_map):
    # Initialize min value and min_index as -1
    minimum = float("Inf")
    min_index = -1
        
    # from the dist array,pick one which
    # has min value and is till in queue
    for i in range(len(dist)):
        if dist[i] < minimum and numberi in queue:
            minimum = dist[i]
            min_index = i
    return min_index