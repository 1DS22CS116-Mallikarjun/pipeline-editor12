// src/components/NodeComponent.jsx
import React, { useState } from "react";
import { Handle, Position } from "reactflow";

const typeColors = {
  "Data Source": "#27ae60",
  "Processing": "#2980b9",
  "Output": "#e67e22",
  "Default": "#007bff"
};

export default function NodeComponent({ data, id }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowMenu(true);
    document.addEventListener("click", () => setShowMenu(false), { once: true });
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      data-tip={data.label}
      style={{
        padding: 10,
        border: `2px solid ${typeColors[data.type] || typeColors.Default}`,
        borderRadius: 8,
        background: "#f4f8ff",
        minWidth: 80,
        textAlign: "center",
        position: "relative"
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: "#555" }} />
      <div>
        {data.label}
        {data.type && (
          <span
            style={{
              marginLeft: 6,
              padding: "2px 6px",
              borderRadius: 6,
              fontSize: 10,
              background: typeColors[data.type] || typeColors.Default,
              color: "#fff"
            }}
          >
            {data.type}
          </span>
        )}
      </div>
      <Handle type="source" position={Position.Right} style={{ background: "#007bff" }} />
      {showMenu && (
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 4,
            zIndex: 100,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
          }}
        >
          <div
            style={{ padding: "6px 12px", cursor: "pointer" }}
            onClick={() => {
              const newLabel = window.prompt("Edit node label:", data.label);
              if (newLabel) data.setLabel(id, newLabel);
              setShowMenu(false);
            }}
          >
            Edit Label
          </div>
          <div
            style={{ padding: "6px 12px", cursor: "pointer", color: "#e74c3c" }}
            onClick={() => {
              data.deleteNode(id);
              setShowMenu(false);
            }}
          >
            Delete Node
          </div>
        </div>
      )}
    </div>
  );
}