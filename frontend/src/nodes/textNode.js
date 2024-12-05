import { useEffect, useState, useMemo } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [placeholders, setPlaceholders] = useState([]);

  // Use useMemo to compute handlers only when placeholders change
  const handlers = useMemo(() => {
    return [
      {
        type: "source",
        position: Position.Right,
        id: `${id}-output`,
        style: { top: "50%" },
      },
      ...placeholders.map((placeholder, index) => ({
        key: `${id}-input-${placeholder}`,
        type: "target",
        position: Position.Left,
        id: `${id}-${placeholder}`,
        style: { top: `${30 + index * 20}px` },
      })),
    ];
  }, [placeholders, id]);

  useEffect(() => {
    // Extract placeholders from the current text
    const matches = currText.match(/\{\{(.*?)\}\}/g) || [];
    const uniquePlaceholders = Array.from(
      new Set(matches.map((match) => match.slice(2, -2)))
    );

    // Update placeholders only if there's a change
    if (JSON.stringify(uniquePlaceholders) !== JSON.stringify(placeholders)) {
      setPlaceholders(uniquePlaceholders);
    }
  }, [currText, placeholders]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      Header={"Text"}
      inputlable={"Text"}
      inputvalue={currText}
      handleInputChange={handleTextChange}
      handler={handlers} // Send memoized handlers
    />
  );
};
