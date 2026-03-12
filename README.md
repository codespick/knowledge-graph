# Knowledge Graph Viewer

An interactive, browser-based knowledge graph application for mapping topics and the relationships between them. Built with Next.js, TypeScript, React Flow, and Tailwind CSS.

## Features

### Core Features
- **Interactive Graph Canvas** - Visualize nodes (topics) and edges (relationships) on a responsive canvas
- **Node Management** - Create, edit, and delete nodes with titles and note content
- **Relationship Management** - Add and remove edges with custom relationship labels
- **Data Persistence** - All graph state is automatically saved to localStorage and restored on page load
- **Intuitive UI** - Click nodes to view details, use side panels for editing

### Stretch Goals (Implemented)
- ✅ **Smooth Animations** - Framer Motion animations for node entry, removal, and panel transitions
- ✅ **Animated Edges** - Edges animate when created and display labels
- ✅ **Node Selection Highlighting** - Selected nodes scale up and change color to indicate selection
- ✅ **Pre-populated Data** - Seed data (8 nodes, 9 edges) loaded on first run

## Tech Stack

- **Frontend Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Graph Visualization**: React Flow
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit + React Redux
- **Persistence**: localStorage

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn installed

### Installation

1. **Navigate to project directory**
   ```bash
   cd knowledge-graph
   ```

2. **Install dependencies** (already done if using npm install)
   ```bash
   npm install
   ```

### Running the Application

**Development mode:**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

**Build for production:**
```bash
npm run build
npm start
```

## Usage

### Adding a Node
1. Click the **"+ Add Node"** button in the left panel
2. Enter a title and optional note
3. Click **Add** to create the node

### Editing a Node
1. Click on any node in the graph
2. The right panel will open showing the node details
3. Edit the title or note content
4. Click **Save** to apply changes

### Deleting a Node
1. Click on a node to select it
2. Click the **Delete** button in the right panel
3. The node and all its connections will be removed

### Adding a Connection
1. Click **"+ Add Connection"** in the left panel
2. Select the source node (from)
3. Select the target node (to)
4. Enter a relationship label (e.g., "relates to", "depends on")
5. Click **Connect** to create the edge

### Removing a Connection
1. Click on a node to view its connections
2. In the connections list, click **Remove** next to the edge you want to delete

### Dragging Nodes
- You can drag nodes around the canvas to reposition them
- Layout persists when you refresh the page (saved to localStorage)

## Data Structure

### Nodes
Each node has:
- `id` - Unique identifier
- `title` - Topic name
- `note` - Detailed description or note
- `x`, `y` - Position coordinates (optional, auto-calculated)

### Edges
Each edge has:
- `id` - Unique identifier
- `source` - ID of the source node
- `target` - ID of the target node
- `label` - Relationship description

## Redux State Management

The application uses Redux Toolkit for predictable state management:

### Store Structure
```typescript
interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNodeId: string | null;
  initialized: boolean;
}
```

### Available Actions
- `initializeWithSeed()` - Load seed data or restore from localStorage
- `addNode(node)` - Add a new node to the graph
- `updateNode({ id, updates })` - Update an existing node
- `deleteNode(id)` - Remove a node and its edges
- `addEdge(edge)` - Create a new connection between nodes
- `deleteEdge(id)` - Remove an edge
- `setSelectedNode(id)` - Select a node for editing
- `updateNodePosition({ id, x, y })` - Update node position after dragging

## Seed Data

The app comes pre-populated with 8 frontend development topics:
- React
- Next.js
- TypeScript
- State Management
- Component Design
- Performance
- Testing
- CSS & Styling

With 9 relationships showing how these topics interconnect.

## localStorage Format

Data is stored as JSON with the following structure:
```json
{
  "nodes": [
    {
      "id": "1",
      "title": "React",
      "note": "A JavaScript library...",
      "x": 300,
      "y": 300
    }
  ],
  "edges": [
    {
      "id": "e1",
      "source": "2",
      "target": "1",
      "label": "built on"
    }
  ]
}
```

## Browser Compatibility

Works on all modern browsers that support:
- ES2020+
- localStorage API
- CSS Grid/Flexbox
- CSS Animations

## Performance Optimizations

- Component memoization with React Flow's built-in optimization
- Conditional rendering of panels
- Framer Motion's GPU-accelerated animations
- Efficient localStorage updates
- React Flow's canvas-based rendering (no heavy DOM nodes)

## Future Enhancements

- Multi-graph support (workspaces)
- Export/import functionality (JSON, CSV)
- Search and filter capabilities
- Node clustering based on relationships
- Full-text search within notes
- Dark/Light theme toggle
- Collaborative editing (with backend)

## Troubleshooting

**Graph not loading?**
- Check browser console for errors
- Ensure localStorage is enabled
- Try clearing localStorage: `localStorage.clear()`

**Slow performance?**
- Reduce number of nodes/edges
- Disable animations if on older hardware
- Close other browser tabs

**Lost my data?**
- Data is stored in localStorage for the current domain
- Clearing browser data or switching browsers will lose the graph
- Export data regularly if important

## License

MIT

## Author

Created as Assignment 1: Personal Knowledge Base Graph
