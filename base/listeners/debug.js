/**
 *
 * @param {import("oceanic.js").Client} client
 */

module.exports = async (client, debug) => {
	if (client.config.status === "PROD") {
		client.logger.debug(debug);
	}
};
