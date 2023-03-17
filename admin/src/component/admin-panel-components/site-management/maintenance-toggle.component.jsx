import { SiteSettings } from '@components'

const MaintenanceToggle = () => {
    const logState = state => {
    console.log("Toggled:", state)
    }

    return (
        <SiteSettings
            label="Toggle me"
            toggled={true}
            onClick={logState}
        />
        );
    };
    
export default MaintenanceToggle;