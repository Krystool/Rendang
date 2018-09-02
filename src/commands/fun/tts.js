const sess = new Set()

async function tts (client, msg, args){
	const vc = msg.member.voiceChannel;
	if(sess.has(msg.guild.id)) return msg.channel.send('Im already play tts in this guild');
	if(!vc) return msg.channel.send('Please join voice channel first');
	if(!vc.permissionsFor(client.userr).has(['CONNECT', 'SPEAK'])) return msg.channel.send('Missing the "Connect" or "Speak" permission for the voice channel.');
	if (!vc.joinable) return msg.say('Your voice channel is not joinable.');
	if(!args.length) return msg.channel.send('please provide text!');
	try{
		const connection = await vc.join();
		sess.add(msg.guild.id);
		connection.player.playUnknownStream(`http://tts.cyzon.us/tts?text=${decodeURIComponent(args.join(' '))}`)
		.on('end', res => {
			sess.delete(msg.guild.id);
			return vc.leave();
		});
		return msg.react('✅');
	} catch (err) {
		return msg.channel.send(err.stack, { code: 'ini' });
	}
}

this.conf = {
	aliases: [],
	cooldown: 10
}

this.help = {
	name: 'tts',
	description: 'convert your text to tts',
	usage: 'tts <text>'
}

this.run = tts;
