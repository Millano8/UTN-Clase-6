const express = require("express")
const router = express.Router()

const Libro = require("../models/libro")

// Importamos la libreria para validar scopes
const {requiredScopes} = require("express-oauth2-jwt-bearer")

//Ruta para obtener todos los libros
router.get("/",requiredScopes("read:libros"),async (req,res)=>{
    try {
        const libros = await Libro.find();
        res.json(libros)
    } catch(error) {
        res.status(500).json({error: "Error al obtener los libros"})
    }
})

//Ruta para crear un nuevo Libro
router.post("/",requiredScopes("write:libros"),async (req,res)=>{
    try {
        const nuevoLibro = new Libro(req.body)
        await nuevoLibro.save()
        res.json(nuevoLibro)
    } catch (error) {
        res.status(500).json({error: "Error al crear un libro"})
    }
})

//Ruta para actualizar un Libro existente
router.put("/:id",requiredScopes("write:libros"), async(req,res)=>{
    try {
        const Libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        req.json(Libro);
    } catch (error) {
        res.status(500).json({error:"Error al actualizar el libro"})
    }
})

// RUta para eliminar el libro
router.delete("/:id",requiredScopes("write:libros"), async (req,res)=>{
    try {
        await Libro.findByIdAndUpdate(req.params.id)
        res.json({message: "Libro eliminado correctamente"})
    } catch (error) {
        res.status(500).json({error:"Error al eliminar el libro"})
    }
})

module.exports= router;