import Commerce from '@chec/commerce.js';

//for safety reasons am going to store the public key somewhere else:)
export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);