// src/components/ValidationService.js

// Returns { valid: boolean, message: string }
export function validateDag(nodes, edges) {
    if (nodes.length < 2) {
      return { valid: false, message: "At least 2 nodes required." };
    }
  
    // Build adjacency list
    const adj = {};
    nodes.forEach((n) => (adj[n.id] = []));
    edges.forEach((e) => {
      if (e.source !== e.target) adj[e.source].push(e.target);
    });
  
    // Check for cycles using DFS
    const visited = {};
    const recStack = {};
    function dfs(nodeId) {
      if (!visited[nodeId]) {
        visited[nodeId] = true;
        recStack[nodeId] = true;
        for (const neighbor of adj[nodeId]) {
          if (!visited[neighbor] && dfs(neighbor)) return true;
          else if (recStack[neighbor]) return true;
        }
      }
      recStack[nodeId] = false;
      return false;
    }
    for (const n of nodes) {
      if (dfs(n.id)) return { valid: false, message: "Cycle detected." };
    }
  
    // Check all nodes are connected to at least one edge
    for (const n of nodes) {
      const hasEdge =
        edges.some((e) => e.source === n.id || e.target === n.id);
      if (!hasEdge) return { valid: false, message: `Node "${n.data.label}" is not connected.` };
    }
  
    return { valid: true, message: "" };
  }