import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ListPage from './pages/ListPage';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ListPage />
      </div>
    </Provider>
  );
}

export default App;
