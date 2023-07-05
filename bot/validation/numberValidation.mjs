import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function validatePhoneNumber(num = '') {
  const phoneNumberUA = parsePhoneNumberFromString(String(num), 'UA');
  const phoneNumberPL = parsePhoneNumberFromString(String(num), 'PL');
  return phoneNumberUA && phoneNumberUA.isValid() || phoneNumberPL && phoneNumberPL.isValid();
}
