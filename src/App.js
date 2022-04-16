import { HTML5Backend } from './react-dnd-html5-backend'
import { DndProvider } from './react-dnd';
import Container from './SimpleCard';
import './App.css';

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </div>
  );
}

export default App;
