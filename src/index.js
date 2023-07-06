import React from 'react';
import ReactDOM from 'react-dom/client';
import SSRProvider from 'react-bootstrap/SSRProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';


import App from './App';
import { store } from '~/app/store';
import GlobalStyles from '~/components/GlobalStyles';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SSRProvider>
        <GlobalStyles>
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
