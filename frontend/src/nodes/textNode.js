// textNode.js

import { useEffect, useState } from "react";
import { Handle, Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [placeholders, setPlaceholders] = useState([]);

  useEffect(() => {
    // Extract initial placeholders from the default text
    const matches = currText.match(/\{\{(.*?)\}\}/g) || [];
    const extractedPlaceholders = matches.map((match) => match.slice(2, -2)); // Remove `{{` and `}}`
    setPlaceholders(extractedPlaceholders);
  }, []); // Run once when the component mounts

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setCurrText(inputText);

    // Extract all placeholders inside double curly braces
    const matches = inputText.match(/\{\{(.*?)\}\}/g) || [];
    const extractedPlaceholders = matches.map((match) => match.slice(2, -2)); // Remove `{{` and `}}`

    // Update the list of placeholders
    setPlaceholders(extractedPlaceholders);
  };

  return (
    <div style={{ width: 200, height: 80, border: "1px solid black" }}>
      <div>
        <span>Text</span>
      </div>
      <div>
        <label>
          Text:
          <input style={{}} type="text" value={currText} onChange={handleTextChange} />
        </label>
      </div>
      {placeholders.map((placeholder, index) => (
        <Handle
          key={`${id}-input-${placeholder}-${index}`}
          type="target"
          position={Position.Left}
          id={`${id}-input-${placeholder}`}
          style={{ top: `${30 + index * 20}px` }} // Dynamically position the handles
        />
      ))}
      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </div>
  );
};
