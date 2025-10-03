exports.checkHeaders = (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send("No autorizado: falta token");
  }
  res.status(200).send(`Token recibido: ${token}`);
};

exports.getDataWithHeaders = (req, res) => {
  res.set('Content-Type', 'application/json');
  res.set('Cache-Control', 'no-store');
  res.status(200).json({ mensaje: "Datos enviados con cabeceras" });
};
