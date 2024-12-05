import { useStore } from "./store";
import axios from "axios";

export const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  async function handleSubmit() {
    try {
      console.log("Nodes: ", nodes);
      console.log("Edges: ", edges);

      const response = await axios.post(
        "http://127.0.0.1:8000/pipelines/parse",
        {
          nodes,
          edges,
        }
      );

      const { num_nodes, num_edges, is_dag } = response.data;

      alert(`
        Pipeline Analysis:
        - Number of Nodes: ${num_nodes}
        - Number of Edges: ${num_edges}
        - Is DAG: ${is_dag ? "Yes" : "No"}
      `);
    } catch (error) {
      console.error("Error parsing pipeline:", error.response);
      alert(
        "Failed to analyze the pipeline. Please check the console for details."
      );
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        type="submit"
        onClick={handleSubmit}
        style={{
          backgroundColor: "#6366F1",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        Submit
      </button>
    </div>
  );
};
