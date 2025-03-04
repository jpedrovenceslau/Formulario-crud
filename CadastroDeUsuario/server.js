// import express, { response } from 'express';
import express from 'express';

import cors from 'cors';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express();
app.use(express.json())
app.use(cors());

app.post('/usuarios', async (request, response) => {
    await prisma.user.create({
        data: {
            email: request.body.email,
            name: request.body.name,
            age: request.body.age
        }
    })
    response.status(201).json(request.body)
});

app.get('/usuarios', async (request, response) => {
    
    const users = await prisma.user.findMany()
    response.status(200).json(users)
});

app.put('/usuarios/:id', async (request, response) => {
    await prisma.user.update({
        // where serve para saber onde voce vai editar
        where: {
            id: request.params.id
        },
        data: {
            name: request.body.name,
            email: request.body.email,
            age: request.body.age
        }
    })

    response.status(201).json(request.body)
});

app.delete('/usuarios/:id' , async (request, response) => {
    await prisma.user.delete({
        where: {
            id: request.params.id,
        }
    })

    response.status(200).json({ message : "usuario deletado com sucesso"})
})

app.listen(3000, () => {
    console.log('servidor on');
})

