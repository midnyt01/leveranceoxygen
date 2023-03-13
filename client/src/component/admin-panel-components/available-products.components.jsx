import React from 'react'

const AvailableProducts = ({MFID, ProductId, handleOnChange}) => {
    const handleChange = (e) => {
        handleOnChange(e);
    }
  return (
    <div>
        <input type="checkbox" name={MFID} value={ProductId} checked={false} onChange={handleChange} />
        <label> {MFID}</label><br/>
    </div>
  )
}

export default AvailableProducts