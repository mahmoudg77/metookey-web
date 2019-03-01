// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
    production: false,
    // apiUrl:'/api/v1',
    // mediaServer:'/media',
    apiUrl:'http://localhost:38360',
    mediaServer:'http://localhost:38360',
    //  apiUrl:'http://web-egy.com/api',
    //  mediaServer:'http://web-egy.com',
    // apiUrl:'http://api.me2key.com/api',
    // mediaServer:'http://api.me2key.com',
    // apiUrl:'https://me2key.com/api/v1',
    // mediaServer:'https://me2key.com/media',
    apiKey:'Wnmbyz22xi7prd7uTL6h7ZVzG28NHaWoU7FWXeQ4cWUFnxRzxuQFvH6yJc3Hb8wZkNbjj3a5kSCQPGew',
    
    firebase: {
      apiKey: "AIzaSyA9wO7BcMREijZnbShSvUc_L3Q_N2aiK24",
      authDomain: "metookey-219517.firebaseapp.com",
      databaseURL: "https://metookey-219517.firebaseio.com",
      projectId: "metookey-219517",
      storageBucket: "metookey-219517.appspot.com",
      messagingSenderId: "473350877660"
    }

};
