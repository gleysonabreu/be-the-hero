### MOBILE
This is mobile project to execute on smartphones with Android and iOS. <br />
![HOME PAGE APP](https://imgur.com/nxKjDFo.png)<br />
![DETAIL INCIDENT](https://imgur.com/5qq1Tp9.png)<br />
![ONG PROFILE](https://imgur.com/FtVVL7R.png)<br />
![SEARCH INCIDENT](https://imgur.com/iYgkfUq.png)<br />
Requirements to execute this project is NodeJS, Npm, Expo CLI, download Expo app on your smartphone. <br />
Download the repository [Backend project](https://github.com/gleysonabreu/be-the-hero/tree/master/backend "Backend project") to execute DB.<br />
First modify file in folder src/services/api.js change my ip to your ip. <br />
```
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://YOUR IP:3333/'
});

export default api;
```
AND execute commands below <br />
```
npm install (to install all node_modules)
npm install expo-cli --global (install explo global in your PC)
npm start or expo start (to execute mobile project in your emulator device and anothers)
```