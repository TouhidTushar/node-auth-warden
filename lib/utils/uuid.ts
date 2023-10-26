import { customAlphabet } from 'nanoid';

const NUMS = '0123456789';
const CAP_NUMS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ALPHA_NUMS =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export default {
  numeric: function (length?: 4 | 6): string {
    return customAlphabet(NUMS, length || 6)();
  },

  generic: function (): string {
    return customAlphabet(CAP_NUMS, 8)();
  },

  alphaNumeric: function (length?: 10 | 16 | 32 | 64): string {
    return customAlphabet(ALPHA_NUMS, length || 16)();
  },
};
