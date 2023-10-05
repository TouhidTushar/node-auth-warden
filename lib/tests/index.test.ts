import NodeAuthWarden from '../index';
// import { describe, it, expect } from 'vitest';

// describe('index', () => {
//   it('should pass CI', () => {
//     expect(true).toBe(true);
//   });
// });

const warden = new NodeAuthWarden({
  msg: 'Hello World',
  count: 3,
});

warden.logMsg();
