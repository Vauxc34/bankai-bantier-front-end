import React, { useState } from 'react';

export default function TierBlockItself(props) {

    const dragStart = e => {
        const target = e.target

        e.dataTransfer.setData('tier_block_id', target.id)

        setTimeout(() => {
            target.style.display = "none"
        }, 0)
    }

    const dragOver = e => {
        e.stopPropagation()
    }

  return (
      <>
        <div 
        id={props.id}
        className={`tier-block`}
        draggable={props.draggable}
        onDragStart={dragStart}
        onDragOver={dragOver} 
        >
            { props.children }
        </div>
      </>
  );
}
