// importing Hooks
import React, {useState, useEffect} from "react";
// importing Styles
import Style from "./imageList.module.css";
// importing Components
import ImageForm from "../ImageForm/imageForm";
// importing Firebase
import { db } from "../../firebaseInit";
import {collection ,onSnapshot} from 'firebase/firestore'

function ImageList(path, ImgName, setVisibile) {

    const [form,setForm] = useState("add");
    const [images ,setImages] = useState([]);
    const [selectedImg, setSelectedImg] = useState(null);
    console.log(images);

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

    function handleImgSelection(img) {
        setSelectedImg(img);
    }



    return (
        <div>
            {form === 'add' ? "" : <ImageForm path={path}/>}
            <div>
                <div className={Style.header_img}>
                    <div onClick={()=>{path.setVisible(false)}}> <img className={Style.back_icon} src="https://cdn-user-icons.flaticon.com/76452/76452489/1685650836477.svg?token=exp=1685651743~hmac=94c5b4aa21fb4d736943734dec875a1d" alt="back"/> </div>
                    <h1 className={Style.heading}>Images in {path.path}</h1>
                    <button className={form === 'add' ? "add-btn" : "cnl-btn"} onClick={() => {
                        setForm(form === 'add' ? 'cancel': 'add');
                    }}>{form === 'add' ? "+ Add image" : "Cancel"}</button>
                </div>
            </div>     

            <div className={Style.img_conatainer}>
                {images.map((img)=>{
                return (
                    <div className={Style.img_details}>
                        <div className={Style.img_display}>
                            <img src={img.url} alt="image"/>
                        </div>
                        <div className={Style.img_title}>
                            {img.title}
                            <img src="https://cdn-icons-png.flaticon.com/128/3221/3221897.png" alt="delete"/>
                        </div>
                    </div>
                )
                })}
            </div> 
        </div>
    )
}

export default ImageList;