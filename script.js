const {ipcRenderer, remote} = require('electron');
const axios = require('axios');

function runScript(e) {
    if (e.keyCode == 13) {
      // ipcRenderer.send('async', tb);
        var tb = document.getElementById("usernameInput").value;
        var url = `https://api.github.com/users/${tb}/repos`
        axios.get(url)
            .then(function (response) {
              if (response.data) {
                var data = response.data
                for (var i = 0; i < data.length; i++) {
                  console.log(data[i].html_url);
                  console.log(data[i].name);
                  let html =
                  `<div class="columns">
                    <div class="column">
                      <a href="${data[i].html_url}" class="is-meditum button is-fullwidth is-outlined" style="justify-content:left">${data[i].name}</a>
                    </div>
                  </div>`
                  document.getElementById("repos").innerHTML += html;
                }
              }
            })
            .catch(function (error) {
              console.log(error);
            })
        return false;
    }
}
