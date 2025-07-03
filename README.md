# Pipeline Editor

A visual, interactive Directed Acyclic Graph (DAG) editor built with React and React Flow. This tool allows users to create, connect, and manage nodes and edges, simulating real-time data pipelines or processing workflows.

---

## 🚀 Demo

[Live Demo (Vercel/Netlify/GitHub Pages)](https://your-demo-link-here)

*Replace the above link with your deployed site URL.*

---

## 🖥️ Screenshots & Recordings

| Editor UI | Node Context Menu | JSON Preview |
|-----------|------------------|--------------|
| ![Editor Screenshot](screenshots/editor.png) | ![Context Menu](screenshots/context-menu.png) | ![JSON Preview](screenshots/json-preview.png) |

*Add screen recordings (GIF or video) in the `screenshots/` folder and link here.*

---

## 🛠️ Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/pipeline-editor.git
   cd pipeline-editor
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📦 Libraries Used

- **[React](https://react.dev/):** UI library for building the app.
- **[React Flow](https://reactflow.dev/):** For interactive DAG/graph visualization and editing.
- **[dagre](https://github.com/dagrejs/dagre):** For automatic graph layout.
- **[react-icons](https://react-icons.github.io/react-icons/):** For UI icons.
- **[react-tooltip](https://react-tooltip.com/):** For tooltips on controls and nodes.

---

## 🏗️ Key Architectural Decisions

- **Component-based structure:**
  - `App.jsx`: Main state and logic.
  - `components/Controls.jsx`: Toolbar for actions (add, layout, delete).
  - `components/NodeComponent.jsx`: Custom node with type, context menu, and badge.
  - `components/ValidationService.js`: DAG validation logic.
  - `components/autoLayout.js`: Handles auto-layout with dagre.
  - `components/JSONPreview.jsx`: Collapsible live state viewer.
- **State management:** Uses React hooks (`useState`, `useCallback`, `useEffect`) and React Flow's state hooks for nodes and edges.
- **Extensible node data:** Each node can have a type, label, and custom actions (edit, delete).
- **Validation:** Real-time DAG validation (no cycles, all nodes connected, min 2 nodes, etc.)
- **UX:** Context menus, tooltips, icons, and a JSON preview for a modern, user-friendly experience.

---

## 🎥 Demo Video & Screenshots

- *Add a screen recording (e.g., using Loom, OBS, or a GIF) showing node creation, connection, deletion, auto-layout, and validation.*
- *Add screenshots to the `screenshots/` folder and update the links above.*

---

## ⚡ Challenges & Solutions

### 1. **JSX Parsing Errors**
- **Challenge:** Vite/esbuild requires `.jsx` extension for files containing JSX.
- **Solution:** Renamed all relevant files to `.jsx` and ensured import paths matched.

### 2. **React Tooltip Import Issues**
- **Challenge:** `react-tooltip` v5+ changed its import and usage pattern, causing runtime errors.
- **Solution:** Used named import (`{ Tooltip as ReactTooltip }`) and updated usage to use `data-tooltip-id` and `id` props.

### 3. **Context Menu on Nodes**
- **Challenge:** Implementing a custom right-click menu that doesn't interfere with React Flow's selection.
- **Solution:** Used local state in the node component and global click listeners to close the menu.

### 4. **Edge Highlighting for Invalid Connections**
- **Challenge:** Visually indicating invalid edges after validation.
- **Solution:** Maintained a list of invalid edge IDs and styled them with a red stroke.

### 5. **Node Type Badges and Color Coding**
- **Challenge:** Displaying node types clearly and allowing for future extensibility.
- **Solution:** Used a color map and badges in the node component, with type selection on node creation.

---

## 📄 License

MIT
