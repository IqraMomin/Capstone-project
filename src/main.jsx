import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './index.css'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom';
import store from './store';
import { Provider } from 'react-redux';



createRoot(document.getElementById('root')).render(
    <BrowserRouter> 
    <Provider store={store}> 
    <App />
    </Provider>
    </BrowserRouter>
    

)
