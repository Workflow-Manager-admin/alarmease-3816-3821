import React, { useState, useEffect } from 'react';
import { useAlarms } from '../context/AlarmContext';
import { formatTime } from '../utils/alarmUtils';

/**
 * Component for creating or editing alarms
 * 
 * @param {Object} props - Component props
 * @param {Object|null} props.alarmToEdit - Alarm object to edit, null if creating a new alarm
 * @param {Function} props.onClose - Function to call when the form should be closed
 * @returns {JSX.Element} AlarmForm component
 */
const AlarmForm = ({ alarmToEdit, onClose }) => {
  const [time, setTime] = useState('');
  const [label, setLabel] = useState('');
  const { addAlarm, updateAlarm } = useAlarms();
  
  // Set form values if editing an existing alarm
  useEffect(() => {
    if (alarmToEdit) {
      setTime(alarmToEdit.time);
      setLabel(alarmToEdit.label || '');
    } else {
      // Default to the current time for new alarms
      setTime(formatTime(new Date()));
      setLabel('');
    }
  }, [alarmToEdit]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const alarmData = {
      time,
      label: label.trim() || null
    };
    
    if (alarmToEdit) {
      updateAlarm(alarmToEdit.id, alarmData);
    } else {
      addAlarm(alarmData);
    }
    
    onClose();
  };
  
  return (
    <div className="alarm-form-container">
      <div className="alarm-form-content">
        <h2 className="form-title">
          {alarmToEdit ? 'Edit Alarm' : 'Add New Alarm'}
        </h2>
        
        <form onSubmit={handleSubmit} className="alarm-form">
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="time-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="label">Label (optional):</label>
            <input
              type="text"
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Add a label for this alarm"
              className="label-input"
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              onClick={onClose} 
              className="cancel-btn"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="save-btn"
            >
              {alarmToEdit ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlarmForm;
