// importing Hooks
import React, { useState, useEffect } from 'react';
// importing Toast 
import { toast } from "react-toastify";
// importing Styles
import Style from "./albumList.module.css";
// importing Components
import AlbumForm from "../AlbumForm/albumForm";
// importing Firebase
import { db } from "../../firebaseInit";
import { collection, onSnapshot } from "firebase/firestore";

function AlbumList({ props, setPhotoId, setAlbumName }) {
  // State for managing form visibility
  const [form, setForm] = useState("add");
  // State for storing the albums
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Fetch albums from Firestore
    onSnapshot(collection(db, "albums"), (snapShot) => {
      const albums = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      });
      setAlbums(albums);
    });
  }, []);

  function handlePhotos(id, name) {
    // Set photo ID and album name for Image component
    props(true);
    setPhotoId({ id: id });
    setAlbumName({ name: name });
  }

  return (
    <div>
      {/* Conditional rendering of AlbumForm */}
      {form === 'add' ? "" : <AlbumForm />}
      <div>
        <div className={Style.header_album}>
          <h1 className={Style.heading}>Albums</h1>
          <button className={form === 'add' ? "add-btn" : "cnl-btn"} onClick={() => {
            setForm(form === 'add' ? 'cancel' : 'add');
          }}>{form === 'add' ? "+ Add album" : "Cancel"}</button>
        </div>
      </div>

      {/* Conditional rendering of albums */}
      {albums.length === 0 ? (
        // Render message when there are no albums
        <div className={Style.album_empty}>Albums are on a leave: Embrace the empty canvas.</div>
      ) : (
        // Render albums
        <div className={Style.album_container}>
          {albums.map((album) => {
            return (
              <div
                className={Style.album_details}
                onClick={() => handlePhotos(album.id, album.name)}
                key={album.id}
              >
                <img
                  className={Style.album_img}
                  alt="album"
                  src="https://cdn-icons-png.flaticon.com/128/7894/7894161.png"
                />
                <div className={Style.album_title}>{album.name}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AlbumList;
