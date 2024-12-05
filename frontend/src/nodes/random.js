// inputNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const RandomNode = ({ id, data }) => {
    console.log(id)
  const [currName, setCurrName] = useState(
    data?.randomName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handler = [
    {
      type: "source",
      position: Position.Right,
      id: `${id}-value`,
      style: { top: `${100 / 3}%` },
    },
  ];

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };
 

  return (
    <div>
      <BaseNode
        Header={"Random"}
        inputlable={"Name"}
        inputvalue={currName}
    
        handleInputChange={handleNameChange}
        handler={handler}
      />
    </div>
  );
};
