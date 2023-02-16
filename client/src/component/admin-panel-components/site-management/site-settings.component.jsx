// import ConfirmDelete from "../confirm-delete/confirm-delete";
import { useState } from 'react'
import './maintenance.styles.css'

const SiteSettings = ({ label, toggled, onClick }) => {

    const [isToggled, toggle] = useState(toggled)
    
    const callback = () => {
        toggle(!isToggled)
        onClick(!isToggled)
    };

    return (

        <div>
            <div className="container-fluid m-auto">
                <h3>Site Settings</h3>
                <div className='maintenance-toggle'>
                    <p>Maintenance Mode</p>
                    <label>
                        <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
                        <span />
                        <strong>{label}</strong>
                    </label>
                </div>
            </div>
        </div>
  );
};

export default SiteSettings;