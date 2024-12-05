import { Handle } from "reactflow";
import { useState } from "react";

export const BaseNode = ({
  Header,
  inputlable,
  inputvalue,
  type,
  handleInputChange,
  handleTypeChange,
  handler,
}) => {
  const [textAreaValue, setTextAreaValue] = useState(inputvalue);
  const [containerHeight, setContainerHeight] = useState(80);

  const handleTextareaChange = (e) => {
    setTextAreaValue(e.target.value);
    handleInputChange(e);
  };

  const handleTextareaResize = (e) => {
    e.target.style.height = "auto";
    const newHeight = e.target.scrollHeight;
    e.target.style.height = `${newHeight}px`;
    setContainerHeight(newHeight + 40);
  };

  return (
    <div
      style={{
        width: "200px",
        height: `${containerHeight}px`,
        border: "1px solid #B5B5FF",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "#F6F6FF",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        color: "#5E5D5D",
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
          <textarea
            value={textAreaValue}
            onChange={handleTextareaChange}
            onInput={handleTextareaResize}
            style={{
              width: "100%",
              boxSizing: "border-box",
              resize: "none",
              minHeight: "20px",
              overflow: "hidden",
            }}
            rows="1"
          />
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
        <div key={handle.key || handle.id}>
          <Handle
            type={handle.type}
            position={handle.position}
            id={handle.id}
            style={{
              ...handle.style,
              backgroundColor: "transparent",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              border: "2px solid #6366F1",
            }}
          />
        </div>
      ))}
    </div>
  );
};
