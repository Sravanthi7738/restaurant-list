const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://code-challenge.spectrumtoolbox.com',
      changeOrigin: true,
      onProxyReq: (proxyReq) => {
        proxyReq.setHeader('Authorization', "Api-Key q3MNxtfep8Gt");
      }
    })
  );
};