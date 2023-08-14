const {PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const config = require("./config.js");
   const db = require("croxydb")
const client = new Client({
  partials: [
    Partials.Message,
    Partials.Channel, 
    Partials.GuildMember, 
    Partials.Reaction, 
    Partials.GuildScheduledEvent, 
    Partials.User, 
    Partials.ThreadMember, 
  ],
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.GuildBans, 
    GatewayIntentBits.GuildEmojisAndStickers, 
    GatewayIntentBits.GuildIntegrations, 
    GatewayIntentBits.GuildWebhooks, 
    GatewayIntentBits.GuildInvites, 
    GatewayIntentBits.GuildVoiceStates, 
    GatewayIntentBits.GuildPresences, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions, 
    GatewayIntentBits.GuildMessageTyping, 
    GatewayIntentBits.DirectMessages, 
    GatewayIntentBits.DirectMessageReactions, 
    GatewayIntentBits.DirectMessageTyping, 
    GatewayIntentBits.MessageContent, 
  ],
});

module.exports = client;

require("./events/message.js")
require("./events/ready.js")

const modal = new ModalBuilder()
.setCustomId('form')
.setTitle('Lrows - Menülü Rol Alma Sistemi!')
  const a1 = new TextInputBuilder()
  .setCustomId('1')
  .setLabel('Başlık')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Menüdeki 1Yazı Başlığı')
  .setRequired(true)
  const a2 = new TextInputBuilder()
  .setCustomId('2')
  .setLabel('Başlık')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Menüdeki Yazı Başlığı')
  .setRequired(true)
  const a3 = new TextInputBuilder()
  .setCustomId('3')
  .setLabel('Rol ID')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Menüdeki 1. Başlıkta Olucak Rol ID')
  .setRequired(true)
  const a4 = new TextInputBuilder()
  .setCustomId('4')
  .setLabel('Rol ID')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Menüde 2. Başlıkta Verilicek Rolün ID')
  .setRequired(true)
   
  const row = new ActionRowBuilder().addComponents(a1);
   const row2 = new ActionRowBuilder().addComponents(a2);
 const row4 = new ActionRowBuilder().addComponents(a3);
 const row5 = new ActionRowBuilder().addComponents(a4);

  modal.addComponents(row, row2, row4, row5);
client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "kurulum"){
    await interaction.showModal(modal);
	}
})  

client.on('interactionCreate', async interaction => {
  if (interaction.type !== InteractionType.ModalSubmit) return;
  if (interaction.customId === 'form') {
    const menu1 = interaction.fields.getTextInputValue('1')
    const menu2 = interaction.fields.getTextInputValue('2')
    const menu3 = interaction.fields.getTextInputValue('3')
    const menu4 = interaction.fields.getTextInputValue('4')
  
    
const row = new ActionRowBuilder()
.addComponents( 
  new SelectMenuBuilder()
  .setCustomId('select')
.setPlaceholder('Aşağıdaki Menüden Rol Alabilirsin!')
.addOptions([
{
label: `${menu1}`,
value: 's1',
},
{
label: `${menu2}`,
value: "s2"
}
    ])
);
    const embed = new EmbedBuilder()
    .setTitle("Lrows - Rol Alma Sistemi!")
    .setDescription("Aşağıdaki menüden istediğin rolleri alabilirsin!")
    .setColor("#ff0000")
    interaction.channel.send({embeds: [embed], components: [row]})
    interaction.reply({content: "Menü Başarıyla Gönderildi.", ephemeral: true})

    db.set(`menu_${interaction.guild.id}`, menu3)
      db.set(`menu2_${interaction.guild.id}`, menu4)
     
     
    
}
})
   client.on('interactionCreate', async interaction => {
        if (!interaction.isSelectMenu()) return;
        if(interaction.customId === "select") {
                if (interaction.values[0] == "s1") {
             let rol = db.fetch(`menu_${interaction.guild.id}`)
                  if(!rol) return;
            if(!interaction.member.roles.cache.has(rol)) { 
              interaction.member.roles.add(rol)
            interaction.reply({content: "Rol Başarıyla Verildi!", ephemeral: true})
             } else {
               
              interaction.member.roles.remove(rol)
            interaction.reply({content: "Rol Başarıyla Alındı!", ephemeral: true})
             
              }
                   } 
            }
       })
             
              client.on('interactionCreate', async interaction => {
        if (!interaction.isSelectMenu()) return;
        if(interaction.customId === "select") {
                if (interaction.values[0] == "s2") {
             let rol = db.fetch(`menu2_${interaction.guild.id}`)
                  if(!rol) return;
            if(!interaction.member.roles.cache.has(rol)) { 
              interaction.member.roles.add(rol)
            interaction.reply({content: "Rol Başarıyla Verildi!", ephemeral: true})
             } else {
               
              interaction.member.roles.remove(rol)
            interaction.reply({content: "Rol Başarıyla Alındı!", ephemeral: true})
             
              }
                   } 
            }
       })
client.on('interactionCreate', async interaction => {
        if (!interaction.isSelectMenu()) return;
        if(interaction.customId === "select") {
                if (interaction.values[0] == "s3") {
             let rol = db.fetch(`menu3_${interaction.guild.id}`)
                  if(!rol) return;
            if(!interaction.member.roles.cache.has(rol)) { 
              interaction.member.roles.add(rol)
            interaction.reply({content: "Rol Başarıyla Verildi!", ephemeral: true})
             } else {
               
              interaction.member.roles.remove(rol)
            interaction.reply({content: "Rol Başarıyla Alındı!", ephemeral: true})
             
              }
                   } 
            }
       })
client.login(config.token)