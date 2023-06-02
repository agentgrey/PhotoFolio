// importing Hooks
import React, { useState, useRef } from 'react';
// importing Toast 
import { toast } from "react-toastify";
// importing Styles
import Style from "./albumForm.module.css";
// importing Firebase
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseInit';

function AlbumForm() {
  // State for managing form data
  const [formData, setFormData] = useState({ name: '' });
  const name = useRef();

  // Function to clear form inputs
  function handleClear() {
    setFormData({ name: '' });
  }

  // Function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    const docRef = doc(db, "albums", name.current.value);
    await setDoc(docRef, {
      name: formData.name,
      createdOn: new Date()
    });
    // toast message for success
    toast.success('Album added successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

    handleClear();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={Style.album_form}>
        <div className={Style.form_row}>
          <input
            type="text"
            placeholder="Album Name"
            value={formData.name}
            ref={name}
            onChange={(e) => setFormData({ name: e.target.value })}
            className={Style.album_name}
            required
          />
        </div>
        <div className={Style.form_row}>
          <button onClick={handleClear} className={Style.clear_btn}>Clear</button>
          <button type="submit" className={Style.create_btn}>Create</button>
        </div>
      </form>
    </div>
  );
}

export default AlbumForm;
