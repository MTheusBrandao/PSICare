import express from 'express'
import { PrismaClient } from '@prisma/client';

const router = express.Router()
const prisma = new PrismaClient()

router.get('/listar-usuarios', async (req, res) =>{
    try {
        const users = await prisma.user.findMany()
        res.status(200).json({message: 'Usuarios listados com sucesso', users})

    } catch(err){
        res.status(500).json({message: 'Falha no servidor'})
    }
})

// Criar emocao 
router.post('/emocao', async (req, res) => {
    const { mood, description} = req.body
    try {
        const nova = await prisma.emotion.create({
            data: {
                mood,
                description,
                userId: req.user.id
            }
        })
        res.status(201).json(nova)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar emoçao'})
    }
})

// Listar emoçoes
router.get('/emocoes', async (req, res) => {
    // try {
    //     const lista = await prisma.emotion.findMany({
    //         where: { userId: req.user.id },
    //         orderBy: { date: 'desc' }
    //     })
    //     res.json(lista)
    // } catch (err) {
    //     res.status(500).json({ message: 'Erro ao listar emoçoes'})
    // }
    
    const { mood, start, end} = req.query;

    const filtros = { userId: req.user.id};

    if (mood) {
        filtros.mood = mood
    }

    if (start && end) {
        filtros.date = {
            gte: new Date(start),
            lte: new Date(end)
        };
    }

    try {
        const emocoes = await prisma.emotion.findMany({
            where: filtros,
            orderBy: {date: 'desc'}
        });
        res.status(200).json(emocoes);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao filtrar emoçoes'})
    }
})

// Editar emocao
router.put('/emocao/:id', async (req, res) => {
    console.log('ID recebido:', req.params.id)
    const { id } = req.params
    const { mood, description } = req.body
    try {
        const editada = await prisma.emotion.updateMany({
            where: { id, userId: req.user.id},
            data: { mood, description}
        })
        res.json({ message: 'Emoçao atualizada com sucesso', editada })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Erro ao editar emoção' })
    }
})

// Deletar emocao
router.delete('/emocao/:id', async (req, res) => {
    const { id } = req.params
    try {
        await prisma.emotion.deleteMany({
            where: { id, userId: req.user.id }
        })
        res.json({ message: 'Emocao deletada com sucesso' })
    } catch (err) {
        res.status(500).json({ message: 'Erro ao deletar emocao'})
    }
})

export default router
