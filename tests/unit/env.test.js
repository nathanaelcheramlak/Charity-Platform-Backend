// Test if the environment is set up correctly
require('dotenv').config();

describe('Environment Variables', () => {
  const requiredEnvVars = [
    'NODE_ENV',
    'PORT',
    'DATABASE_URL',
    'JWT_SECRET',
    'JWT_ACCESS_EXPIRATION',
    'JWT_REFRESH_EXPIRATION',
    'CORS_ORIGIN',
    'UPLOAD_PATH',
    'MAX_FILE_SIZE',
  ];

  requiredEnvVars.forEach((env) => {
    it(`should have ${env} set`, () => {
      expect(process.env[env]).toBeDefined();
      expect(process.env[env]).not.toBe('');
    });
  });
});
