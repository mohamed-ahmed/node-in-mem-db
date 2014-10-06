module.exports = Stack;

function Stack(){
	this.top = null;
	this.size = 0;
}

function Node(data){
	this.data = data;
	this.next = null;
}

Stack.prototype.push = function(value) {
	var node = new Node(value);
	if(this.top != null){
		node.next = this.top;
	}
	this.top = node;
	this.size++;
};

Stack.prototype.pop = function(){
	if(this.top == null){
		return null;
	}
	var value = this.top.data;
	var temp = this.top

	if(temp.data < temp.lowestBelowMe){
		this.min = temp.lowestBelowMe;
	}

	this.top = this.top.next;
	temp = null;
	this.size--;
	return value;
}

Stack.prototype.getSize = function(){
	return this.size;
}

Stack.prototype.isEmpty = function(){
	return this.getSize() === 0;
}