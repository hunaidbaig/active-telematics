// ImageGrid.js
import React, { useState } from "react";
import "./ImageGrid.css";



function ImageGrid({images}) {
  // const [images, setImages] = useState([]);
  const [gridClass, setGridClass] = useState("grid-2");

  // useEffect(() => {
  //   const fetchImages = async () => {
     
  //     const dummyImages = [
  //       profile,
  //       profile,
  //       profile,
  //       profile,
  //       profile,
  //       profile,
  //       profile,
  //       profile,
  //     ];

  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     setImages(dummyImages);
  //   };

  //   fetchImages();
  // }, []);

  const changeGrid = (gridSize) => {
    setGridClass(`grid-${gridSize}`);
  };

  return (
    <div>
      <div className="header">
        <button
          className={`btn ${gridClass === "grid-1" ? "active" : ""}`}
          onClick={() => changeGrid(1)}
        >
          1
        </button>
        <button
          className={`btn ${gridClass === "grid-2" ? "active" : ""}`}
          onClick={() => changeGrid(2)}
        >
          2
        </button>
        <button
          className={`btn ${gridClass === "grid-3" ? "active" : ""}`}
          onClick={() => changeGrid(3)}
        >
          3
        </button>
      </div>

      <div className={`row ${gridClass}`}>
        {images?.map((imageUrl, index) => {
          return(
          <div className="column" key={index}>
            <img
              src={process.env.PUBLIC_URL+'/assets/'+imageUrl[0]}
              alt={`${index}`}
              style={{ width: "50%" }}
            />
          </div>
          )
        })}
      </div>
    </div>
  );
}

export default ImageGrid;
