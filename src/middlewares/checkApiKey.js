module.exports = (req, res, next) => {
  const apiKey = req.get("X-API-Key");
  if (!apiKey || apiKey !== "12345") {
    return res.status(401).json({ error: "No autorizado, API Key inválida" });
  }
  next();
};
