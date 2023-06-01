// importing Hooks
import React, {useState} from "react";
// importing Components
import Navbar from "./components/Navbar/navbar";
import Album from "./components/AlbumList/albumList";
import Image from "./components/ImageList/imageList";

function App() {

  const [visible, setVisible] = useState(false);
  const [photoId, setPhotoId] = useState({ id: "" });
  const [albumName , setAlbumName] = useState({name : ""});


  return (
    <div className="App">
      <Navbar />
      {visible ? 
      <Image path={photoId.id} albumName={albumName.name} setVisible={setVisible}  /> : 
      <Album props={setVisible} setPhotoId={setPhotoId} setAlbumName={setAlbumName}/> }
    </div>
  );
}

export default App;
