const dotenv = require( 'dotenv' );
const chalk = require( 'chalk' );
const Discord = require( 'discord.js' );

dotenv.config();
const client = new Discord.Client();


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

console.log( chalk.magenta( '[Discord-Bot]' ), chalk.white( `Connecting to Discord..` ) );
client.login( process.env.DISCORD_TOKEN );