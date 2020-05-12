let APP_CLIENT_ID;
let REDIRECT_URL;

switch(process.env.NODE_ENV) {
    case 'development' : 
    APP_CLIENT_ID = "_Qfh5Wgc9T94ySRWdKSRpkylcPFQysJIHiY6JeWvees"
    REDIRECT_URL = "https://localhost:3000"
    break
    case 'production' : 
    APP_CLIENT_ID = "2-Hm9cn812fJ5K7RjAfTaP7TJvf11tE_qvc-mqJSjWg"
    REDIRECT_URL = "https://qa-heartsapp-messages.firebaseapp.com"
    break
}

export {
    APP_CLIENT_ID,
    REDIRECT_URL
}