import logo from './logo.svg';
import React,{useRef} from 'react'
import './App.css';
import * as tf from "@tensorflow/tfjs"
import * as facemesh from "@tensorflow-models/face-landmarks-detection"
import { drawMesh } from './utilities';
import Webcam from 'react-webcam'



function App() {
  // const faceLandmarksDetection = require('@tensorflow-models/face-landmarks-detection');
  
  const webCamRef = useRef(null)
  const canvasRef = useRef(null)
  
  const runFaceDet = async () =>{
    
    const model = await facemesh.load()
    
    

    
    setInterval(()=>{
      detect(model)
    },50)

  }

  const detect = async (model) =>{
    
    if(typeof webCamRef.current!=="undefined" && webCamRef.current!==null && webCamRef.current.video.readyState === 4){
      const video = webCamRef.current.video;
      const videoWidth = webCamRef.current.video.videoWidth;
      const videoHeight = webCamRef.current.video.videoHeight;

      webCamRef.current.video.width  = videoWidth;
      webCamRef.current.video.height = videoHeight;

      canvasRef.current.height = videoHeight;
      canvasRef.current.width = videoWidth;

      const predictions = await model.estimateFaces({
        input: document.querySelector("video")
      });
      console.log(predictions)

      const context = canvasRef.current.getContext('2d');
      drawMesh(predictions,context)
    }
  }

  runFaceDet();
  return (
    <div className="App">
      
      <Webcam class='webcam' ref ={webCamRef} style={{}}/>
      <canvas ref ={canvasRef}/>
    </div>
  );
}

export default App;
