# Icon Generator

A web application that generates consistent sets of icons using AI (Replicate Flux Schnell) based on user prompts and selected styles.

## Features

- **5 Premium Styles**: Choose from Pastel Outline, Celestial Sticker, Cloud Doodle, Glossy 3D, and Negative Space.
- **AI-Powered**: Uses Replicate's Flux Schnell model for high-quality image generation.
- **Prompt Expansion**: Uses Google Gemini to expand a single topic into 4 distinct items.
- **Brand Colors**: Optionally apply brand colors to the generated icons.
- **Responsive Design**: Works on desktop and mobile.

## Setup

1.  **Clone the repository**
2.  **Install dependencies**
    -   Run: `npm install`
3.  **Environment Variables**
    -   Create a `.env` file in the `root` directory (optional, defaults to localhost):
        ```env
        VITE_API_URL=http://localhost:3000/api
        ```
4.  **Run the application**
    -   Start Client: `npm run dev`

## Verification

To verify the installation:
1.  Ensure both client and server are running.
2.  Open the client URL (usually http://localhost:5173).
3.  Select a style and enter a prompt (e.g., "Fruit").
4.  Click "Generate" and wait for the 4 icons to appear.