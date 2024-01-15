const { readdir } = require("fs");

/**
 *
 * @param {import("oceanic.js").Client} client
 */

module.exports = async (client) => {
	readdir(`./base/listeners`, (err, files) => {
		if (err) return client.logger.error(err);

		files.forEach((file) => {
			const listener = require(`../listeners/${file}`);

			client.on(file.split(".")[0], listener.bind(null, client));
			client.logger.event(`Successfully loaded ${file.split(".")[0]} listener`);
		});
	});
};
