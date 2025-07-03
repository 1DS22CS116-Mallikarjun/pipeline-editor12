// src/components/JSONPreview.js
import React, { useState } from "react";

export default function JSONPreview({ nodes, edges }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        position: "absolute",
        bottom: 10,
        right: 10,
        zIndex: 20,
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: 4,
        padding: 8,
        minWidth: 200,
        maxWidth: 400,
        fontSize: 12,
      }}
    >
      <button onClick={() => setOpen((o) => !o)} style={{ marginBottom: 4 }}>
        {open ? "Hide" : "Show"} JSON
      </button>
      {open && (
        <pre style={{ maxHeight: 200, overflow: "auto" }}>
          {JSON.stringify({ nodes, edges }, null, 2)}
        </pre>
      )}
    </div>
  );
}