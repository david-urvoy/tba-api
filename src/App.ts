import cookieParser from 'cookie-parser'
import cors from 'cors'
import Discord, { GatewayIntentBits } from 'discord.js'
import express from "express"
import logger from 'morgan'
import config from '../config.json'
import userRouter from './user/UserRouter'

const app = express()
const port = 3000

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

const discordToken = process.env.DISCORD_TOKEN || config.discord_token
console.log({ discordToken, processVal: process.env.DISCORD_TOKEN })
export const discord = new Discord.Client({ intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions] })
discord.login(discordToken)
discord.on('ready', () => {
    console.log('discord-client is ready...')
    app.listen(port, () => console.log(`Node service listening at http://localhost:${port}`))
})


app.use("/users", userRouter)

export default app
