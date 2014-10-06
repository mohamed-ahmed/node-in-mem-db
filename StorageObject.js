module.exports = StorageObject;

var Stack = require('./Stack');

function StorageObject(){
	this.stack = new Stack();

	this.currentState = {
		keys : {},
		valueCount : {}
	};
}

StorageObject.prototype.set = function(key, value) {
	if(this.get(key) == value){
		return;
	}

	if(this.get(key) != undefined){
		var previousValue = this.get(key);
		this.reduceValueCount(previousValue);
	}


	if(this.currentState.valueCount[value] === undefined){
		this.currentState.valueCount[value] = 1;
	}
	else{
		this.currentState.valueCount[value]++;
	}
	this.currentState.keys[key] = value;
};

StorageObject.prototype.get = function(key) {
	return this.currentState.keys[key];
};

StorageObject.prototype.unset = function(key){
	if(this.get(key) === undefined){
		return;
	}
	var value = this.get(key);
	this.reduceValueCount(value);
	this.set(key, undefined);
}

StorageObject.prototype.getNumEQ = function(value){
	return this.currentState.valueCount[value];
}

/*
pushed previous state onto stack
creates new currents state which contains values of previous state
*/
StorageObject.prototype.begin = function(){
	var newState = clone(this.currentState);
	this.stack.push(this.currentState);
	this.currentState = newState;
}

/*
	sets storage back in previous state, can be optimized to store state per variable
*/
StorageObject.prototype.rollback = function(){
	if(this.stack.isEmpty()){
		return false;
	}
	this.currentState = this.stack.pop();
	return true;
}

/*
contradictory instructions for commit,
isntructions say to print no transaction when it fails but they also say
"Any data command that is run outside of a transaction block should commit immediately",
how how can it fail. This function assumes anything not in a "begin" block will just be committed and "no transaction"
will be printed
*/
StorageObject.prototype.commit  = function(){
	if(this.stack.isEmpty()){
		return false;
	}
	this.stack = new Stack();
	return true;
}

StorageObject.prototype.reduceValueCount = function(value){
	if(this.currentState.valueCount[value] !== undefined){
		this.currentState.valueCount[value]--;
	}
	if(this.currentState.valueCount[value] === 0){
		this.currentState.valueCount[value] = undefined;
	}
}

/*
solution to copying current state such that states won't be modified through object references
*/
function clone(obj){
	return JSON.parse( JSON.stringify( obj ) );
}

