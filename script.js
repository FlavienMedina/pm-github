const {
  ipcRenderer,
  remote
} = require('electron');
const axios = require('axios');

function runScript(e) {
  if (e.keyCode == 13) {
    document.getElementById("repos").innerHTML = "";

    // ipcRenderer.send('async', tb);
    var tb = document.getElementById("usernameInput").value;
    var url = `https://api.github.com/users/${tb}/repos`
    console.log(url);
    axios.get(url)
      .then(function(response) {
        if (response.data) {
          var data = response.data
          for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
            let owner =
              `<div class="box">
                            <article class="media">
                              <div class="media-left">
                                <figure class="image is-64x64">
                                  <img src="${data[i].owner.avatar_url}" alt="Image">
                                </figure>
                              </div>
                              <div class="media-content">
                                <div class="content">
                                  <p>
                                    <strong>${data[i].owner.login}</strong></br>${i+1} Repos</p>
                                </div>
                              </div>
                            </article>
                            </div>`
            let repos =
              `
                  <div class="columns">
                  <div class="column">
                  <a href="${data[i].html_url}" target="blank">
                  <div class="box">
                            <article class="media">
                              <div class="media-content">
                                <div class="content">
                                  <p>
                                    <strong>${data[i].name} </strong>${data[i].language}</p>
                                    <p>${data[i].description}</p>

                                </div>
                              </div>
                            </article>
                            </div></a></div></div>`;
            document.getElementById("owner").innerHTML = owner;
            document.getElementById("repos").innerHTML += repos;
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      })
    return false;
  }
}
