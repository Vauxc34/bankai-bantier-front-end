import React, { useState, useEffect } from 'react'
import { useLocation, useHref } from 'react-router-dom'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { Link } from 'react-router-dom'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField'; 
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WallpaperIcon from '@mui/icons-material/Wallpaper'; 
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';  

/* images */

import Placeholder_ from '../images/image_to_placehold.jpg'

/* images */

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const TierFormPart1 = ({
    toast,
    IdList,
    TierName,
    setTierName,
    TierDesc,
    setTierDesc,
    TierCategory,
    setTierCategory,
    HandleCreatedList,
    TierlistThumbnail,
    setTierListThumbnail 
}) => {
 
  const [IsImageSetted, SetIsImageSetted] = useState(false)
  const [percent, setPercent] = useState(0);
  const location = useLocation()

  const storage = getStorage(); 
  const storageRef = ref(storage, `/itier-additional-photos/${TierlistThumbnail.name}`); 
 
  function FileUploader() { 
      
    const uploadTask = uploadBytesResumable(storageRef, TierlistThumbnail);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
         
      },
      (err) => console.log(err),
      () => {  
        
        toast.info("Plik przeslany"); 
        getDownloadURL(uploadTask.snapshot.ref).then((url) => { 
        setTierListThumbnail(url)

          if(url) {
            SetIsImageSetted(true)
          } 

        });
      }
    );

  }

  function handleChange(event) {
    setTierListThumbnail(event.target.files[0])  

  }  

  const TierListCategories = [
    {opt: 'Nie wybrano', set: "disabled"},
    {opt: 'Seriale', set: ""},
    {opt: 'Muzyka', set: ""},
    {opt: 'Filmy', set: ""},
    {opt: 'Gry', set: ""},
  ]

  function CustomImageList() {
    return (
      <ImageList
        sx={{
          width: '90%',
          height: 350, 
          transform: 'translateZ(0)',
        }}
        rowHeight={200}
        gap={1}
      >
        {itemData.map((item) => {
          const cols = item.featured ? 2 : 1;
          const rows = item.featured ? 2 : 1;
  
          return (
            <ImageListItem style={{ 
              height: 'unset' }} key={item.img} cols={cols} rows={rows}>
              <img
                {...srcset(IsImageSetted == false ? 'https://placehold.co/600x400/purple/white/?font=roboto' : TierlistThumbnail, 150, 100, rows, cols)}
                alt={item.title}
                loading="lazy"
              />

            <input className='SelectorThumbnail' onChange={handleChange} accept='any' style={{ position: 'absolute', overflow: 'hidden', opacity: 0 }} type="file"/>
              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
                title={item.title}
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: 'white' }}
                    aria-label={`star ${item.title}`}
                  >
                    <WallpaperIcon />
                  </IconButton>
                }
                actionPosition="left"
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    );
  }
  
  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Okladka',
      author: '@bkristastucchio',
      featured: true,
    }
  ];

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
  <InputLabel className="site-label muiRenderFixedEl">Kategoria</InputLabel>
  <Select
    value={TierCategory}
    onChange={(e) => setTierCategory(e.target.value)}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    color="secondary" 
    className='muiRenderFixedEl'
  >
{TierListCategories.map(((item) => <MenuItem disabled={item.set} value={item.opt}>{item.opt}</MenuItem>))}
  </Select>
</FormControl>  
 </div>

 <CustomImageList/>

<div className='container-flex' style={{ alignItems: 'flex-start', width: '90%' }}>

{TierlistThumbnail == '' ? <Button className='input-toast'  sx={{ margin: '10px' }}  variant="contained" color='info' startIcon={<AddAPhotoIcon/>}>Ustaw miniature</Button> : 
<Button className='input-toast' onClick={FileUploader} sx={{ margin: '10px' }}  variant="contained" color='success'>Zmien zdjecie</Button> 
}
</div>

 <div style={{ width: '90%', margin: '10px' }}>
 
  <InputLabel style={{ margin: '10px' }} className="site-label">Opis listy</InputLabel>
<textarea
maxLength={300}
style={{ resize: 'vertical' }} 
value={TierDesc}
onChange={(e) => setTierDesc(e.target.value)}/>  
 
 </div> 

{TierName == '' || TierCategory == 'Nie wybrano' || TierDesc == '' || IsImageSetted == false ? <Button sx={{ margin: '15px' }} variant="contained" color='error' startIcon={<ErrorOutlineIcon />}>
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