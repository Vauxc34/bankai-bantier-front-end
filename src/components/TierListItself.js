import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'; 
import TierBlockPanelItself from './TierBlockPanelItself';
import TierBlockItself from './TierBlockItself';

const TierListItself = () => {

  const [TierItem, setTierItem] = useState([])

  const location = useLocation()

  //const docRef = doc(db,`tier-listy/${location.pathname.split('/')[2]}` );

  /*useEffect(() => {
    
    const GetTierElements = async () => {
      try {

        const docSnap = await getDoc(docRef);
        setTierItem(docSnap.data().AllTierBlocks)

      } catch {

      }
    } 

    GetTierElements()
  }, [])*/

  return (
  <>

    <div className='tier-list-itself'>
    <div className='blocks-panel'>
    <div className='block-itself -first' >S</div>
    <div className='block-itself -second' >A</div>
    <div className='block-itself -third' >B</div>
    <div className='block-itself -fourth' >C</div>
    <div className='block-itself -fifth' >D</div>
    <div className='block-itself -six' >E</div>
    <div className='block-itself -last' >F</div>
    </div>
    <div className='tier-block-panel'>
    <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
    <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
    <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
    <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
    <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
    <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
    <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
    </div>
    </div>
    
    
    
    <div className='tier-panel-choosing'>
    <TierBlockPanelItself id="board-1" className="board">    

    {TierItem.map((item, key) => (
      
      <TierBlockItself key={key} className="tier-block" id={`tier-${item.BlockId}`} draggable="true">
      <div style={{ background: `url(${item.img}) 50% 50% no-repeat`, backgroundSize: '140px' }} className='tier-image'></div>
      <p>{item.BlockName}</p>
      </TierBlockItself>
      
    ))}


    </TierBlockPanelItself>


    <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
    <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
    <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
    <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
    </div>

  </>
    )
}

export default TierListItself;
