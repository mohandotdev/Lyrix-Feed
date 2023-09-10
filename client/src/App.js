import './App.css';
import { useEffect, useState } from "react";
import{BiArrowBack} from "react-icons/bi";
import StarRating from './component/StarRating';
import {BiCommentDetail,BiSolidCommentAdd}from "react-icons/bi"
import axios from 'axios';

function App() {
  const [data,setData] = useState([]);
  const [response,setResponse] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null
  });


  useEffect(()=>{
    const getData = async()=>{
      await axios.get('http://localhost:3008/response')
      .then(response =>{console.log(response.data)
        setData(response.data);
      })
      .catch(error=>{
        console.log(error);
      })
    }
    getData();
  },[]);

  console.log(response)

  const handleSubmit = async()=>{
    const feedbackArray = Object.entries(response).map(([question_id, answer]) => ({
      question_id,
      answer,
    }));
    await axios.post('http://localhost:3008/feedback', feedbackArray)
    .then(response=>{console.log(response)})
    .catch(err=>{console.log(err)})
  }

  return (
    <div className='content'>
      <div className='topnav'>
        <h3 className="logo"><BiArrowBack size={25}/> garden.pdf </h3>
      </div>
      <div className='bodycontent'>
        <div className='sidenav'>
          <div className='navbutton'>
            <button><BiCommentDetail size={25}/> COMMENT </button>
            <button><BiSolidCommentAdd size={25}/> FEEDBACK </button>
          </div>
        </div>

        <div className='fullcontent'>
          {
            data.map((item) => (
              <div className='insidecontent' key={item.id}>
                <h3><i>{item.question}</i></h3>
                <StarRating response={response} setResponse={setResponse} name={item.id}/>
            </div>
            ))
          }
          <div className='sub-but'>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
    </div> 
    </div>
)};



export default App;