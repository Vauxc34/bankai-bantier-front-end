import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'; 
import TierBlockPanelItself from './TierBlockPanelItself';
import TierBlockItself from './TierBlockItself';

const TierListItself = ({ IdList }) => {

  const [ActualList, setActualList] = useState([])
  const [ActualBlocksList, setActualBlocksList] = useState('[{"title":"testowo11","description":"lorem ipsum","image":"https://fwcdn.pl/ppo/92/57/179257/466970.2.jpg"}, {"title":"ciul21","description":"lorem ipsum","image":"https://fwcdn.pl/ppo/92/57/179257/466970.2.jpg"}, {"title":"ciul45","description":"lorem ipsum","image":"https://fwcdn.pl/ppo/92/57/179257/466970.2.jpg"}]')
  const location = useLocation()

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


        {ActualBlocksList == '[{ "id": 900,"name": "teshiu","category": "chdcuj","blocks": [{"title":"testowo11","description":"lorem ipsum","image":"https://fwcdn.pl/ppo/92/57/179257/466970.2.jpg"}, {"title":"ciul21","description":"lorem ipsum","image":"https://fwcdn.pl/ppo/92/57/179257/466970.2.jpg"}, {"title":"ciul45","description":"lorem ipsum","image":"https://fwcdn.pl/ppo/92/57/179257/466970.2.jpg"} ]}]' 
     ?  "null" : 
     Rest.map((item, key) => <>
      
      <TierBlockItself  key={key} className="tier-block" id={`${Math.floor(Math.random() * 500)}`} draggable="true">
      <div style={{ background: `url(${item.image}) 50% 50% no-repeat`, backgroundSize: '140px' }} className='tier-image'></div>
      <p>{item.title}</p>
      </TierBlockItself>

      </>    
      
    )}


    </TierBlockPanelItself>


    {/*<TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
    <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
    <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>
  <TierBlockPanelItself id="board-1" className="board"></TierBlockPanelItself>*/}
    </div>

  </>
    )
}

export default TierListItself;
