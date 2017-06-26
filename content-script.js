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
            var h = $('#tour-config').css('height');
            $('#tour-config').css('height', '20px' === h ? '200px' : '20px');
            return;
        };
        var path = $(event.target).domPath().join('');
        if (!/tour-configurator/.test(path)) {
            addStep(path);
        }
    }
}

function addStep(path) {
    var $text = $('#tour-textarea');
    var content = $text.val();
    var tour_config_patt = new RegExp("tour-config");
    var uid_patt = new RegExp("uid");
    if ('' !== path && !tour_config_patt.test(path) && !uid_patt.test(path)) {
        content = content + '\n  - title: \'Step ' + nbSteps++ + '\'\n    element: \'' + path + '\'\n    content: \'\'\n    placement: \'\'\n    postclick: \n      - ' + path + '\n';
    }
    $text.val(content);
};

window.addEventListener("click", notifyExtension);
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.action == 'toggle_tour_record') {
      if (msg.value === true && !$('#tour-config').length) {
        $('body').append('\n    <div style="position: absolute; bottom: 0; height: 200px; width: 100%; z-index: 1000;" id="tour-config">\n      <button id="tour-toggle">toggle</button>\n      <textarea style="width: 100%; height: 100%;" id="tour-textarea">' + defaultContent + '</textarea>\n    </div>');
      };
      toggleTourRecording(msg.value);
  }
});
