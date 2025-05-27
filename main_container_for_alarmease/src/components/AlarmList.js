import React from 'react';
import { useAlarms } from '../context/AlarmContext';
import AlarmItem from './AlarmItem';

/**
 * Component to display the list of alarms
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onEditAlarm - Function to call when an alarm is to be edited
 * @returns {JSX.Element} AlarmList component
 */
const AlarmList = ({ onEditAlarm }) => {
  const { alarms } = useAlarms();
  
  return (
    <div className="alarm-list">
      <h2 className="section-title">Your Alarms</h2>
      
      {alarms.length === 0 ? (
        <div className="no-alarms">
          <p>No alarms set. Add a new alarm to get started.</p>
        </div>
      ) : (
        <div className="alarm-items">
          {alarms.map(alarm => (
            <AlarmItem 
              key={alarm.id} 
              alarm={alarm} 
              onEdit={onEditAlarm} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AlarmList;
