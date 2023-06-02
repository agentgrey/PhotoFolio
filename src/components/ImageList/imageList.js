// importing Hooks
import React, {useState, useEffect} from "react";
// importing Styles
import Style from "./imageList.module.css";
// importing Components
import ImageForm from "../ImageForm/imageForm";
import UpdateForm from "../UpdateForm/updateForm";
// importing Firebase
import { db } from "../../firebaseInit";
import {collection ,onSnapshot, deleteDoc, setDoc, doc} from 'firebase/firestore';

function ImageList(path, ImgName, setVisibile) {

    const [form,setForm] = useState("add");
    const [updateForm,setUpdateForm] = useState(false);
    const [updateImg, setUpdateImg] = useState({title:'', url:'', id:''})
    const [images ,setImages] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(()=>{
      const unsub =  onSnapshot(collection(db,`albums/${path.path}/images`),(snapShot)=>{
            const Imgs = snapShot.docs.map((doc) => {
                return{
                    id: doc.id,
                    ...doc.data()
                }
            })                 
            setImages(Imgs);                 
        })        
    },[]);

// function to preview the selected image
    function handleImgSelection(img, index) {
        setSelectedImg(img);
        setCurrentIndex(index);
    }
// functin to preview the next image
    function handleNextImage() {
        const idx = currentIndex === images.length-1 ? 0 : currentIndex + 1;
        handleImgSelection(images[idx], idx);
    }
// function to preview the previous image
    function handlePrevImage() {
        const idx = currentIndex === 0 ? images.length-1 : currentIndex - 1;
        handleImgSelection(images[idx], idx);
    }


// function to delete the images
    async function handleDelete(e, id) {
        e.stopPropagation();

        await deleteDoc(doc(db, `albums/${path.path}/images`, id));
    }


    return (
        <div>
            {form === 'add' ? "" : <ImageForm path={path}/>}
            <div>
                <div className={Style.header_img}>
                    <div onClick={()=>{path.setVisible(false)}}> <img className={Style.back_icon} src="https://cdn-user-icons.flaticon.com/76452/76452489/1685689622094.svg?token=exp=1685690525~hmac=b460a6d5c6d9a4714c8307d46cd1fd12" alt="back"/> </div>
                    <h1 className={Style.heading}>Images in {path.path}</h1>
                    <button className={form === 'add' ? "add-btn" : "cnl-btn"} onClick={() => {
                        setForm(form === 'add' ? 'cancel': 'add');
                    }}>{form === 'add' ? "+ Add image" : "Cancel"}</button>
                </div>
            </div>     
            {/* Conditionoal redering of the imagesForm which will edit images details*/}
                <div>
                    {updateForm ? <UpdateForm
                    path={path.path}
                    img={updateImg} 
                    setUpdateForm={setUpdateForm} /> : ""}
                </div>
            <div className={Style.img_conatainer}>
                {images.map((img, index)=>{
                return (
                    <div className={Style.img_details} key={img.id}>
                        <div className={Style.img_display}>
                            <img src={img.url} alt="image" onClick={() => handleImgSelection(img, index)} />
                        </div>
                        <div className={Style.img_options}>
                            <img onClick={(e) => { e.stopPropagation(); setUpdateForm(true); 
                            setUpdateImg({title:img.title, url:img.url, id:img.id}); }}
                            src="https://cdn-user-icons.flaticon.com/76452/76452489/1685690077960.svg?token=exp=1685690981~hmac=983412bc1908aa68bb503c36c5e5245f"  alt="edit" />
                            <img onClick={(e) => handleDelete(e, img.id)}
                            src="https://cdn-user-icons.flaticon.com/76452/76452489/1685689038709.svg?token=exp=1685689942~hmac=3fbd05a9df080bf663abc06fba4ac69f"  alt="delete" />
                        </div>
                        <div className={Style.img_title}>
                            {img.title}
                        </div>
                    </div>
                )
                })}
            </div> 
            

            {/* Carousel */}
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