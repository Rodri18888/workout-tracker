exports.getSecureData = (req, res) => {
  res.set('X-Powered-By', 'Express-Learning');
  res.json({ secreto: "Este es un dato protegido" });
};
