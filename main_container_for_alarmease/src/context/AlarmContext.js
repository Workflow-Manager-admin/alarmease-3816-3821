import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { shouldTriggerAlarm, generateId } from '../utils/alarmUtils';

// Create the alarm context
const AlarmContext = createContext();

/**
 * Custom hook to use the alarm context
 * @returns {Object} Alarm context value
 */
export const useAlarms = () => {
  const context = useContext(AlarmContext);
  if (!context) {
    throw new Error('useAlarms must be used within an AlarmProvider');
  }
  return context;
};

/**
 * Provider component for alarm context
 * @param {Object} props - Component props
 * @returns {JSX.Element} Provider component
 */
export const AlarmProvider = ({ children }) => {
  const [alarms, setAlarms] = useState([]);
  const [activeAlarm, setActiveAlarm] = useState(null);

  // Load alarms from localStorage on initial render
  useEffect(() => {
    const storedAlarms = localStorage.getItem('alarms');
    if (storedAlarms) {
      setAlarms(JSON.parse(storedAlarms));
    }
  }, []);

  // Save alarms to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('alarms', JSON.stringify(alarms));
  }, [alarms]);

  // Check for triggering alarms every 30 seconds
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      
      alarms.forEach(alarm => {
        if (shouldTriggerAlarm(alarm, now) && !activeAlarm) {
          triggerAlarm(alarm);
        }
      });
    };
    
    const intervalId = setInterval(checkAlarms, 30000);
    
    // Initial check
    checkAlarms();
    
    return () => clearInterval(intervalId);
  }, [alarms, activeAlarm]);

  /**
   * Add a new alarm
   * @param {Object} alarm - Alarm data
   */
  const addAlarm = useCallback((alarm) => {
    const newAlarm = {
      id: generateId(),
      isActive: true,
      ...alarm
    };
    
    setAlarms(prevAlarms => [...prevAlarms, newAlarm]);
  }, []);

  /**
   * Update an existing alarm
   * @param {string} id - Alarm ID
   * @param {Object} updatedData - Updated alarm data
   */
  const updateAlarm = useCallback((id, updatedData) => {
    setAlarms(prevAlarms => 
      prevAlarms.map(alarm => 
        alarm.id === id ? { ...alarm, ...updatedData } : alarm
      )
    );
  }, []);

  /**
   * Delete an alarm
   * @param {string} id - Alarm ID
   */
  const deleteAlarm = useCallback((id) => {
    setAlarms(prevAlarms => prevAlarms.filter(alarm => alarm.id !== id));
  }, []);

  /**
   * Toggle an alarm's active state
   * @param {string} id - Alarm ID
   */
  const toggleAlarm = useCallback((id) => {
    setAlarms(prevAlarms => 
      prevAlarms.map(alarm => 
        alarm.id === id ? { ...alarm, isActive: !alarm.isActive } : alarm
      )
    );
  }, []);

  /**
   * Trigger an alarm notification
   * @param {Object} alarm - The alarm to trigger
   */
  const triggerAlarm = useCallback((alarm) => {
    setActiveAlarm(alarm);
    
    // Play alarm sound
    const audio = new Audio('/alarm-sound.mp3');
    audio.loop = true;
    audio.play().catch(error => {
      console.error('Failed to play alarm sound:', error);
    });
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  /**
   * Dismiss the currently active alarm
   */
  const dismissAlarm = useCallback(() => {
    setActiveAlarm(null);
  }, []);

  // Value to be provided by the context
  const value = {
    alarms,
    activeAlarm,
    addAlarm,
    updateAlarm,
    deleteAlarm,
    toggleAlarm,
    dismissAlarm
  };

  return (
    <AlarmContext.Provider value={value}>
      {children}
    </AlarmContext.Provider>
  );
};
