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
			case 'c':
			console.log('clear');
			this.setText('');
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

			if(this.selectionBounds[0] === this.selectionBounds[1]) {
				return;
			}

			let strLength = this.text.length;
			let beforeStr = this.text.substring(0, this.selectionBounds[0]);
			let innerStr = this.text.substring(this.selectionBounds[0], this.selectionBounds[1]);
			let afterStr = this.text.substring(this.selectionBounds[1], strLength);

			let spanOpen = `<span class="${styleClass}">`;
			let spanClose = '</span>';

			let htmlStr;

			if(innerStr.indexOf(spanOpen) === -1) {
				htmlStr = beforeStr + spanOpen + innerStr + spanClose + afterStr;
			} else {

				while(innerStr.indexOf(spanOpen) !== -1) {

					innerStr = innerStr.replace(spanOpen, "");
					innerStr = innerStr.replace(spanClose, "");
				}
				console.log(innerStr);

				htmlStr = beforeStr + innerStr + afterStr;
			}


			this.setText(htmlStr);



		}


	});