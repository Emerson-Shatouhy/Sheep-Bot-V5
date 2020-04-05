const { Canvas } = require("canvas-constructor"); s.
const { resolve, join } = require("path"); 
const { MessageAttachment } = require("discord.js"); 
const { get } = require("snekfetch"); 
const { Command } = require('klasa');
const r = require('rethinkdb');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            name: 'Level',
            enabled: true,
            extendedHelp: 'No extended help available.',
            description: 'Shows your level and ranking overall.'
        });
    }

    async run(msg, [member = msg.member]) {
        let bgcolor = msg.member.settings.pcolor
        const name = member.displayName.length > 20 ? member.displayName.substring(0, 17) + "..." : member.displayName;
        const { body: avatar } = await get(msg.author.displayAvatarURL({ size: 256, format: 'png' }));
        const canvas = new Canvas(400, 180)
        .setColor(bgcolor)
        .addRect(84, 0, 316, 180)
        .setColor("#2C2F33")
        .addRect(0, 0, 84, 180)
        .addRect(169, 26, 231, 46)
        .addRect(224, 108, 176, 60)
        .addRect()
        .setShadowColor("rgba(22, 22, 22, 1)") 
        .setShadowOffsetY(5) 
        .setShadowBlur(10) 
        .save() 
        .addCircle(84, 90, 62)
        .addRoundImage(avatar, 20, 26, 128, 128, 64)
        .createBeveledClip(20, 138, 128, 32, 5)
        .setColor("#23272A")
        .addRect(20, 138, 128, 32)
        .restore()
        .setTextFont('20px Impact')
        .setTextAlign("center")
        .setColor("#FFFFFF")
        .addText(name, 285, 54)
         .addText(`Level: ${msg.member.settings.level}`, 84, 159)
        .setTextAlign("left")
        .setTextAlign("left")
        .addText(`Points: ${msg.member.settings.points}`, 241, 136)
        .addText(`Coins: ${msg.member.settings.coins}`, 241, 160)
        .save()
        .toBuffer()
         msg.channel.send(new MessageAttachment(canvas));
    }

    async init() {

    }

};
