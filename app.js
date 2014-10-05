var prompt = require('prompt');

var storageObject = {};

//
// Start the prompt
//
prompt.start();

	//
	// Get two properties from the user: username and email
	//
	prompt.get(['command'], resultCallback);


function resultCallback(err, result){
	//
	// Log the results.
	//
	var commandArray = result.command.split(" ");
	var command = commandArray[0];
	if(command == "set"){
		if(commandArray[1] != null && commandArray[2] != null){
			var key = commandArray[1];
			var value = commandArray[2];
			storageObject[key] = value;
		}
		console.log(storageObject);
	}else if(command == "get"){
		if(commandArray[1] != null){
			var key = commandArray[1];
			var value = storageObject[key];
			console.log(value);
		}
	}
	}else if(command == "unset"){
			if(commandArray[1] != null){
				var key = commandArray[1];
				var value = storageObject[key];
				console.log(value);
			}
		}
		prompt.get(['command'], resultCallback);
}