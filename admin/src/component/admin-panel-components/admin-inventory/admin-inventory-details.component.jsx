import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './inventory.css'


const AdminInventoryDetail = () => {
    return (
        <div className='container-fluid m-auto'>
            <h2>Inventory Management</h2>
            <div className='inventory-grid'>
                <div className='cards-basic inventory-card'>
                    <h3>
                        <span className='mr-1'><FontAwesomeIcon icon="fa-solid fa-cube"/></span>
                        Total products
                    </h3>
                    <h1>188</h1>
                </div>

                <div className='cards-basic inventory-card'>
                    <h3>
                        <span className='mr-1'><FontAwesomeIcon icon="fa-solid fa-cube"/></span>
                        Outstocked products
                    </h3>
                    <h1>18</h1>
                </div>

                <div className='cards-basic inventory-card'>
                    <h3>
                        <span className='mr-1'><FontAwesomeIcon icon="fa-solid fa-cube"/></span>
                        Total Sellers
                    </h3>
                    <h1>15</h1>
                </div>

                <div className='cards-basic inventory-card'>
                    <h3>
                        <span className='mr-1'><FontAwesomeIcon icon="fa-solid fa-cube"/></span>
                        Stocked With Sellers
                    </h3>
                    <h1>80</h1>
                </div>
            </div>
        </div>
    )
}

export default AdminInventoryDetail;