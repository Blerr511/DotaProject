let page = {
    x: 0
};
let heroData = {};
let smallDataHero = [];
const apiKey = "D43B7FA33F5ECBE81DE560ED4E03357E";
let sortType = "winsUp";
let prom = true;
let fullData;
let itemData;
let itemDetalis;

let teamPlayersData = new Object;
const matchPage = (matchId) => {
    window.location.href = window.location.href.split('?')[0] + "?match=" + matchId
}

class LastMatches {
    constructor(match, teamId) {
        this.match_id = match.match_id;
        if (match.radiant) {
            this.side = "radiant";
        } else {
            this.side = "dire";
        }
        this.radWin = match.radiant_win;
        this.duration = match.duration;
        this.league = match.league_name;
        this.opposing = match.opposing_team_name;
        this.opposing_logo = match.opposing_team_logo;
        this.teamId = teamId;
    }
    append() {
        let div = document.createElement("div");
        if (this.side == "radiant") {
            if (this.radWin)
                div.innerHTML = '<span class="radiant win"><img src="' + document.querySelector("#team" + this.teamId + " img").src + '"><h4>' + document.querySelector("#team" + this.teamId + " h3").innerHTML + '</h4></span> <span><p class="vs">VS</p></span>  <span class="dire"> <img src="' + this.opposing_logo + '"> <h4>' + this.opposing + '</h4> </span>';
            else
                div.innerHTML = '<span class="radiant"><img src="' + document.querySelector("#team" + this.teamId + " img").src + '"><h4>' + document.querySelector("#team" + this.teamId + " h3").innerHTML + '</h4></span> <span><p class="vs">VS</p></span>  <span class="dire win"> <img src="' + this.opposing_logo + '"> <h4>' + this.opposing + '</h4> </span>';

        } else {
            if (this.radWin)
                div.innerHTML = '<span class="radiant win"><img src="' + this.opposing_logo + '"><h4>' + this.opposing + '</h4></span> <span><p class="vs">VS</p></span>  <span class="dire"> <img src="' + document.querySelector("#team" + this.teamId + " img").src + '"><h4>' + document.querySelector("#team" + this.teamId + " h3").innerHTML + '</h4> </span>';
            else
                div.innerHTML = '<span class="radiant "><img src="' + this.opposing_logo + '"><h4>' + this.opposing + '</h4></span> <span><p class="vs">VS</p></span>  <span class="dire win"> <img src="' + document.querySelector("#team" + this.teamId + " img").src + '"><h4>' + document.querySelector("#team" + this.teamId + " h3").innerHTML + '</h4> </span>';

        }

        // document.getElementById("div2").innerHTML = "<h3>" + document.querySelector("#team" + this.teamId + " h3").innerHTML + "</h3><hr><p style='text-align:center'>Last Matches</p>"
        div.addEventListener("click", () => {
            matchPage(this.match_id)
        });

        return div;

    }


}
const lastMatchesBlock = (teamName) => { //html blocky vori mej cuyca talu verjin xaxery
    let section = document.createElement("section");
    section.id = "aboutTeam";
    let sec1 = document.createElement("section");
    let sec2 = document.createElement("section");
    section.appendChild(sec1);
    let span = document.createElement("span");
    let div = document.createElement("div");
    let div2 = document.createElement("div");
    let div4 = document.createElement("div");
    div2.id = "div2";
    let h3 = document.createElement("h3");
    h3.innerHTML = teamName;
    div2.appendChild(h3);
    let p = document.createElement("p");
    p.innerHTML = "Last Matches";
    p.style.textAlign = "center";
    div2.appendChild(p);
    div4.id = "div4";
    let lastMatches = document.createElement("section");
    lastMatches.id = "lastMatches"
    div4.appendChild(lastMatches);
    div.appendChild(div2);
    div.appendChild(div4);
    span.appendChild(div);
    section.appendChild(span);
    section.appendChild(sec2);

    section.addEventListener("click", (e) => {
        if (e.srcElement == sec1 || e.srcElement == sec2)
            section.remove()
    })
    return {
        sectionBlock: section,
        matchesBlock: lastMatches
    }
}
const lastM = (teamId, teamName) => { //tmi verjin 10 xaxery
    let block = lastMatchesBlock(teamName);
    document.getElementsByTagName("main")[0].appendChild(block.sectionBlock);
    block.sectionBlock.style.display = "grid";
    let load = loading("#e1e1e1", "absolute", "48%", "48%");
    block.sectionBlock.appendChild(load);
    console.log(load);
    fetch("https://api.opendota.com/api/teams/" + teamId + "/matches")
        .then(d => d.json())
        .then((data) => {


            for (let i = 0; i < 10; i++) {
                let obj = new LastMatches(data[i], teamId)
                let show = obj.append();
                block.matchesBlock.appendChild(show);
            }
            load.remove();

        })
        .catch((data) => {
            load.remove();
            block.sectionBlock.appendChild(errorMessege("Somthing goes wrong :("))
        })
}



const sortBy = (data) => {
    if (document.getElementById("matches100").checked == true) {
        data.sort((a, b) => (b.wins + b.losses) - (a.wins + a.losses));
        data = data.filter((elem) => elem.wins + elem.losses >= 100)
    }
    if (sortType == "rating_Up") {
        data.sort((a, b) => b.rating - a.rating);
    } else if (sortType == "rating_Down") {
        data.sort((b, a) => b.rating - a.rating);

    } else if (sortType == "wins_Up") {
        data.sort((a, b) => b.wins - a.wins);
    } else if (sortType == "wins_Down") {
        data.sort((b, a) => b.wins - a.wins);
    } else if (sortType == "wr_Up") {
        data.sort((a, b) => (b.wins / (b.wins + b.losses)) - (a.wins / (a.wins + a.losses)));


    } else if (sortType == "wr_Down") {
        data.sort((b, a) => (b.wins / (b.wins + b.losses)) - (a.wins / (a.wins + a.losses)));

    }
    return data
}



const addSortButtons = () => {
    let sort = `
    <p>Sort by</p>
    <li id="rating_Up" >Rating <i class="fas fa-arrow-up"></i></li>
    <li id="rating_Down" style="display: none" >Rating <i class="fas fa-arrow-down"></i></li>
    </li>
    <li id="wins_Up" style="display: none" >Wins <i class="fas fa-arrow-up"></i></li>
    <li id="wins_Down" >Wins <i class="fas fa-arrow-down"></i></li>
    <li id="wr_Up" >Winrate <i class="fas fa-arrow-up"></i></li>
    <li id="wr_Down" style="display: none" >Winrate <i class="fas fa-arrow-down"></i>
    </li>
    100+ matches<input  id="matches100" type="checkbox" value="moreThen">
`;
    let ul = document.createElement("ul");
    ul.className = "sort";
    ul.innerHTML = sort;
    let searchInp = document.createElement('input');
    searchInp.type = 'text';
    searchInp.id = 'search';
    searchInp.placeholder = 'Search';
    ul.appendChild(searchInp);
    ul.addEventListener("click", (event) => {
        if (event.srcElement.id != "matches100" && event.srcElement.id != "search" && event.path[0].nodeName != "UL") {
            let i = 0;
            while (event.path[i].nodeName != "LI") {
                i++
            }
            let li = event.path[i];
            sortType = li.id;
            
            li.style.display = "none";
            let temp;
            if (li.id.split("_")[1] == "Up")
                temp = "Down";
            else
                temp = "Up";

            document.getElementById(li.id.split("_")[0] + "_" + temp).style.display = "block";
            sortBy(fullData);
            search();
        }
    })
    searchInp.addEventListener("keyup", (event) => {
        if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || event.keyCode == 13) {
            search();
        }
    })
    return ul;
}
const nextButton = () => {
    let div = document.createElement("div");
    div.id = 'next';
    div.style.display = 'flex';
    div.addEventListener('click', (e) => {
        search(10);
    })
    div.innerHTML = '<i class="fas fa-angle-double-right"></i>';
    return div;
}
const prevButton = () => {
    let div = document.createElement("div");
    div.id = 'prev';
    div.style.display = 'flex';
    div.addEventListener('click', (e) => {
        search(-10);
    })
    div.innerHTML = '<i class="fas fa-angle-double-left"></i>';
    return div;
}

const getTeams = async (url) => {
    let load = loading(undefined, "absolute", "48%", "48%");
    document.body.appendChild(load);
    try {
        const data = await fetch(url, {
            mode: "cors"
        });
        console.log(data);
        fullData = await data.json();
        load.remove();
        document.body.appendChild(nextButton());
        document.body.appendChild(prevButton());
        document.getElementsByTagName("main")[0].insertBefore(addSortButtons(), document.getElementById("area"));


        let matches = document.createElement("section");
        let area = document.createElement("div");
        area.id = "area";
        matches.id = "matches";
        for (let i = page.x; i < 12 + page.x; i++) {
            fullData = sortBy(fullData); // dasavorox funkcian
            let myCard = new TeamCard(Math.floor(fullData[i].rating), fullData[i].wins, fullData[i].losses, fullData[i].logo_url, fullData[i].name, fullData[i].team_id).createTag(); //constructor html tagy sarqelu hamar


            area.appendChild(myCard);
        }
        matches.appendChild(area);
        document.getElementsByTagName("main")[0].appendChild(matches);

    } catch (err) {
        console.log(err);
    }
}


if (document.location.search == "?page=teams") {
    getTeams('https://api.opendota.com/api/teams');
}




class TeamCard {
    constructor(rating, wins, loses, img, name, id) {
        this.stats = {
            rating: rating,
            wins: wins,
            loses: loses
        }
        this.id = id;
        this.img = img;
        if (name)
            this.name = name;
        else
            this.name = "No Name"
    }
    createTag() {
        let card = document.createElement("label");
        let img = document.createElement("img");
        let h3 = document.createElement("h3");
        let div = document.createElement("div");
        let div2 = document.createElement("div");
        let table = document.createElement("table");
        let divPlayers = document.createElement("div");
        card.setAttribute("for", "check" + this.id);
        card.setAttribute("class", "teamCard");

        // card.setAttribute("onclick", "lastM(this.id)");
        card.id = 'team' + this.id;
        card.addEventListener("click", (event) => {
            lastM(this.id, this.name)
        })
        card.addEventListener("mouseover", (event) => {

            if (event.srcElement.className == "teamCard" || event.srcElement.className == "players") {
                let child;
                if (event.srcElement.className == "teamCard") child = event.srcElement.firstChild;
                else child = event.srcElement;
                if (child.innerHTML == "") {
                    let load = document.createElement("p");
                    load.innerHTML = "Loading players...";
                    child.appendChild(load);


                    (async () => {
                        let data = await fetch("https://api.opendota.com/api/teams/" + this.id + "/players");
                        data = await data.json();
                        load.remove();
                        data.forEach(elem => {
                            if (elem.is_current_team_member)
                                child.innerHTML += `<p>${elem.name}</p>`
                        })
                    })()
                }
            }

        })
        if (this.img != null)
            img.src = this.img;
        else img.src = "img/dota2.png";
        h3.innerHTML = this.name;

        // let checkbox = document.createElement("input");
        // checkbox.type = "checkbox";
        // checkbox.id = "check"+this.id;
        // checkbox.className="checkPlayers";
        // checkbox.style.display = "none";
        for (let k in this.stats) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            let tdi = document.createElement("td");
            let td2 = document.createElement("td");
            let i = document.createElement("i");
            let p = document.createElement("p");
            if (k == "loses")
                i.className = "fas fa-skull";
            if (k == "wins")
                i.className = "fa fa-thumbs-up";
            if (k == "rating")
                i.className = "fas fa-star";

            tdi.appendChild(i);
            p.innerHTML = "  " + k;
            td.appendChild(p);
            tr.appendChild(tdi);
            tr.appendChild(td);
            td2.innerHTML = this.stats[k];
            tr.appendChild(td2);
            table.appendChild(tr);
        }
        div2.appendChild(h3);
        div2.appendChild(table);

        divPlayers.className = "players";
        card.appendChild(divPlayers);
        div.appendChild(img);
        div.appendChild(div2);
        card.appendChild(div);
        return card;

    }
}


function search(nth) {
    if (nth != undefined) {
        page.x += nth;
    } else {
        page.x = 0;
    }

    document.getElementById("area").innerHTML = "";
    let data = sortBy(fullData);
    if (page.x == data.length - 1) {
        if (document.getElementById('prev') == undefined) document.body.appendChild(prevButton());
        if (document.getElementById('next')!=undefined)document.body.appendChild(nextButton());
    } else if (page.x >= 10 && page.x <= data.length - 10) {
        if (document.getElementById('prev') == undefined) document.body.appendChild(prevButton());
        if (document.getElementById('next') == undefined) document.body.appendChild(nextButton());
    } else if (page.x == 0){
        if (document.getElementById('next') == undefined) document.body.appendChild(nextButton());
        if (document.getElementById('prev') != undefined) document.getElementById('prev').remove();
    }
    if (document.getElementById("search").value != "") {
        data = data.filter((elem) => elem.name.search(new RegExp(document.getElementById("search").value, "i")) != -1); //search enq anum vor anuni mej mer grac bary lini
    }

    if (data.length != 0) { //ete ka bary
        for (let i = page.x; i < 12 + page.x; i++) {
            if (data[i] != undefined) {
                data = sortBy(data);
                let card = new TeamCard(Math.floor(data[i].rating), data[i].wins, data[i].losses, data[i].logo_url, data[i].name, data[i].team_id).createTag();
                document.getElementById('area').appendChild(card)

            }

        }
    } else { //search chgtav 
        document.getElementById("area").appendChild(errorMessege("Sory we we have no results for response" + document.getElementById("search").value));
    }



}



function errorMessege(str) {
    let error = document.createElement("div");
    let i = document.createElement("i");
    let p = document.createElement("p");
    error.className = "noSearch";
    p.innerHTML = str;
    i.className = "fas fa-exclamation-circle";
    error.appendChild(i);
    error.appendChild(p);
    return error;

}

function loading(color, position, top, left) {
    let customLoad = document.createElement("div");
    customLoad.className = 'lds-facebook';
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    if (color != undefined) {
        div1.style.backgroundColor = color;
        div2.style.backgroundColor = color;
        div3.style.backgroundColor = color;

    }
    if (position != undefined) {
        customLoad.style.position = position;
        customLoad.style.top = top;
        customLoad.style.left = left;
    }
    customLoad.appendChild(div1);
    customLoad.appendChild(div2);
    customLoad.appendChild(div3);

    /// customLoad.innerHTML = "<div class='lds-facebook '><div></div><div></div><div></div></div>";
    return customLoad;
}