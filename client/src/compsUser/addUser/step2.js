import React from 'react'
import Register from '../register/register'

const Step2 = ({user, buildId, onSubmit, building, setBuilding}) => {
  return (
    <div className='p-5'>
        <Register user={user} buildId={buildId}  onSubmit={onSubmit} building={building} setBuilding={setBuilding}/>
    </div>
  )
}

export default Step2