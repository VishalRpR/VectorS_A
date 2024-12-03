from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict
import logging

app = FastAPI()

# Add middleware for CORS handling
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, adjust as necessary
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods, adjust as necessary
    allow_headers=["*"],  # Allow all headers
)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Define the structure of the incoming data
class Pipeline(BaseModel):
    nodes: list
    edges: list

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    logger.info("Parsing pipeline...")

    try:
        nodes = pipeline.nodes
        edges = pipeline.edges

        logger.debug(f"Nodes: {nodes}")
        logger.debug(f"Edges: {edges}")

        num_nodes = len(nodes)
        num_edges = len(edges)

        # Check if the graph is a DAG
        def is_dag(edges):
            try:
                graph = defaultdict(list)

                # Build the graph from edges
                for edge in edges:
                    graph[edge["source"]].append(edge["target"])

                visited = set()
                rec_stack = set()

                def dfs(node):
                    if node in rec_stack:
                        logger.debug(f"Cycle detected at node {node}")
                        return False
                    if node in visited:
                        return True

                    visited.add(node)
                    rec_stack.add(node)

                    neighbors = list(graph[node])

                    for neighbor in neighbors:
                        if not dfs(neighbor):
                            return False

                    rec_stack.remove(node)
                    return True

                # Perform DFS for each node in the graph
                for node in nodes:
                    if node not in visited:
                        if not dfs(node):
                            logger.debug(f"Graph is not a DAG due to cycle in node {node}")
                            return False

                return True

            except Exception as e:
                logger.error(f"Error while checking DAG: {str(e)}")
                raise HTTPException(status_code=500, detail="Internal server error during DAG check")

        is_dag_result = is_dag(edges)

        logger.info(f"Graph is a DAG: {is_dag_result}")

        return {
            "num_nodes": num_nodes,
            "num_edges": num_edges,
            "is_dag": is_dag_result
        }
    
    except Exception as e:
        logger.error(f"Error processing pipeline: {str(e)}")
        raise HTTPException(status_code=400, detail="Failed to analyze the pipeline")

