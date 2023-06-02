// importing Hooks
import React, { useState } from "react";
// importing the necessary components from react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// importing Components
import Navbar from "./components/Navbar/navbar";
import Album from "./components/AlbumList/albumList";
import Image from "./components/ImageList/imageList";

function App() {
  // State for managing visibility of Image component
  const [visible, setVisible] = useState(false);
  // State for storing the selected photo ID
  const [photoId, setPhotoId] = useState({ id: "" });
  // State for storing the selected album name
  const [albumName, setAlbumName] = useState({ name: "" });

  return (
    <div className="App">
      {/* Navbar component */}
      <Navbar />
      {/* Conditional rendering of Album or Image component based on visibility */}
      {visible ? (
        // Render Image component
        <Image path={photoId.id} albumName={albumName.name} setVisible={setVisible} />
      ) : (
        // Render Album component
        <Album props={setVisible} setPhotoId={setPhotoId} setAlbumName={setAlbumName} />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
