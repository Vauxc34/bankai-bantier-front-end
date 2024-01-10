import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom' 
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { storage, app } from './config';

/* components */

import TierFormPart1 from './parts/TierFormPart1'
import TierFormPart2 from './parts/TierFormPart2' 

/* components */
 

const CreateTierForm = () => {

  const [actualStep, setActualStep]= useState(0)
  const [IdList, setIdList] = useState(Math.floor(Math.random() * 9999))
  const [TierName, setTierName] = useState('')
  const [TierDesc, setTierDesc] = useState('')
  const [TierCategory, setTierCategory] = useState('Nie wybrano') 
  const [Image, setImage] = useState('')  
  const [TierlistThumbnail, setTierListThumbnail] = useState('')

   const HandleCreatedList = () => {
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
    "image": TierlistThumbnail,
    "description": TierDesc,
    "blocks":   [
        {"title":"SAMPLE BLOCK #1","description":"SAMPLE DESCRIPTION #1","image":"https://static.thenounproject.com/png/275465-200.png"},
        {"title":"SAMPLE BLOCK #2","description":"SAMPLE DESCRIPTION #2","image":"https://static.thenounproject.com/png/275465-200.png"},
        {"title":"SAMPLE BLOCK #3","description":"SAMPLE DESCRIPTION #3","image":"https://static.thenounproject.com/png/275465-200.png"}
    ] 
    }


)
  };
  fetch(`${process.env.REACT_APP_IMPORTANT_LINK}lists/`, requestOptions)
  .then(response => response.json())
  setActualStep(2)
   } 
  
   const SendAPhoto = () => {

    const ImgName = Math.floor(Math.random() * 500) + Image
    const storage = getStorage(app);
    const storageRef = ref(storage, ImgName);
    const uploadTask = uploadBytesResumable(storageRef, Image);

    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
     
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setImage(downloadURL)
      });
    }
  );
   }  

  return (
  <>
    <div className='tier-form-itself' style={{ overflowY: 'scroll' }}>
     
    {actualStep == 0 ? <TierFormPart1
    IdList={IdList}
    setIdList={setIdList}
    TierName={TierName}
    setTierName={setTierName}
    TierDesc={TierDesc}
    setTierDesc={setTierDesc}
    TierCategory={TierCategory}
    setTierCategory={setTierCategory}
    HandleCreatedList={HandleCreatedList}
    setActualStep={setActualStep}  
    TierlistThumbnail={TierlistThumbnail}
    setTierListThumbnail={setTierListThumbnail}
    toast={toast}
    /> : 
    <TierFormPart2  
    IdList={IdList}
    setIdList={setIdList}
    TierName={TierName}
    TierDesc={TierDesc}
    TierCategory={TierCategory}
    Image={Image}
    setImage={setImage}
    SendAPhoto={SendAPhoto}
    toast={toast}
    />}
    
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </div>
  </>
    )
}

export default CreateTierForm;
