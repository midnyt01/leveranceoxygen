// import { Link } from 'react-router-dom';
import React from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import './admin-banner.styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Banners = () => {

  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (

    <div>
      <div className='container-fluid m-auto'>
        <h2>Add Banner</h2>
          <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={["jpg"]}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                className="banner-upload-btn"
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                <FontAwesomeIcon icon="fa-solid fa-file-arrow-up" /><br />
                <span className="secondary-text">Click, Drag or Drop</span>
              </button>
              &nbsp;
              {/* <button className="btn dngr" onClick={onImageRemoveAll}><FontAwesomeIcon icon="fa-solid fa-trash" /></button> */}
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.data_url} alt="" width="200" />
                  <div className="image-item__btn-wrapper">
                    <button className="btn transparent-bg" onClick={() => onImageUpdate(index)}><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /></button>
                    <button className="btn transparent-bg cta-link" onClick={() => onImageRemove(index)}><FontAwesomeIcon icon="fa-solid fa-delete-left" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
       </div>
    </div>
  );
};

export default Banners;
