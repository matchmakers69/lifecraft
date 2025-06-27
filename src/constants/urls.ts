export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const GRAVATAR_URL = "https://www.gravatar.com/avatar/?d=mp";
const CURRENCY_API_KEY = process.env.NEXT_PUBLIC_CURRENCY_API_KEY;
export const CURRENCY_API_URL = `https://api.currencyapi.com/v3/latest?apikey=${CURRENCY_API_KEY}`;

