import { ToolResultSchema } from "../types.js";
import { createErrorResponse, createSuccessResponse } from "./utils.js";
import { TimerInput } from "./timer.types.js";

// Keep track of active timers
const activeTimers = new Map<string, NodeJS.Timeout>();

export const timerHandler = async (input: TimerInput): Promise<ToolResultSchema<any>> => {
  try {
    const minutes = input.minutes || 0;
    const seconds = input.seconds || 0;
    
    if (minutes < 0 || seconds < 0) {
      return createErrorResponse("Minutes and seconds must be non-negative values");
    }
    
    if (minutes === 0 && seconds === 0) {
      return createErrorResponse("Timer duration must be greater than 0");
    }
    
    const totalMilliseconds = (minutes * 60 + seconds) * 1000;
    const timerId = `timer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Start the timer in the background
    const timer = setTimeout(() => {
      console.log(`Timer ${timerId} completed after ${minutes} minutes and ${seconds} seconds`);
      activeTimers.delete(timerId);
    }, totalMilliseconds);
    
    activeTimers.set(timerId, timer);
    
    // Return immediately with a success message
    return createSuccessResponse(`Timer started for ${minutes} minutes and ${seconds} seconds with ID: ${timerId}`);
  } catch (error) {
    return createErrorResponse(`Error in timer: ${error instanceof Error ? error.message : String(error)}`);
  }
};
