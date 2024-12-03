// inputNode.js
import { Handle, Position } from "reactflow";

export const BaseNode = ({
  Header,
  inputlable,
  inputvalue,
  type,
  handleInputChange,
  handleTypeChange,
  handler,
}) => {


    console.log(handler[0])
  return (
    <div
      style={{
        width: "200px",
        height: "px",
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
        <span>{Header}</span>
      </div>
      <div>
        <label>
          {inputlable}
          <input type="text" value={inputvalue} onChange={handleInputChange} />
        </label>
        {type ? (
          <label>
            {"Type"}:
            <select value={type} onChange={handleTypeChange}>
              <option value="Text">Text</option>
              <option value="File">File</option>
            </select>
          </label>
        ) : (
          <div></div>
        )}
      </div>

      {handler.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}
    </div>
  );
};
