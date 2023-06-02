// importing Hooks
import React, { useState, useRef } from 'react';
// importing Toast 
import { toast } from "react-toastify";
// importing Styles
import Style from "./imageForm.module.css";
// importing Firebase
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseInit';

function ImageForm(path) {
  // State for managing form data
  const [formData, setFormData] = useState({ title: '', url: '' });
  const title = useRef();

  // Function to clear form inputs
  function handleClear() {
    setFormData({ title: '', url: '' });
  }

  // Function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    const albumPath = path.path.albumName; // Access the actual path value from the `path` prop
    console.log(albumPath);
    const docRef = doc(db, `albums/${albumPath}/images`, title.current.value);
    await setDoc(docRef, {
      title: formData.title,
      url: formData.url
    });
    // toast message for success
    toast.success('Image added successfully!', {
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
      <form onSubmit={handleSubmit} className={Style.img_form}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          ref={title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={Style.img_name}
          required
        />
        <input
          type="url"
          placeholder="Image url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className={Style.img_name}
          required
        />

        <div className={Style.form_row}>
          <button onClick={handleClear} className={Style.clear_btn}>Clear</button>
          <button type="submit" className={Style.create_btn}>Add</button>
        </div>
      </form>
    </div>
  );
}

export default ImageForm;
