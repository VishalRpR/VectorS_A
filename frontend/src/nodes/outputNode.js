// outputNode.js

import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const handler = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-value`,
    },
  ];
  return (
    <>
      <BaseNode
        Header={"Output"}
        inputlable={"Name"}
        inputvalue={currName}
       handleInputChange={handleNameChange} 
        type={outputType}
        handleTypeChange={handleTypeChange}
        handler={handler}
      />
    </>
  );
};
