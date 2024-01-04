import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const TierFormPart1 = ({
    IdList,
    TierName,
    setTierName,
    TierDesc,
    setTierDesc,
    TierCategory,
    setTierCategory,
    HandleCreatedList
}) => {

  const TierListCategories = [
    'Seriale',
    'Muzyka',
    'Filmy',
    'Gry',
  ]

  return (
    (
    <>

<h1 className='header-title'>iTier</h1>

<label>nazwa listy</label>

<input 
value={TierName}
onChange={(e) => setTierName(e.target.value)}
className='list-name' type="text"></input>

<label>kategoria listy</label>

<select value={TierCategory} onChange={(e) => setTierCategory(e.target.value)} className='category-selector'>
  {TierListCategories.map(((item) =>
  <>
     <option>{item}</option>
  </>
  ))}
</select>

<label>Opis listy</label>

<textarea
value={TierDesc}
onChange={(e) => setTierDesc(e.target.value)}
className='list-desc'/>

<Link to={`/stworz-tier-liste/${IdList}`}>
<input onClick={HandleCreatedList} className='create-list-btn' type="submit" value='stwórz!'/>
</Link>

    </>
    )
  )
}

export default TierFormPart1