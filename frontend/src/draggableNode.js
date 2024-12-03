// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      console.log(nodeType)
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = "grab")}
        style={{
          cursor: "grab",
          minWidth: "80px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          borderRadius: "8px",
          backgroundColor: "#FEFEFF",
          justifyContent: "center",
          flexDirection: "column",
          border: "3px solid #E5E7EB",
        }}
        draggable
      >
        <span style={{ color: "#6F6C8B" }}>{label}</span>
      </div>
    );
  };
  