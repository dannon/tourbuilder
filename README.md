
# Galaxy Tour Builder 
is a webextension which assists in the building of Galaxy Tours.

## Usage

After installation the galaxy icon will appear in your browsers toolbar as a button.
Activate recording mode by clicking on the symbol, which will then
turn red. Now perform the steps of the tour within galaxy. The corresponding
code will appear in the section that opened in lower section of the browser
window. This code can now be used as a draft for the tour.

## Installation
To make the extension available in your browser it has to be loaded first.
Retrieve the tourbuilder repository from GitHub:
    
    git clone https://github.com/dannon/tourbuilder.git

Now proceed with the brower specific steps.

### Chrome

 - Navigate chrome to the chrome://extensions/ page.
 - Check the developer box in the upper right corner
 - Two new control elements appear directly below the checkbox.
 - Click on 'Load unpacked extension' 
 - Load the directory of the tourbuilder git clone you retrieved.

### Firefox
Temporary installation in Firefox: 
- Open about:debugging 
- Click on 'Load Temporary Add-on'
- Select any file in directory of the tourbuilder git clone you retrieved.
- (the extension will now be available until restart of firefox)

For creation of a permanent addon see: 
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Publishing_your_WebExtension

## Dependencies
This web extension uses jquery and jquery-dompath, they are included in the package.
