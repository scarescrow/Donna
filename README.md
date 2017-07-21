## Introduction

This app is designed to keep track of items to do weekly. User can enter tasks by categories that are to be done every week, along with number of hours to put in for every week. The goal is for the app to design a daily timetable that can be followed.

**Disclaimer:** This app has been designed to get hands on experience with React and Firebase.

## Technologies

* Front End: ReactJS
* Back End: NodeJS
* Database: Firebase

## Steps to Build

1. Clone the source ````$ git clone https://github.com/scarescrow/Donna.git````
2. Install all required packages by running command ````$ npm install```` or ````$ yarn add````
3. Create a new app in Firebase which will host the site and hold the data.
4. Rename ````src/firebase-config-example.js```` to ````src/firebase-config.js```` and change all config values to the values provided by the new firebase app.
5. Run command ````$ npm run build```` to build a production version of the app into the build directory.
6. Run command ````$ npm install -g firebase-tools```` to get access to all Firebase commands.
7. Run command ````$ firebase init```` and select all options that are required. For project, choose the created app in Firebase. For build directory choose ````build```` and do not overwrite existing ````index.html```` file
8. Run ````$ firebase deploy```` to upload app to the web. Navigate to the app public url to find the running version of the app.

## License

Licensed under [MIT License](LICENSE)