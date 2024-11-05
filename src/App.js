import React, { useState } from 'react';
import './App.css';

const API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell";
const headers = { "Authorization": "Bearer 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" };

function App() {
  // Existing states
  const [prompt, setPrompt] = useState('');
  const [scale, setScale] = useState(400);
  const [format, setFormat] = useState('png');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // New states for review
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5); // Default rating
  const [reviews, setReviews] = useState([]); // Store multiple reviews

  const handleScaleChange = (e) => {
    const newScale = parseInt(e.target.value);
    setScale(newScale);
  };

  const generateImage = async () => {
    if (!prompt) {
      alert("Please enter a text prompt.");
      return;
    }

    setLoading(true);
    setProgress(0);
    setImageUrl('');

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({ inputs: prompt })
      });

      if (!response.ok) throw new Error("Failed to generate image.");

      let currentProgress = 0;
      const interval = setInterval(() => {
        if (currentProgress < 100) {
          currentProgress += 10;
          setProgress(currentProgress);
        } else {
          clearInterval(interval);
        }
      }, 100);

      const imageBlob = await response.blob();
      const imgUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imgUrl);
      setProgress(100);

      setTimeout(() => {
        setProgress(0);
      }, 1000);

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveImage = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = scale;
    canvas.height = scale;

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      context.drawImage(img, 0, 0, scale, scale);
      const link = document.createElement('a');
      link.download = `generated_image.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
    };
  };

  const clearInputs = () => {
    setPrompt('');
    setImageUrl('');
    setProgress(0);
    setScale(400);
  };

  // Handle Review Submission
  const handleReviewSubmit = () => {
    if (!reviewText) {
      alert("Please write a review before submitting.");
      return;
    }

    // Add new review to reviews array
    setReviews([...reviews, { text: reviewText, rating }]);
    setReviewText(''); // Clear input after submission
  };

  return (
    <div className="App">
      <div className="frame">
        <h1>IMAGE GENERATOR</h1>
        <h3>Generate Unlimited Images</h3>
        <div className="input-container">
          <label htmlFor="prompt">Enter your image idea:</label>
          <input 
            type="text" 
            id="prompt" 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            placeholder="Describe your image..." 
            required 
          />
        </div>
        <div className="input-container scale-container">
          <label htmlFor="scale">Scale Image (100-800 px):</label>
          <div className="scale-input-wrapper">
            <input 
              type="range" 
              id="scale" 
              min="100" 
              max="800" 
              value={scale} 
              step="10" 
              onChange={handleScaleChange}
            />
            <span className="scale-value">
              Pixel: {scale}
            </span>
          </div>
        </div>
        <div className="input-container">
          <label htmlFor="format">Select Download Format:</label>
          <select 
            id="format" 
            value={format} 
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="bmp">BMP</option>
            <option value="gif">GIF</option>
            <option value="webp">WEBP</option>
            <option value="tiff">TIFF</option>
          </select>
        </div>
        <div className="button-container">
          <button id="generateBtn" onClick={generateImage}>Generate Image</button>
          <button id="clearBtn" onClick={clearInputs}>Clear</button>
          <button id="saveBtn" onClick={saveImage} disabled={!imageUrl}>Save Image</button>
        </div>
        {loading && <div className="loading">Generating image...</div>}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}>
            <div className="progress-text">{progress}%</div>
          </div>
        </div>
        <div className="preview-container">
          <h2>Image Preview</h2>
          {imageUrl && <img src={imageUrl} alt="Generated" style={{ width: `${scale}px`, height: `${scale}px` }} />}
        </div>
        <div className="bubbles">
          {Array.from({ length: 20 }).map((_, index) => (
            <div className="bubble" key={index}></div>
          ))}
        </div>
        

        {/* Review Section */}
        <div className="review-section">
          <h2>Leave a Review</h2>
          <textarea
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <label>Rating:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
          <button onClick={handleReviewSubmit}>Submit Review</button>

          {/* Display Reviews */}
          <div className="review-list">
            <h3>Reviews:</h3>
            {reviews.map((review, index) => (
              <div key={index} className="review-item">
                <p>{review.text}</p>
                <p>Rating: {review.rating}/5</p>
              </div>
            ))}
          </div>
          
        </div>
        <footer className="footer">
          <p>© 2024 Prasangi Weerasingha. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
