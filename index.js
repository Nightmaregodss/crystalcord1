const Discord = require('discord.js');
const botsettings = require('./botsettings.json');

const bot = new Discord.Client({disableEveryone: true});

bot.on("guildMemberAdd", member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome')
    welcomeChannel.send (`Welcome! ${member}`)
})

require("./util/eventHandler")(bot)

const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);  
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botsettings.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = message.content.substring(message.content.indexOf(' ')+1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)

})

bot.login(botsettings.token);

let Discord2;
let Database;
let moment;
if (typeof window !== "undefined") {
    Discord2 = DiscordJS;
    Database = EasyDatabase;
    moment = Momentl;
} else {
    Discord2 = require("discord.js");
    Database = require("easy-json-database");
    moment = require('moment');
}
const {
    MessageButton,
    MessageActionRow,
    MessageMenu,
    MessageMenuOption
} = require("discord-buttons")
const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
const s4d = {
    Discord2,
    client: null,
    tokenInvalid: false,
    reply: null,
    joiningMember: null,
    database: new Database("./db.json"),
    checkMessageExists() {
        if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
        if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
    }
};
s4d.client = new s4d.Discord2.Client({
    fetchAllMembers: true
});
require('discord-buttons')(s4d.client);

function mainchannel(guild) {
    let channelID;
    let channels = guild.channels.cache;
    for (let in channels) {
        if (channels[i].type === "text" && channels[i].permissionsFor(guild.me).has('SEND_MESSAGES')) {
            channelID = channels[i]
            return channelID.id
        }
    }
    return null
}
s4d.client.on('raw', async (packet) => {
    if (['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) {
        const guild = s4d.client.guilds.cache.get(packet.d.guild_id);
        if (!guild) return;
        const member = guild.members.cache.get(packet.d.user_id) || guild.members.fetch(d.user_id).catch(() => {});
        if (!member) return;
        const channel = s4d.client.channels.cache.get(packet.d.channel_id);
        if (!channel) return;
        const message = channel.messages.cache.get(packet.d.message_id) || await channel.messages.fetch(packet.d.message_id).catch(() => {});
        if (!message) return;
        s4d.client.emit(packet.t, guild, channel, message, member, packet.d.emoji.name);
    }
});
var my_1;
s4d.client.login(botsettings.token);

s4d.client.on('clickButton', async (button) => {
    if ((button.id) == '1') {
        if (my_1 == '0') {
            await button.reply.send('Trying to add the role', false)
            s4d.database.get(String('m')).roles.add(s4d.database.get(String('r')));
            my_1 = '1';
        } else {
            await button.reply.send('Button Already used', true)
        }
    } else if ((button.id) == '2') {
        if (my_1 == '0') {
            await button.reply.send('Cancelled', false)
            my_1 = '1';
        } else {
            await button.reply.send('Button Already used', true)
        }
    } else {
        await button.reply.send('TEST', true)
    }

});
s4d.client.on('message', async (s4dmessage) => {
    if (String(((s4dmessage.content).toUpperCase())).includes(String('T! TEST'))) {
        let embed = new Discord.MessageEmbed()
        embed.setAuthor('Poke Phantom', ((((s4d.client.guilds.cache.get('841590705382359090')).members.cache.get('796058865094492190') || await (s4d.client.guilds.cache.get('841590705382359090')).members.fetch('796058865094492190'))).user.displayAvatarURL()));
        embed.setDescription((['⭐ help commands ⭐', '\n', '➡ ?mod help', '\n', '✅ u can get every moderation related commands here ✅', '\n', '💠 type ?help (cmnd) to know more about it 💠'].join('')));

        s4dmessage.channel.send(embed);
        (s4dmessage.channel).send(String('TEST'), (new MessageActionRow()
            .addComponents(new MessageButton()
                .setID('0')
                .setLabel((s4dmessage.content))
                .setStyle('red'),
                new MessageButton()
                .setID('1')
                .setLabel('1')
                .setStyle('red'),
                new MessageButton()
                .setID('3')
                .setLabel('2')
                .setStyle('red'),
            )));
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if (String(((s4dmessage.content).toUpperCase())).includes(String('? ADD ROLE AHQ '))) {
        my_1 = '0';
        if ((s4dmessage.member).hasPermission('MANAGE_ROLES')) {
            s4d.database.delete(String('r'));
            s4d.database.delete(String('m'));
            s4d.database.set(String('r'), (s4dmessage.mentions.roles.first()));
            s4d.database.set(String('m'), (s4dmessage.mentions.members.first()));
            (s4dmessage.channel).send(String(('Confirm adding role ? ' + String(s4dmessage.mentions.roles.first()))), (new MessageActionRow()
                .addComponents(new MessageButton()
                    .setID('1')
                    .setLabel('Yes')
                    .setStyle('green'),
                    new MessageButton()
                    .setID('2')
                    .setLabel('No')
                    .setStyle('red'),
                )));
        } else {
            s4dmessage.channel.send(String('No permission!')).then(async (s4dreply) => {
                await delay(Number(5) * 1000);
                s4dreply.delete();

            });
        }
    }

});
