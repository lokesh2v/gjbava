var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, [function (session) {
    session.send("Hello!! Welcome to GEHC POC Bot.");
    builder.Prompts.choice(session, "Please select any of the following options - ", "Login Help|MSCA Password Reset|Sales / Purchase Order", { listStyle: 3 });
	},
	function (session, results) {
	   if (results.response) {
		let userChoice = results.response.entity;
		session.send(`You selected "${userChoice}"`);
		if (userChoice === "Login Help")
			session.beginDialog('loginhelp');
		else if (userChoice === "MSCA Password Reset")
			session.beginDialog('mscapwdreset');
		else if (userChoice === "Sales / Purchase Order")
			session.beginDialog('sopohelp');
	   }
           else {
		session.send("OK");
	   }
	}
]
);


bot.dialog('loginhelp', [
    function (session) {
        builder.Prompts.text(session, "Please provide your SSO / Username (or the SSO / Username of the user having login issue)");
    },
    function (session, results) {
	session.dialogData.userSSO = results.response;
	builder.Prompts.text(session, "Please provide the URL or link being used");
    },
    function (session, results, next) {
	session.dialogData.userURL = results.response;
        session.send(`Please wait, we are validating SSO ${session.dialogData.userSSO} and URL ${session.dialogData.userURL}`);
	//Webservice Call here to check user ID and URL. Based on result move to next
	next();
    },
    function (session, results) {
        session.endDialog("Your ID is ok");
    }
]);

bot.dialog('mscapwdreset', [
    function (session) {
        session.beginDialog('askName');
    },
    function (session, results) {
        session.endDialog('Hello %s!', results.response);
    }
]);

bot.dialog('sopohelp', [
    function (session) {
        session.beginDialog('askName');
    },
    function (session, results) {
        session.endDialog('Hello %s!', results.response);
    }
]);

