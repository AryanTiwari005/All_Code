require("dotenv").config();

const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome Aryan"));

bot.command("add", (ctx) => ctx.reply("Hello"));

bot.command("hello", (ctx) => {
    ctx.reply("Hello Aryan! 👋");
});
bot.on("text", async (ctx) => {
    console.log(ctx.message.text);
    await ctx.reply(`You said: ${ctx.message.text}`);
});
bot.launch()
    .then(() => console.log("✅ Bot is running"))
    .catch(console.error);

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));