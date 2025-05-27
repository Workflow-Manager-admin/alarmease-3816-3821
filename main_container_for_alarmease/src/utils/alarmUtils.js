/**
 * Utility functions for alarm management
 */

import { format, parse, isAfter, isBefore, addDays } from 'date-fns';

/**
 * Format a Date object to a time string (HH:mm)
 * 
 * @param {Date} date - The date object to format
 * @returns {string} Formatted time string
 */
export const formatTime = (date) => {
  return format(date, 'HH:mm');
};

/**
 * Parse a time string (HH:mm) to a Date object
 * 
 * @param {string} timeString - Time string in HH:mm format
 * @returns {Date} Date object representing the time
 */
export const parseTime = (timeString) => {
  return parse(timeString, 'HH:mm', new Date());
};

/**
 * Check if an alarm should trigger based on current time
 * 
 * @param {Object} alarm - The alarm object to check
 * @param {Date} currentTime - The current time to check against
 * @returns {boolean} Whether the alarm should trigger
 */
export const shouldTriggerAlarm = (alarm, currentTime = new Date()) => {
  if (!alarm.isActive) return false;

  const alarmTime = parseTime(alarm.time);
  
  // Set alarm time to today
  const todayAlarmTime = new Date(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    alarmTime.getHours(),
    alarmTime.getMinutes(),
    0
  );
  
  // Get difference in minutes between current time and alarm time
  const timeDiff = Math.abs(todayAlarmTime - currentTime) / 60000;
  
  // Alarm triggers if the time difference is within 1 minute
  return timeDiff <= 1;
};

/**
 * Get the next occurrence of the alarm time
 * 
 * @param {Object} alarm - The alarm object
 * @returns {Date} The next date and time when this alarm will trigger
 */
export const getNextAlarmTime = (alarm) => {
  const now = new Date();
  const alarmTime = parseTime(alarm.time);
  
  // Set alarm time to today
  const todayAlarmTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    alarmTime.getHours(),
    alarmTime.getMinutes(),
    0
  );
  
  // If alarm time is in the past, schedule for tomorrow
  if (isBefore(todayAlarmTime, now)) {
    return addDays(todayAlarmTime, 1);
  }
  
  return todayAlarmTime;
};

/**
 * Generate a unique ID for new alarms
 * 
 * @returns {string} A unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
