var prompt = require('prompt');

var StorageObject = require("./StorageObject");
var storageObject = new StorageObject();

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
			storageObject.set(key,value);
		}
		console.log(storageObject);
	}else if(command == "get"){
		if(commandArray[1] != null){
			var key = commandArray[1];
			var value = storageObject.get(key);
			console.log(value);
		}
	}else if(command == "unset"){
		if(commandArray[1] != null){
			var key = commandArray[1];
			storageObject.unset(key);
		}
	}

	else if(command == "numeq"){
		if(commandArray[1] != null){
			var value = commandArray[1];
			var numValues = storageObject.getNumEQ(value);
			console.log(numValues);
		}
	}
	else if(command == "begin"){
		storageObject.begin();
	}
	else if(command == "rollback"){
		if(!storageObject.rollback()){
			console.log("no transaction");
		}
	}
	else if(command == "commit"){
		storageObject.commit();
	}



	prompt.get(['command'], resultCallback);
}