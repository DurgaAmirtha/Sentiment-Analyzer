Sentix Analyzer

This is a simple sentiment analysis app built using React and Gemini API.

It takes input text and returns whether the sentiment is positive, negative, or neutral along with score, confidence, and explanation.

How it works

User enters text  
Text is sent to Gemini API  
Model returns sentiment result  
Result is displayed on UI  

Tech used

React (Vite)  
TypeScript  
Tailwind CSS  
Google Gemini API  

Model used

gemini-2.5-flash  

How to run

Clone the repo  
npm install  
Create .env file and add:

VITE_GEMINI_API_KEY=your_key  

Run:

npm run dev  

Future improvements

Add history of past results  
Improve UI design  
Add charts for sentiment visualization  
