const express = require('express');
const router = express.Router();
const { getConnection } = require('../database');

// Consultar disponibilidad
router.get('/disponibilidad', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      `SELECT PAR_NUMERO_PARQUEO, PAR_SECCION, EPAR_ESTADO_ID
       FROM PAR_PARQUEO WHERE EPAR_ESTADO_ID = (SELECT EPAR_ESTADO_ID FROM PAR_ESTADO_PARQUEO WHERE EPAR_TIPO = 'LIBRE')`
    );
    await connection.close();
    res.json(result.rows);
  } catch (error) {
    console.error('Error consultando disponibilidad:', error);
    res.status(500).json({ error: 'Error interno' });
  }
});


module.exports = router;
