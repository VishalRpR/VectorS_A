from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, ValidationError
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict
import logging

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: list[Node]
    edges: list[Edge]

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    """
    Parse the pipeline, count nodes/edges, and check if the graph is a DAG.
    """
    try:
        nodes = pipeline.nodes
        edges = pipeline.edges

        logger.info(f"Received nodes: {nodes}")
        logger.info(f"Received edges: {edges}")

        num_nodes = len(nodes)
        num_edges = len(edges)

       
        graph = defaultdict(list)
        for edge in edges:
            graph[edge.source].append(edge.target)

        logger.info(f"Constructed graph: {dict(graph)}")

        
        is_dag_flag = is_dag(graph)

        return {
            "message": "Pipeline parsed successfully",
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_dag_flag
        }

    except ValidationError as ve:
        logger.error(f"Validation error: {ve.json()}")
        raise HTTPException(status_code=400, detail=ve.json())
    except Exception as e:
        logger.error(f"Error parsing pipeline: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

def is_dag(graph):
    """
    Detect if the graph is a Directed Acyclic Graph (DAG) using DFS.
    """
    visited = set()
    dfs_visited = set()

    def dfs(node):
        if node in dfs_visited:  
            logger.warning(f"Cycle detected at node: {node}")
            return False
        if node in visited:
            return True

        visited.add(node)
        dfs_visited.add(node)

        for neighbor in graph.get(node, []):
            if not dfs(neighbor):
                return False

        dfs_visited.remove(node)
        return True

    for node in graph:
        if node not in visited:
            if not dfs(node):
                return False

    return True
