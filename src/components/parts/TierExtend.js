import React, { useState, useEffect } from 'react'  

const TierExtend = () => {

  const [ImageSetter, setImageSetter] = useState("")

    let incrementValue = 0

    /*useEffect(() => {

        for (incrementValue = 0; incrementValue < 10; incrementValue++) {

            const HandleUploaderPhotos = () => {
              const ImgName = Math.floor(Math.random() * 500) + `${ImageSetter + incrementValue}`
              const storage = getStorage(app);
              const storageRef = ref(storage, incrementValue);
              const uploadTask = uploadBytesResumable(storageRef, incrementValue);
          
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
                  
                });
              }
            );
          
            }

        }   
        
    }, [])
*/

    console.log(ImageSetter)

  return (
    <>

    </>
  )
}

export default TierExtend