import React, { useState, useEffect } from 'react'   
import { useNavigate, useLocation, Link } from 'react-router-dom'

const TierFormPart2 = ({ IdList, TierName, TierDesc, TierCategory }) => {

  const [inputs, setInputs] = useState({})

  const location = useLocation()

  /* image upload */

  const [Image1, setImage1]= useState('')
  const [Image2, setImage2]= useState('')
  const [Image3, setImage3]= useState('')
  const [Image4, setImage4]= useState('')
  const [Image5, setImage5]= useState('')
  const [Image6, setImage6]= useState('')
  const [Image7, setImage7]= useState('')
  const [Image8, setImage8]= useState('')
  const [Image9, setImage9]= useState('')
  const [Image10, setImage10]= useState('')

  /* image upload */

  /* block addon function */
 
  /* block addon function */

  return (
    <>

    <div className='tier-items-add-panel' >

  <div className='addon-panel' >
      {/*BlockIteration.map((block, key) => (

    <div key={key} className='tier-addons'>

      <label>Nazwa klocka #{block.NumberBlock}</label>

      <input type="text" placeholder='petelok' 
      name={`${block.FirstInputName}`}
      onChange={HandleInputsChange} 
      required
      />

      <label>Klasyfikacja</label>

      <input type="text" placeholder="B"
      name={`${block.ThirdInputName}`}
      onChange={HandleInputsChange} 
      required
      />


    </div>

      ))*/}

  </div>

    <div className='addon-panel' >
      
    {/*ImgFunctionalityIteration.map(iteration => (
    <div className='tier-addons'>
      <label>Zdjęcie</label>  

        <div for="img-selector" className='thumbnail-container'>
          <img className='thumbnail-itself' src={iteration.img}/>
          <input 
          className="img-selector"
          style={{ position: 'absolute' }}
          type="file" 
          onChange={(e) => iteration.imgChanger(e.target.files[0])} 
          />
        </div>
        <input className='send-picture' type="submit" value="Prześlij obrazek 📷" onClick={iteration.ImgSenderFunction}/>
      </div>
    ))*/}
    </div>

      <div/>

    </div>
    <div>

    {/*<input onClick={HandleAddBlocks} className='create-list-btn' type="submit" value='Dodaj klocki'/>*/}

    <Link to={`/tier-lista/${location.pathname.split('/')[2]}`}>
    <input className='create-list-btn' type="submit" value='Przejdź do twojej listy'/>
    </Link>

    </div>
    

    </>
  )
}

export default TierFormPart2