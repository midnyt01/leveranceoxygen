import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './search-box.styles.css'

const SearchBox = () => {
    return (
        <div className='search-box'>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size='lg' className='search-icon' />
            <input type="text" placeholder="Search for Sellers" className='search-input'/>
        </div>
    )
}

export default SearchBox;