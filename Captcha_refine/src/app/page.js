'use client';
import React, { useState, useEffect } from 'react';
import DrawingCanvas from '../components/DrawingCanvas';

const Home = () => {
  const [showCanvas, setShowCanvas] = useState(false);
  const [captchaValidated, setCaptchaValidated] = useState(false);
  const [captchaFailed, setCaptchaFailed] = useState(false);
  const [image, setImage] = useState('https://wallpapers.com/images/hd/white-square-background-959-x-894-gps5il7cklctlvb1.jpg');
  const [imageChangeCounter, setImageChangeCounter] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15); // Timer set to 15 seconds

  useEffect(() => {
    let timer;

    if (showCanvas) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    if (timeLeft === 0) {
      changeImage(); // Change image when timer hits 0
    }

    return () => clearInterval(timer);
  }, [timeLeft, showCanvas]); // Reset timer when showCanvas changes

  const changeImage = () => {
    const newImage =
      image === 'https://wallpapers.com/images/hd/white-square-background-959-x-894-gps5il7cklctlvb1.jpg'
        ? 'https://www.inf.co.uk/infinite/RVXGCRPA_NH_G-M.jpg'
        : 'https://wallpapers.com/images/hd/white-square-background-959-x-894-gps5il7cklctlvb1.jpg';

    setImage(newImage);
    setImageChangeCounter((prev) => prev + 1);
    setTimeLeft(15); // Reset timer to 15 seconds after image change
  };

  const handleSubmit = (drawingDataURL) => {
    console.log('Submitted drawing:', drawingDataURL);
    // You can validate the drawing here or send it to your backend
    setCaptchaValidated(true);
    setCaptchaFailed(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Drawing Canvas CAPTCHA</h1>
      <button
        onClick={() => {
          setShowCanvas(!showCanvas);
          setCaptchaValidated(false);
          setCaptchaFailed(false);
          setTimeLeft(15); // Reset timer when showing the canvas again
        }}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 mb-6"
      >
        {showCanvas ? 'Hide Canvas' : 'Show Canvas'}
      </button>
      {showCanvas && (
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center space-x-6">
            <DrawingCanvas
              onSubmit={handleSubmit}
              onFail={() => {}}
              imageChangeCounter={imageChangeCounter}
              timeLeft={timeLeft}
            />
            <img src={image} alt="Captcha Image" className="w-64 h-64 object-contain" />
          </div>
        </div>
      )}
      {captchaValidated && (
        <p className="mt-4 text-green-600">CAPTCHA passed! You are a human!</p>
      )}
      {captchaFailed && (
        <p className="mt-4 text-red-600">You failed the CAPTCHA. Try again!</p>
      )}
    </div>
  );
};

export default Home;



// 'use client';
// import React, { useState, useEffect } from 'react';
// import DrawingCanvas from '../components/DrawingCanvas';

// const Home = () => {
//   const [showCanvas, setShowCanvas] = useState(false);
//   const [captchaValidated, setCaptchaValidated] = useState(false);
//   const [captchaFailed, setCaptchaFailed] = useState(false);
//   const [image, setImage] = useState('https://wallpapers.com/images/hd/white-square-background-959-x-894-gps5il7cklctlvb1.jpg');
//   const [imageChangeCounter, setImageChangeCounter] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(30); // Timer state

//   useEffect(() => {
//     if (showCanvas) {
//       const timer = setInterval(() => {
//         setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
//       }, 1000);

//       if (timeLeft === 0) {
//         changeImage();
//       }

//       return () => clearInterval(timer);
//     }
//   }, [timeLeft, showCanvas]);

//   const handleCanvasSubmit = (dataUrl) => {
//     if (dataUrl) {
//       console.log('Captcha passed');
//       setCaptchaValidated(true);
//     } else {
//       console.log('Captcha failed');
//       setCaptchaFailed(true);
//     }
//   };

//   const handleCaptchaFail = () => {
//     console.log('Captcha failed - nothing on canvas');
//     setCaptchaFailed(true);
//   };

//   const changeImage = () => {
//     const newImage =
//       image === 'https://wallpapers.com/images/hd/white-square-background-959-x-894-gps5il7cklctlvb1.jpg'
//         ? 'https://www.inf.co.uk/infinite/RVXGCRPA_NH_G-M.jpg'
//         : 'https://wallpapers.com/images/hd/white-square-background-959-x-894-gps5il7cklctlvb1.jpg';

//     setImage(newImage);
//     setImageChangeCounter((prev) => prev + 1);
//     setTimeLeft(30); // Reset the timer when the image changes
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-3xl font-bold mb-8">Drawing Canvas CAPTCHA</h1>
//       <button
//         onClick={() => {
//           setShowCanvas(!showCanvas);
//           setCaptchaValidated(false);
//           setCaptchaFailed(false);
//           setTimeLeft(30); // Reset the timer when showing the canvas again
//         }}
//         className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-700 mb-6"
//       >
//         {showCanvas ? 'Hide Canvas' : 'Show Canvas'}
//       </button>
//       {showCanvas && (
//         <div className="flex flex-col items-center">
//           <div className="flex justify-center items-center space-x-6">
//             <DrawingCanvas
//               onSubmit={handleCanvasSubmit}
//               onFail={handleCaptchaFail}
//               onTimerEnd={changeImage}
//               imageChangeCounter={imageChangeCounter}
//               timeLeft={timeLeft}
//             />
//             <img src={image} alt="Captcha Image" className="w-64 h-64 object-contain" />
//           </div>
//           {/* Timer position below the image */}
//           {/* <p className="mt-4 text-blue-600">Time Left: {timeLeft} seconds</p> */}
//         </div>
//       )}
//       {captchaValidated && (
//         <p className="mt-4 text-green-600">CAPTCHA passed! You are a human!</p>
//       )}
//       {captchaFailed && (
//         <p className="mt-4 text-red-600">You failed the CAPTCHA. Try again!</p>
//       )}
//     </div>
//   );
// };

// export default Home;
