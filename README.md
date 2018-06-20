# Innovativeproject- UI Issue Feedback
## Goal
The goal of this project is to create an importable webcomponent, that would provide a tool for sending feedback about visual aspects of website.
## Description
This project consists of :
* Backend that is the "brain" of whole project
* Database that stores all the data
* Importable webcomponent 
* Frontend that shows results of sent feedback

Moreover you will need some example site with this webcomponent imported. We have created two example htmls.  
## Installation
Clone repository from github
```
git clone https://github.com/nokia-wroclaw/innovativeproject-ui-feedback.git
```
### Backend and Database
**Prerequisites:**
* [Npm](https://www.npmjs.com/)
* [Sequelize-cli](http://docs.sequelizejs.com/)
* [XAMPP](https://www.apachefriends.org/pl/index.html)

Change XAMPP's port to the same that is in config file in *database/express-sequelize-test/config/config.json*

Run services: *MySQL Database* and *Apache Web Server*. Create an user with all privileges in PHPMyAdmin. Set name and password the same that are in config file.

**To create DB:**
```
cd database/express-sequelize-test
sequelize db:create
sequelize db:migrate
```
**To install packages:**
```
npm install
```
**To run backend:**
```
npm start
```

### Webcomponent
**Prerequisites:**
* [Polymer](https://www.polymer-project.org/)
* [Bower](https://bower.io/)

**To install packages:**
```
cd webcomponent
bower install
``` 
**To show demo of webcomponent:**
```
polymer serve
```

### Frontend and example website
**Prerequisites:**
* [Npm](https://www.npmjs.com/)

**To install packages:**
```
cd frontend
npm install
cd ..example_html2
npm install
```
**To run frontend (in frontend directory):**
```
npm start
```
**To run example website (in example_html2 directory):**
```
npm start
```
## Technologies
|Backend|Database|Webcomponent|Frontend|
| ---   | ---    | ----       | ---    |
|[NodeJS](https://nodejs.org/en/) |[MySQL](https://www.mysql.com/)|[Polymer](https://www.polymer-project.org/)|[React](https://reactjs.org/)
|[ExpressJs](https://expressjs.com/)| | | |
## Authors
* Jacek Kubiak
* Jakub Piotrowski
* Andrzej Sagan
* Aniela Tatowicz



