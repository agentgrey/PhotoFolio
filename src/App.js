import React from "react";
// importing Components
import Navbar from "./components/Navbar/navbar";
import Album from "./components/AlbumList/albumList";
import Image from "./components/ImageList/imageList";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Album />
    </div>
  );
}

export default App;
