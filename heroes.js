function printHeroData(arr) {
    let url = "https://api.stratz.com/api/v1/Hero/metaTrend";
    let main = document.getElementsByTagName("main")[0];
    let sec;
    if (document.getElementsByClassName("heroSection")[0] == undefined) {
        sec = document.createElement("section");
        sec.className = "heroSection";
        console.log("X")
    } else sec = document.getElementsByClassName("heroSection")[0];
    console.log(sec);
    x = arr;
    fetch(url)
        .then(data => data.json())
        .then(data => {
            let inner = `<table class="heroPlace"><th><td>Hero</td><td>Pick</td><td>Ban</td><td>Winrate</td></th>`;
            let allPick = 0;
            let allBan = 0;
            data.forEach((elem) => {
                allPick += elem.pick.reduce((el, x) => el + x);
                allBan += elem.ban.reduce((el, x) => el + x);
            })

            console.log(allPick, allBan)
            arr.forEach((hero, id) => {
                hero.__proto__ = data[id];
                let win = hero.win.reduce((win, x) => win + x);
                let pick = hero.pick.reduce((pick, x) => pick + x);
                let ban = hero.ban.reduce((ban, x) => ban + x);

                inner += `<tr id="hero${hero.id}">
            <td>
                <img src="${hero.img}">
            </td>
            <td>
                <p>${hero.name}</p>
            </td>
            <td>
            <p> ${(Math.floor((pick/allPick)*10000))/10} %</p><span class="pick" style="width:${(Math.floor((pick/allPick)*1000))*2}%"></span>
            </td>
        <td><p> ${(Math.floor((ban/allBan)*10000))/10} %</p><span  class="ban" style="width:${(Math.floor((ban/allBan)*1000)*2)}%"></span></td>
           <td><p> ${(Math.floor((win/pick)*1000))/10} %</p><span class="wr" style="width:${(Math.floor((win/pick)*100))*2}%"></span></td>
        </tr>`

            })
            inner += "</table>"
            sec.innerHTML = inner;
        })

    main.appendChild(sec);
}