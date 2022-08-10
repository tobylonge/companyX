module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '911bf3eeb4ede79dba55ba49512a3b95'),
  },
});
