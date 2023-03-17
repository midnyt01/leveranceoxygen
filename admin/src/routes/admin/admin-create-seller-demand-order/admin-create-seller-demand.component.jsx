import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Topbar from '../../../component/admin-panel-components/admin-topbar/topbar.component'
import CreateSellerOrderFromDemandById from '../admin-create-seller-order-demand/admin-create-seller-order-demand.component'

const CreateSellerDemandOrder = () => {
  return (
    <Routes>
        <Route index element={ <Topbar /> } />
        <Route path="/:DemandId" element={ <CreateSellerOrderFromDemandById/> } />
    </Routes>
  )
}

export default CreateSellerDemandOrder