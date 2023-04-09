const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = {
  target: 'https://polyproject.youtrack.cloud',
  changeOrigin: true
}
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware(proxy)
  );
};
