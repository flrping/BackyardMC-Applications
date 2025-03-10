// Node.JS Packages
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

// Console Colors
const chalk = require('chalk');

// Don't use ' ', try using " " instead unless you're going to use ${} then use ` `

// Bot Startup Message
client.once("ready", () => {
    console.log(chalk.yellow("-------------------------------"));
    console.log(chalk.yellow("| Backyard MC Applications Bot |"));
    console.log(chalk.yellow("| Up and Running!              |"));
    console.log(chalk.yellow("| Version 0.1                  |"));
    console.log(chalk.yellow("| Made by: Spacella            |"));
    console.log(chalk.yellow("-------------------------------"));

    //Set the activity of the bot
    client.user.setActivity("for new applicants.", { type: "WATCHING" });
});

/*
When a Member Joins the Guild it runs the following:
Guild is undefined, having the bot in multiple servers may cause issues.
*/

client.on("guildMemberAdd", member => {
    // Server Variable
    var server = member.guild;

    // Discord Embed defined.

    const base = new Discord.RichEmbed();
	// Embed Contents
    base.setTitle("Welcome to the BackyardMC Applications Discord!");
    base.setColor(11044352); 
    // Description of the Embed
    base.setDescription("Glad to know that you want to apply! React below for the position you would like to apply for. \n\n" +
        "Thanks, BackyardMC Team \n \n" +
        "Moderation Staff - <:blurpleban:627533909097447424>\n" +
        "Build Team - :hammer:\n" +
        "Graphic Designer - :computer:");

    // Create a channel with the members name
    server.createChannel(member.displayName, "").then(channel => {

        //Set the Channel Permisions
        channel.overwritePermissions(server.id, {
            VIEW_CHANNEL: false
        });

        channel.overwritePermissions(member.id, {
            VIEW_CHANNEL: true
        });

        // Send the embed then react.
        channel.send(base).then(x => x.react("627533909097447424").then(x.react("🔨")).then(x.react("🖥️")));

        // Log the Creation of Application
        console.log(chalk.magenta(`${member.displayName} Created joined and Application.\n \n`,
            `Time: ${member.joinedTimestamp}\n`,
            `Day: ${member.joinedAt.getDay}\n`,
            `Month: ${member.joinedAt.getMonth}`));
    })
});

client.login(`${config.token}`);
