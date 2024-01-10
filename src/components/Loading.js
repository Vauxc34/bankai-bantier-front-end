import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'; 

import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';

/* */

import LogoApp from '../images/logo-bigger-tier.png'
import GitHubIcon from '@mui/icons-material/GitHub';

/* */


import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Loading() { 

  const FindComponentFirst = () => {
    return (
      <>
      <input style={{ zIndex: 999 }} onClick={HandleSetFinder} type="submit" className='create-list-btn' value="Znajdź swoją tier listę" />
      </>
    )
  }

  const [listId, setListId] = useState('')
  const [isFinderOn, setIsFinderOn] = useState(false)
  const [finder, setFinder] = useState(<FindComponentFirst/>)
  const [ActualLists, setActualLists] = useState([])

  const HandleSetFinder = () => {
    setIsFinderOn(!isFinderOn)
  }

  const FindComponentSecond = () => {
    return (
      <>
      <div className='finder-component'>
        <label>id listy:</label>
      <input className='finder-itself' 
      style={{ zIndex: 999 }} 
      value={listId} type="search"
      onChange={e => setListId(e.target.value)}
      />
      <input style={{ zIndex: 999 }}  className='finder-button'  type="submit" value="🔍"/>
      <input style={{ zIndex: 999 }}  className='finder-button' onClick={HandleSetFinder} type="submit" value="❌"/>
      </div>
      </>
    )
  }

  const GetAllLists = () => {

    const requestOptions = { 
     
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
       },
       
    }
    fetch(`${process.env.REACT_APP_IMPORTANT_LINK}lists`, requestOptions).then(response =>  response.json()).then(data => setActualLists(data.lists))

  }


  useEffect(() => {

    GetAllLists()

  }, [])

  return (
  <> 

      <div className='navigation-bar'>

      <img className='logo-app' src={LogoApp} ></img>


      <div className='container-spaced'>
      <Link to="/stworz-tier-liste/twoja-nowa-lista">
      <Button sx={{ margin: '10px' }} variant="contained" color='secondary' startIcon={<CreateIcon />}>
      Stworz wlasna liste
      </Button>
      </Link> 


      <Link to="/znajdz-liste/">
      <Button sx={{ margin: '10px' }} variant="contained" color='secondary' startIcon={<SearchIcon />}>
      Znajdź swoją tier listę
      </Button>
      </Link> 
      </div>

      </div>
    
      <Swiper
         style={{ marginRight: 'unset', marginLeft: 'unset' }}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
{ActualLists == [] ? <SwiperSlide>
          
          <div className='Slide_of_list' style={{ backgroundImage: `url(${'https://placehold.co/1600x1200'})` }}>
            
            <div className='container-text-slider'>
  
            <h1>Lorem ipsum</h1>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet tincidunt tellus. Nullam massa enim, vehicula at augue posuere, maximus commodo lectus. Suspendisse porttitor bibendum enim, quis varius massa pulvinar in. Proin ac sapien ac eros sollicitudin euismod id ac nisi.</span>
  
            </div>
  
            <div className='blur'></div>
          
            </div>
          </SwiperSlide> :  ActualLists.map((item, key) => 
            <SwiperSlide>
          
        <div key={key} className='Slide_of_list' style={{ backgroundImage: `url(${item.image})` }}>
          
          <div className='container-text-slider'>

          <h1>{item.name}</h1>
          <span>{item.description}</span>

          </div>

          <div className='blur'></div>
        
          </div>
        </SwiperSlide>
          )

          }

        
      </Swiper>

     
 

      <h1 style={{ zIndex: 2, margin: '10px' }} > 
      <a style={{ color: 'white' }} href="https://github.com/Vauxc34?tab=repositories"><GitHubIcon /></a> Vauxc34</h1>

  </>
    );
}
