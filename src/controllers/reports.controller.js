// Simulación base de datos
const ReportsJSON = require("../data/reports.json");

// Metodo GET ID
const getReportById = (req, res) => {
  const reportId = parseInt(req.params.id);
  const report = ReportsJSON.find(r => r.id === reportId);

  if (!report) {
    return res.status(404).json({ error: "Reporte no encontrado" });
  }

  res.status(200).json(report);
};

// Metodo GET
const getReports = (req, res) => {
  const { user_id, workout_id, progress } = req.query;

  let resultados = ReportsJSON;

  if (user_id) {
    resultados = resultados.filter(r => r.user_id === parseInt(user_id));
  }

  if (workout_id) {
    resultados = resultados.filter(r => r.workout_id === parseInt(workout_id));
  }

  if (progress) {
    resultados = resultados.filter(r => r.progress.toLowerCase() === progress.toLowerCase());
  }

  res.status(200).json(resultados);
};

// Metodo POST
const createReport = (req, res) => {
    const { user_id, workout_id, calories_burned, progress } = req.body;
  
    if (!user_id || !workout_id || !calories_burned || !progress) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
  
    const newReport = {
      id: ReportsJSON.length + 1,
      user_id,
      workout_id,
      calories_burned,
      progress,
      created_at: new Date().toISOString()
    };
  
    ReportsJSON.push(newReport);
  
    res.status(201).json({ message: "Reporte creado", report: newReport });
  };

  // Metodo PUT
const updateReport = (req, res) => {
    const reportId = parseInt(req.params.id);
    const { user_id, workout_id, calories_burned, progress } = req.body;
  
    const index = ReportsJSON.findIndex(r => r.id === reportId);
  
    if (index === -1) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }
  
    if (!user_id || !workout_id || !calories_burned || !progress) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
  
    ReportsJSON[index] = {
      id: reportId,
      user_id,
      workout_id,
      calories_burned,
      progress,
      created_at: ReportsJSON[index].created_at // mantener fecha original
    };
  
    res.status(200).json({ message: "Reporte actualizado (PUT)", report: ReportsJSON[index] });
  };
  
  // Metodo PATCH
  const patchReport = (req, res) => {
    const reportId = parseInt(req.params.id);
    const { user_id, workout_id, calories_burned, progress } = req.body;
  
    const report = ReportsJSON.find(r => r.id === reportId);
  
    if (!report) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }
  
    if (user_id) report.user_id = user_id;
    if (workout_id) report.workout_id = workout_id;
    if (calories_burned) report.calories_burned = calories_burned;
    if (progress) report.progress = progress;
  
    res.status(200).json({ message: "Reporte actualizado parcialmente (PATCH)", report });
  };

  // Metodo DELETE
const deleteReport = (req, res) => {
    const reportId = parseInt(req.params.id);
  
    const index = ReportsJSON.findIndex(r => r.id === reportId);
  
    if (index === -1) {
      return res.status(404).json({ error: "Reporte no encontrado" });
    }
  
    ReportsJSON.splice(index, 1);
  
    res.status(204).send();
  };
  
  // Exportación
  module.exports = { getReportById, getReports, createReport, updateReport, patchReport, deleteReport};