import mapImage from '../../../assets/map-image.png'

const Map = () => {
    return (

        <div className='container-fluid m-auto'>
            <div className="mt-3 mb-4">
                    <img src={mapImage} alt='map' className='w-100 br-12' />
            </div>
        </div>
    )
}


export default Map;