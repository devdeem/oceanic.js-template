const { ApplicationCommandTypes } = require("oceanic.js");

module.exports = {
	data: {
		name: "example",
		description: "Example command",
		type: ApplicationCommandTypes.CHAT_INPUT,
		dmPermission: false,
	},

	/**
	 *
	 * @param {import("oceanic.js").CommandInteraction} ctx
	 * @param {import("oceanic.js").Client} client
	 */

	async execute(ctx, client) {
		return ctx.createMessage({ content: "Hello World!" });
	},
};
