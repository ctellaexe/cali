// entry point to tell browser to see the <div id="root"></div> in index.html and put the React app in there

import ReactDOM from "react-dom/client"; // lets React take control of a real DOM element in index.html

import { BrowserRouter } from "react-router-dom"; // enables client-side routing (switching pages without reloads)

import App from "./App.tsx"; // Root UI component for the entire app

// Global styles
import "bulma/css/bulma.min.css";
import "./index.css";


// Mount the React app into <div id="root"> inside index.html
// Wrap App in BrowserRouter so every component inside it can use routing features
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render( 
   <BrowserRouter>  
    <App />
  </BrowserRouter>
);
