const TTL_MS = 60 * 1000;
const cache = new Map();

function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;
  const entry = cache.get(key);
  const now = Date.now();

  if (entry && now - entry.createdAt < TTL_MS) {
    res.set("X-Cache", "HIT");
    res.set("Cache-Control", "no-store");
    return res.status(entry.statusCode).json(entry.value);
  }

  if (entry) cache.delete(key);

  res.set("X-Cache", "MISS");
  res.set("Cache-Control", "no-store");

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cache.set(key, {
        value: body,
        statusCode: res.statusCode,
        createdAt: Date.now()
      });
    }
    return originalJson(body);
  };

  next();
}

cacheMiddleware.clear = () => cache.clear();
cacheMiddleware.getStats = () => ({ entries: cache.size, ttlMs: TTL_MS });

module.exports = cacheMiddleware;
