// importing Hooks
import React,{ useState ,useRef} from 'react';
// importing Styles
import Style from "./updateForm.module.css";
// importing Firebase
import {doc, setDoc } from 'firebase/firestore';
import {db} from '../../firebaseInit';


function UpdateForm({path, img, setUpdateForm }) {

  const [formData,setFormData] = useState({title:img.title, url:img.url, id:img.id});

  // Function to handle the update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const docRef = doc(db, `albums/${path}/images`, img.id);
    await setDoc(docRef, {
      id: formData.id,
      title: formData.title,
      url: formData.url
    });

    // Close the form
    setUpdateForm(false);
  };

  // Function to handle the cancel
  const handleCancel = () => {
    // Close the form
    setUpdateForm(false);
  };


  return (
    <div>
      <form onSubmit={handleUpdate} className={Style.img_form}>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={Style.img_name}
          />
          <input    
            type="url"
            value={img.url}
            readOnly
            className={Style.img_name}
          />

        <div className={Style.form_row}>
          <button onClick={handleCancel} className={Style.clear_btn}>Cancel</button>
          <button className={Style.create_btn}>Update</button>
        </div>
      </form>
    </div>
  );
}


export default UpdateForm;