import { ToolResultSchema } from "../types.js";
import { createErrorResponse, createSuccessResponse } from "./utils.js";
import { TimerInput } from "./timer.types.js";

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
    
    // Wait for the specified duration
    await new Promise(resolve => setTimeout(resolve, totalMilliseconds));
    
    return createSuccessResponse(`timer is finished in ${minutes} minutes and ${seconds} seconds`);
  } catch (error) {
    return createErrorResponse(`Error in timer: ${error instanceof Error ? error.message : String(error)}`);
  }
};
