import React, { useState, useEffect } from 'react'   
import { useNavigate, useLocation, Link } from 'react-router-dom'  
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, app } from '../config';


const TierFormPart2 = ({ IdList, TierName, TierDesc, TierCategory, Image }) => {
  
  const [file, setFile] = useState("")
  const [percent, setPercent] = useState(0);
  const [ActualBlocks, setActualBlocks] = useState('[{"title":"testowo11","description":"lorem ipsum","image":"https://fwcdn.pl/ppo/92/57/179257/466970.2.jpg"}, {"title":"ciul21","description":"lorem ipsum","image":"https://fwcdn.pl/ppo/92/57/179257/466970.2.jpg"}, {"title":"ciul45","description":"lorem ipsum","image":"https://fwcdn.pl/ppo/92/57/179257/466970.2.jpg"}]')
  const [Title, setTitle] = useState('')
  const [Description, setDescription] = useState('') 
  const [imageToShow, setImageToShow] = useState('https://static.thenounproject.com/png/275465-200.png')
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
      headers: { 
        'Content-Type': 'application/json', 
       },
      body: JSON.stringify(
        
        {
        "blocks": newAddedBlocks
        }
    
    
    )
      }; 
    
      fetch(`${process.env.REACT_APP_IMPORTANT_LINK}lists/${location.pathname.split('/')[2]}`, requestOptions)
      .then(response => response.json()).then(data => console.log(data)).then(fetch(`${process.env.REACT_APP_IMPORTANT_LINK}lists/${location.pathname.split('/')[2]}`, { 
     
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json', 
         },
         
          }).then(res => res.json()).then(data => console.log(data)))
  }

  const AddNewBlockToArray = () => {
    const newArray = newAddedBlocks.concat({"title":`${Title}`,"description":`${Description}`,"image":`${imageToShow}`});
    setNewAddedBlocks(newArray)}
 
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const storage = getStorage(); 
  const storageRef = ref(storage, `/itier-additional-photos/${file.name}`);

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }

    
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        //alert("File uploaded..."); 
        setPercent(percent);
      },
      (err) => console.log(err),
      () => { 
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setImageToShow(url)
        });
      }
    );
  }; 
 
  return (
    <>

<div className='tier-items-add-panel' >

<div className='addon-panel'>

    <div className='tier-addons'>
      <label>#NOWY KLOCEK</label>
      <input type="text" placeholder='999' value={Title} onChange={(e) => setTitle(e.target.value)} required />
 
      <label>Zdjęcie</label>  

        <div for="img-selector" className='thumbnail-container'>
          <img className='thumbnail-itself' src={imageToShow}/>
          <input 
          className="img-selector"
          style={{ position: 'absolute' }}
          type="file" 
          onChange={handleChange} 
          accept="any"

          //accept="/profileImage/*"
        />
        </div> 

        <input onClick={handleUpload}  className='send-picture' type="submit" value="Prześlij obrazek 📷"/>
         

      <label>Klasyfikacja</label>
      <input type="text" placeholder="B" value={Description} onChange={(e) => setDescription(e.target.value)} required />

      <input onClick={AddNewBlockToArray} className='create-list-btn' type="submit" value='Dodaj klocka'/>
   

    </div>
    
    
     {newAddedBlocks == [] ? "" : newAddedBlocks.map((item, key) => <>
     
      <div key={key} className='tier-addons'>
      <label>#{item.title}</label>
      <input type="text" placeholder={item.title} required />
 
      <label>Zdjęcie</label>  

        <div for="img-selector" className='thumbnail-container'>
          <img className='thumbnail-itself' src={item.image}/>
          <input 
          className="img-selector"
          style={{ position: 'absolute' }}
          type="file" 
          />
        </div>
        <input className='send-picture' type="submit" value="Prześlij obrazek 📷"/>
      

      <label>Klasyfikacja</label>
      <input type="text" placeholder="B" required />

      
      </div>

     </>)}

    </div>

      <div/>

    </div>
    <div>

    <Link to={`/tier-lista/${IdList}`}>
    <input onClick={CreateList2} className='create-list-btn' type="submit" value='Przejdź do twojej listy'/>
    </Link>
     

    </div>
    

    </>
  )
}

export default TierFormPart2