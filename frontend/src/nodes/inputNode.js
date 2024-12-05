// inputNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handler = [
    {
      type: "source",
      position: Position.Right,
      id: `${id}-value`,
    },
  ];

  return (
    <BaseNode
      Header={"Input"}
      inputlable={"Name:"}
      inputvalue={currName}
      type={inputType}
      handleInputChange={handleNameChange}
      handleTypeChange={handleTypeChange}
      handler={handler}
    />
  );
};
