const { Canvas } = require("canvas-constructor"); // You can't make images without this.
const { resolve, join } = require("path"); // This is to get a font file.
const { MessageAttachment } = require("discord.js"); // This is to send the image via discord.
const { get } = require("snekfetch"); // This is to fetch the user avatar and convert it to a buffer
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
        // Create the Blurple rectangle on the right side of the image.
        .setColor(bgcolor)
        .addRect(84, 0, 316, 180)
        .setColor("#2C2F33")
        .addRect(0, 0, 84, 180)
        .addRect(169, 26, 231, 46)
        .addRect(224, 108, 176, 60)
        .addRect()
        // Create a shadow effect for the avatar placement.
        .setShadowColor("rgba(22, 22, 22, 1)") // This is a nice colour for a shadow.
        .setShadowOffsetY(5) // Drop the shadow by 5 pixels.
        .setShadowBlur(10) // Blur the shadow by 10.
        .save() // We should save the instance again.
        // This circle is 2 pixels smaller in the radius to prevent a pixel border.
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
        // Using template literals, you can add text and variables, we're applying the toLocaleString()
        // to break up the number into a nice readable format.
         .addText(`Level: ${msg.member.settings.level}`, 84, 159)
        // Now we want to align the text to the left.
        .setTextAlign("left")
        // Let's add all the points!
        .setTextAlign("left")
        .addText(`Points: ${msg.member.settings.points}`, 241, 136)
        .addText(`Coins: ${msg.member.settings.coins}`, 241, 160)
        // We need to put something here next.
        // Now we restore the canvas' previous state.
        .save()
        .toBuffer()
         msg.channel.send(new MessageAttachment(canvas));
    }

    async init() {

    }

};
