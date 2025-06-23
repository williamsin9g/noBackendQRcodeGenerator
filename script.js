var qrcode = new QRCode("qrcode");

function makeCode () {
	var elText = document.getElementById("text");
	
	if (!elText.value) {
		alert("Please enter a URL or text");
		elText.focus();
		return;
	}
	
	qrcode.makeCode(elText.value);

	// Show download button if QR code is present
	setTimeout(function() {
		var qr = document.querySelector('#qrcode img, #qrcode canvas');
		if (qr) {
			document.getElementById('download-btn').style.display = 'inline-block';
		} else {
			document.getElementById('download-btn').style.display = 'none';
		}
	}, 200);
}

// Clear input on page load
$(document).ready(function() {
	$("#text").val("");
});

// Generate on blur or Enter key
$("#text")
	.on("blur", function () {
		makeCode();
	})
	.on("keydown", function (e) {
		if (e.keyCode == 13) {
			makeCode();
		}
	});

// Generate on button click
$("#generate-btn").on("click", function() {
	makeCode();
});

// Download QR code as PNG
$("#download-btn").on("click", function() {
	var qrImg = document.querySelector('#qrcode img');
	var qrCanvas = document.querySelector('#qrcode canvas');
	var url, link;
	if (qrImg) {
		url = qrImg.src;
	} else if (qrCanvas) {
		url = qrCanvas.toDataURL("image/png");
	}
	if (url) {
		link = document.createElement('a');
		link.href = url;
		link.download = 'qrcode.png';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
});