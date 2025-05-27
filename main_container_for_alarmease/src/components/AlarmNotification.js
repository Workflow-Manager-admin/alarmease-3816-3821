import React from 'react';
import { useAlarms } from '../context/AlarmContext';

/**
 * Component to display an active alarm notification
 * 
 * @returns {JSX.Element|null} AlarmNotification component or null if no active alarm
 */
const AlarmNotification = () => {
  const { activeAlarm, dismissAlarm } = useAlarms();
  
  if (!activeAlarm) {
    return null;
  }
  
  return (
    <div className="alarm-notification">
      <div className="notification-content">
        <div className="notification-icon">⏰</div>
        <h2 className="notification-title">Alarm!</h2>
        
        <div className="notification-time">{activeAlarm.time}</div>
        
        {activeAlarm.label && (
          <div className="notification-label">{activeAlarm.label}</div>
        )}
        
        <button 
          className="dismiss-btn"
          onClick={dismissAlarm}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default AlarmNotification;
