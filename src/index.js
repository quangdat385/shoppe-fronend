import React from 'react';
import ReactDOM from 'react-dom/client';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import { store } from '~/app/store';
import GlobalStyles from '~/components/GlobalStyles';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools()


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SSRProvider>
        <GlobalStyles>
          <ToastContainer />
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<App />} ></Route>
            </Routes>
          </BrowserRouter>
        </GlobalStyles>
      </SSRProvider>
    </Provider>
  </React.StrictMode>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
