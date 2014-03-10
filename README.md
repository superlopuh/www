# BookJockey readme

## About BookJockey

This is an early version of a tool that can be used to assemble information from sources around the internet to create a new learning experience.

It was built for Open Book Publishers as a group project in the University of Cambridge.

BookJockey is built on top of brackets, an open source editor for HTMl, JavaScript and CSS. It uses PDF.js, an open source pdf viewer built in JavaScript.



## How to start 

In order to build on top of what we have done, do the following steps:

  1. Download the build of brackets appropriate for your machine here: http://download.brackets.io
  2. Inside the application, locate the "Contents" folder. If there is a "www" folder there, delete its contents. Else, create a new folder and name it www.
  3. Clone this repository to the www folder inside the application.
  4. When you run the application, it should show the BookJockey starting page.

You can also build out fork of the Brackets Shell (link below), which will unlock some additional features incompatible with the original version of the shell.


### Technology used in the making of this application

  * Brackets Shell:  https://github.com/adobe/brackets-shell
  * PDF.js:    https://github.com/mozilla/pdf.js/
  * Bootstrap: https://github.com/twbs/bootstrap
  * jQuery:    https://github.com/jquery/jquery
  * Showdown.js:    https://github.com/coreyti/showdown (original, outdated source at http://www.attacklab.net/)
  * Selection module of jQuery++: http://jquerypp.com/

### Dependencies

  * Our fork of Brackets Shell:  https://github.com/dj311/brackets-shell
  * Sharing server:  https://github.com/mrozycki/bookjockey-server
