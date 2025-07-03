import React, { useState, useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls as FlowControls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import NodeComponent from "./components/NodeComponent";
import Controls from "./components/Controls";
import JSONPreview from "./components/JSONPreview";
import { validateDag } from "./components/ValidationService";
import { autoLayout } from "./components/autoLayout";

const nodeTypes = { custom: NodeComponent };
const nodeTypeOptions = ["Data Source", "Processing", "Output", "Default"];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isValidDag, setIsValidDag] = useState(true);
  const [validationMsg, setValidationMsg] = useState("");
  const [selected, setSelected] = useState({ nodes: [], edges: [] });
  const [invalidEdgeIds, setInvalidEdgeIds] = useState([]);
  const reactFlowInstance = useRef(null);

  // Set label for a node
  const setLabel = useCallback((id, newLabel) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, label: newLabel, setLabel, deleteNode } } : n))
    );
  }, [setNodes]);

  // Delete a node
  const deleteNode = useCallback((id) => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
  }, [setNodes, setEdges]);

  // Add Node Handler (with type)
  const handleAddNode = useCallback(() => {
    const label = window.prompt("Enter node label:");
    if (!label) return;
    let type = window.prompt(
      "Enter node type (Data Source, Processing, Output, Default):",
      "Default"
    );
    if (!nodeTypeOptions.includes(type)) type = "Default";
    const id = `${+new Date()}`;
    setNodes((nds) => [
      ...nds,
      {
        id,
        type: "custom",
        data: { label, type, setLabel, deleteNode },
        position: { x: Math.random() * 250, y: Math.random() * 250 },
      },
    ]);
  }, [setNodes, setLabel, deleteNode]);

  // Edge Connect Handler
  const handleConnect = useCallback(
    (params) => {
      if (params.source === params.target) return; // Prevent self-loop
      setEdges((eds) => addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds));
    },
    [setEdges]
  );

  // Selection Handler
  const onSelectionChange = useCallback((sel) => {
    setSelected({
      nodes: sel.nodes || [],
      edges: sel.edges || [],
    });
  }, []);

  // Delete Handler (keyboard)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" || e.key === "Backspace") {
        setNodes((nds) => nds.filter((n) => !selected.nodes.some((sn) => sn.id === n.id)));
        setEdges((eds) =>
          eds.filter(
            (e) =>
              !selected.edges.some((se) => se.id === e.id) &&
              !selected.nodes.some((sn) => sn.id === e.source || sn.id === e.target)
          )
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, setNodes, setEdges]);

  // Delete Selected Handler (button)
  const handleDeleteSelected = useCallback(() => {
    setNodes((nds) => nds.filter((n) => !selected.nodes.some((sn) => sn.id === n.id)));
    setEdges((eds) =>
      eds.filter(
        (e) =>
          !selected.edges.some((se) => se.id === e.id) &&
          !selected.nodes.some((sn) => sn.id === e.source || sn.id === e.target)
      )
    );
  }, [selected, setNodes, setEdges]);

  // DAG Validation and invalid edge highlighting
  useEffect(() => {
    const { valid, message } = validateDag(nodes, edges);
    setIsValidDag(valid);
    setValidationMsg(message);
    // Highlight edges as invalid if their source or target node is missing
    const nodeIds = new Set(nodes.map((n) => n.id));
    const invalidIds = edges.filter(e => !nodeIds.has(e.source) || !nodeIds.has(e.target)).map(e => e.id);
    setInvalidEdgeIds(invalidIds);
  }, [nodes, edges]);

  // Auto Layout Handler
  const handleAutoLayout = useCallback(() => {
    const { newNodes } = autoLayout(nodes, edges);
    setNodes(newNodes);
    setTimeout(() => {
      if (reactFlowInstance.current && reactFlowInstance.current.fitView) {
        reactFlowInstance.current.fitView();
      }
    }, 100);
  }, [nodes, edges, setNodes]);

  // Style edges based on invalidEdgeIds
  const styledEdges = edges.map(edge => ({
    ...edge,
    style: invalidEdgeIds.includes(edge.id)
      ? { stroke: 'red', strokeWidth: 2 }
      : {}
  }));

  // Pass setLabel and deleteNode to all nodes
  const nodesWithFns = nodes.map(n => ({
    ...n,
    data: {
      ...n.data,
      setLabel,
      deleteNode
    }
  }));

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Controls
        onAddNode={handleAddNode}
        onAutoLayout={handleAutoLayout}
        onDeleteSelected={handleDeleteSelected}
      />
      <div style={{ position: "absolute", top: 60, left: 10, zIndex: 10 }}>
        <span
          style={{
            color: isValidDag ? "green" : "red",
            fontWeight: "bold",
            background: "#fff",
            padding: "4px 8px",
            borderRadius: 4,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          {isValidDag ? "Valid DAG" : `Invalid DAG: ${validationMsg}`}
        </span>
      </div>
      <ReactFlow
        nodes={nodesWithFns}
        edges={styledEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        nodeTypes={nodeTypes}
        onSelectionChange={onSelectionChange}
        fitView
        onInit={(instance) => (reactFlowInstance.current = instance)}
      >
        <FlowControls />
        <Background />
      </ReactFlow>
      <JSONPreview nodes={nodes} edges={edges} />
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}