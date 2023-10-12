import React,{useState} from "react";

function RecognitionTable({images}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const openModal = (imageSrc, altText) => {
    console.log(imageSrc, altText)
    setCurrentImage(imageSrc);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <>
  
    {
      modalVisible &&
      <div id="myModal" className="my-modal" >
        <span className="close" onClick={closeModal}>&times;</span>
        <img className="modal-content" id="img01" style={{
          height:"800px",
          objectFit:"contain"
        }} src= {process.env.PUBLIC_URL+currentImage} alt={'number plate image'}
          onError={(e)=>{
            e.target.src = process.env.PUBLIC_URL+`/assets/images/2023-10-09 12:44:46_frame_18.jpg`
          }}
        />
      </div>
    }
            <div class='table-responsive p-0'>
              <table class='table align-items-center mb-0'>
                <thead>
                  <tr>
                    <th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                      Time
                    </th>
                    <th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                      Image
                    </th>
                    <th class='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody>
                {images?.map((imageUrl, index) => {
                return(
                  <>
                  <tr>
                    <td class='text-xs font-weight-bold mb-0 text-secondary'>
                      time
                    </td>
                   
                      
                       
                          <td class='text-xs font-weight-bold mb-0 text-secondary'>
                        <div className="column" key={index}>
                            <img
                              src={process.env.PUBLIC_URL+'/assets/'+imageUrl[0]}
                              alt={`${index}`}
                              style={{ width: "50%" }}
                              onClick={() => {

                                openModal(process.env.PUBLIC_URL+'/assets/'+imageUrl[0], 'Snow')
                              }}
                            />
                          </div>
                    </td>
                      
                   
                    <td class='text-xs font-weight-bold mb-0 text-secondary'>
                      location
                    </td>
                  </tr>
                  </>
                     )
                    })}
                </tbody>
              </table>
            </div>
            </>
  );
}

export default RecognitionTable;
