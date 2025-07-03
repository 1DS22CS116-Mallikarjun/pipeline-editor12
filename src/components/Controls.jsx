// src/components/Controls.jsx
import React from "react";
import { FaPlus, FaProjectDiagram, FaTrash } from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function Controls({ onAddNode, onAutoLayout, onDeleteSelected }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 20,
        display: "flex",
        gap: 8,
      }}
    >
      <button
        onClick={onAddNode}
        data-tooltip-id="add-node-tip"
        data-tooltip-content="Add Node"
        style={{ padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}
      >
        <FaPlus /> Add Node
      </button>
      <ReactTooltip id="add-node-tip" place="bottom" />
      <button
        onClick={onAutoLayout}
        data-tooltip-id="auto-layout-tip"
        data-tooltip-content="Auto Layout"
        style={{ padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}
      >
        <FaProjectDiagram /> Auto Layout
      </button>
      <ReactTooltip id="auto-layout-tip" place="bottom" />
      <button
        onClick={onDeleteSelected}
        data-tooltip-id="delete-selected-tip"
        data-tooltip-content="Delete Selected"
        style={{ padding: "6px 12px", background: "#e74c3c", color: "#fff", display: "flex", alignItems: "center", gap: 6 }}
      >
        <FaTrash /> Delete Selected
      </button>
      <ReactTooltip id="delete-selected-tip" place="bottom" />
    </div>
  );
}