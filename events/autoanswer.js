exports.init = ( client ) => {

	client.on( 'message', ( message ) => {

		if ( message.content.includes( 'bot' ) ) {

			message.channel.send( 'Hello! I\'m a Bot! Beep Boop!' );
		}

	} );

}