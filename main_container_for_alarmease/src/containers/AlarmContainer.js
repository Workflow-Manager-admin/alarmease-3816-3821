import React, { useState } from 'react';
import AlarmList from '../components/AlarmList';
import AlarmForm from '../components/AlarmForm';
import AlarmNotification from '../components/AlarmNotification';
import { useAlarms } from '../context/AlarmContext';

/**
 * Main container component for the AlarmEase app
 * 
 * @returns {JSX.Element} AlarmContainer component
 */
const AlarmContainer = () => {
  const [showForm, setShowForm] = useState(false);
  const [alarmToEdit, setAlarmToEdit] = useState(null);
  const { alarms } = useAlarms();
  
  const handleAddAlarm = () => {
    setAlarmToEdit(null);
    setShowForm(true);
  };
  
  const handleEditAlarm = (alarm) => {
    setAlarmToEdit(alarm);
    setShowForm(true);
  };
  
  const handleCloseForm = () => {
    setShowForm(false);
    setAlarmToEdit(null);
  };
  
  return (
    <div className="alarm-container">
      <div className="alarm-header">
        <h1>AlarmEase</h1>
        <p className="alarm-subtitle">
          {alarms.length > 0 
            ? `You have ${alarms.length} alarm${alarms.length !== 1 ? 's' : ''} set`
            : 'No alarms set'}
        </p>
        
        <button 
          className="btn btn-large add-alarm-btn" 
          onClick={handleAddAlarm}
        >
          Add Alarm
        </button>
      </div>
      
      <div className="alarm-content">
        <AlarmList onEditAlarm={handleEditAlarm} />
        
        {showForm && (
          <AlarmForm 
            alarmToEdit={alarmToEdit} 
            onClose={handleCloseForm} 
          />
        )}
      </div>
      
      <AlarmNotification />
    </div>
  );
};

export default AlarmContainer;
