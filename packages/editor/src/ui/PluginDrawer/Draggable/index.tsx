import classNames from 'classnames';
import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';

import { dragIcon } from '../../../core/components/Cell/Draggable/useDragHandle';
import { useSetLayoutMode } from '../../../core/components/hooks/displayMode';

import { CellDrag, InsertNewCell } from '../../../core/types';

const Draggable: React.FC<{
  insert: InsertNewCell;
}> = ({ insert, children }) => {
  const setLayoutMode = useSetLayoutMode();
  const [{ isDragging }, dragRef, preview] = useDrag<
    CellDrag,
    void,
    {
      isDragging: boolean;
    }
  >({
    item: {
      type: 'cell',
      cell: insert,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    begin() {
      setLayoutMode();
    },
  });
  const classes = classNames(
    { 'react-page-toolbar-draggable-is-dragged': isDragging },
    'react-page-toolbar-draggable'
  );

  return (
    <div className={classes} ref={dragRef}>
      <DragPreviewImage connect={preview} src={dragIcon} />
      {children}
    </div>
  );
};

export default Draggable;
