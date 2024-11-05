# Image Generator

This project is a web-based application that generates images based on user-defined text prompts. Built using React, it integrates with Hugging Face's API to bring your image concepts to life.

![Screenshot 2024-11-05 214008](https://github.com/user-attachments/assets/f6e75962-d834-47f5-82b8-0d04c202c65b)
![Screenshot 2024-11-05 214519](https://github.com/user-attachments/assets/555303cc-e61b-4bed-b8e1-a2e86b59979e)

## Features

- **Text-Based Image Generation**: Generate images by describing the scene, objects, or ideas in a prompt.
- **Customizable Image Scale**: Set the resolution from 100px to 800px to match your desired quality.
- **Download Formats**: Download generated images in multiple formats, including PNG, JPEG, BMP, and more.
- **Interactive Loading & Progress Bar**: See real-time progress while images are being created.
- **Review System**: Add reviews and ratings to share feedback on generated images.

## Tech Stack

- **Frontend**: React, CSS
- **API**: Hugging Face Inference API

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PrasangiW/Image-Generator.git
   cd Image-Generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the Hugging Face API key in `App.js`:
   ```javascript
   const headers = { "Authorization": "Bearer YOUR_API_KEY" };
   ```

4. Run the application:
   ```bash
   npm start
   ```

## Usage

1. Enter a text prompt describing the image.
2. Adjust the scale and download format as needed.
3. Click "Generate Image" to create your image.
4. Use the review feature to rate and comment on generated images.

## License

This project is licensed under the MIT License.

