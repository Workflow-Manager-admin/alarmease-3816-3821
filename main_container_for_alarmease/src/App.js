import React from 'react';
import './App.css';
import AlarmContainer from './containers/AlarmContainer';
import { AlarmProvider } from './context/AlarmContext';

/**
 * Main application component
 * 
 * @returns {JSX.Element} App component
 */
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">⏰</span> AlarmEase
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <AlarmProvider>
            <AlarmContainer />
          </AlarmProvider>
        </div>
      </main>
    </div>
  );
}

export default App;
