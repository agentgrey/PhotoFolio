// importing Hooks
import React, { useState, useEffect } from "react";
// importing Styles
import Style from "./imageList.module.css";
// importing Components
import ImageForm from "../ImageForm/imageForm";
import UpdateForm from "../UpdateForm/updateForm";
// importing Firebase
import { db } from "../../firebaseInit";
import { collection, onSnapshot, deleteDoc, setDoc, doc } from 'firebase/firestore';

function ImageList(path, ImgName, setVisibile) {

  const [form, setForm] = useState("add");
  const [updateForm, setUpdateForm] = useState(false);
  const [updateImg, setUpdateImg] = useState({ title: '', url: '', id: '' });
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, `albums/${path.path}/images`), (snapShot) => {
      const Imgs = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      setImages(Imgs);
    })
    return () => unsub();
  }, []);

  // Function to handle the image selection for preview
  function handleImgSelection(img, index) {
    setSelectedImg(img);
    setCurrentIndex(index);
  }

  // Function to preview the next image
  function handleNextImage() {
    const idx = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    handleImgSelection(images[idx], idx);
  }

  // Function to preview the previous image
  function handlePrevImage() {
    const idx = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    handleImgSelection(images[idx], idx);
  }

  // Function to delete an image
  async function handleDelete(e, id) {
    e.stopPropagation();
    await deleteDoc(doc(db, `albums/${path.path}/images`, id));
  }

  // Function to handle search term change
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to filter images based on search term
  const filteredImages = images.filter((img) =>
    img.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Conditional rendering of the ImageForm to add images */}
      {form === 'add' ? "" : <ImageForm path={path} />}
      <div>
        <div className={Style.header_img}>
          <div onClick={() => { path.setVisible(false) }}> <img className={Style.back_icon} src="https://cdn-user-icons.flaticon.com/76452/76452489/1685689622094.svg?token=exp=1685690525~hmac=b460a6d5c6d9a4714c8307d46cd1fd12" alt="back" /> </div>
          <h1 className={Style.heading}>Images in {path.path}</h1>
          <div className={Style.images_menu}>
            {/* Search input */}
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder="Search Images"
              className={Style.searchInput}
            />
            {/* Add image button or cancel button */}
            <button className={form === 'add' ? "add-btn" : "cnl-btn"} onClick={() => {
              setForm(form === 'add' ? 'cancel' : 'add');
            }}>{form === 'add' ? "+ Add image" : "Cancel"}</button>
          </div>
        </div>
      </div>
      {/* Conditionoal redering of the updateForm which will edit images details*/}
      <div>
        {updateForm ? <UpdateForm
          path={path.path}
          img={updateImg}
          setUpdateForm={setUpdateForm} /> : ""}
      </div>


      { images.length===0 ? <div className={Style.img_empty}>Looks like the images went on an adventure! They'll be back soon.</div> :
      filteredImages.length === 0 ?
        // If there are no images
        <div className={Style.img_empty}>Oops! No image matches your search</div> :
        // Show all the images present in the album
        <div className={Style.img_conatainer}>
          {filteredImages.map((img, index) => {
            return (
              <div className={Style.img_details} key={img.id}>
                <div className={Style.img_display}>
                  <img src={img.url} alt="image" onClick={() => handleImgSelection(img, index)} />
                </div>
                <div className={Style.img_options}>
                  <img onClick={(e) => {
                    e.stopPropagation();
                    setUpdateForm(true);
                    setUpdateImg({ title: img.title, url: img.url, id: img.id });
                  }}
                    src="https://cdn-user-icons.flaticon.com/76452/76452489/1685690077960.svg?token=exp=1685690981~hmac=983412bc1908aa68bb503c36c5e5245f" alt="edit" />
                  <img onClick={(e) => handleDelete(e, img.id)}
                    src="https://cdn-user-icons.flaticon.com/76452/76452489/1685689038709.svg?token=exp=1685689942~hmac=3fbd05a9df080bf663abc06fba4ac69f" alt="delete" />
                </div>
                <div className={Style.img_title}>
                  {img.title}
                </div>
              </div>
            )
          })}
        </div>} 


      {/* Carousel to view images */}
      {selectedImg && (
        <div className={Style.modal}>
          <img src={selectedImg.url} alt="image" />
          <button className={Style.closeButton} onClick={() => setSelectedImg(null)}>
            X
          </button>
          <button className={Style.prevButton} onClick={handlePrevImage}>
            &lt;
          </button>
          <button className={Style.nextButton} onClick={handleNextImage}>
            &gt;
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageList;
