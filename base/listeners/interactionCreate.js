/**
 *
 * @param {import("oceanic.js").CommandInteraction} ctx
 * @param {import("oceanic.js").Client} client
 */

module.exports = async (client, ctx) => {
	client.logger.debug(`Command executed by ${ctx.user.username} (${ctx.user.id}) in ${ctx.guild.name}`);

	const command = client.commands.get(ctx.data.name);
	if (!command) return;

	command.execute(ctx, client).catch((err) => {
		client.logger.error(err);
		return console.error(err);
	});
};
