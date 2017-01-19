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

	this.getHtmlText = function() {
		let HTMLstr = this.text.split('\n').join('<br />');

		return HTMLstr;
	}

	this.setText = function(text) {
		this.text = text;
		this.notifyObservers("text-model");
	}


	this.onStyleSelection = function (arg) {
		// body...
		console.log(arg);

		switch (arg) {
			case 'b':
				console.log('bold');
				this.applyStyle('s-bold');
				break;
			case 'i':
				console.log('italic');
				this.applyStyle('s-italic');
				break;
			case 'u':
				console.log('under');
				this.applyStyle('s-under');
				break;
			default:
				// statements_def
				break;
			}
		}
		//return true;
		this.setSelectionBounds = function(start, end) {
		console.log("model: setSelectionBounds (" + start + ", " + end + ")");
		this.selectionBounds = [start, end];

	};

	this.applyStyle = function(styleClass) {
		let strLength = this.text.length;
		let beforeStr = this.text.substring(0, this.selectionBounds[0]);
		let innerStr = this.text.substring(this.selectionBounds[0], this.selectionBounds[1]);
		let afterStr = this.text.substring(this.selectionBounds[1], strLength);

		console.log("before: " + beforeStr);
		console.log("inner: " + innerStr);
		console.log("after: " + afterStr);

		let htmlStr = beforeStr + `<span class="${styleClass}">`;
		htmlStr += innerStr + '</span>' + afterStr;

		console.log(htmlStr);

		this.setText(htmlStr);



	}


});