var HID = require('node-hid');

var MYCESTRO_VENDOR = 2578;
var MYCESTRO_PRODUCT = 4107;

var mycestro;
HID.devices().forEach(function(device) {
	if (mycestro === undefined &&
		device.vendorId === MYCESTRO_VENDOR &&
		device.productId === MYCESTRO_PRODUCT) {
		mycestro = device;
	}
});

console.log(mycestro);

mycestro = new HID.HID(mycestro.path);

mycestro.on('data', function(data) {

	var clickType = data[1];
	switch (clickType) {
		case 1:
			console.log('Left click!');
			break;
		case 4:
			console.log('Middle click!');
			break;
		case 2:
			console.log('Right click!');
			break;
	}

	// Movement data needs mapping - 
	// right now just looks like x / y
	// unless there's some hack here
	var movement = [data[2], data[3]];
	if (data[2] || data[3]) {
		console.log('Movement: ', movement)
	}

	var scrollDirection = data[4];
	switch (scrollDirection) {
		case 1:
			console.log("Scrolling down.");
			break;
		case 255:
			console.log("Scrolling up.");
			break;
	}
});