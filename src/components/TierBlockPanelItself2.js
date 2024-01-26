import React from 'react';

export default function TierBlockPanelItself2(props) {

      const drop = e => {
        e.preventDefault();
        const tier_block_id = e.dataTransfer.getData('tier_block_id')
    
        const tier_block = document.getElementById(tier_block_id)
        tier_block.style.display = 'flex'
    
        e.target.appendChild(tier_block)
      }
    
      const dragOver = e => {
        e.preventDefault()
    
      }
    

      

  return (
    <>
    <div 
    id={props.id}
    onDrop={drop}
    onDragOver={dragOver}
    style={{ flexWrap: 'wrap' }} 
    className='block-panel -first-panel-'> { props.children } 
    </div>
    </>
  );
}
