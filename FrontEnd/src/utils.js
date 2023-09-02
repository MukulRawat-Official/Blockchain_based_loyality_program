import { MD5 } from 'crypto-js';

export function generateUniqueHash() {
    const timestamp = new Date().getTime();
    // const hash = MD5(timestamp).toString();
    // const hashNumeric = parseInt(hash);
    return timestamp;
}
