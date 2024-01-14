require("dotenv").config();

const { ClusterManager, HeartbeatManager, ReClusterManager } = require("discord-hybrid-sharding");
const { Logger } = require("term-logger");

const manager = new ClusterManager(`${__dirname}/base/bot.js`, {
	totalShards: 1,
	shardsPerClusters: 5,
	mode: "process",
	respawn: true,
	restarts: {
		max: "Infinity",
		interval: 60000 * 60,
	},
	spawnOptions: {
		timeout: 30000,
	},
	token: process.env.CLIENT_AUTH_TOKEN,
});

console.clear();
Logger.pending(`Starting cluster manager on ${manager.mode} mode...`);

manager.on("clusterCreate", (cluster) => {
	Logger.cluster(`Cluster ${cluster.id} successfully launched`);

	cluster.on("death", (cc, t) => {
		Logger.error(`Cluster DIED`);

		console.log(`ID: ${cc.id}`);
		console.log(`Exit Code: ${t.exitCode}`);
		console.log(`Killed: ${t.killed}`);
		console.log(`Args: ${t.spawnargs}`);
	});

	cluster.on("error", (e) => {
		Logger.error(`Cluster ERROR`);

		console.log(e.name);
		console.log(e.message);
		console.log(e.stack);
	});
});

manager.on("debug", Logger.debug);

manager.extend(
	new HeartbeatManager({ interval: 5000, maxMissedHeartbeats: 10 }),
	new ReClusterManager({ restartMode: "rolling" })
);

manager.spawn({ timeout: -1 }).catch((e) => Logger.error(e));
