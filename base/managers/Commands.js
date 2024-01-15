const { readdirSync } = require("fs");
const { join } = require("path");

/**
 *
 * @param {import("oceanic.js").Client} client
 */

module.exports = async (client) => {
	const commandsDir = join(__dirname, "../../base/commands/");
	const commandFiles = readdirSync(commandsDir).filter((f) => f.endsWith(".js"));

	const commands = [];
	for (const file of commandFiles) {
		const command = require(join(commandsDir, file));

		commands.push(command.data);
		client.commands.set(command.data.name, command);
		client.logger.command(`Successfully loaded /${command.data.name} command`);
	}

	try {
		await client.application.bulkEditGlobalCommands(commands);

		client.logger.ready(`Successfully registered all application commands globally`);
	} catch (err) {
		return client.logger.error(err);
	}
};
