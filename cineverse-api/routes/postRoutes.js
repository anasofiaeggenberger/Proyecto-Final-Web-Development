import express from "express";
import jwt from "jsonwebtoken";
import Post from "../models/Post.js";
import User from "../models/User.js";

const router = express.Router();

// 🔹 Obtener todas las publicaciones
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener publicaciones" });
  }
});

// 🔹 Crear una nueva publicación (solo usuarios logueados)
router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No autorizado" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const newPost = new Post({
      content: req.body.content,
      userEmail: user.email
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("❌ Error al crear publicación:", error);
    res.status(500).json({ message: "Error al crear publicación" });
  }
});

export default router;