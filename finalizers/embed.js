const { Finalizer } = require('klasa');
const { MessageEmbed } = require('discord.js');
const { Client } = require('klasa');

module.exports = class extends Finalizer {

    constructor(...args) {
        super(...args, {
            name: 'Embeds',
            enabled: false
        });
    }

    run(message, command, response, runTime) {
      const embed = new MessageEmbed()
          if (response.F1N ) {
            embed.addField(response.F1N, response.F1I, response.inline)
          } if (response.F2N) {
            embed.addField(response.F2N, response.F2I, response.inline)
          } if (response.F3N ) {
            embed.addField(response.F3N, response.F3I, response.inline)
          } if (response.F4N) {
            embed.addField(response.F4N, response.F4I, response.inline)
          } if (response.F5N) {
            embed.addField(response.F5N, response.F5I, response.inline)
          } if (response.F6N ) {
            embed.addField(response.F6N, response.F6I, response.inline)
          } if (response.F7N) {
            embed.addField(response.F7N, response.F7I, response.inline)
          } if (response.F8N ) {
            embed.addField(response.F8N, response.F8I, response.inline)
          } if (response.F9N) {
            embed.addField(response.F9N, response.F9I, response.inline)
          } if (response.thumb) {
            embed.setThumbnail(response.thumb)
          }
            embed.setAuthor(response.cmdName, this.client.user.avatarURL())
            embed.setFooter(this.client.username)
            embed.setTimestamp()
      			embed.setColor(0x00AE86);
            return message.sendEmbed(embed);
          }


    async init() {

    }

};
