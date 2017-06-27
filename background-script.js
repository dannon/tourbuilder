var currentTab;
var tour_recording = false;

window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

function updateIcon() {
  window.browser.browserAction.setIcon({
    path: tour_recording ? {
      "48": "icons/galaxy_rec.png"
    } : {
      "48": "icons/galaxy.png"
    }
  });
}

function sendToggle(){
	window.browser.tabs.query({active: true, currentWindow: true}, function(tabs){
		window.browser.tabs.sendMessage(tabs[0].id, {action: "toggle_tour_record", value: tour_recording}, function(response) {});  
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

window.browser.browserAction.onClicked.addListener(toggleRecording);
