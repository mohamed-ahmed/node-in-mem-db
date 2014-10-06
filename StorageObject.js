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

StorageObject.prototype.begin = function(){
	var newState = clone(this.currentState);
	this.stack.push(this.currentState);
	this.currentState = newState;
}

StorageObject.prototype.rollback = function(){
	if(this.stack.isEmpty()){
		return false;
	}
	this.currentState = this.stack.pop();
	return true;
}

StorageObject.prototype.commit  = function(){
	this.stack = new Stack();
}

StorageObject.prototype.reduceValueCount = function(value){
	if(this.currentState.valueCount[value] !== undefined){
		this.currentState.valueCount[value]--;
	}
	if(this.currentState.valueCount[value] === 0){
		this.currentState.valueCount[value] = undefined;
	}
}

function clone(obj){
	return JSON.parse( JSON.stringify( obj ) );
}

