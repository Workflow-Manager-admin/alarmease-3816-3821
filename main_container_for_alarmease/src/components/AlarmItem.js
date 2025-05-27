import React from 'react';
import { useAlarms } from '../context/AlarmContext';
import { format } from 'date-fns';
import { parseTime } from '../utils/alarmUtils';

/**
 * Component to display a single alarm
 * 
 * @param {Object} props - Component props
 * @param {Object} props.alarm - The alarm object to display
 * @param {Function} props.onEdit - Function to call when edit button is clicked
 * @returns {JSX.Element} AlarmItem component
 */
const AlarmItem = ({ alarm, onEdit }) => {
  const { toggleAlarm, deleteAlarm } = useAlarms();
  
  // Parse the alarm time to get a Date object
  const alarmDate = parseTime(alarm.time);
  
  // Format the time in 12-hour format
  const formattedTime = format(alarmDate, 'h:mm a');
  
  return (
    <div className={`alarm-item ${alarm.isActive ? 'active' : 'inactive'}`}>
      <div className="alarm-time">{formattedTime}</div>
      
      <div className="alarm-content">
        {alarm.label && <div className="alarm-label">{alarm.label}</div>}
      </div>
      
      <div className="alarm-controls">
        <button 
          className={`toggle-btn ${alarm.isActive ? 'on' : 'off'}`} 
          onClick={() => toggleAlarm(alarm.id)}
          aria-label={alarm.isActive ? "Deactivate alarm" : "Activate alarm"}
        >
          {alarm.isActive ? "ON" : "OFF"}
        </button>
        
        <button 
          className="edit-btn" 
          onClick={() => onEdit(alarm)}
          aria-label="Edit alarm"
        >
          Edit
        </button>
        
        <button 
          className="delete-btn" 
          onClick={() => deleteAlarm(alarm.id)}
          aria-label="Delete alarm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AlarmItem;
