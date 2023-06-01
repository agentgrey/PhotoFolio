// importing Hooks
import React,{ useState ,useRef} from 'react';
// importing Styles
import Style from "./albumForm.module.css";
// importing Firebase
import {doc, setDoc } from 'firebase/firestore';
import {db} from '../../firebaseInit';


function AlbumForm() {

  const [formData,setFormData] = useState({name:''});
  const name = useRef();

//  handle clear button function
  function handleClear() {
    setFormData({name:''});
  }

// handle create button function
  async function handleSubmit(e) {
    e.preventDefault();

    const docRef = doc(db,"albums", name.current.value);
    await setDoc(docRef, {
      name: formData.name,
      createdOn: new Date()
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
            onChange={(e)=> setFormData({name: e.target.value})}
            className={Style.album_name}
            required
          />
        </div>
        <div className={Style.form_row}>
          <button onClick={handleClear} className={Style.clear_btn}>Clear</button>
          <button className={Style.create_btn}>Create</button>
        </div>
      </form>
    </div>
  );
}


export default AlbumForm;