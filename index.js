/** import telegraf module */
const { Telegraf } = require("telegraf");
/** initialize dotenv */
require("dotenv").config();
/** import path module */
const path = require("path");
/** import file system module methods */
const { createReadStream } = require("fs");
/** create new bot instants from telegraf */
const bot = new Telegraf(process.env.BOT_TOKEN);

/**
 * define bot's behavior for start command
 */
bot.start((ctx) => {
	/** define the start command's reply */
	const html =
		`<b>Welcome to print bot</b>\n` +
		`This bot has been designed in order to ...\n\n` +
		`Run /help command for more help`;

	/** send the response to user with html structure */
	ctx.replyWithHTML(html);
});

/**
 * define bot behavior for help command
 */
bot.help((ctx) => {
	/** define the start command's reply */
	const html =
		`<b>Print bot help command</b>\n\n` +
		`/start - start the bot\n` +
		`/help - See the help menu\n` +
		`/print - the print command will print the message sent by user\n` +
		`/cities - show you list of the grate city of world!`;

	/** send the response to user with html structure */
	ctx.replyWithHTML(html);
});

/**
 * defining a custom command which will listen for
 * print command to be call and then print the
 * message sent by the user.
 */
bot.command("print", (ctx) => {
	/** indicates that the bot is typing a response */
	ctx.sendChatAction("typing");
	/** extract the text of the message */
	const msg = ctx.message.text;
	/** split the text to an array */
	const listOfMsg = msg.split(" ");
	/** define a reply text */
	let reply = "";
	/** check if the message sent by user contains only the /print command */
	if (listOfMsg.length == 1) {
		reply = "You said print!";
	} else {
		/**
		 * if the message contains words other than the /print command,
		 * concatenate them into a single string.
		 */
		reply = listOfMsg.slice(1).join(" ");
	}
	/** send the reply to user */
	ctx.reply(reply);
});

/**
 * command to list cities and their corresponding countries.
 */
bot.command("cities", (ctx) => {
	/** indicates that the bot is typing a response */
	ctx.sendChatAction("typing");
	/** define a reply message */
	const cityMessage =
		"List of cities :\n" +
		"/Tehran - iran\n" +
		"/NewYork - USA\n" +
		"/Hongkong - China\n" +
		"/Dubai - AUE\n";
	/** send the reply to user */
	ctx.reply(cityMessage);
});

/**
 * define a custom command to send a photo
 * of Tehran in response to "/Tehran" or "/tehran".
 */
bot.command(["Tehran", "tehran"], (ctx) => {
	/** indicate that the bot is uploading a photo */
	ctx.sendChatAction("upload_photo");
	/**
	 * send the photo of the chosen city to user.
	 */
	ctx.sendPhoto(
		{
			source: createReadStream(path.join(__dirname, "cities", "tehran.jpg")),
		},
		{
			/**
			 * reply to the same message that triggered the command
			 */
			reply_to_message_id: ctx.message.message_id,
		}
	);
});

/**
 * define a custom command to send a photo
 * of Dubai in response to "/Dubai" or "/dubai".
 */
bot.command(["Dubai", "dubai"], (ctx) => {
	/** indicate that the bot is uploading a photo */
	bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
	/**
	 * send the photo of the chosen city to user.
	 */
	ctx.sendPhoto(
		{
			source: createReadStream(path.join(__dirname, "cities", "dubai.jpg")),
		},
		{
			/**
			 * reply to the same message that triggered the command
			 */
			reply_to_message_id: ctx.message.message_id,
		}
	);
});

/**
 * define a custom command to send a photo
 * of NewYork in response to "/NewYork" or 
 * "/newyork" or "/Newyork".
 */
bot.command(["NewYork", "newyork", "Newyork"], (ctx) => {
	/** indicate that the bot is uploading a photo */
	bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
	/**
	 * send the photo of the chosen city to user.
	 */
	ctx.sendPhoto(
		{
			source: createReadStream(path.join(__dirname, "cities", "newyork.webp")),
		},
		{
			/**
			 * reply to the same message that triggered the command
			 */
			reply_to_message_id: ctx.message.message_id,
		}
	);
});

/**
 * define a custom command to send a photo
 * of Hongkong in response to "/hongkong" or 
 * "/HongKong" or "/Hongkong".
 */
bot.command(["hongkong", "HongKong", "Hongkong"], (ctx) => {
	/** indicate that the bot is uploading a photo */
	bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
	/**
	 * send the photo of the chosen city to user.
	 */
	ctx.sendPhoto(
		{
			source: createReadStream(path.join(__dirname, "cities", "hongkong.jpg")),
		},
		{
			/**
			 * reply to the same message that triggered the command
			 */
			reply_to_message_id: ctx.message.message_id,
		}
	);
});

/** launch the bot */
bot.launch();
