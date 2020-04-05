const { Command } = require('klasa');
var api = require('marvel-api');
const { MessageEmbed } = require('discord.js');

var marvel = api.createClient({
  publicKey: '2f17e9eb87af9ac69896561272eca050'
, privateKey: '92b56917a8494c1e18dae08f54ed4691ae31cdd8'
});

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'marvel',
            enabled: false,
            runIn: ['text', 'dm'],
            cooldown: 0,
            deletable: false,
            bucket: 1,
            aliases: [],
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            requiredPermissions: [],
            requiredSettings: [],
            subcommands: true,
            description: 'Search for any marvel Character!',
            quotedStringSupport: false,
            usage: '<character|creators|event|series> <input:str>',
            usageDelim: ' ',
            extendedHelp: 'No extended help available.'
        });
    }

    async character(message, input) {
      marvel.characters.findByName(input)
  .then(function(res) {
    //message.send(`${res.data[0].thumbnail.path}.${res.data[0].thumbnail.extension}`);
    //console.log(res.data[0]);
    if (res.data[0]) {
      let thumb = `${res.data[0].thumbnail.path}.${res.data[0].thumbnail.extension}`
        return message.sendEmbed(new MessageEmbed()
    			.setColor(0xFFFFFF)
    			.setThumbnail(thumb)
          .setAuthor(res.data[0].name)
    			.addField('❯ Description', res.data[0].description, false))
    } else {
      message.send("Unkown Hero.")
    }
})
.fail(console.error)
.done();

  }



async creators(message, input) {
  marvel.creators.findByName(input)
    .then(function(res) {
//message.send(`${res.data[0].thumbnail.path}.${res.data[0].thumbnail.extension}`);
//console.log(res.data[0]);
if (res.data[0]) {
  let thumb = `${res.data[0].thumbnail.path}.${res.data[0].thumbnail.extension}`
    return message.sendEmbed(new MessageEmbed()
      .setColor(0xFFFFFF)
      .setThumbnail(thumb)
      .setAuthor(res.data[0].name)
      .addField('❯ Description', res.data[0].description, false))
} else {
  message.send("Unkown Hero.")
}
})
.fail(console.error)
.done();

}


    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
