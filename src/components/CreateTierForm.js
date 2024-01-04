import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom' 

/* components */

import TierFormPart1 from './parts/TierFormPart1'
import TierFormPart2 from './parts/TierFormPart2'
import TierExtend from './parts/TierExtend'

/* components */

const CreateTierForm = () => {

  const [actualStep, setActualStep]= useState(0)
  const [IdList, setIdList] = useState(Math.floor(Math.random() * 99999999))
  const [TierName, setTierName] = useState('')
  const [TierDesc, setTierDesc] = useState('')
  const [TierCategory, setTierCategory] = useState('Nie wybrano') 

  /*const HandleCreatedList = async () => {
    await setDoc(doc(db, `tier-listy/${IdList}`), {
      IdList: IdList,
      TierName: TierName,
      TierCategory: TierCategory,
    })
    HandleStepChange()
  }
  
  const HandleStepChange = () => {
    setActualStep(1)
  }*/

  return (
  <>
    <div className='tier-form-itself'>
    <TierExtend/>
    {actualStep == 0 ? <TierFormPart1
    IdList={IdList}
    setIdList={setIdList}
    TierName={TierName}
    setTierName={setTierName}
    TierDesc={TierDesc}
    setTierDesc={setTierDesc}
    TierCategory={TierCategory}
    setTierCategory={setTierCategory}
    //HandleCreatedList={HandleCreatedList}
    setActualStep={setActualStep} 
    //HandleStepChange={HandleStepChange}
    /> : 
    <TierFormPart2
    IdList={IdList}
    setIdList={setIdList}
    TierName={TierName}
    TierDesc={TierDesc}
    TierCategory={TierCategory}
    />}
    
    </div>
  </>
    )
}

export default CreateTierForm;
