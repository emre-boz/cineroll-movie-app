import YouTube from 'react-youtube';

function VideoCardSlide({ videoId }) {

  const opts = {
    width: window.innerWidth*0.9,
    height: ((window.innerWidth*0.9)/16)*9,
    playerVars: {
      autoplay: 0, 
    },
  };

  const onReady = (event) => {
    console.log("YouTube Player is ready.");
  };

  const onEnd = (event) => {
    console.log("Video has ended.");
  };

  return (
    <YouTube
      videoId={videoId} 
      opts={opts}       
      onReady={onReady} 
      onEnd={onEnd}   
    />
  );
}

export default VideoCardSlide;
