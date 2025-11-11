import express from 'express';
const router = express.Router();

// Ruta temporal
router.get('/', (req, res) => {
  res.send('Trivia route funcionando 🚀');
});

export default router;