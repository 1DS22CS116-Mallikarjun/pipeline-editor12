# Pipeline Editor

A visual, interactive Directed Acyclic Graph (DAG) editor built with React and React Flow. This tool allows users to create, connect, and manage nodes and edges, simulating real-time data pipelines or processing workflows.

---

## 🚀 Demo

[Live Demo (Vercel/Netlify/GitHub Pages)]([https://your-demo-link-here](https://pipeline-editor1.vercel.app/))

*Replace the above link with your deployed site URL.*

---

## 🖥️ Screenshots & Recordings

https://drive.google.com/file/d/1R8CjoBIBrX7Bj6KohtOoFj-_oRLlX6ue/view?usp=sharing

## 🛠️ Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/1DS22CS116-Mallikarjun/pipeline-editor12.git
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



