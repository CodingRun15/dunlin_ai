# Description:
This application allows users to quickly summarize text content using an AI model. Users can either input text directly into the app or upload a file (.txt, .pdf, or .html) for summarization. The generated summaries are displayed in a chat-like interface, along with the original prompts, for easy reference.

# Features:
Text Summarization: Utilizes a powerful AI model to condense lengthy texts into concise summaries.
File Upload: Supports uploading .txt, .pdf, or .html files for summarization.
Chat Interface: Displays a history of prompts and their corresponding summaries in an easy-to-read format.
Real-Time Updates: Summaries are generated and displayed in real-time.
Error Handling: Includes robust error handling for user-friendly feedback in case of issues.
Technologies Used:
# Tech Stack
Frontend:
React (with Next.js)
Tailwind CSS (for styling)
Axios or Fetch API (for API communication)
React Markdown (optional, for rendering markdown in summaries)
Backend:
Node.js
Express.js
Replicate API (or any other AI model provider)
Multer (for handling file uploads - if you're including this functionality)
CORS (for enabling cross-origin requests if the frontend and backend are on different ports)
Installation & Setup

# Prerequisites:
Node.js and npm (or yarn) installed on your machine.
Clone the Repository:
Bash
git clone https://your-repository-url.git
Use code with caution.
Install Dependencies (Frontend & Backend):
Bash
# In the project root directory
npm install   
# In the backend directory 
cd backend
npm install 
Use code with caution.

# Environment Variables:
Create a .env file in your backend directory.
Add your API keys or authentication tokens for the AI model you are using (e.g., Replicate API token).
Example .env file:
google_api=your_actual_api_token
PORT = enter_your_port
GOOGLE_APPLICATION_CREDENTIALS = '/path-to-your-client_secret.json'

# Start the Application:
Open two terminals.
In one terminal, start the frontend:
Bash
npm start 
Use code with caution.
In the other terminal, start the backend:
Bash
cd backend
npm start
Use code with caution.

# Usage:
Open the app in your browser (usually at http://localhost:3000).
Enter text into the input box or upload a file or both.
Click the send button to generate a summary.
The summary will appear in the chat interface along with your prompt.
