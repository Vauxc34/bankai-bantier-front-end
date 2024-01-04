import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

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

  console.log(isFinderOn)

  return (
  <>
  
    <h1 className='header-title'>iTier</h1>
    <p className='random-desc-itself'>tutaj będzie randomowy tekst generowany przez jakieś API</p>

      <div className='loading-block'>
      <Link to="/stworz-tier-liste/:tworzenie-listy">
      <input style={{ zIndex: 999 }} type="submit" className='create-list-btn' value="Przejdź do kreatora list" />
      </Link>
      {finder}

      </div>

  </>
    );
}
