// inputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
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
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)", // Light shadow effect
        fontFamily: "Arial, sans-serif", // Font style
        fontSize: "14px",
        color: "#5E5D5D", // Text color
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <span>Input</span>
      </div>
      <div>
        <label>
          Name:
          <input type="text" value={currName} onChange={handleNameChange} />
        </label>
        <label>
          Type:
          <select value={inputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-value`} />
    </div>
  );
}
