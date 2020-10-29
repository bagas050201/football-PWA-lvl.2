const API_KEY = "71b9f06957ce4e09a0b777dc04816b7f"; //api key
const BASE_URL = "https://api.football-data.org/v2/";
const LEAGUE_ID = 2014;
const ENDPOINT_COMPETITION = `${BASE_URL}competitions/${LEAGUE_ID}/standings`;
const INFORMATION_TEAM = `${BASE_URL}competitions/${LEAGUE_ID}/teams`;

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};


function getAllStandings() {
    if ("caches" in window) {
        caches.match(ENDPOINT_COMPETITION).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Competition Data: " + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(ENDPOINT_COMPETITION)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showStanding(data) {
    console.log(data)
    let standings = "";
    let standingElement =  document.getElementById("homeStandings");

    data.standings[0].table.forEach(function (standing) {
        standings += `
                <tr>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.points}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                </tr>
        `;
    });

     standingElement.innerHTML = `
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>P</th>
                            <th>GF</th>
                            <th>GA</th>
                            <th>GD</th>
                        </tr>
                     </thead>
                    <tbody id="standings">
                        ${standings}
                    </tbody>
                </table>
                
                </div>
            `;
}

function getAllTeams(){
    if ("caches" in window) {
        caches.match(INFORMATION_TEAM).then(function (response) { // const INFORMATION_TEAM = `${BASE_URL}competitions/${LEAGUE_ID}/teams`;
            if (response) {
                response.json().then(function (data) {
                    console.log("Team Data: " + data);
                    showTeams(data);
                })
            }
        })
    }
    fetchAPI(INFORMATION_TEAM)
        .then(data => {
            showTeams(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function showTeams(data){
    console.log(data)
    let teams = "";
    data.teams.forEach(function (team) {

         teams += `
                <a href="detail_info.html?id=${team.id}">
                  <div class="card">
                    <div class = "card-image">
                        <img src = "${team.crestUrl}" alt = "logo team"  style="width: 50%;display: block;margin-left: auto;margin-right: auto;top:20px;">
                        <span class="card-title"></span>
                    </div>

                    <div class="card-content" style="text-align: center;top:20px;" >
                      <span class="card-title truncate">${team.name}</span>
                      <p>Since ${team.founded}</p>
                    </div>
                  </div>
                </a>`;
            });
    document.getElementById("infoteam").innerHTML = teams;
    
}

function getInfoTeams(){
    return new Promise(function(resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
        caches.match(`${BASE_URL}teams/`+ idParam).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Team Data: " + data);
                    getTeams(data);
                    resolve(data);
                })
            }
        })
    }
    fetchAPI(`${BASE_URL}teams/` + idParam)
        .then(data => {
            getTeams(data);
            resolve(data);
        })
        .catch(error => {
            console.log(error)
        })
    });
}

function getTeams(data){
    console.log(data)
    let teams = "";
        teams += `
        <div class="card" style = "top:20px;">
          <div class = "card-image" style="width: 30%;display: block;margin-left: auto;margin-right: auto;top :20px;">
            <img src = "${data.crestUrl}"/>
              <span class="card-title"></span>
          </div>
          <div class="card-content">
            <span class="card-title truncate" style = "font-size:35px;font-weight:bold;text-align: center;margin-top:20px;padding-bottom:15px;">${data.name}</span>
            <p>Short Name : ${data.shortName}</p>
            <p>Since : ${data.founded}</p>
            <p>Address : ${data.address}</p>
            <p>Email : ${data.email}</p>
            <p>Number Phone : ${data.phone}</p>
            <p>Website : ${data.website}</p>
          </div>
        </div>`;

    document.getElementById("detail_info").innerHTML = teams;
}

//new line get saved file indexed.db to favorite.html

function getSavedInfoTeams() {
    getAll().then(function(informations) {
      console.log(informations);
      let informationsHTML = "";
      informations.forEach(function(information) {
      informationsHTML += `
        <div class="card" style = "top:20px;">
          <div class = "card-image" style="width: 30%;display: block;margin-left: auto;margin-right: auto;top :20px;">
            <img src = "${information.crestUrl}"/>
              <span class="card-title"></span>
          </div>
          <div class="card-content">
            <span class="card-title truncate" style = "font-size:35px;font-weight:bold;text-align: center;margin-top:20px;padding-bottom:15px;">${information.name}</span>
            <p>Short Name : ${information.shortName}</p>
            <p>Since : ${information.founded}</p>
            <p>Address : ${information.address}</p>
            <p>Email : ${information.email}</p>
            <p>Number Phone : ${information.phone}</p>
            <p>Website : ${information.website}</p>
          </div>
        </div>`;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #body-content
      document.getElementById("information").innerHTML = informationsHTML;
    });
  }
