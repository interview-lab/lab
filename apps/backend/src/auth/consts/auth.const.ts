const MINUTE = 60;

export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const JWT_ACCESS_TOKEN_EXPIRES_IN = 5 * MINUTE;
export const JWT_REFRESH_TOKEN_EXPIRES_IN = 60 * MINUTE;

export const HASH_ROUNDS = 10;

export const OAUTH_LINK_INTENT_COOKIE = 'oauth_link_intent';
export const OAUTH_LINK_INTENT_EXPIRES_IN = 5 * MINUTE;
