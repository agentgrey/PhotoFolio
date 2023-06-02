// importing Hooks
import React, { useState, useEffect } from 'react';
// imoprting Styles
import Style from "./albumList.module.css";
// importing Components
import AlbumForm from "../AlbumForm/albumForm"
// importing Firebase
import {db} from "../../firebaseInit"
import {collection,onSnapshot} from "firebase/firestore";

function AlbumList({props, setPhotoId, setAlbumName}) {

    const [form,setForm] = useState("add");
    const [album,setAlbum] = useState([]);

    useEffect(()=>{
        onSnapshot(collection(db,"albums"),(snapShot)=>{
            const album = snapShot.docs.map((doc) => {
                return{
                    id: doc.id,
                    ...doc.data()
                }
            })
            setAlbum(album);
        })
    },[])

    function handlePhotos(id, name) {
        props(true);
        setPhotoId({id : id});
        setAlbumName({name : name});
    }


    return (
        <div>
            {form === 'add' ? "" : <AlbumForm />}
            <div>
                <div className={Style.header_album}>
                    <h1 className={Style.heading}>Albums</h1>
                    <button className={form === 'add' ? "add-btn" : "cnl-btn"} onClick={() => {
                        setForm(form === 'add' ? 'cancel': 'add');
                    }}>{form === 'add' ? "+ Add album" : "Cancel"}</button>
                </div>
            </div>
            
            <div className={Style.album_container}>   
                {album.map((album)=>{
                    return (
                        // display each album
                        <div className={Style.album_details} onClick={()=>handlePhotos(album.id,album.name)} 
                        key={album.id}>
                            <img className={Style.album_img} alt="album" 
                            src="https://cdn-icons-png.flaticon.com/128/7894/7894161.png"/>
                            <div className={Style.album_title}>{album.name}</div> 
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AlbumList;