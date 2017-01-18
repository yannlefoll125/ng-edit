app.service('textModel', function() {

	this.observerCallbacks = [];

	this.registerObserverCallback = function(callback) {
		this.observerCallbacks.push(callback);
	}

	this.unregisterObserverCallback = function(callback) {
		let delIndex = this.observerCallbacks.findIndex(callback);
		if(delIndex === -1) {
			console.error('unregisterObserverCallbacks: delIndex === -1');
		} else {
			this.observerCallbacks.splice(delIndex, 1);
		}
	}

	this.notifyObservers = function(eventName) {
		for(let callback of this.observerCallbacks) {
			callback(eventName);

		}
	}

	this.text = "";

	this.selectionBounds = [0, 0];
	this.getText = function() {

		return this.text;
	}

	this.setText = function(text) {
		this.text = text;
		this.notifyObservers("text-model");
	}


	this.style = function (arg) {
		// body...
		console.log(arg);

		switch (arg) {
			case 'b':
				console.log('bold');
				break;
			case 'i':
				console.log('italic');
				break;
			case 'u':
				console.log('under');
				break;
			default:
				// statements_def
				break;
			}
		}
		//return true;
		this.setSelectionBounds = function(start, end) {
		//console.log("model: setSelectionBounds (" + start + ", " + end + ")");
		this.selectionBounds = [start, end];

	}

	


});