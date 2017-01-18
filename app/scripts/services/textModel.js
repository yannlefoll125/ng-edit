app.service('textModel', function() {

	this.observerCallbacks = [];

	this.registerObserverCallbacks = function(callback) {
		this.observerCallbacks.push(callback);
	}

	this.unregisterObserverCallbacks = function(callback) {
		let delIndex = this.observerCallbacks.findIndex(callback);
		if(delIndex === -1) {
			console.error('unregisterObserverCallbacks: delIndex === -1');
		} else {
			this.observerCallbacks.splice(delIndex, 1);
		}
	}

	this.notifyObservers = function() {
		for(let callback of this.observerCallbacks) {
			callback();

		}
	}

	this.text = "";

	this.getText() {

		return this.text;
	}

	this.setText(text) {
		this.text = text;
		this.notifyObservers();
	}

	


});