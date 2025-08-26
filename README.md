# AI Math Exam Generator

A full-stack web application that helps primary school math teachers generate customized exam papers using Google's Gemini AI. Teachers can specify a math topic and number of questions to create age-appropriate exam papers instantly.

## Features

### Core Features
- **Topic-based Generation**: Enter any primary school math topic (Addition, Fractions, etc.)
- **Customizable Question Count**: Generate 1-20 questions per exam
- **Real-time Generation**: AI-powered question creation using Gemini API
- **Loading States**: Clear feedback during generation process
- **Error Handling**: Comprehensive error messages and validation

### Bonus Features
- **Answer Key Generation**: Optional answer keys with explanations
- **Copy to Clipboard**: One-click copying of exams and answer keys
- **Input Validation**: Prevents invalid inputs and API misuse
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface designed for teachers

## Technology Stack

### Frontend
- **React 18** - Component-based UI framework
- **Axios** - HTTP client for API requests  
- **CSS3** - Modern styling with gradients and animations
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **Axios** - HTTP client for Gemini API integration
- **dotenv** - Environment variable management

### AI Integration
- **Google Gemini API** - Advanced language model for content generation

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **Gemini API Key** from Google AI Studio

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd ai-exam-generator
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file and add your Gemini API key
# GEMINI_API_KEY=your_actual_api_key_here
# PORT=5000
```

### 3. Get Your Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Click "Get API key" 
3. Create a new API key
4. Copy the key to your `.env` file

### 4. Frontend Setup
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies  
npm install
```

### 5. Environment Configuration
Create a `.env` file in the frontend directory (optional):
```bash
# frontend/.env
REACT_APP_API_URL=http://localhost:5000
```

## Running the Application

### Start the Backend Server
```bash
# From backend directory
cd backend
npm run dev
# Server will run on http://localhost:5000
```

### Start the Frontend Application
```bash
# From frontend directory (open new terminal)
cd frontend
npm start
# Application will open on http://localhost:3000
```

### Production Mode
```bash
# Backend production mode
cd backend
npm start

# Frontend build
cd frontend
npm run build
```

##  Project Structure

```
ai-exam-generator/
├── backend/
│   ├── server.js                 # Express server and API routes
│   ├── package.json             # Backend dependencies
│   ├── .env.example            # Environment template
│   └── .env                    # Environment variables (create this)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExamGenerator.js    # Main form component
│   │   │   ├── ExamDisplay.js      # Results display component  
│   │   │   ├── LoadingSpinner.js   # Loading indicator
│   │   │   ├── Header.js           # App header
│   │   │   ├── Footer.js           # App footer
│   │   │   └── *.css              # Component styles
│   │   ├── App.js                 # Main App component
│   │   ├── App.css                # Global styles
│   │   └── index.js              # React entry point
│   ├── public/                   # Static assets
│   └── package.json             # Frontend dependencies
└── README.md                    # Project documentation
```

##  API Endpoints

### `POST /generate-exam`
Generates a math exam based on topic and question count.

**Request Body:**
```json
{
  "topic": "Addition",
  "questionCount": 5
}
```

**Response:**
```json
{
  "exam": "Generated exam content...",
  "topic": "Addition", 
  "questionCount": 5,
  "generatedAt": "2024-01-15T10:30:00.000Z"
}
```

### `POST /generate-answer-key`
Generates answer key for existing exam questions.

**Request Body:**
```json
{
  "examQuestions": "1. What is 2 + 2?\n2. What is 5 + 3?",
  "topic": "Addition"
}
```

### `GET /health`
Health check endpoint to verify server status.

## ⚠ Error Handling

The application handles various error scenarios:

- **Network Issues**: Connection timeouts and server errors
- **Invalid Input**: Missing fields and invalid question counts  
- **API Errors**: Authentication failures and rate limiting
- **Server Issues**: Internal server errors and API key problems

##  UI/UX Features

- **Modern Design**: Gradient backgrounds and smooth animations
- **Responsive Layout**: Optimized for all screen sizes
- **Loading States**: Clear feedback during processing
- **Error Messages**: User-friendly error descriptions
- **Copy Functionality**: One-click copying with browser notifications
- **Accessibility**: Proper labels and keyboard navigation

## Testing the Application

### Manual Testing Steps:

1. **Basic Functionality**:
   - Enter a math topic (e.g., "Addition")
   - Set question count (1-20)
   - Click "Generate Exam"
   - Verify exam appears correctly

2. **Answer Key Feature**:
   - Check "Generate Answer Key" checkbox
   - Generate an exam
   - Toggle answer key visibility
   - Copy answer key to clipboard

3. **Error Scenarios**:
   - Try empty fields
   - Enter invalid question counts
   - Test with poor network connection

4. **Responsive Design**:
   - Test on different screen sizes
   - Verify mobile functionality

## Security Considerations

- **API Key Protection**: Gemini API key is stored securely on backend
- **Input Validation**: All user inputs are validated before processing
- **Error Sanitization**: Error messages don't expose sensitive information
- **CORS Configuration**: Proper cross-origin request handling
- **Environment Variables**: Sensitive data stored in .env files

## Troubleshooting

### Common Issues:

**"API configuration error"**
- Check if GEMINI_API_KEY is set in backend/.env
- Verify API key is valid and active

**"Failed to generate exam"**  
- Check network connection
- Verify backend server is running on port 5000
- Check browser console for detailed errors

**Frontend not connecting to backend**
- Ensure backend is running first
- Check if REACT_APP_API_URL matches backend port
- Verify CORS is properly configured

**Questions seem inappropriate**
- The AI model is designed for primary school level
- Try more specific topics (e.g., "2-digit addition" vs "addition")
- Regenerate if results don't meet expectations



## 📝 Future Enhancements

Potential improvements for future versions:
- **Multiple Choice Questions**: Option to generate MCQ format
- **Difficulty Levels**: Easy, Medium, Hard question variants
- **PDF Export**: Generate downloadable PDF versions
- **Question Bank**: Save and reuse generated questions
- **User Accounts**: Teacher profiles and exam history
- **Bulk Generation**: Create multiple exams at once

