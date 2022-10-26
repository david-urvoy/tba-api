import { GuildMember } from 'discord.js'
import { User } from './User'
import config from '../../config.json'
import { discord } from '../App'

export default class DiscordClient {

	async findAll(): Promise<User[]> {
		let guild = await discord.guilds.fetch(process.env.SERVER_ID || config.server_id)
		let members = Array.from(await (await guild.members.fetch()).values())
		return members.map(discordUser => mapGuildMember(discordUser))
	}

	async find(id: string): Promise<User | Error> {
		return discord.users.fetch(id)
			.catch(error => error)
	}
}

function mapGuildMember({ id, displayName, user: { username, avatar } }: GuildMember): User {
	return { username: displayName, id, avatar }
}
