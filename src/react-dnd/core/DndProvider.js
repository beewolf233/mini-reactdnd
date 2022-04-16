import { DndContext } from './DndContext';
import { createDragDropManager } from '../../dnd-core';
	
export const DndProvider = ({ children, backend }) => {
  const value = { dragDropManager: createDragDropManager(backend)};
  console.log(value, '初始化创建 manager实例')
  return (
    <DndContext.Provider value={value}>
      {children}
    </DndContext.Provider>
  )
};
