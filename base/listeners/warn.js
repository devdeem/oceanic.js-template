/**
 *
 * @param {import("oceanic.js").Client} client
 */

module.exports = async (client, warn) => {
	client.logger.warn(warn);
};
