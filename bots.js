let Discord;
let Database;
if (typeof window !== "undefined") {
    Discord = DiscordJS;
    Database = EasyDatabase;
} else {
    Discord = require("discord.js");
    Database = require("easy-json-database");
}
const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
const s4d = {
    Discord,
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
s4d.client = new s4d.Discord.Client({
    fetchAllMembers: true
});
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
var strength;


s4d.client.on('guildMemberAdd', async (param1) => {
    s4d.joiningMember = param1;
    (s4d.joiningMember).send(String(([s4d.joiningMember, ', you just joined ', s4d.joiningMember.guild].join(''))));
    s4d.joiningMember = null
});
function colourRandom() {
    var num = Math.floor(Math.random() * Math.pow(2, 24));
    return '#' + ('00000' + num.toString(16)).substr(-6);
}

s4d.client.login(process.botsettings.TOKEN).catch((e) => {
    s4d.tokenInvalid = true;
    s4d.tokenError = e;
});
s4d.client.on('ready', async () => {

    while (s4d.client && s4d.client.token) {
        await delay(50);
        s4d.client.user.setActivity(String('Hacker deleter online, listening to "help"'));
        await delay(Number(2) * 1000);
        s4d.client.user.setActivity(String((['Catching criminals over ', s4d.client.guilds.cache.size, ' server/s with ping ', s4d.client.ws.ping, ' ms, listening to "help"'].join(''))));
        await delay(Number(2) * 1000);

        console.log('ran')
    }

});

s4d.client.on('guildMemberAdd', async (param1) => {
    s4d.joiningMember = param1;
    if (s4d.database.has(String(('setup-' + String((s4d.joiningMember.guild).name))))) {
        (s4d.joiningMember).send(String(([s4d.joiningMember, ', you just joined ', s4d.joiningMember.guild].join(''))));
    }
    s4d.joiningMember = null
});
s4d.client.on('message', async (s4dmessage) => {
    if ((s4d.database.get(String(('setup-' + String((s4dmessage.guild).name)))) == 'a' || s4d.database.get(String(('setup-' + String((s4dmessage.guild).name)))) == 'ab') && (((s4dmessage.content) || '').startsWith(s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))) || '')) && ((String((s4dmessage.content)).includes(String('My strikes'))) || (s4dmessage.member).hasPermission('ADMINISTRATOR') && (String((s4dmessage.content)).includes(String('Strikes '))))) {
        if (!s4d.database.has(String((['Report', (s4dmessage.member).user.id, (s4dmessage.guild).name].join(''))))) {
            s4d.database.set(String((['Report', (s4dmessage.member).user.id, (s4dmessage.guild).name].join(''))), 0);
        }
        if (!s4d.database.has(String((['Report', (s4dmessage.mentions.members.first()).user.id, (s4dmessage.guild).name].join(''))))) {
            s4d.database.set(String((['Report', (s4dmessage.mentions.members.first()).user.id, (s4dmessage.guild).name].join(''))), 0);
        }
    }

});
s4d.client.on('message', async (s4dmessage) => {
    if ((s4dmessage.content) == 'Update') {
        s4dmessage.delete();
        (s4dmessage.member).send(String('send the password'));
        (s4dmessage.channel).send(String(''));
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
            time: (1 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
            if ((s4d.reply) == 'Hacker delete offline/updating') {

                while (s4d.client && s4d.client.token) {
                    await delay(50);
                    s4d.client.user.setActivity(String('Hacker Deleter offline/updating.'));
                    await delay(Number(1) * 1000);
                    s4d.client.user.setActivity(String('Hacker Deleter offline/updating..'));
                    await delay(Number(1) * 1000);
                    s4d.client.user.setActivity(String('Hacker Deleter offline/updating...'));

                    console.log('ran')
                }
            }

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
        });
    }
    if (s4d.database.has(String(('setup-' + String((s4dmessage.guild).name))))) {
        if ((s4dmessage.content) == '!@!prefix') {
            s4dmessage.channel.send(String((['Prefix : **', s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))), '**'].join(''))));
        }
    }
    if ((s4dmessage.content) == 'setup') {
        if ((s4dmessage.member).hasPermission('ADMINISTRATOR')) {
            if (!(s4d.database.get(String(('setup-' + String((s4dmessage.guild).name)))) == 'a' || s4d.database.get(String(('setup-' + String((s4dmessage.guild).name)))) == 'ab' || s4d.database.get(String(('setup-' + String((s4dmessage.guild).name)))) == 'b')) {
                if ((s4dmessage.member).hasPermission('ADMINISTRATOR')) {
                    if (!((s4dmessage.member).user.bot)) {
                        (s4dmessage.channel).send(String((['Which softwares do you want to set up with Hacker Deleter?', '\n', 'Only Hacker Deleter - Answer with **1**', '\n', 'Only Levels - Answer with **2**', '\n', 'Both Hacker Deleter and Levels - Answer with **3**'].join(''))));
                        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
                            time: (1 * 60 * 1000),
                            max: 1
                        }).then(async (collected) => {
                            s4d.reply = collected.first().content;
                            if ((s4d.reply) == '1') {
                                s4d.database.set(String(('setup-' + String((s4dmessage.guild).name))), 'a');
                                s4dmessage.channel.send(String('Done'));
                            } else if ((s4d.reply) == '2') {
                                s4d.database.set(String(('setup-' + String((s4dmessage.guild).name))), 'b');
                                s4dmessage.channel.send(String('Done'));
                            } else if ((s4d.reply) == '3') {
                                s4d.database.set(String(('setup-' + String((s4dmessage.guild).name))), 'ab');
                                s4dmessage.channel.send(String('Done'));
                            } else {
                                s4dmessage.channel.send(String('Invalid Choice'));
                            }

                            s4d.reply = null;
                        }).catch(async (e) => {
                            console.error(e);
                        });
                    }
                }
            } else if (s4d.database.get(String(('setup-' + String((s4dmessage.guild).name)))) == 'a') {
                if ((s4dmessage.member).hasPermission('ADMINISTRATOR') && !((s4dmessage.member).user.bot)) {
                    (s4dmessage.channel).send(String((['Modify the setup', '\n', 'Only Levels - Answer with **1**', '\n', 'Both Hacker Deleter and levels - Answer with **2**'].join(''))));
                    (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
                        time: (1 * 60 * 1000),
                        max: 1
                    }).then(async (collected) => {
                        s4d.reply = collected.first().content;
                        if ((s4d.reply) == '1') {
                            s4d.database.delete(String(('setup-' + String((s4dmessage.guild).name))));
                            await delay(Number(2) * 1000);
                            s4d.database.set(String(('setup-' + String((s4dmessage.guild).name))), 'b');
                        } else if ((s4d.reply) == '2') {
                            s4d.database.delete(String(('setup-' + String((s4dmessage.guild).name))));
                            await delay(Number(2) * 1000);
                            s4d.database.set(String(('setup-' + String((s4dmessage.guild).name))), 'ab');
                        }

                        s4d.reply = null;
                    }).catch(async (e) => {
                        console.error(e);
                    });
                }
            } else if (s4d.database.get(String(('setup-' + String((s4dmessage.guild).name)))) == 'b') {
                if ((s4dmessage.member).hasPermission('ADMINISTRATOR') && !((s4dmessage.member).user.bot)) {
                    (s4dmessage.channel).send(String((['Modify the setup', '\n', 'Only Hacker Deleter Answer with **1**', '\n', 'Both Hacker Deleter and levels - Answer with **2**'].join(''))));
                    (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
                        time: (1 * 60 * 1000),
                        max: 1
                    }).then(async (collected) => {
                        s4d.reply = collected.first().content;
                        if ((s4d.reply) == '1') {
                            s4d.database.delete(String(('setup-' + String((s4dmessage.guild).name))));
                            await delay(Number(2) * 1000);
                            s4d.database.set(String(('setup-' + String((s4dmessage.guild).name))), 'a');
                        } else if ((s4d.reply) == '2') {
                            s4d.database.delete(String(('setup-' + String((s4dmessage.guild).name))));
                            await delay(Number(2) * 1000);
                            s4d.database.set(String(('setup-' + String((s4dmessage.guild).name))), 'ab');
                        }

                        s4d.reply = null;
                    }).catch(async (e) => {
                        console.error(e);
                    });
                }
            } else if (s4d.database.get(String(('setup-' + String((s4dmessage.guild).name)))) == 'ab') {
                (s4dmessage.channel).send(String((['Modify the setup', '\n', 'Only Hacker Deleter Answer with **1**', '\n', 'Only levels Answer with **2**'].join(''))));
                (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
                    time: (1 * 60 * 1000),
                    max: 1
                }).then(async (collected) => {
                    s4d.reply = collected.first().content;
                    if ((s4d.reply) == '1') {
                        s4d.database.delete(String(('setup-' + String((s4dmessage.guild).name))));
                        await delay(Number(2) * 1000);
                        s4d.database.set(String(('setup-' + String((s4dmessage.guild).name))), 'a');
                    } else if ((s4d.reply) == '2') {
                        s4d.database.delete(String(('setup-' + String((s4dmessage.guild).name))));
                        await delay(Number(2) * 1000);
                        s4d.database.set(String(('setup-' + String((s4dmessage.guild).name))), 'b');
                    }

                    s4d.reply = null;
                }).catch(async (e) => {
                    console.error(e);
                });
            } else {}
        } else {
            s4dmessage.delete();
            (s4dmessage.member).send(String('You do not have permission to do it.'));
        }
    }
    if (s4d.database.get(String(('setup-' + String((s4dmessage.guild).name)))) == 'a' || s4d.database.get(String(('setup-' + String((s4dmessage.guild).name)))) == 'ab') {
        if (!s4d.database.has(String(('prefix' + String((s4dmessage.guild).name))))) {
            s4d.database.set(String(('prefix' + String((s4dmessage.guild).name))), 'Hd!');
        }
        if (((s4dmessage.content) || '').startsWith(s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))) || '')) {
            if (String((s4dmessage.content)).includes(String('help'))) {
                if (s4d.database.get(String(('setup-' + String((s4dmessage.guild).name)))) == 'ab') {
                    s4dmessage.channel.send({
                        embed: {
                            title: 'Help',
                            color: '#ff0000',
                            image: {
                                url: null
                            },

                            description: (['Hacker Deleter Commands', '\n', '1. **setup**', '\n', '2. **', s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))), ' Report <@membername>**', '\n', '3. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))),' prefix change**', '\n', '4. **','!@!prefix**', '\n', '5. **', s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))),'Send to <@membername>**', '\n', '6.  **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))),' My strikes**', '\n', '7. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))), 'Strikes <@membername>**', '\n', '8. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))), 'invite**', '\n', '9. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))), 'My levels**', '\n', '10. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))), 'My xp**', '\n', '11. **', s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))),'update info**'].join('')),
                            footer: {
                                text: 'Join support : https://discord.gg/AkcJrqeHwg'
                            },
                            thumbnail: {
                                url: ((s4dmessage.guild).iconURL({
                                    dynamic: true
                                }))
                            }

                        }
                    });
                } else if (s4d.database.get(String(('setup-' + String((s4dmessage.guild).name)))) == 'a') {
                    s4dmessage.channel.send({
                        embed: {
                            title: 'Help',
                            color: '#ff0000',
                            image: {
                                url: null
                            },

                            description: (['Hacker Deleter Commands', '\n', '1. **setup**', '\n', '2. **', s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))),' Report <@membername>**', '\n', '3. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))), 'prefix change**', '\n', '4. **!@!prefix**', '\n', '5. **' ,s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))), 'Send to <@membername>**', '\n', '6. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))),' invite**', '\n', '7. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))),' update info**', '\n', '8. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))),' My strikes**', '\n', '9. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))),' Strikes <@membername>'].join('')),
                            footer: {
                                text: 'Join support : https://discord.gg/AkcJrqeHwg'
                            },
                            thumbnail: {
                                url: ((s4dmessage.guild).iconURL({
                                    dynamic: true
                                }))
                            }

                        }
                    });
                } else {}
            } else if (String((s4dmessage.content)).includes(String('updates'))) {
            } else if (String((s4dmessage.content)).includes(String('Report '))) {
                if (!s4d.database.has(String(([(s4dmessage.member).user.id, (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))))) {
                    (s4dmessage.channel).send({
                        embed: {
                            title: 'Delete Hacker',
                            color: '#ff0000',
                            image: {
                                url: null
                            },

                            description: ([s4dmessage.mentions.members.first(), ' is hacking in ', s4dmessage.guild, 'server', '\n', 'Right ', s4dmessage.member, '? (Write \'Yes\' to confirm)'].join('')),
                            footer: {
                                text: 'Found a bug! Join support : https://discord.gg/AkcJrqeHwg'
                            },
                            thumbnail: {
                                url: ((s4dmessage.guild).iconURL({
                                    dynamic: true
                                }))
                            }

                        }
                    });
                    (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
                        time: (1 * 60 * 1000),
                        max: 1
                    }).then(async (collected) => {
                        s4d.reply = collected.first().content;
                        if ((s4d.reply) == 'Yes') {
                            s4dmessage.channel.send(String('Report recorded'));
                            (s4dmessage.member).send(String('Your report recorded'));
                            s4d.database.set(String(([(s4dmessage.member).user.id, (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))), 'reported');
                            if (s4d.database.has(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))))) {
                                if (s4d.database.has(String('temp'))) {
                                    s4d.database.delete(String('temp'));
                                }
                                s4d.database.set(String('temp'), s4d.database.get(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join('')))));
                                s4d.database.delete(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))));
                                s4d.database.set(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))), (s4d.database.get(String('temp')) + 1));
                            } else {
                                s4d.database.set(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))), 1);
                            }
                            if (s4d.database.get(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join('')))) > 3) {
                                (s4dmessage.member).send(String((['Banned ', s4dmessage.mentions.members.first(), ' due to hacking from ', s4dmessage.guild].join(''))));
                                ((s4dmessage.guild).owner || await (s4dmessage.guild).members.fetch((s4dmessage.guild).ownerID)).send(String((['Banned ', s4dmessage.mentions.members.first(), ' due to hacking from ', s4dmessage.guild].join(''))));
                                (s4dmessage.mentions.members.first()).send(String((['You have been banned from ', s4dmessage.guild, ' due to hacking'].join(''))));
                                await delay(Number(5) * 1000);
                                (s4dmessage.mentions.members.first()).ban();
                            } else if (s4d.database.get(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join('')))) == 3) {
                                (s4dmessage.member).send(String((['Banned ', s4dmessage.mentions.members.first(), ' due to hacking from ', s4dmessage.guild].join(''))));
                                ((s4dmessage.guild).owner || await (s4dmessage.guild).members.fetch((s4dmessage.guild).ownerID)).send(String((['Banned ', s4dmessage.mentions.members.first(), ' due to hacking from ', s4dmessage.guild].join(''))));
                                (s4dmessage.mentions.members.first()).send(String((['You have been banned from ', s4dmessage.guild, ' due to hacking'].join(''))));
                                await delay(Number(5) * 1000);
                                (s4dmessage.mentions.members.first()).ban();
                            }
                        } else if ((s4d.reply) == 'yes') {
                            s4dmessage.channel.send(String('Report recorded'));
                            (s4dmessage.member).send(String('Your report recorded'));
                            s4d.database.set(String(([(s4dmessage.member).user.id, (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))), 'reported');
                            if (s4d.database.has(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))))) {
                                if (s4d.database.has(String('temp'))) {
                                    s4d.database.delete(String('temp'));
                                }
                                s4d.database.set(String('temp'), s4d.database.get(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join('')))));
                                s4d.database.delete(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))));
                                s4d.database.set(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))), (s4d.database.get(String('temp')) + 1));
                            } else {
                                s4d.database.set(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))), 1);
                            }
                            if (s4d.database.get(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join('')))) > 3) {
                                (s4dmessage.member).send(String((['Banned ', s4dmessage.mentions.members.first(), ' due to hacking from ', s4dmessage.guild].join(''))));
                                ((s4dmessage.guild).owner || await (s4dmessage.guild).members.fetch((s4dmessage.guild).ownerID)).send(String((['Banned ', s4dmessage.mentions.members.first(), ' due to hacking from ', s4dmessage.guild].join(''))));
                                (s4dmessage.mentions.members.first()).send(String((['You have been banned from ', s4dmessage.guild, ' due to hacking'].join(''))));
                                await delay(Number(5) * 1000);
                                (s4dmessage.mentions.members.first()).ban();
                            } else if (s4d.database.get(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join('')))) == 3) {
                                (s4dmessage.member).send(String((['Banned ', s4dmessage.mentions.members.first(), ' due to hacking from ', s4dmessage.guild].join(''))));
                                ((s4dmessage.guild).owner || await (s4dmessage.guild).members.fetch((s4dmessage.guild).ownerID)).send(String((['Banned ', s4dmessage.mentions.members.first(), ' due to hacking from ', s4dmessage.guild].join(''))));
                                (s4dmessage.mentions.members.first()).send(String((['You have been banned from ', s4dmessage.guild, ' due to hacking'].join(''))));
                                await delay(Number(5) * 1000);
                                (s4dmessage.mentions.members.first()).ban();
                            }
                        }

                        s4d.reply = null;
                    }).catch(async (e) => {
                        console.error(e);
                    });
                } else {
                    s4dmessage.delete();
                    (s4dmessage.member).send(String('Report cannot be made twice'));
                }
            } else if (String((s4dmessage.content)).includes(String('prefix change'))) {
                (s4dmessage.channel).send(String((['Current prefix : **', s4d.database.get(String(('prefix' + String(s4dmessage.guild)))), '**', '\n', 'Write your new prefix'].join(''))));
                (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
                    time: (1 * 60 * 1000),
                    max: 1
                }).then(async (collected) => {
                    s4d.reply = collected.first().content;
                    if (s4d.database.has(String(('prefix' + String(s4dmessage.guild))))) {
                        s4d.database.delete(String(('prefix' + String(s4dmessage.guild))));
                    }
                    s4d.database.set(String(('prefix' + String(s4dmessage.guild))), (s4d.reply));

                    s4d.reply = null;
                }).catch(async (e) => {
                    console.error(e);
                });
            } else if (String((s4dmessage.content)).includes(String('report '))) {
                if (!s4d.database.has(String(([s4dmessage.member, s4dmessage.mentions.members.first(), s4dmessage.guild].join(''))))) {
                    (s4dmessage.channel).send({
                        embed: {
                            title: 'Delete Hacker',
                            color: '#ff0000',
                            image: {
                                url: null
                            },

                            description: ([s4dmessage.mentions.members.first(), ' is hacking in ', s4dmessage.guild, 'server', '\n', 'Right ', s4dmessage.member, '? (Write \'Yes\' to confirm)'].join('')),
                            footer: {
                                text: 'Found a bug! Join support : https://discord.gg/AkcJrqeHwg'
                            },
                            thumbnail: {
                                url: ((s4dmessage.guild).iconURL({
                                    dynamic: true
                                }))
                            }

                        }
                    });
                    (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
                        time: (1 * 60 * 1000),
                        max: 1
                    }).then(async (collected) => {
                        s4d.reply = collected.first().content;
                        if ((s4d.reply) == 'Yes') {
                            s4dmessage.channel.send(String('Report recorded'));
                            (s4dmessage.member).send(String('Your report recorded'));
                            s4d.database.set(String(([(s4dmessage.member).user.id, (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))), 'reported');
                            if (s4d.database.has(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))))) {
                                if (s4d.database.has(String('temp'))) {
                                    s4d.database.delete(String('temp'));
                                }
                                s4d.database.set(String('temp'), s4d.database.get(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join('')))));
                                s4d.database.delete(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))));
                                s4d.database.set(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))), (s4d.database.get(String('temp')) + 1));
                            } else {
                                s4d.database.set(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))), 1);
                            }
                            if (s4d.database.get(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join('')))) > 3) {
                                (s4dmessage.member).send(String((['Banned ', s4dmessage.mentions.members.first(), ' due to hacking from ', s4dmessage.guild].join(''))));
                                (s4dmessage.mentions.members.first()).send(String((['You have been banned from ', s4dmessage.guild, ' due to hacking'].join(''))));
                                await delay(Number(5) * 1000);
                                (s4dmessage.mentions.members.first()).ban();
                            } else if (s4d.database.get(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join('')))) == 3) {
                                (s4dmessage.member).send(String((['Banned ', s4dmessage.mentions.members.first(), ' due to hacking from ', s4dmessage.guild].join(''))));
                                (s4dmessage.mentions.members.first()).send(String((['You have been banned from ', s4dmessage.guild, ' due to hacking'].join(''))));
                                await delay(Number(5) * 1000);
                                (s4dmessage.mentions.members.first()).ban();
                            }
                        } else if ((s4d.reply) == 'yes') {
                            s4dmessage.channel.send(String('Report recorded'));
                            (s4dmessage.member).send(String('Your report recorded'));
                            s4d.database.set(String(([(s4dmessage.member).user.id, (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))), 'reported');
                            if (s4d.database.has(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))))) {
                                if (s4d.database.has(String('temp'))) {
                                    s4d.database.delete(String('temp'));
                                }
                                s4d.database.set(String('temp'), s4d.database.get(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join('')))));
                                s4d.database.delete(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))));
                                s4d.database.set(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))), (s4d.database.get(String('temp')) + 1));
                            } else {
                                s4d.database.set(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join(''))), 1);
                            }
                            if (s4d.database.get(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join('')))) > 3) {
                                (s4dmessage.member).send(String((['Banned ', s4dmessage.mentions.members.first(), ' due to hacking from ', s4dmessage.guild].join(''))));
                                ((s4dmessage.guild).owner || await (s4dmessage.guild).members.fetch((s4dmessage.guild).ownerID)).send(String((['Banned ', s4dmessage.mentions.members.first(), ' due to hacking from ', s4dmessage.guild].join(''))));
                                (s4dmessage.mentions.members.first()).send(String((['You have been banned from ', s4dmessage.guild, ' due to hacking'].join(''))));
                                await delay(Number(5) * 1000);
                                (s4dmessage.mentions.members.first()).ban();
                            } else if (s4d.database.get(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join('')))) == 3) {
                                (s4dmessage.member).send(String((['Banned ', s4dmessage.mentions.members.first(), ' due to hacking from ', s4dmessage.guild].join(''))));
                                ((s4dmessage.guild).owner || await (s4dmessage.guild).members.fetch((s4dmessage.guild).ownerID)).send(String((['Banned ', s4dmessage.mentions.members.first(), ' due to hacking from ', s4dmessage.guild].join(''))));
                                (s4dmessage.mentions.members.first()).send(String((['You have been banned from ', s4dmessage.guild, ' due to hacking'].join(''))));
                                await delay(Number(5) * 1000);
                                (s4dmessage.mentions.members.first()).ban();
                            }
                        }

                        s4d.reply = null;
                    }).catch(async (e) => {
                        console.error(e);
                    });
                } else {
                    s4dmessage.delete();
                    (s4dmessage.member).send(String('Report cannot be made twice'));
                }
            } else if (String((s4dmessage.content)).includes(String('Send to '))) {
                if ((s4dmessage.member).hasPermission('ADD_REACTIONS')) {
                    (s4dmessage.channel).send(String('Message'));
                    (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
                        time: (5 * 60 * 1000),
                        max: 1
                    }).then(async (collected) => {
                        s4d.reply = collected.first().content;
                        (s4dmessage.mentions.members.first()).send(String(([s4dmessage.member, ' / ', (s4dmessage.member).user.tag, ' sent you a message'].join(''))));
                        (s4dmessage.mentions.members.first()).send(String((s4d.reply)));
                        s4dmessage.channel.send(String('A prototype will be sent on your DM'));
                        (s4dmessage.member).send(String((s4d.reply)));

                        s4d.reply = null;
                    }).catch(async (e) => {
                        console.error(e);
                    });
                }
            } else if (String((s4dmessage.content)).includes(String('update info'))) {
                s4dmessage.channel.send({
                    embed: {
                        title: 'Hacker Deleter Version : 5.0 (Bugfix update)',
                        color: (colourRandom()),
                        image: {
                            url: null
                        },

                        description: (['Fixes and update', '\n', '1. Command updates', '\n', '2. More commands', '\n', '3. Some bug fixes'].join('')),
                        footer: {
                            text: 'Found a bug : https://discord.gg/AkcJrqeHwg'
                        },
                        thumbnail: {
                            url: ((s4dmessage.guild).iconURL({
                                dynamic: true
                            }))
                        }

                    }
                });
            } else if (String((s4dmessage.content)).includes(String('invite'))) {
                s4dmessage.channel.send(String('https://discord.com/api/oauth2/authorize?client_id=851462129982767144&permissions=8&scope=bot'));
            } else if (String((s4dmessage.content)).includes(String('My strikes'))) {
                (s4dmessage.member).send(String((['You have ', s4d.database.get(String((['Report', (s4dmessage.member).user.id, s4dmessage.guild].join('')))), ' strike/s'].join(''))));
            } else if (String((s4dmessage.content)).includes(String('Strikes '))) {
                if ((s4dmessage.member).hasPermission('ADMINISTRATOR') && !((s4dmessage.member).user.bot)) {
                    (s4dmessage.member).send(String((['He has ', s4d.database.get(String((['Report', (s4dmessage.mentions.members.first()).user.id, s4dmessage.guild].join('')))), ' strike/s'].join(''))));
                }
            } else {
                if (s4d.database.get(String(('setup-' + String((s4dmessage.guild).name)))) != 'a') {
                    if (((s4dmessage.content) || '').startsWith(s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))) || '')) {
                        if (String((s4dmessage.content)).includes(String('My level'))) {
                            s4dmessage.channel.send(String(([s4dmessage.member, ', you are currently level: ', member_level].join(''))));
                        } else if (String((s4dmessage.content)).includes(String('My xp'))) {
                            s4dmessage.channel.send(String(([s4dmessage.member, ', you need ', 100 - member_xp, ' to jump to level ', member_level + 1].join(''))));
                        } else if (String((s4dmessage.content)).includes(String('help'))) {
                            s4dmessage.channel.send({
                                embed: {
                                    title: 'Help',
                                    color: '#ff0000',
                                    image: {
                                        url: null
                                    },

                                    description: (['Hacker Deleter Commands', '\n', '1. **setup**', '\n', '2. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))),' My levels**', '\n', '3. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))), 'My levels**', '\n', '5. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))),' Send to <@membername>**', '\n', '6. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))),' invite**', '\n', '7. **', s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))),'update info**'].join('')),
                                    footer: {
                                        text: 'Join support : https://discord.gg/AkcJrqeHwg'
                                    },
                                    thumbnail: {
                                        url: ((s4dmessage.guild).iconURL({
                                            dynamic: true
                                        }))
                                    }

                                }
                            });
                        } else if (String((s4dmessage.content)).includes(String('Send to '))) {
                            if ((s4dmessage.member).hasPermission('ADD_REACTIONS')) {
                                (s4dmessage.channel).send(String('Message'));
                                (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
                                    time: (5 * 60 * 1000),
                                    max: 1
                                }).then(async (collected) => {
                                    s4d.reply = collected.first().content;
                                    (s4dmessage.mentions.members.first()).send(String((s4d.reply)));
                                    s4dmessage.channel.send(String('A prototype will be sent on your DM'));
                                    (s4dmessage.member).send(String((s4d.reply)));

                                    s4d.reply = null;
                                }).catch(async (e) => {
                                    console.error(e);
                                });
                            }
                        } else if (String((s4dmessage.content)).includes(String('invite'))) {
                            s4dmessage.channel.send(String('https://discord.com/api/oauth2/authorize?client_id=851462129982767144&permissions=8&scope=bot'));
                        } else {
                            s4dmessage.channel.send(String('Command not found! If it is bot\'s error than join our support server and report about it'));
                            s4dmessage.channel.send(String('https://discord.gg/AkcJrqeHwg'));
                        }
                    } else {}
                } else {
                    s4dmessage.channel.send(String('Command not found! If it is bot\'s error than join our support server and report about it'));
                    s4dmessage.channel.send(String('https://discord.gg/AkcJrqeHwg'));
                }
            }
        }
    } else if (s4d.database.get(String(('setup-' + String((s4dmessage.guild).name)))) == 'b') {
        if (((s4dmessage.content) || '').startsWith(s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))) || '')) {
            if (String((s4dmessage.content)).includes(String('My level'))) {
                s4dmessage.channel.send(String(([s4dmessage.member, ', you are currently level: ', member_level].join(''))));
            } else if (String((s4dmessage.content)).includes(String('help'))) {
                s4dmessage.channel.send({
                    embed: {
                        title: ('The prefix is ' + String(s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))))),
                        color: '#ff0000',
                        image: {
                            url: null
                        },

                        description: (['Hacker Deleter Commands', '\n', '1. **setup**', '\n', '2. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))), 'My xp**', '\n', '3. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))),' My levels**', '\n', '4. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))),' prefix change**', '\n', '5. **!@!prefix**', '\n', '6. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))),' Send to <@membername>**', '\n', '7. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))),' invite**', '\n', '8. **',s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))), ' update info**'].join('')),
                        footer: {
                            text: 'Join support : https://discord.gg/AkcJrqeHwg'
                        },
                        thumbnail: {
                            url: ((s4dmessage.guild).iconURL({
                                dynamic: true
                            }))
                        }

                    }
                });
            } else if (String((s4dmessage.content)).includes(String('prefix change'))) {
                (s4dmessage.channel).send(String((['Current prefix : **', s4d.database.get(String(('prefix' + String(s4dmessage.guild)))), '**', '\n', 'Write your new prefix'].join(''))));
                (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
                    time: (1 * 60 * 1000),
                    max: 1
                }).then(async (collected) => {
                    s4d.reply = collected.first().content;
                    if (s4d.database.has(String(('prefix' + String(s4dmessage.guild))))) {
                        s4d.database.delete(String(('prefix' + String(s4dmessage.guild))));
                    }
                    s4d.database.set(String(('prefix' + String(s4dmessage.guild))), (s4d.reply));

                    s4d.reply = null;
                }).catch(async (e) => {
                    console.error(e);
                });
            } else if (String((s4dmessage.content)).includes(String('invite'))) {
                s4dmessage.channel.send(String('https://discord.com/api/oauth2/authorize?client_id=851462129982767144&permissions=8&scope=bot'));
            } else if (String((s4dmessage.content)).includes(String('Send to '))) {
                if ((s4dmessage.member).hasPermission('ADD_REACTIONS')) {
                    (s4dmessage.channel).send(String('Message'));
                    (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
                        time: (5 * 60 * 1000),
                        max: 1
                    }).then(async (collected) => {
                        s4d.reply = collected.first().content;
                        (s4dmessage.mentions.members.first()).send(String(([s4dmessage.member, ' / ', (s4dmessage.member).user.tag, ' sent you a message'].join(''))));
                        (s4dmessage.mentions.members.first()).send(String((s4d.reply)));
                        s4dmessage.channel.send(String('A prototype will be sent on your DM'));
                        (s4dmessage.member).send(String((s4d.reply)));

                        s4d.reply = null;
                    }).catch(async (e) => {
                        console.error(e);
                    });
                }
            } else if (String((s4dmessage.content)).includes(String('My xp'))) {
                s4dmessage.channel.send(String(([s4dmessage.member, ', you need ', 100 - member_xp, ' to jump to level ', member_level + 1].join(''))));
            } else if (String((s4dmessage.content)).includes(String('update info'))) {
                s4dmessage.channel.send({
                    embed: {
                        title: 'Hacker Deleter Version : 5.0 (Feature Update)',
                        color: (colourRandom()),
                        image: {
                            url: null
                        },

                        description: (['Fixes and update', '\n', '1. Command updates', '\n', '2. More commands', '\n', '3. Some bug fixes'].join('')),
                        footer: {
                            text: 'Found a bug : https://discord.gg/xh2ApgBd'
                        },
                        thumbnail: {
                            url: ((s4dmessage.guild).iconURL({
                                dynamic: true
                            }))
                        }

                    }
                });
            } else {
                s4dmessage.channel.send(String('Command not found! If it is bot\'s error than join our support server and report about it'));
                s4dmessage.channel.send(String('https://discord.gg/AkcJrqeHwg'));
            }
        } else {}
    }
    if ((s4dmessage.content) == 'help') {
        if (!s4d.database.has(String(('setup-' + String((s4dmessage.guild).name))))) {
            s4dmessage.channel.send({
                embed: {
                    title: 'Basic commands',
                    color: (colourRandom()),
                    image: {
                        url: null
                    },

                    description: (['Hacker Deleter Basic Commands For New Server', '\n', '**setup** (Server admin required)', '\n', '**The default bot prefix is *Hd!* after using setup. It can be changed with the use of help command**'].join('')),
                    footer: {
                        text: 'Discord Support Server : https://discord.gg/xh2ApgBd'
                    },
                    thumbnail: {
                        url: ((s4dmessage.guild).iconURL({
                            dynamic: true
                        }))
                    }

                }
            });
        } else if (s4d.database.has(String(('setup-' + String((s4dmessage.guild).name))))) {
            s4dmessage.channel.send(String((['Please use **', s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))), ' help** command ', s4dmessage.member].join(''))));
        }
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if (((s4dmessage.mentions.members.first()).user.id) == '851462129982767144') {
        if (s4d.database.has(String(('setup-' + String((s4dmessage.guild).name))))) {
            if (!s4d.database.has(String(('prefix' + String((s4dmessage.guild).name))))) {
                s4d.database.set(String(('prefix' + String((s4dmessage.guild).name))), 'Hd!');
            }
            s4dmessage.channel.send(String((['Get help by using **', s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))), ' help**'].join(''))));
        } else {
            s4dmessage.channel.send(String('Use command **setup** first, after that mention me'));
        }
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if (s4d.database.get(String(('setup-' + String((s4dmessage.guild).name)))) == 'b' || s4d.database.get(String(('setup-' + String((s4dmessage.guild).name)))) == 'ab') {
        if (!((s4dmessage.member).user.bot)) {
            member_xp = s4d.database.get(String(('xp-' + String(s4dmessage.author.id))));
            member_level = s4d.database.get(String(('level-' + String(s4dmessage.author.id))));
            if (!member_xp) {
                member_xp = 0;
            } else if (!member_level) {
                member_level = 0;
            }
            s4d.database.set(String(('xp-' + String(s4dmessage.author.id))), (member_xp + 1));
            member_xp = member_xp + 1;
            if (member_xp > 100) {
                s4d.database.set(String(('xp-' + String(s4dmessage.author.id))), 0);
                s4d.database.set(String(('level-' + String(s4dmessage.author.id))), (member_level + 1));
                member_level = member_level + 1;
                s4dmessage.channel.send(String((['Congratulations, ', s4dmessage.member, 'you jumped to level ', member_level, '!!'].join(''))));
            }
        }
    }

});
s4d.client.on('message', async (s4dmessage) => {
    if (s4d.database.has(String(('update' + String((s4dmessage.guild).name)))) && s4d.database.has(String(('setup-' + String((s4dmessage.guild).name))))) {
        if (s4d.database.get(String(('update' + String((s4dmessage.guild).name)))) != '5.0') {
            s4dmessage.channel.send({
                embed: {
                    title: 'Hacker Deleter Version : 5.0',
                    color: '#ff0000',
                    image: {
                        url: null
                    },

                    description: (['Fixes and update', '\n', '1. Command updates', '\n', '2. More commands', '\n', '3. Some bug fixes'].join('')),
                    footer: {
                        text: 'Found a bug : [https://discord.gg/xh2ApgBd](https://discord.gg/xh2ApgBd)'
                    },
                    thumbnail: {
                        url: ((s4dmessage.guild).iconURL({
                            dynamic: true
                        }))
                    }

                }
            });
            s4d.database.delete(String(('update' + String((s4dmessage.guild).name))));
            s4d.database.set(String(('update' + String((s4dmessage.guild).name))), '5.0');
        }
    }
    if (!s4d.database.has(String(('update' + String((s4dmessage.guild).name)))) && s4d.database.has(String(('setup-' + String((s4dmessage.guild).name))))) {
        if ((((s4dmessage.content) || '').startsWith(s4d.database.get(String(('prefix' + String((s4dmessage.guild).name)))) || '')) && (String((s4dmessage.content)).includes(String('updates'))) && s4d.database.has(String(('setup-' + String((s4dmessage.guild).name))))) {
            s4d.database.set(String(('update' + String((s4dmessage.guild).name))), '5.0');
            s4dmessage.channel.send(String('Hey Beep Boop! Done'));
        }
    }

});
s4d.client.on('message', async (s4dmessage) => {
    if (String((s4dmessage.content)).includes(String('Giveaway start'))) {
        s4dmessage.react('🎉');
        msg = (s4dmessage.id);
        if (s4d.database.has(String('0'))) {
            s4d.database.delete(String('0'));
        }
    }
    if (String((s4dmessage.content)).includes(String('Results'))) {
        if (s4d.database.has(String('0'))) {
            s4dmessage.delete();
            (s4dmessage.channel).send({
                embed: {
                    title: '🎉Giveaway Winner🎉',
                    color: '#ff0000',
                    image: {
                        url: ((s4dmessage.guild).iconURL({
                            dynamic: true
                        }))
                    },

                    description: ('The winner is ' + String(s4d.database.get(String('0')))),
                    footer: {
                        text: ((s4dmessage.guild).name)
                    },
                    thumbnail: {
                        url: ((s4dmessage.guild).iconURL({
                            dynamic: true
                        }))
                    }

                }
            });
            s4d.database.get(String('0')).send(String('You are the winner!!'));
        } else {
            (s4dmessage.channel).send({
                embed: {
                    title: '🎉Giveaway Got 0 reacts🎉',
                    color: '#000000',
                    image: {
                        url: ((s4dmessage.guild).iconURL({
                            dynamic: true
                        }))
                    },

                    description: 'No one won!!',
                    footer: {
                        text: ((s4dmessage.guild).name)
                    },
                    thumbnail: {
                        url: ((s4dmessage.guild).iconURL({
                            dynamic: true
                        }))
                    }

                }
            });
        }
    }

});

s4d.client.on('MESSAGE_REACTION_ADD', async (rGuild, rChannel, rMessage, rMember, rEmoji) => {
    if (!((rMember).user.bot)){
        if (!s4d.database.has(String('0')) && (rEmoji) == '🎉') {
        s4d.database.set(String('0'), (rMember));
        }
    }
});
s4d.client.on('message', async (s4dmessage) => {
    if (((s4dmessage.member).user.bot) && ((s4dmessage.member).user.id) == '852183021146472489') {
        if (((s4dmessage.guild || {}).id) == '851482299002388550') {
            if ((s4dmessage.content) == 'Present?') {
                s4dmessage.delete();
                s4dmessage.channel.send({
                    embed: {
                        title: 'Uptime log',
                        color: '#ff0000',
                        image: {
                            url: null
                        },

                        description: 'Hacker Deleter online!',
                        footer: {
                            text: null
                        },
                        thumbnail: {
                            url: null
                        }

                    }
                });
            }
        }
    }

});

s4d;