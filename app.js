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


	var commandArray = result.command.split(" ");
	var command = commandArray[0].toLowerCase();
	switch(command){
		case "set" :{
			if(commandArray[1] != null && commandArray[2] != null){
				var key = commandArray[1];
				var value = commandArray[2];
				storageObject.set(key,value);
			}
			break;
		}

		case "get":{
			if(commandArray[1] != null){
				var key = commandArray[1];
				var value = storageObject.get(key);
				if(value === undefined){
					value = "NULL";
				}
				console.log(value);
			}
			break;
		}
		case "unset": {
			if(commandArray[1] != null){
				var key = commandArray[1];
				storageObject.unset(key);
			}
			break;
		}

		case "numequalto":{
			if(commandArray[1] != null){
				var value = commandArray[1];
				var numValues = storageObject.getNumEQ(value);
				if(numValues === undefined){
					numValues = 0;
				}
				console.log(numValues);
			}
			break;
		}
		case "begin":{
			storageObject.begin();
			break;
		}
		case "rollback":{
			if(!storageObject.rollback()){
				console.log("NO TRANSACTION");
			}
			break;
		}
		case "commit": {
			if(!storageObject.commit()){
				console.log("NO TRANSACTION");
			}
			break;
		}
		case "end" :{
			process.exit();
			break;
		}
			default:{
			console.log("invalid command");
		}

	}


	prompt.get(['command'], resultCallback);
}