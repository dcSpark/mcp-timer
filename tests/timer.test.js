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

test('timerHandler should start timer and return success message immediately', async () => {
  const result = await timerHandler({
    minutes: 5,
    seconds: 0
  });
  
  assert.strictEqual(result.isError, false);
  assert.match(result.content[0].text, /^Timer started for 5 minutes and 0 seconds with ID: timer_\d+_[a-z0-9]+$/);
});

test('timerHandler should use default values if not provided', async () => {
  // Test with only minutes
  const result1 = await timerHandler({
    minutes: 1
  });
  
  assert.strictEqual(result1.isError, false);
  assert.match(result1.content[0].text, /^Timer started for 1 minutes and 0 seconds with ID: timer_\d+_[a-z0-9]+$/);
  
  // Test with only seconds
  const result2 = await timerHandler({
    seconds: 30
  });
  
  assert.strictEqual(result2.isError, false);
  assert.match(result2.content[0].text, /^Timer started for 0 minutes and 30 seconds with ID: timer_\d+_[a-z0-9]+$/);
});
