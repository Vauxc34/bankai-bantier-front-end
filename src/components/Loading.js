import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'; 

import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

/* */

import LogoApp from '../images/logo-bigger-tier.png'

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

  return (
  <> 

      <div className='navigation-bar'>

      <img className='logo-app' src={LogoApp} ></img>


      <div className='container-spaced'>
      <Link to="/stworz-tier-liste/twoja-nowa-lista">
      <Button sx={{ margin: '10px' }} variant="contained" color='secondary' startIcon={<SearchIcon />}>
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
    
      {/*<Swiper
         style={{ marginRight: 'unset', marginLeft: 'unset' }}
        effect={'fade'}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
      </Swiper>*/}

      <div className='loading-block'>
     

      </div>

  </>
    );
}
