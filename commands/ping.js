const Discord = require( 'discord.js' );

exports.name = 'ping';
exports.aliases = [];

exports.run = async ( client, message, args ) => {
	let channel = message.channel;

	if ( message.author.id === client.id ) {
		return;
	}

	if ( args.length != 0 ) {
		let answerEmbed = new Discord.RichEmbed()
			.setColor( '#FF0000' )
			.setTitle( 'Error: Invalid Syntax' )
			.setDescription( `Please use the right syntax!\nExample: ${process.env.DISCORD_PREFIX}ping` )
			.setTimestamp();

		await channel.send( answerEmbed );
		return;
	}

	let answerEmbed = new Discord.RichEmbed()
		.setColor( '#0099ff' )
		.setTitle( 'Ping' )
		.setDescription( `Okay, let me quickly calculate my ping..` )
		.setTimestamp();

	let answerMessage = await channel.send( answerEmbed );

	answerEmbed = new Discord.RichEmbed()
		.setColor( '#0099ff' )
		.setTitle( 'Ping' )
		.setDescription( `My Ping is: ${client.ping} ms.` )
		.setTimestamp();

	answerMessage.edit( answerEmbed );
}