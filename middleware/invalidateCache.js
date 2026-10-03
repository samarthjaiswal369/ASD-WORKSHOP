const cacheMiddleware = require("./cacheMiddleware");

function invalidateCache(req, res, next) {
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cacheMiddleware.clear();
    }
    return originalJson(body);
  };
  next();
}

module.exports = invalidateCache;
