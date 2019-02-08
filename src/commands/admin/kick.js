const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")){ 
    let embed = new RichEmbed()
      .setColor("RANDOM")
      .setTitle("Maaf, Kamu Tidak Mempunyai Permissions Untuk Kick Members");
return message.channel.send(embed);
  }
  if (!message.guild.member(client.user).hasPermission("MANAGE_NICKNAMES")) return message.channel.send(`**${message.author.tag}** Désolé, je ne possède pas la permission \`KICK_MEMBERS\`, veuillez me donner l'autorisation \`KICK_MEMBERS\` avant d'exécuter cette commande.`).then(msg=>msg.delete(5000))
  
  let toKick = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toKick) return message.channel.sendMessage("Utilisateur non mentionné, veuillez mentioner un utilisateur.");
  let reason = args.join(" ").slice(22);
  if (toKick.hasPermission("KICK_MEMBERS")) return message.channel.send("Utilisateur immunisé.").then(msg => msg.delete(3000));
  
  if (toKick.highestRole.position < message.guild.member(client.user).highestRole.position) {
   message.guild.member(toKick).kick(reason);
   try {
    if (!reason) {
      toKick.send(`**${toKick.user.tag}** Vous avez été expulsé du serveur par ${message.author.username}**`)
    } else {
      toKick.send(`**${toKick.user.tag}** Vous avé été expulsé du serveur par ${message.author.username}**
Motif : "${reason}"`);
    }
    let embedB = new RichEmbed()
    .setColor('RANDOM')
    .setTitle('Utilisateur expulsé')
    .addField('username', toKick.user.username, true)
    .addField('ID', toKick.id, true)
    message.channel.send(embedB);
  } catch (e) {
    console.log(e.message)
  }
  } else {
   message.channel.send(`Il m'est impossible d'expulser ${toKick.user.tag} car son rôle est égal où supérieur au mien.`)
  }
}
 
exports.conf = {
  aliases: ['kick','megahug'],
  cooldown: '5'
}

exports.help = {
  name: "kick",
  description: 'Expulse un membre du serveur. [MOD ONLY]',
  usage: '!kick [@mention] (raison)'
}
