// src/components/autoLayout.js
import dagre from "dagre";

export function autoLayout(nodes, edges) {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "LR" });

  nodes.forEach((node) => {
    g.setNode(node.id, { width: 120, height: 40 });
  });
  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  const newNodes = nodes.map((node) => {
    const pos = g.node(node.id);
    return {
      ...node,
      position: { x: pos.x - 60, y: pos.y - 20 },
    };
  });

  return { newNodes };
}