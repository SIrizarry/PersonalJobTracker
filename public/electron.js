const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

const axios = require('axios');

let mainWindow;
let authWindow;

require("update-electron-app")({
  repo: "kitze/react-electron-example",
  updateInterval: "1 hour"
});

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", () => {
  createWindow();
  createAuthWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
    createAuthWindow();
  }
});

function createAuthWindow() {
  const options = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    scopes: process.env.CLIENT_SCOPE,
    response_type: 'code',
    state: 'protectionshield',
    redirect_uri: 'http%3A%2F%2Flocalhost%3A8000%2F',
    grant_type: 'authorization_code',
    code: ''
  }

  authWindow = new BrowserWindow ({ width: 800, height: 600, show: false, 'node-integration': false});
  const linkedInUrl = 'https://www.linkedin.com/oauth/v2/authorization?';
  const authUrl = linkedInUrl + 'response_type=' + options.response_type + '&client_id=' + options.client_id + '&redirect_uri=' + options.redirect_uri + '&state=' + options.state + '&scope=' + options.scopes;
  authWindow.loadURL(authUrl);
  authWindow.show();
  
  function handleCallback(url) {
    const raw_code = /code=([^&]*)/.exec(url) || null;
    const code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
    const error = /\?error=(.+)$/.exec(url);

    if(code || error) {
      authWindow.destroy();
    }

    if(code) {
      options.code = code;
      const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken?'
      const finalUrl = tokenUrl + 'grant_type=' + options.grant_type + '&code=' + options.code + '&redirect_uri=' + options.redirect_uri + '&client_id=' + options.client_id + '&client_secret=' + options.client_secret;
      axios.post(finalUrl)
        .then(function(res){
          console.log(res.data.access_token);
        })
        .catch(function(err){
          console.log(err);
        })
    } else if (error) {
      alert('cannot log in');
    }
  }

  authWindow.webContents.on('will-navigate', function (event, url) {
    handleCallback(url);
  })

  authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl){
    handleCallback(newUrl);
  });

  authWindow.on('close', function(){
    authWindow = null;
  }, false)
}

