exports.uploadData = (req, res) => {
  const contentLength = req.get('Content-Length');
  const contentType = req.get('Content-Type');
  const userAgent = req.get('User-Agent');

  console.log(`Recibiendo ${contentLength} bytes de tipo ${contentType}`);

  res.json({
    received: true,
    size: contentLength,
    type: contentType,
    client: userAgent
  });
};
