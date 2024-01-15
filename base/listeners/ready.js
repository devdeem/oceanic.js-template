/**
 *
 * @param {import("oceanic.js").Client} client
 */

module.exports = async (client) => {
	client.logger.info(`${client.user.username} starting up with ${client.cluster.info.TOTAL_SHARDS} shard(s)`);

	await require("../managers/Commands")(client);
	client.logger.ready(`Logged in as ${client.user.username}`);
};
