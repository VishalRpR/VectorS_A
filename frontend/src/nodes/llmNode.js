// llmNode.js

import { Handle, Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {

  return (
    <div
      style={{
        width: "200px",
        height: "80px",
        border: "1px solid #B5B5FF", // Light purple border
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "#F6F6FF", // Light background color
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)", // Light shadow effect
        fontFamily: "Arial, sans-serif", // Font style
        fontSize: "14px",
        color: "#5E5D5D", // Text color
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{ top: `${100 / 3}%` }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ top: `${200 / 3}%` }}
      />
      <div>
        <span>LLM</span>
      </div>
      <div>
        <span>This is a LLM.</span>
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-response`} />
    </div>
  );
}
