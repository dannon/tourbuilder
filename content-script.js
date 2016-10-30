'use strict';
var recording = false;
var nbSteps = 1;
var defaultContent = '\nid: new-tour\nname: NewTour\ndescription: Hello, this is a new tour!\ntitle_default: "New Tour"\n\nsteps:';

function toggleTourRecording(toggle){
    recording = toggle;
}


function notifyExtension(e) {
    if (recording){
        if ('tour-toggle' === event.target.id) {
            var h = $('#tour-configurator').css('height');
            $('#tour-configurator').css('height', '20px' === h ? '200px' : '20px');
            return;
        }
        var path = $(event.target).domPath().join('');
        if (!/tour-configurator/.test(path)) {
            addStep(path);
        }
    }
}

function addStep(path) {
    var $text = $('#tour-textarea');
    var content = $text.val();
    if ('' !== path) {
        content = content + '\n  - title: \'Step ' + nbSteps++ + '\'\n    element: \'' + path + '\'\n    intro: \'\'\n        position: \'\'\n';
    }
    $text.val(content);
}

$('body').append('\n    <div style="position: absolute; bottom: 0; height: 200px; width: 100%; z-index: 1000;" id="tour-config>\n      <button id="tour-toggle">toggle</button>\n      <textarea style="width: 100%; height: 100%;" id="tour-textarea">' + defaultContent + '</textarea>\n    </div>');

window.addEventListener("click", notifyExtension);
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action == 'toggle_tour_record') {
      toggleTourRecording(msg.value);
  }
});
