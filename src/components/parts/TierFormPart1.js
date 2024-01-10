import React, { useState, useEffect } from 'react'
import { useLocation, useHref } from 'react-router-dom'
import { Link } from 'react-router-dom'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField'; 
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

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

  const location = useLocation()

  const TierListCategories = [
    {opt: 'Nie wybrano', set: "disabled"},
    {opt: 'Seriale', set: ""},
    {opt: 'Muzyka', set: ""},
    {opt: 'Filmy', set: ""},
    {opt: 'Gry', set: ""},
  ]

  console.log(TierName)
  console.log(TierCategory)
  console.log(TierDesc)

  //!= '' && TierCategory != 'Nie wybrano' && TierDesc

  return (
    (
    <>

<h1 style={{ margin: '15px' }} className='header-title'>KREATOR LIST</h1> 

 <div style={{ width: '90%', margin: '10px' }}>
 <TextField  
 value={TierName}
 onChange={(e) => setTierName(e.target.value)}
 id="filled-basic"
 label="Nazwa listy" 
 color='secondary' 
 fullWidth  variant="filled"  />
 </div>

 <div style={{ width: '90%', margin: '10px' }}>
<FormControl fullWidth>
  <InputLabel className="site-label">Kategoria</InputLabel>
  <Select
  value={TierCategory}
   onChange={(e) => setTierCategory(e.target.value)}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    color="secondary" 
  >
{TierListCategories.map(((item) => <MenuItem disabled={item.set} value={item.opt}>{item.opt}</MenuItem>))}
  </Select>
</FormControl>  
 </div>
  
 <div style={{ width: '90%', margin: '10px' }}>
 
  <InputLabel style={{ margin: '10px' }} className="site-label">Opis listy</InputLabel>
<textarea
style={{ resize: 'vertical' }} 
value={TierDesc}
onChange={(e) => setTierDesc(e.target.value)}/>  
 
</div> 

{TierName == '' || TierCategory == 'Nie wybrano' || TierDesc == '' ? <Button sx={{ margin: '15px' }} variant="contained" color='error' startIcon={<ErrorOutlineIcon />}>
Nie uzupelniles pol
</Button> : <Link to={`/stworz-tier-liste/${IdList}`}>
<Button onClick={HandleCreatedList} sx={{ margin: '15px' }} variant="contained" color='secondary' startIcon={<CreateIcon />}>
Stworz wlasna liste
</Button>
</Link>}

    </>
    )
  )
}

export default TierFormPart1