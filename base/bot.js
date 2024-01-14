const { Client, Intents, Collection, ActivityTypes } = require("oceanic.js");
const { ClusterClient, getInfo } = require("discord-hybrid-sharding");
const { Logger } = require("term-logger");

const client = new Client({
	auth: `Bot ${process.env.CLIENT_AUTH_TOKEN}`,
	gateway: {
		// https://docs.oceanic.ws/v1.8.1/interfaces/Types_Gateway.GatewayOptions.html
		autoReconnect: true,
		compress: false,
		concurrency: 1,
		//connectionProperties: {...},
		connectionTimeout: 30000,
		getAllUsers: false,
		guildCreateTimeout: 2000,
		largeThreshold: 250,
		maxReconnectAttempts: "Infinity",
		maxResumeAttempts: 10,
		// override: {...},
		presence: {
			// https://docs.oceanic.ws/v1.8.1/interfaces/Types_Gateway.UpdatePresenceOptions.html
			activities: [
				{
					name: "oceanic.js-template",
					state: null,
					type: ActivityTypes.WATCHING,
					url: null,
				},
			],
			afk: false,
			status: "online",
		},
		intents: [Intents.GUILDS],
		lastShardID: getInfo().LAST_SHARD_ID,
		firstShardID: getInfo().FIRST_SHARD_ID,
		shardIDs: getInfo().SHARD_LIST,
		maxShards: getInfo().TOTAL_SHARDS,
	},
	allowedMentions: {
		// https://docs.oceanic.ws/v1.8.1/interfaces/Types_Channels.AllowedMentions.html
		everyone: false,
		repliedUser: true,
		roles: false,
		users: true,
	},
	defaultImageFormat: "png",
	defaultImageSize: 4096,
	// https://docs.oceanic.ws/v1.8.1/interfaces/Types_Client.ClientOptions.html#disableCache
	disableCache: false,
	// https://docs.oceanic.ws/v1.8.1/interfaces/Types_Client.ClientOptions.html#disableMemberLimitScaling
	disableMemberLimitScaling: false,

	/*
	rest: {
		// https://docs.oceanic.ws/v1.8.1/interfaces/Types_Client.RESTOptions.html
	},
	collectionLimits: {
		// https://docs.oceanic.ws/v1.8.1/interfaces/Types_Client.CollectionLimitsOptions.html
		auditLogEntries: 50,
		autoModerationRules: "Infinity",
		channels: "Infinity",
		emojis: "Infinity",
		groupChannels: 10,
		guildThreads: "Infinity",
		guilds: "Infinity",
		integrations: "Infinity",
		invites: "Infinity",
		members: "Infinity",
		messages: 100,
		privateChannels: 25,
		roles: "Infinity",
		scheduledEvents: "Infinity",
		stageInstances: "Infinity",
		stickers: "Infinity",
		unavailableGuilds: "Infinity",
		users: "Infinity",
		voiceMembers: "Infinity",
		voiceStates: "Infinity"
	},
	*/
});

client.logger = Logger;
client.commands = new Collection();
client.cluster = new ClusterClient(client);

process.on("unhandledRejection", (err) => Logger.error(err));
process.on("uncaughtException", (err) => Logger.error(err));

async () => {
	await require("./managers/Listeners")(client);
	await require("./managers/Commands")(client);
};

client.connect().catch((err) => Logger.error(err));
