// outputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <div
      style={{
        width: "200px",
        height: "80px",
        border: "1px solid #B5B5FF", // Light purple border
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "#F6F6FF", // Light background color
        boxShadow: "0 2px 6px #CFCFFD", // Light shadow effect
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        color: "#5E5D5D",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        style={{
          backgroundColor: "transparent", 
          width: "10px", 
          height: "10px",
          borderRadius: "50%",
          border: "2px solid #6366F1", 
        }}
      />
      <div>
        <span>Output</span>
      </div>
      <div>
        <label>
          Name:
          <input type="text" value={currName} onChange={handleNameChange} />
        </label>
        <label>
          Type:
          <select value={outputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </div>
  );
}
