import { test } from 'node:test';
import assert from 'node:assert';
import { timerHandler } from '../build/handlers/timer.js';

test('timerHandler should return error for negative minutes', async () => {
  const result = await timerHandler({
    minutes: -1,
    seconds: 0
  });
  
  assert.strictEqual(result.isError, true);
  assert.strictEqual(result.content[0].text, 'Minutes and seconds must be non-negative values');
});

test('timerHandler should return error for negative seconds', async () => {
  const result = await timerHandler({
    minutes: 0,
    seconds: -1
  });
  
  assert.strictEqual(result.isError, true);
  assert.strictEqual(result.content[0].text, 'Minutes and seconds must be non-negative values');
});

test('timerHandler should return error for zero duration', async () => {
  const result = await timerHandler({
    minutes: 0,
    seconds: 0
  });
  
  assert.strictEqual(result.isError, true);
  assert.strictEqual(result.content[0].text, 'Timer duration must be greater than 0');
});

test('timerHandler should wait and return success message for valid duration', async () => {
  // Use a very short duration for testing
  const result = await timerHandler({
    minutes: 0,
    seconds: 1
  });
  
  assert.strictEqual(result.isError, false);
  assert.strictEqual(result.content[0].text, 'timer is finished in 0 minutes and 1 seconds');
});

test('timerHandler should use default values if not provided', async () => {
  // Test with only minutes
  const result1 = await timerHandler({
    minutes: 0,
    seconds: 1
  });
  
  assert.strictEqual(result1.isError, false);
  assert.strictEqual(result1.content[0].text, 'timer is finished in 0 minutes and 1 seconds');
  
  // Test with only seconds
  const result2 = await timerHandler({
    seconds: 1
  });
  
  assert.strictEqual(result2.isError, false);
  assert.strictEqual(result2.content[0].text, 'timer is finished in 0 minutes and 1 seconds');
});
