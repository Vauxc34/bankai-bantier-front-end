import React, {useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';

import TierBlockPanelItself from './TierBlockPanelItself';
import TierBlockPanelItself2 from './TierBlockPanelItself2';
import TierBlockItself from './TierBlockItself';

import CloseIcon from '@mui/icons-material/Close';

const TierListItself = ({ IdList }) => {

  let navigate = useNavigate()
  const [ActualList, setActualList] = useState([])
  const [ActualBlocksList, setActualBlocksList] = useState('[{"title":"SAMPLE BLOCK #1","description":"A","image":"https://placehold.co/100x100/black/white/?font=roboto"}, {"title":"SAMPLE BLOCK #2","description":"B","image":"https://placehold.co/100x100/black/white/?font=roboto"}, {"title":"SAMPLE BLOCK #3","description":"C","image":"https://placehold.co/100x100/black/white/?font=roboto"}]')
  const location = useLocation()

  const [SizeOfArea, setSizeOfArea] = useState(500)
  const [ActualWindowWidth, setActualWindowWidth] = useState(window.innerWidth)
  const [VisibilityFix, setVisibilityFix] = useState('unsettedVisibility')
  const ClassToChange = 'unsettedHide'

  let BlockToInform = useRef()

  useEffect(() => {
    setActualWindowWidth(window.innerWidth)
  }, [ActualWindowWidth])

  let DragController = useRef()
  let DragController1 = useRef()

  const ChangeClassName = () => {
    setVisibilityFix('settedVisibility')
  }

  const SetDefault = () => {
  setVisibilityFix('unsettedVisibility') 
  }

  const ChangeHeight = (e) => {
    if(ActualWindowWidth < 599) {
      setSizeOfArea(e.target.value)
     DragController.current.style.height = `${SizeOfArea}px`
     DragController1.current.style.height = `${SizeOfArea}px`
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

    <div className='MobileIcon' onClick={() => navigate('/')}>
    <CloseIcon/>
    </div>

    <div className='huge-container'>

    <div className='mobile-blur'></div>

    <div className='tier-list-itself'>
    <div className='blocks-panel'>
      <div className='container-flex SettedSettingTier'>
        <div className='block-itself -first' >S</div>
        <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
      </div>
      <div className='container-flex SettedSettingTier'>
      <div className='block-itself -second' >A</div>
      <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
      </div>
      <div className='container-flex SettedSettingTier'>
      <div className='block-itself -third' >B</div>
      <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
      </div>
      <div className='container-flex SettedSettingTier'>
      <div className='block-itself -fourth' >C</div>
      <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
      </div>
      <div className='container-flex SettedSettingTier'>
      <div className='block-itself -fifth' >D</div>
      <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
      </div> 
      <div className='container-flex SettedSettingTier'>
      <div className='block-itself -six' >E</div>
     <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
      </div>
      <div className='container-flex SettedSettingTier'>
      <div className='block-itself -last' >F</div>
    <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
      </div>
    </div>
    </div>

    <div className='tier-panel-choosing desktop-container--'>

    <div className={`roll-up mobile-buttons- ${VisibilityFix}`} ref={DragController1} style={{ height: '' }}>
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
    
    <div className={`roll-up mobile-buttons- ${VisibilityFix} FixDesktopParameterVisibility`} ref={DragController1} style={{ height: '', display: '', position: 'fixed' }}>
      <input className='range-for-a-roll-up mobile-buttons' style={{ display: '' }} type={'range'} max={500} min={50} value={SizeOfArea} onChange={(e) => ChangeHeight(e)}/>
    </div>

    <div className={`tier-panel-choosing tier-addition-btn mobile-buttons--`} ref={DragController} style={{ height: '',  display: '', position: 'fixed'  }}>
    
    <div className='container---'>
    <i className={`arrow up {${VisibilityFix}`}></i>
    </div>
   
    <TierBlockPanelItself2 id="board-1" className="board">
      {ActualBlocksList == '[{"title":"SAMPLE BLOCK #1","description":"A","image":"https://placehold.co/100x100/black/white/?font=roboto"}, {"title":"SAMPLE BLOCK #2","description":"B","image":"https://placehold.co/100x100/black/white/?font=roboto"}, {"title":"SAMPLE BLOCK #3","description":"C","image":"https://placehold.co/100x100/black/white/?font=roboto"}]' 
      ?  "null" : 
      Rest.map((item, key) => <>
      <div onDragStartCapture={ChangeClassName} ref={BlockToInform} ClassToChange={ClassToChange} onDragEndCapture={SetDefault}>
      <TierBlockItself key={key} id={`${Math.floor(Math.random() * 500)}`} draggable="true">
      <div style={{ background: `url(${item.image}) 50% 50% no-repeat`, backgroundSize: '140px' }} className='tier-image'></div>
      <label>{item.title}</label>
      </TierBlockItself>
      </div>
      </>    
      
      )}
    </TierBlockPanelItself2>
    </div>   

    </div>

  </>
    )
}

export default TierListItself;
