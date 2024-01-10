import L from 'leaflet';
import { useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

// import { Loader } from "rsuite";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Map = ({ latitude, longitude })=>{

    console.log(latitude, longitude, 'map')
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
  
        if (distance < 10) {  // If mouse moved less than 10 pixels, it's likely a click not a drag
            const mapEl = mapRef.current;
          // console.log(mapEl);
        if (!document.fullscreenElement) {
          
            if (mapEl?.requestFullscreen) {
                mapEl.requestFullscreen();
            } else if (mapEl?.mozRequestFullScreen) { /* Firefox */
                mapEl.mozRequestFullScreen();
            } else if (mapEl?.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                mapEl.webkitRequestFullscreen();
            } else if (mapEl?.msRequestFullscreen) { /* IE/Edge */
                mapEl.msRequestFullscreen();
            }
        } else {
  
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        }
        }
    };

    return(
        <div 
            ref={el => { mapRef.current = el; }}
            style={{ height: "80px", width: "100%", display: 'flex', flexDirection: 'column' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleMapClick}
        >
            
            <MapContainer center={[latitude, longitude]} zoom={13} style={{ flex: 1, borderRadius:"15px" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[latitude, longitude]}></Marker>
                {/* <Marker position={[item.latitude+1, item.longitude+1]}></Marker> */}
            </MapContainer>
            
        </div>
    )

}

export default Map;