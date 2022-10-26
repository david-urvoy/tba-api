import { User } from 'discord.js'
import express, { Request, Response } from 'express'
import DiscordClient from './DiscordClient'

const userRouter = express.Router()
const discord = new DiscordClient()

userRouter.route('/')
    .get((_: Request, response: Response) => discord.findAll()
        .then(users => response.send(users))
    )

userRouter.route('/:id')
    .get(({ params }: Request, response: Response) => discord.find(params.id)
        .then(user => (user instanceof User) ? response.send(user) : response.send({ error: (user as Error).message }) )
    )

export default userRouter