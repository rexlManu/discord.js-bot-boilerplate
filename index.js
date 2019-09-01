const dotenv = require( 'dotenv' );
const chalk = require( 'chalk' );
const Discord = require( 'discord.js' );

dotenv.config();
const client = new Discord.Client();

function loadEvents() {
	const fs = require( 'fs' );

	fs.readdir( `${__dirname}/events`, ( err, files ) => {
		if ( err ) {
			if ( err.code && err.code === 'ENOENT' ) {
				console.error( chalk.magenta( '[Discord-Bot]' ), chalk.red( 'Can\'t load events', 'No events directory found.' ) );
				return;
			}

			console.error( chalk.magenta( '[Discord-Bot]' ), chalk.red( 'An unexpected error occurred while loading events.' ), err );
			return;
		}

		for ( file of files ) {
			let event = require( `${__dirname}/events/${file}` );

			if ( !event.init ) {
				console.error( chalk.magenta( '[Discord-Bot]' ), chalk.red( `Can't load event from ${file}`, 'No init attribute found.' ) );
				continue;
			}

			if ( typeof event.init !== 'function' ) {
				console.error( chalk.magenta( '[Discord-Bot]' ), chalk.red( `Can't load event from ${file}`, 'Init attribute is not a function.' ) );
				continue;
			}

			event.init( client );
			console.log( chalk.magenta( '[Discord-Bot]' ), chalk.green( `Successfully loaded events from ${file}.` ) );
		}
	} );
}


if ( !process.env.DISCORD_TOKEN ) throw new Error( 'No token specified.' );
if ( !process.env.DISCORD_PREFIX ) throw new Error( 'No prefix specified.' );

client.on( 'ready', () => {
	console.log( chalk.magenta( '[Discord-Bot]' ), chalk.green( 'Successfully connected to Discord.' ) );
	console.log( chalk.magenta( '[Discord-Bot]' ), chalk.white( `Logged in as ${client.user.tag}.` ) );
} );

client.on( 'error', ( err ) => {
	console.error( chalk.magenta( '[Discord-Bot]' ), chalk.red( 'An unexpected error occurred.' ), err );
} );

client.on( 'disconnect', ( err ) => {
	console.log( chalk.magenta( '[Discord-Bot]' ), chalk.white( 'Lost connection to Discord. Trying to reconnect..' ) );
	client.login( process.env.DISCORD_TOKEN );
} );

console.log( chalk.magenta( '[Discord-Bot]' ), chalk.white( `Loading events..` ) );
loadEvents();
console.log( chalk.magenta( '[Discord-Bot]' ), chalk.white( `Connecting to Discord..` ) );
client.login( process.env.DISCORD_TOKEN );