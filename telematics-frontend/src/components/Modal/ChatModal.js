import { useState } from "react";
import {
  Modal,
  Button,
  Form,
} from "rsuite";
import { IoMdSend } from "react-icons/io";
import { backendApi } from "../../api/Config";
import { BeatLoader } from "react-spinners";


const ChatModal = ({ open, setOpen }) => {
  //const [open, setOpen] = React.useState(false);
  const openAi_key = localStorage?.getItem('api_key');
  // console.log(openAi_key)
  
  const [apiKey, setApiKey] = useState(openAi_key);
  const [nextBtn, setNextBtn] = useState(true);
  const [erroMsg, setErrorMsg] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [messages, setMessages] = useState([]);

  const sendMessage = async (e, value)=>{
    e.preventDefault();

    console.log('click', value)
    if(inputMessage.trim('') === '' && value === undefined){

      console.log(apiKey, inputMessage)
      return;
    }

    const msg = value === undefined ? inputMessage : value;

    setMessages([ ...messages, { text: msg, sender: 'user' } ]);
    setInputMessage('');
    setLoading(true);
    
    try{
      const response = await backendApi.post(`/llm-query/?user_query=${msg}&api_key=${apiKey}`);
      const { data } = response;
      if(data === 'Please enter valid OpenAI key.'){
        setMessages( prev=> [ ...prev, { text: data, sender: 'gpt' } ]);
        setLoading(false);
        console.log(data);
        localStorage?.removeItem('api_key');
      }
      else{
        setMessages( prev=> [ ...prev, { text: data, sender: 'gpt' } ]);
        setLoading(false);
        console.log(data);
        localStorage.setItem('api_key', apiKey);
      }


    }
    catch(e){
      console.log(e);
      setLoading(false)
    }
  }


  const handleClose = () => setOpen(false);

  const handleNext = () => {
    if (apiKey) {
      console.log(apiKey);
      setNextBtn(false);
      setErrorMsg(false)
    }else{
      setErrorMsg(true);
    }
  };

  const handleOpenAi =(e)=>{
    setApiKey(e)
    setErrorMsg(false)
  }


  return (
    <>
      <Modal
        size="xs"
        open={open}
        onClose={handleClose}
        className="chat-modal"
      >
        <Modal.Header>
          <Modal.Title>Chat with data</Modal.Title>
        </Modal.Header>
        {/* ==============api key input================= */}
        <Modal.Body className="chat-modal-body">
          {(nextBtn && openAi_key === null) ? (
            <Form className="chat-modal-form">
              <Form.Group controlId="api-key">
                <Form.ControlLabel className="chat-modal-form-item">
                  OpenAI API Key
                </Form.ControlLabel>
                <input
                  name="api-key"
                  className="chat-modal-form-input form-control"
                  placeholder="Enter your key"
                  errorMessage={ erroMsg ? 'This field is required.' : null}
                  onChange={(e) => handleOpenAi(e.target.value)}
                />
              </Form.Group>
            </Form>
            /* ==============End api key input================= */
          )
          :
            
            <div className="chatbot-main">
              <div className="chatbot-fqs">
                <ul className="chatbot-fqs-list">
                  <li className="chatbot-fqs-item" onClick={(e)=> sendMessage(e, e.target.innerText)}>How many cars have been detected and what are their number plates?</li>
                  <li className="chatbot-fqs-item" onClick={(e)=> sendMessage(e, e.target.innerText)}>What is the number plate that has been restricted? Was it ever detected? If so, what was the time of detection?</li>
                  <li className="chatbot-fqs-item" onClick={(e)=> sendMessage(e, e.target.innerText)}>Give the location with the most cars.</li> 
                </ul>
              </div>

              {/* Message send and response code */}

              <div className="chat-container">
                <div className="chat-messages">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`message ${message.sender === 'user' ? 'user' : 'gpt'}`}
                    >
                      {message.text}
                    </div>
                  ))}
                  {loading && <BeatLoader className="message loader" />}
                </div>
              </div>

              <form className="chatbot-prompt-input">
                <input className="form-control chatbot-prompt"   style={{ width: '80%'}} placeholder="Enter your prompt" value={inputMessage} onChange={(e)=> setInputMessage(e.target.value)} />
                <Button disabled={loading} type="submit" onClick={(e)=>sendMessage(e, undefined)} > <IoMdSend className="chatbot-prompt-icon" /></Button> 
              </form>

            </div>
          }

          {/* <Placeholder.Paragraph rows={80} /> */}
        </Modal.Body>
          
          <Modal.Footer>
            {
              (nextBtn && openAi_key === null) ?
                <Button onClick={handleNext} className="chat-modal-btn">
                  Next
                </Button>
                : null
            }
          </Modal.Footer>
        
        
      </Modal>
    </>
  );
};

export default ChatModal;
