const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const fs = require("fs");

// My Libraries
const interactionfunctions = require('./interactionfunctions.js');

// Ready is called when the client logs in and is able to handle Discord events. 
client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
// Called whenever a message is sent in the chat. 
client.on("message", (msg) => {
    console.log(msg.content);
    if (msg.content.toLowerCase().search("components!") == 0) {
        msg.channel.send({
            content: 'This is a component action row.',
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            label: "Click me!",
                            style: 1,
                            customId: "click1"
                        }
                    ]
                }
            ]
        })
    }
    else if (msg.content.toLowerCase().search("queststep1") == 0) {
        msg.channel.send({
            content: `<@125093095405518850> - Chapter 8\n\nYou walk into the hallway slowly, looking from left to right to find clues. The **banging behind the door at the end** stops as you approach, almost as if whoever is inside knows where you are, despite your *Near-Field Lightcloak*. A **door on the left is cracked open**, leading to an inky pitch black void, while the **door on the right is closed**, but a wave of light shines from below it.`,
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            label: "Proceed to the door at the end of the hallway",
                            style: 1,
                            customId: "click1"
                        },
                        {
                            type: 2,
                            label: "Push open the left door",
                            style: 1,
                            customId: "click2"
                        },
                        {
                            type: 2,
                            label: "Try to open the right door",
                            style: 1,
                            customId: "click3"
                        },
                        {
                            type: 2,
                            label: "Return to the Main Hall",
                            style: 4,
                            customId: "clickback"
                        }
                    ]
                }
            ]
        })
    }
    else if (msg.content.toLowerCase().search("queststep2") == 0) {
        msg.channel.send({
            content: `As you stare at yourself in the mirror, your long hair falls over your shoulders, in a shade of... `,
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 3,
                            customId: "list1",
                            options: [
                                {
                                    label: "Violet",
                                    value: "violet",
                                    description: "Bright and mysterious shade of purple"
                                },
                                {
                                    label: "Red",
                                    value: "red",
                                    description: "Crimson and fiery!"
                                },
                                {
                                    label: "Blonde",
                                    value: "blonde",
                                    description: "Bright and popular!"
                                },
                                {
                                    label: "Black",
                                    value: "black",
                                    description: "Black as midnight"
                                },
                                {
                                    label: "Blue",
                                    value: "blue",
                                    description: "The color of the ocean!"
                                },
                            ]
                        }
                    ]
                }
            ]
        })
    }
    else if (msg.content.toLowerCase().search("queststep4") == 0) {
        msg.channel.send({
            content: "You're standing on a field with a wooden stump in front of you.",
            components: interactionfunctions.buttonlist('chap1_12',"Set it on fire","Step up onto it")
        })
    }
    else if (msg.content.toLowerCase().search("queststep5") == 0) {
        msg.channel.send({
            content: "The merchant holds his smile while you peruse his wares. You have **800 coins**",
            components: interactionfunctions.choicelist('chap3_5',["Bread","A simple loaf of bread. Costs 500c"],["Milk","Fresh milk from the cow! Costs 350c"],["Butter","Churned this morning! Costs 175c"])
        })
    }
    else if (msg.content.toLowerCase().search("queststep6") == 0) {
        msg.channel.send({
            content: "There is a fight breaking out downstairs. You step into the fray...",
            components: interactionfunctions.next('chap4_15')
        })
    }
})
client.on('interactionCreate', (interaction) => {
    console.log(interaction);

    if (interaction.componentType == "BUTTON") {
        let thing = interactionfunctions.chooseButton(interaction);
        console.log(thing);
        interaction.update(thing);
    }
    else if (interaction.componentType == "SELECT_MENU") {
        let thing = interactionfunctions.chooseList(interaction);
        console.log(thing);
        interaction.update(thing);
    }
    else {
        // Create an ephemeral reply with an embed
        const embed = new Discord.MessageEmbed().setDescription('Pong!');

        interaction.reply({ embeds: [embed], ephemeral: true })
        .then(() => console.log('Reply sent.'))
        .catch(console.error);
    }
})
// Login function will read the token from Token.txt and try to login with it. 
function login() {
    var tokencode = fs.readFileSync("./keys/Token.txt").toString();
    console.log(`Logging in with token ${tokencode}.`);
    client.login(tokencode);
}

login();