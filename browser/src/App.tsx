import React from 'react';
import {Provider} from 'react-redux';
import {RouterProvider} from 'react-router-dom';
import './App.css';
import router from "./app/router";
import {store} from "./store";


const App = () => {
  return (
    // <React.StrictMode>
      <Provider store={store}>
        <div className="App">
          <RouterProvider router={router}/>
        </div>
      </Provider>
    // </React.StrictMode>
  );
}
export default App;
