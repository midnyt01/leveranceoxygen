import './inventory.css'


const AdminInventoryTable = () => {
    return (
        <div className='container-fluid m-auto'>
            <h3>Recent Invoices</h3>
            <table className='inventory-table mb-2'>
                <tr>
                    <th>Purchase date</th>
                    <th>Ref no.</th>
                    <th>Vendor name</th>
                    <th>Order sub total</th>
                </tr>

                <tr>
                    <td>22-12-2022</td>
                    <td>#0110221</td>
                    <td>KGN Cylinder</td>
                    <td>20,200.00</td>
                </tr>

                <tr>
                    <td>22-12-2022</td>
                    <td>#0110220</td>
                    <td>Kareli Cylinder</td>
                    <td>8,400.00</td>
                </tr>

                <tr>
                    <td>22-12-2022</td>
                    <td>#0110219</td>
                    <td>Banda Cylinder</td>
                    <td>10,200.00</td>
                </tr>
            </table>
        </div>
    )
}

export default AdminInventoryTable;