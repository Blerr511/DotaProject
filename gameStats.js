const getTime = (date) => {
    let time = Math.floor(date / 60);

    let sec = Math.floor((date / 60 - time) * 60);
    if(sec<10)
    sec="0"+sec;
    return time + ":" + sec;
}

if (window.location.search.search("match") != -1 || window.location.search.search("page=heroes") != -1) {
    fetch("https://api.opendota.com/api/heroStats")
    .then(data=>data.json())
        .then((data) => {

            data.forEach((element, i) => {
                smallDataHero.push({
                    id: data[i].id,
                    name: data[i].localized_name,
                    img: "https://steamcdn-a.akamaihd.net" + data[i].img
                });
            });
            if (window.location.search.search("match") != -1) getMatchData();
            else if (window.location.search.search("page=heroes")) printHeroData(smallDataHero); //heroes.js

        })
}

function getMatchData() {
    let id = window.location.search.split("match=")[1];
    let url = "https://api.opendota.com/api/matches/" + id;
    fetch(url)
    .then(data=>data.json())
        .then((data) => {
            if (data.error == undefined) {
                let myData = {};
                myData.id = data.match_id;
                myData.radiantWin = data.radiant_win;
                myData.radiantScore = data.radiant_score;
                myData.radiantTeamId = data.radiant_team_id;
                myData.direScore = data.dire_score;
                myData.direTeamId = data.dire_team_id;
                myData.players = [];
                myData.duration = data.duration;
                myData.time = data.start_time;
                myData.gameMode = data.game_mode;
                myData.objectives=data.objectives;

                let load = loading(undefined,"absoulte","48%","48%");
                document.body.appendChild(load);
                fetch("https://api.stratz.com/api/v1/Item/")
                    .then(dataItems => dataItems.json())
                    .then(items => {
                        load.remove();
                        itemDetalis = items;
                            myData.players.push(new Object());
                            getMyData(myData, data);
                            let myTables = new MatchTable(myData).createTable();
                            let matches=document.createElement("section");
                            matches.id="matches";
                            matches.appendChild(myTables);
                            document.getElementsByTagName("main")[0].appendChild(matches);
                            let i =0;
                            let objct= data.objectives.filter((elem)=>{
                                if(elem.key=="npc_dota_goodguys_tower4"){
                                elem.key=`npc_dota_goodguys_tower4_${i}`;
                                    i+=2;
                            }
                                if(elem.type=='building_kill')
                                return true;
                            });
                            document.getElementById("matches").appendChild(document.createElement("section"));
                            document.querySelector("#matches section").appendChild(document.createElement("span"));
                            let canvGold=advGraph(data.radiant_gold_adv,400,265);
                            let canvXp=advGraph(data.radiant_xp_adv,400,265);
                            canvXp.style.display="none";
                            let toggleButton=document.createElement("p");
                            toggleButton.innerHTML="Gold";
                            toggleButton.id="toggleToXp";
                            document.querySelector("#matches section").lastChild.appendChild(toggleButton);
                            toggleButton.addEventListener("click",(event)=>{
                                if(toggleButton.id=="toggleToXp"){
                                    toggleButton.id="toggleToGold";
                                    toggleButton.innerHTML="Experiance";
                                    canvGold.style.display="none";
                                    canvXp.style.display="block";
                                }else
                                {
                                    toggleButton.id="toggleToXp";
                                    toggleButton.innerHTML="Gold";
                                    canvGold.style.display="block";
                                    canvXp.style.display="none";
                                }
                            })
                           document.querySelector("#matches section").lastChild.appendChild(canvGold);
                           document.querySelector("#matches section").lastChild.appendChild(canvXp);
                           map(objct);


                    })

            } else {
                
                document.getElementById("matches").appendChild(errorMessege("Sorry, some error hapens"));
                
            }
        })
        .catch((err) => {

        })
}
// getMatch("http://api.steampowered.com/IEconDOTA2_570/GetGameItems/v1/?key="+apiKey)
// .then((data)=>{
//     console.log(data);
// })
function objSum(obj) {
    let sum = 0;
    for (const k in obj) {
        sum += obj[k]
    }

    return Math.floor((sum / 100)) / 10 + "K";;

}

class MatchTable {
constructor(data){
    this.id = data.match_id;
    if (data.radiantWin == true)
        this.win = "Radiant";
    else
        this.win = "Dire";
    this.duration = data.duration;
    this.date = new Date(data.time);
    this.gameMode = data.gameMode;
    this.radiantScore = data.radiantScore;
    this.direScore = data.direScore;
    this.players = data.players;
}
    createTable(){
       
        // console.log(data);
        let matchesSection=document.createElement("span");
        matchesSection.innerHTML = ' <div class="scores ' + this.win + '"><h2>' + this.win + ' Victory</h2> <p>' + this.radiantScore + ' : ' + this.direScore + '</p> <br> <p><i class="far fa-clock"></i>' + getTime(this.duration) + '</p></div>'
        let table1 = document.createElement("table");
        table1.innerHTML = " <tr class='row100 head'> <th class='column100 column1' data-column='column1'>Hero</th><th class='column100 column2' data-column='column2'>Player</th>        <th class='column100 column3' data-column='column3'>K</th>       <th class='column100 column4' data-column='column4'>D</th>       <th class='column100 column6' data-column='column5'>A</th>        <th class='column100 column7' data-column='column7'>NET</th>      <th class='column100 column8' data-column='column8'>LH/DN</th>       <th class='column100 column9' data-column='column9'>GPM</th>      <th class='column100 column10' data-column='column10'>XPM</th>    <th class='column100 column11' data-column='column11'>DMG</th>    <th class='column100 column12' data-column='column12'>HEAL</th>    <th class='column100 column13' data-column='column13'>BLD DMG</th>    <th class='column100 column14' data-column='column14'>Items</th> </tr>"
        let table2 = document.createElement("table");
        table2.innerHTML = " <tr class='row100 head'> <th class='column100 column1' data-column='column1'>Hero</th><th class='column100 column2' data-column='column2'>Player</th>        <th class='column100 column3' data-column='column3'>K</th>       <th class='column100 column4' data-column='column4'>D</th>       <th class='column100 column6' data-column='column5'>A</th>        <th class='column100 column7' data-column='column7'>NET</th>      <th class='column100 column8' data-column='column8'>LH/DN</th>       <th class='column100 column9' data-column='column9'>GPM</th>      <th class='column100 column10' data-column='column10'>XPM</th>    <th class='column100 column11' data-column='column11'>DMG</th>    <th class='column100 column12' data-column='column12'>HEAL</th>    <th class='column100 column13' data-column='column13'>BLD DMG</th>    <th class='column100 column14' data-column='column14'>Items</th> </tr>"
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        div1.className = "table100 ver2 m-b-110";
        div2.className = "table100 ver2 m-b-110";
        table1.setAttribute("data-vertable", "ver6");
        table2.setAttribute("data-vertable", "ver6");

        for (let i = 0; i < 5; i++) {
            let tr = document.createElement("tr");
            tr.className = "row100";
            // tr.innerHTML+=`<td id="hero${this.players[i].heroId}" >${this.players[i].heroId}</td>`;
            tr.innerHTML += `<td class="column100 column1" data-column="column1"><img width="80px" src='${this.players[i].heroImgUrl}'></td>`;
            tr.innerHTML += `<td class="column100 column2" data-column="column2">${this.players[i].name}</td>`;
            tr.innerHTML += `<td class="column100 column3" data-column="column3">${this.players[i].kills}</td>`;
            tr.innerHTML += `<td class="column100 column4" data-column="column4">${this.players[i].deaths}</td>`;
            tr.innerHTML += `<td class="column100 column5" data-column="column5">${this.players[i].assists}</td>`;

            tr.innerHTML += `<td class="column100 column6" data-column="column6">${objSum(this.players[i].netForck)}</td>`;
            tr.innerHTML += `<td class="column100 column7" data-column="column7">${this.players[i].lastHits}/${this.players[i].denies}</td>`
            tr.innerHTML += `<td class="column100 column8" data-column="column8">${this.players[i].gpm}</td>`;
            tr.innerHTML += `<td class="column100 column9" data-column="column9">${this.players[i].xpm}</td>`;
            tr.innerHTML += `<td class="column100 column10" data-column="column10">${this.players[i].damage}</td>`;
            tr.innerHTML += `<td class="column100 column11" data-column="column11">${this.players[i].heal}</td>`;
            tr.innerHTML += `<td class="column100 column12" data-column="column12">${this.players[i].tDamage}</td>`;
            let temp = "";
            this.players[i].items.forEach((elem) => {
                if (elem != undefined) {
                    for (let i in itemDetalis) {
                        if (itemDetalis[i].id == elem) {
                            temp += ("<img  id='" + elem + "' class='item' src='items/" + itemDetalis[i].name.replace("item_", "") + ".png'>")
                            break;
                        }
                    }


                }
            })
            tr.innerHTML += `<td class="column100 column12 items" data-column="column12">${temp}</td>`;
            table1.appendChild(tr);

        }
        for (let i = 5; i < 10; i++) {
            let tr = document.createElement("tr");
            tr.className = "row100";
            // tr.innerHTML+=`<td id="hero${this.players[i].heroId}" >${this.players[i].heroId}</td>`;
            tr.innerHTML += `<td class="column100 column1" data-column="column1"><img width="80px" src='${this.players[i].heroImgUrl}'></td>`;
            tr.innerHTML += `<td class="column100 column2" data-column="column2">${this.players[i].name}</td>`;
            tr.innerHTML += `<td class="column100 column3" data-column="column3">${this.players[i].kills}</td>`;
            tr.innerHTML += `<td class="column100 column4" data-column="column4">${this.players[i].deaths}</td>`;
            tr.innerHTML += `<td class="column100 column5" data-column="column5">${this.players[i].assists}</td>`;
            tr.innerHTML += `<td class="column100 column6" data-column="column6">${objSum(this.players[i].netForck)}</td>`;
            tr.innerHTML += `<td class="column100 column7" data-column="column7">${this.players[i].lastHits}/${this.players[i].denies}</td>`
            tr.innerHTML += `<td class="column100 column8" data-column="column8">${this.players[i].gpm}</td>`;
            tr.innerHTML += `<td class="column100 column9" data-column="column9">${this.players[i].xpm}</td>`;
            tr.innerHTML += `<td class="column100 column10" data-column="column10">${this.players[i].damage}</td>`;
            tr.innerHTML += `<td class="column100 column11" data-column="column11">${this.players[i].heal}</td>`;
            tr.innerHTML += `<td class="column100 column12" data-column="column12">${this.players[i].tDamage}</td>`;
            let temp = "";
            this.players[i].items.forEach((elem) => {
                if (elem != undefined) {
                    for (let i in itemDetalis) {
                        if (itemDetalis[i].id == elem) {
                            temp += ("<img class='item' id='" + elem + "' src='items/" + itemDetalis[i].name.replace("item_", "") + ".png'>")
                            break;

                        }
                    }


                }
            })
            tr.innerHTML += `<td class="column100 column12 items " data-column="column12">${temp}</td>`;
            table2.appendChild(tr);

        }
        div1.appendChild(table1);
        div2.appendChild(table2);
        matchesSection.appendChild(div1);
        matchesSection.appendChild(div2);
        matchesSection.addEventListener("mouseover", (event) => {
            if (event.srcElement.className == "item") {
                // let currentItem = event.srcElement.src.split("items/")[1].split(".")[0];
                let id = event.srcElement.id;
                itemDetalisInfo(id, event);
            }
        })
        return matchesSection;

    }

}


function itemDetalisInfo(item, event) {
    let div = document.createElement("div");
    document.getElementById("matches").addEventListener("mouseout", (event) => {
        div.remove();
    });
    let i = item;
    let manacost = 0;
    let cooldown = 0;
    let description = "";
    let notes = "";
    let attributes = "";
    let lore = "";
    if (itemDetalis[i].manaCost != undefined)
        manacost = itemDetalis[i].manaCost[0];
    if (itemDetalis[i].cooldown != undefined)
        cooldown = itemDetalis[i].cooldown[0];
    if (itemDetalis[i].description != undefined);
    description = itemDetalis[i].description.join("");
    if (itemDetalis[i].notes != undefined);
    notes = itemDetalis[i].notes.join("");
    if (itemDetalis[i].attributes != undefined);
    attributes = itemDetalis[i].attributes.join("");
    if (itemDetalis[i].lore != undefined);
    lore = itemDetalis[i].lore.join("");
    div.innerHTML += `<img src="items/${itemDetalis[i].name.replace(/item_/,"")}.png" alt="">
    <h4>${itemDetalis[i].displayName}</h4>
    <p>${itemDetalis[i].cost}</p>`;
    div.innerHTML += `<span>${description.replace(/h1/g,"span class='spanHead'")}</span>`;
    div.innerHTML += `<span>${notes}</span>`;
    div.innerHTML += `<span>${attributes.replace(/\+/g,"<br>+")}</span>`;
    div.innerHTML += `<p class="cd" >${cooldown}</p> `;
    div.innerHTML += ` <p class="manac">${manacost}</p> `;
    div.innerHTML += `<p>${lore}</p>`;

    document.getElementById("matches").appendChild(div);
    if (item == "ward_dispenser") return true;
    div.className = "itemDescription";

    if (event.clientX + 10 + div.clientWidth > window.innerWidth) {
        div.style.right = window.innerWidth - event.pageX + 10 + "px";

    } else {
        div.style.left = event.pageX + 10 + "px";
    }
    if (event.clientY + 10 + div.clientHeight > window.innerHeight) {
        if (event.clientY - div.clientHeight >= 0)
            div.style.bottom = window.innerHeight - event.pageY + "px";
        else
            div.style.top = window.scrollY + 10 + "px";

    } else {
        div.style.top = event.pageY + 10 + "px";

    }

}

function getMyData(myData, data) {
    myData.id = data.match_id;
    myData.radiantWin = data.radiant_win;
    myData.radiantScore = data.radiant_score;
    myData.radiantTeamId = data.radiant_team_id;
    myData.direScore = data.dire_score;
    myData.direTeamId = data.dire_team_id;
    myData.players = [];
    myData.duration = data.duration;
    myData.time = data.start_time;
    myData.gameMode = data.game_mode;
    if(data.dire_team!=undefined)
    {myData.direName=data.dire_team.name;
    myData.direLogo=data.dire_team.logo_url;
    myData.radiantName=data.radiant_team.name;
    myData.radiantLogo=data.radiant_team.logo_url;
    }
    for (let i = 0; i < data.players.length; i++) {
        myData.players.push(new Object());
        myData.players[i].heroId = data.players[i].hero_id;
        myData.players[i].lvl = data.players[i].level;
        myData.players[i].player_id = data.players[i].account_id;
        if (data.players[i].personaname != undefined)
            myData.players[i].name = data.players[i].personaname;
        else
            myData.players[i].name = "Anonymus";
        for (let k = 0; k < smallDataHero.length; k++) {
            if (myData.players[i].heroId == smallDataHero[k].id)
                myData.players[i].heroImgUrl = smallDataHero[k].img


        }

        myData.players[i].kills = data.players[i].kills;
        myData.players[i].assists = data.players[i].assists;
        myData.players[i].deaths = data.players[i].deaths;
        myData.players[i].netForck = data.players[i].gold_reasons;
        myData.players[i].lastHits = data.players[i].last_hits
        myData.players[i].denies = data.players[i].denies;
        myData.players[i].gpm = data.players[i].gold_per_min;
        myData.players[i].xpm = data.players[i].xp_per_min;
        myData.players[i].damage = data.players[i].hero_damage;
        myData.players[i].heal = data.players[i].hero_healing;
        myData.players[i].tDamage = data.players[i].tower_damage;
        myData.players[i].items = [];
        myData.players[i].items.push(data.players[i].item_0);
        myData.players[i].items.push(data.players[i].item_1);
        myData.players[i].items.push(data.players[i].item_2);
        myData.players[i].items.push(data.players[i].item_3);
        myData.players[i].items.push(data.players[i].item_4);
        myData.players[i].items.push(data.players[i].item_5);
        myData.players[i].items.push(data.players[i].item_6);
        myData.players[i].items.push(data.players[i].item_7);
        myData.players[i].items.push(data.players[i].item_8);

        myData.players[i].items = new Array();
        for (let k = 0; k < 9; k++) {
            myData.players[i].items.push(data.players[i]["item_" + k])

        }

        myData.players[i].isRadiant = data.players[i].isRadiant;

    }
    return myData;
}
