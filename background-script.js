var currentTab;
var tour_recording = false;

function updateIcon() {
  chrome.browserAction.setIcon({
    path: tour_recording ? {
      "48": "icons/galaxy_rec.png"
    } : {
      "48": "icons/galaxy.png"
    }
  });
}

function sendToggle(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {action: "toggle_tour_record", value: tour_recording}, function(response) {});  
	});
}

function toggleRecording() {
	if (tour_recording) {
		// send a message to *stop* recording, and toggle the view.
        tour_recording = false;
		updateIcon();
		sendToggle();
	} else {
		// send a message to *start* recording, and toggle the view.
        tour_recording = true;
		updateIcon();
		sendToggle();
	}
}

chrome.browserAction.onClicked.addListener(toggleRecording);
