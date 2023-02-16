import banner from '../../../assets/gasesbanner.jpg'
import SearchBox from '../search-box/search-box.component';

import './banner.styles.css'

const Banner = () => {
    return (
        <div className="banner-container">
            <img className='banner' src={banner} alt='oxygen cylinder banner'/>
        </div>
    )
}

export default Banner;