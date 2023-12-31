import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
function RecognitionTable({ images, uploadImage }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const showUploadedImage = URL?.createObjectURL(uploadImage);

  const openModal = (imageSrc, altText) => {
    console.log(imageSrc, altText);
    setCurrentImage(imageSrc);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const mapRef = useRef(null);

  const startPos = useRef({ x: 0, y: 0 });
  const endPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e) => {
    endPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMapClick = () => {
    const dx = endPos.current.x - startPos.current.x;
    const dy = endPos.current.y - startPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 10) {
      // If mouse moved less than 10 pixels, it's likely a click not a drag
      const mapEl = mapRef.current;

      if (!document.fullscreenElement) {
        if (mapEl.requestFullscreen) {
          mapEl.requestFullscreen();
        } else if (mapEl.mozRequestFullScreen) {
          /* Firefox */
          mapEl.mozRequestFullScreen();
        } else if (mapEl.webkitRequestFullscreen) {
          /* Chrome, Safari & Opera */
          mapEl.webkitRequestFullscreen();
        } else if (mapEl.msRequestFullscreen) {
          /* IE/Edge */
          mapEl.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          /* Firefox */
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          /* Chrome, Safari & Opera */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          /* IE/Edge */
          document.msExitFullscreen();
        }
      }
    }
  };
  return (
    <>
      {modalVisible && (
        <div id="myModal" className="my-modal">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <img
            className="modal-content"
            id="img01"
            style={{
              height: "800px",
              objectFit: "contain",
            }}
            src={currentImage}
            alt={"recognisable face"}
          />
        </div>
      )}
      <div className="table-wrap">
        <div className="img-wrap">
          <img src={showUploadedImage} alt="uploaded image" id="table-wrap-img" />
        </div>
        <div style={{ width: '100%'}} className="table-responsive p-0">
          <table className="table align-items-center mb-0">
            {images && (
              <thead>
                <tr>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Time
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Image
                  </th>
                  <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                    Location
                  </th>
                </tr>
              </thead>
            )}
            <tbody>
              {images.map((imageUrl, index) => {
                return (
                  <tr key={index}>
                    <td className="text-xs font-weight-bold mb-0 text-secondary">
                      {imageUrl[4]}
                    </td>
                    <td className="text-xs font-weight-bold mb-0 text-secondary">
                      <div className="column" key={index}>
                        <img
                          src={
                            process.env.REACT_APP_BASE_IMAGE + "/" + imageUrl[0]
                          }
                          alt={`${index}`}
                          style={{ width: "50%" }}
                          onClick={() => {
                            openModal(
                              process.env.REACT_APP_BASE_IMAGE +
                                "/" +
                                imageUrl[0],
                              "Snow"
                            );
                          }}
                        />
                      </div>
                    </td>

                    <td>
                      <div
                        ref={mapRef}
                        style={{
                          height: "80px",
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onClick={handleMapClick}
                      >
                        <MapContainer
                          center={[imageUrl[3], imageUrl[2]]}
                          zoom={13}
                          style={{ flex: 1, borderRadius: "15px" }}
                        >
                          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                          <Marker
                            position={[imageUrl[3], imageUrl[2]]}
                          ></Marker>
                          {/* <Marker position={[item.latitude+1, item.longitude+1]}></Marker> */}
                        </MapContainer>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default RecognitionTable;
