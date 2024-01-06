import React, { useState, useEffect } from 'react'   
import { useNavigate, useLocation, Link } from 'react-router-dom' 
import FileUploader from "react-firebase-file-uploader";  
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, app } from '../config';


const TierFormPart2 = ({ IdList, TierName, TierDesc, TierCategory, Image, setImage, SendAPhoto }) => {

  const [ActualBlocks, setActualBlocks] = useState('[{"title":"testowo11","description":"lorem ipsum","image":"https://fwcdn.pl/ppo/92/57/179257/466970.2.jpg"}, {"title":"ciul21","description":"lorem ipsum","image":"https://fwcdn.pl/ppo/92/57/179257/466970.2.jpg"}, {"title":"ciul45","description":"lorem ipsum","image":"https://fwcdn.pl/ppo/92/57/179257/466970.2.jpg"}]')
  const [Title, setTitle] = useState('')
  const [Description, setDescription] = useState('') 

  const [newAddedBlocks, setNewAddedBlocks] = useState([
    {"title":"SAMPLE BLOCK #1","description":"SAMPLE DESCRIPTION #1","image":"https://static.thenounproject.com/png/275465-200.png"},
    {"title":"SAMPLE BLOCK #2","description":"SAMPLE DESCRIPTION #2","image":"https://static.thenounproject.com/png/275465-200.png"},
    {"title":"SAMPLE BLOCK #3","description":"SAMPLE DESCRIPTION #3","image":"https://static.thenounproject.com/png/275465-200.png"}
  ]) 

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

  let Rest = JSON.parse(ActualBlocks)

  const CreateList2 = () => {

    const requestOptions = { 
     
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
       },
      body: JSON.stringify(
        
        {
        "id": IdList,
        "name": TierName,
        "category": TierCategory,
        "blocks": newAddedBlocks
        }
    
    
    )
      }; 
    
      fetch(`${process.env.REACT_APP_IMPORTANT_LINK}lists/`, requestOptions)
      .then(response => console.log(response.json()))  
  }

  const AddNewBlockToArray = () => {
    const newArray = newAddedBlocks.concat({"title":`${Title}`,"description":`${Description}`,"image":`${Image}`});
    setNewAddedBlocks(newArray)}

  console.log(newAddedBlocks) 
 
  // State to store uploaded file
  const [file, setFile] = useState("");

  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const storageRef = ref(storage, `/profileImage/${file.name}`);

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }

   

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        alert("File uploaded...");
        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
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


      <div>
      <input type="file" onChange={handleChange} accept="/profileImage/*" />
      <button onClick={handleUpload}>Upload to Firebase</button>
      <p>{percent} "% done"</p>
    </div>


        <div for="img-selector" className='thumbnail-container'>
          <img className='thumbnail-itself' src={Image}/>
          <input 
          className="img-selector"
          style={{ position: 'absolute' }}
          type="file" 
           
          onChange={(e) => { 
            setImage(e.target.files[0]);
          }}
        />
        </div> 

        <input onClick={SendAPhoto} className='send-picture' type="submit" value="Prześlij obrazek 📷"/>
         

      <label>Klasyfikacja</label>
      <input type="text" placeholder="B" value={Description} onChange={(e) => setDescription(e.target.value)} required />

      <input onClick={AddNewBlockToArray} className='create-list-btn' type="submit" value='Dodaj klocka'/>
   

    </div>
    
    
    {ActualBlocks == '[{ "id": 900,"name": "teshiu","category": "chdcuj","blocks": [{"title":"testowo11","description":"lorem ipsum","image":"https://fwcdn.pl/ppo/92/57/179257/466970.2.jpg"}, {"title":"ciul21","description":"lorem ipsum","image":"https://fwcdn.pl/ppo/92/57/179257/466970.2.jpg"}, {"title":"ciul45","description":"lorem ipsum","image":"https://fwcdn.pl/ppo/92/57/179257/466970.2.jpg"} ]}]' 
     ?  "null" : 
     Rest.map((item, key) => <>
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

    <Link to={`/tier-lista/${location.pathname.split('/')[2]}`}>
    <input onClick={CreateList2} className='create-list-btn' type="submit" value='Przejdź do twojej listy'/>
    </Link>

    </div>
    

    </>
  )
}

export default TierFormPart2