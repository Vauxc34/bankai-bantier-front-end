import React, {useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'; 
import TierBlockPanelItself from './TierBlockPanelItself';
import TierBlockPanelItself2 from './TierBlockPanelItself2';
import TierBlockItself from './TierBlockItself';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TierListItself = ({ IdList }) => {

  const [ActualList, setActualList] = useState([])
  const [ActualBlocksList, setActualBlocksList] = useState('[{"title":"SAMPLE BLOCK #1","description":"A","image":"https://placehold.co/100x100/black/white/?font=roboto"}, {"title":"SAMPLE BLOCK #2","description":"B","image":"https://placehold.co/100x100/black/white/?font=roboto"}, {"title":"SAMPLE BLOCK #3","description":"C","image":"https://placehold.co/100x100/black/white/?font=roboto"}]')
  const location = useLocation()


  const [SizeOfArea, setSizeOfArea] = useState(500)
  const [ActualWindowWidth, setActualWindowWidth] = useState(window.innerWidth)

  useEffect(() => {

    setActualWindowWidth(window.innerWidth)

  })

  let DragController = useRef()

  const ChangeHeight = (e) => {

    if(ActualWindowWidth < 599) {

      setSizeOfArea(e.target.value)

     DragController.current.style.height = `${SizeOfArea}px`

     console.log(DragController.current)

    }  

    
  }
  

  const FetchActualList = () => {
    const requestOptions = { 
     
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
       },
       
    }
    fetch(`${process.env.REACT_APP_IMPORTANT_LINK}lists/${location.pathname.split('/')[2]}`, requestOptions).then(response =>  response.json()).then(data => setActualBlocksList(data.list.blocks))
  }
  
  useEffect(() => {
    FetchActualList()
  },[])

  let Rest = JSON.parse(ActualBlocksList)

  return (
  <>

    <div className='huge-container'>
    <div className='tier-list-itself'>
    <div className='blocks-panel'>
      <div className='container-flex' style={{ height: '100px', width: '100vw' }} >
        <div className='block-itself -first' >S</div>
        <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
      </div>
      <div className='container-flex' style={{ height: '100px', width: '100vw' }} >
      <div className='block-itself -second' >A</div>
      <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
      </div>
      <div className='container-flex' style={{ height: '100px', width: '100vw' }} >
      <div className='block-itself -third' >B</div>
      <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
      </div>
      <div className='container-flex' style={{ height: '100px', width: '100vw' }} >
      <div className='block-itself -fourth' >C</div>
      <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
      </div>
      <div className='container-flex' style={{ height: '100px', width: '100vw' }} >
      <div className='block-itself -fifth' >D</div>
      <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
      </div> 
      <div className='container-flex' style={{ height: '100px', width: '100vw' }} >
      <div className='block-itself -six' >E</div>
     <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
      </div>
      <div className='container-flex' style={{ height: '100px', width: '100vw' }} >
      <div className='block-itself -last' >F</div>
    <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
      </div>
    </div>
    
    </div>

    <div className='tier-panel-choosing desktop-container--'>

    <div className='roll-up mobile-buttons-'>
      <input className='range-for-a-roll-up' type={'range'} max={500} min={50} value={SizeOfArea} onChange={(e) => ChangeHeight(e)}/>
    </div>

    <TierBlockPanelItself2 id="board-1" className="board">
      {ActualBlocksList == '[{"title":"SAMPLE BLOCK #1","description":"A","image":"https://placehold.co/100x100/black/white/?font=roboto"}, {"title":"SAMPLE BLOCK #2","description":"B","image":"https://placehold.co/100x100/black/white/?font=roboto"}, {"title":"SAMPLE BLOCK #3","description":"C","image":"https://placehold.co/100x100/black/white/?font=roboto"}]' 
      ?  "null" : 
      Rest.map((item, key) => <>
      
      <TierBlockItself  key={key} className="tier-block" id={`${Math.floor(Math.random() * 500)}`} draggable="true">
      <div style={{ background: `url(${item.image}) 50% 50% no-repeat`, backgroundSize: '140px' }} className='tier-image'></div>
      <label>{item.title}</label>
      </TierBlockItself>

      </>    
      
      )}
    </TierBlockPanelItself2> 
    </div>  
    
    <div className='roll-up mobile-buttons--'>
      <input className='range-for-a-roll-up mobile-buttons' type={'range'} max={500} min={50} value={SizeOfArea} onChange={(e) => ChangeHeight(e)}/>
    </div>

    <div className='tier-panel-choosing mobile-buttons--' ref={DragController} style={{ height: '' }}>

    <TierBlockPanelItself2 id="board-1" className="board">
      {ActualBlocksList == '[{"title":"SAMPLE BLOCK #1","description":"A","image":"https://placehold.co/100x100/black/white/?font=roboto"}, {"title":"SAMPLE BLOCK #2","description":"B","image":"https://placehold.co/100x100/black/white/?font=roboto"}, {"title":"SAMPLE BLOCK #3","description":"C","image":"https://placehold.co/100x100/black/white/?font=roboto"}]' 
      ?  "null" : 
      Rest.map((item, key) => <>
      
      <TierBlockItself  key={key} className="tier-block" id={`${Math.floor(Math.random() * 500)}`} draggable="true">
      <div style={{ background: `url(${item.image}) 50% 50% no-repeat`, backgroundSize: '140px' }} className='tier-image'></div>
      <label>{item.title}</label>
      </TierBlockItself>

      </>    
      
      )}
    </TierBlockPanelItself2>
    </div>   

    </div>

  </>
    )
}

export default TierListItself;
