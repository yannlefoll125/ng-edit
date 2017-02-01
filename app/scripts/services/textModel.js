app.service('textModel', ['$http', function($http) {

	//Creating a global reference to this, so that object attribute can be
	//accessed from $http callbacks
	var self = this;	

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
	this.title = "";
	this.creationDate = "";

	this.getServerTimestamp = function() {
		var timestamp;
		$http.get('/getTimestamp').then(function success(res) {

			console.log("received data: " + res.data);
			self.creationDate = res.data;

		}, function error(res) {

		});
	}

	this.getServerTimestamp();


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

	this.getTitle = function() {
		return this.title;
	}

	this.setTitle = function(title) {
		this.title = title;
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



	};


	this.saveTextToDB = function() {

		console.log("textModel: save to db, this.creationDate=" + this.creationDate);

		let postRequest = {
			method: 'POST',
			url: 'http://localhost:8080/saveText',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				title: this.title,
				text: this.text, 
				creationDate: this.creationDate
			}
		};

		$http(postRequest).then(function success(res) {
			console.log("Save API request succesful");

		}, function error(res) {
			console.log("Save API request error");
		})
	};

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
		};

	}]);