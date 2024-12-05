// llmNode.js

import { Handle, Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const LLMNode = ({ id, data }) => {
  const handler = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-system`,
      style: { top: `${100 / 3}%` },
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: `${200 / 3}%` },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-response`,
    },
  ];

  return (
    <>
      <BaseNode Header={"LLM"} handler={handler} inputlable={"System"} />
     
    </>
  );
};
