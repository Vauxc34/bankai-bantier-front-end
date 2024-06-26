import React, { useState, useEffect } from 'react'   
import { useNavigate, useLocation, Link } from 'react-router-dom'  
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField'; 
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; 
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/system'; 

const TierFormPart2 = ({ IdList, TierName, TierDesc, TierCategory, Image, toast }) => {
  
  const [file, setFile] = useState("")
  const [percent, setPercent] = useState(0);
  const [ActualBlocks, setActualBlocks] = useState('')
  const [isNewBlockAdded, setIsNewBlockAdded] = useState(false)
  const [Title, setTitle] = useState('')
  const [Description, setDescription] = useState('S') 
  const [imageToShow, setImageToShow] = useState('')
  const [newAddedBlocks, setNewAddedBlocks] = useState([]) 
  const location = useLocation()

  useEffect(() => {

    const requestOptions = { 
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
       },
       
        };

    fetch(`${process.env.REACT_APP_IMPORTANT_LINK}lists/${IdList}`, requestOptions)
    .then(res => res.json()).then(res => setActualBlocks(res.list.blocks));

  }, [])
 
  const CreateList2 = () => {

    const requestOptions = { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({ "blocks": newAddedBlocks })}; 
      fetch(`${process.env.REACT_APP_IMPORTANT_LINK}lists/${location.pathname.split('/')[2]}`, requestOptions)
      .then(response => response.json()).then(data => data).then(fetch(`${process.env.REACT_APP_IMPORTANT_LINK}lists/${location.pathname.split('/')[2]}`, { 
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json', 
         },
      }).then(res => res.json()).then(data => data))
  }

  const AddNewBlockToArray = () => {
    const newArray = newAddedBlocks.concat({"title":`${Title}`,"description":`${Description}`,"image":`${imageToShow}`});
    setNewAddedBlocks(newArray)
    setIsNewBlockAdded(true)
  }

  const storage = getStorage(); 
  const storageRef = ref(storage, `/itier-additional-photos/${file.name}`);
 
  function FileUploader() { 
      
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
         
        setPercent(percent);
      },
      (err) => console.log(err),
      () => { 
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          //console.log(url);
          toast.info("File uploaded"); 
          setImageToShow(url)
        });
      }
    );
   

 }

  function handleChange(event) {
    setFile(event.target.files[0])
  }  

  /* */ 

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',  
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));
  
  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0, 
    backgroundPosition: '50% 50%'
  });
  
  const ImageD = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  }));
  
  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.4,
    transition: 'ease out',
  }));
  
  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: 'ease in',
  }));


  return (
    <>

<h1 style={{ margin: '15px' }} className='header-title'>JESZCZE TYLKO KLOCKI</h1> 

<div className='tier-items-add-panel' >

<div className='addon-panel'>

      <div className='tier-addons'>

        <div className='container-flex' style={{ flexDirection: 'row' }}>

          <div className='container-flex' style={{ flexDirection: 'column', margin: '5px' }}>
 
      <TextField   
  value={Title} onChange={(e) => setTitle(e.target.value)}
 id="filled-basic"
 label="Nazwa klocka" 
 color='secondary' 
 fullWidth required  variant="filled"  />

          </div>
        <FormControl style={{ margin: '5px' }}>
  <InputLabel className="site-label"></InputLabel>
  <Select 
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    color="secondary" 
    className='muiRenderFixedEl'
    defaultValue='S'
    value={Description} onChange={(e) => setDescription(e.target.value)} 
  >
  <MenuItem value={'S'} >S</MenuItem>
  <MenuItem value={'A'} >A</MenuItem>
  <MenuItem value={'B'} >B</MenuItem>
  <MenuItem value={'C'} >C</MenuItem>
  <MenuItem value={'D'} >D</MenuItem>
  <MenuItem value={'F'} >F</MenuItem>
  </Select>
        </FormControl>  
        </div>     
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}> 
          <ImageButton focusRipple  style={{  width: '100%', }}  >
            <ImageSrc style={{ backgroundImage: `url(${imageToShow})`, backgroundRepeat: 'no-repeat', backgroundPosition: '50% 50%', backgroundSize: 'cover' }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <input 
          className="img-selector"
          type="file" 
          onChange={handleChange} 
          accept="any" 
        />
            <ImageD>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: 5,
                }}
              >
                Wyslij zdjecie
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </ImageD>
          </ImageButton> 
        </Box> 
        <div className='container-flex'>
        {file == '' ? <Button  sx={{ margin: '10px' }} variant="contained" color='error' startIcon={<ErrorOutlineIcon />}>Brak zdjecia</Button> : <Button onClick={FileUploader}  sx={{ margin: '10px' }} variant="contained" color='secondary' startIcon={<CameraAltIcon />}>Wyslij zdjecie</Button>}
        <Button onClick={AddNewBlockToArray}  sx={{ margin: '10px' }} variant="contained" color='secondary' startIcon={<AddIcon />}>Dodaj klocka</Button>
        </div>
      </div>
    
     {isNewBlockAdded == [] ? "" : newAddedBlocks.map((item, key) => <>
     

      <div key={key} className='tier-addons'>  

      <div className='container-flex' style={{ justifyContent: 'space-evenly', alignItems: 'center', width: '100%', overflow: 'hidden', flexWrap: 'wrap' }}>
      <h2 style={{ margin: '10px' }}>{item.title}</h2>
      <h1>{item.description}</h1>
      </div>
 
      <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>

    <ImageButton focusRipple  style={{  width: '100%', }}  >
    <ImageSrc style={{ backgroundImage: `url(${item.image})`, backgroundRepeat: 'no-repeat', backgroundPosition: '50% 50%', backgroundSize: 'cover' }} />
    <ImageBackdrop className="MuiImageBackdrop-root" />
    
    <ImageD>
      <Typography
        component="span"
        variant="subtitle1"
        color="inherit"
        sx={{
          position: 'relative',
          p: 4,
          pt: 2,
          pb: 5,
        }}
      >
        {item.description}
        <ImageMarked className="MuiImageMarked-root" />
      </Typography>
    </ImageD>
  </ImageButton>
      </Box>  
       

      </div>

     </>)}

</div>

  <div/>

    </div>
    <div>

{newAddedBlocks == false ? <Button sx={{ margin: '15px' }} variant="contained" color='error' startIcon={<ErrorOutlineIcon />}>
Nie dodano klockow
</Button> : <Link to={`/tier-lista/${IdList}`}>
<Button onClick={CreateList2}  sx={{ margin: '15px' }} variant="contained" color='secondary' startIcon={<MeetingRoomIcon />}>
Przejdź do nowo utworzonej listy
</Button>
</Link>}



    </div>
    

    </>
  )
}

export default TierFormPart2