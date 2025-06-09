import express from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'


const prisma = new PrismaClient()

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET
// cadastro e login

// Cadastro
router.post('/cadastro', async (req, res) => {
    try{
        const user = req.body

        if (!user || !user.name || !user.email || !user.password) {
            return res.status(400).json({ message: 'Dados incompletos no corpo da requisição' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, salt)

        const userDB = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPassword,
            }
        })
        const { password, ...userWithoutPass } = userDB
        res.status(201).json(userWithoutPass)

    } catch (err) {
        console.error('Erro no cadastro:', err);
        res.status(500).json({ message: 'Erro no servidor' });
    }

})

// Login

router.post('/login', async (req, res) => {
    
    try{
        const userInfo = req.body
        // Busca o usuario no banco
        const user = await prisma.user.findUnique({ 
            where: {email: userInfo.email}
        })
        // Compara o banco na senha
        if(!user) {
            return res.status(404).json({message: 'Usuario nao encontrado'})
        }
        const isMatch = await bcrypt.compare(userInfo.password, user.password)

        if(!isMatch){
            return res.status(400).json('Senha invalida')
        }

        // ger o token jwt
        const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '30d'})
        res.status(200).json(token)

    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
})

export default router

