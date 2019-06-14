function map(obj) {
    let map = document.createElement("div");
    map.className = "map";
    let section=document.querySelector("#matches section");
    section.appendChild(map);
    let toProcent=100/400;
    const direObjectives = {
        mid: [196, 161, 250, 121, 290, 70],
        bot: [345, 216, 345, 156, 345, 85],
        top: [65, 20, 181, 10, 272, 10],
        t4: [328, 54, 314, 46],
        rax: {
            mid: [321, 81, 303, 69],
            bot: [360, 94, 337, 92],
            top: [298, 56, 300, 35],
        }
    }

    const radiantObjectives = {
        mid: [149, 209, 110, 242, 71, 260],
        bot: [305, 327, 182, 327, 89, 315],
        top: [33, 129, 35, 194, 15, 240],
        t4: [35, 295, 45, 302],
        rax: {
            mid: [63, 303, 54, 292],
            bot: [75, 338, 74, 322],
            top: [33, 287, 16, 287]
        }
    }
    for (const k in direObjectives) {
        if (k != "rax")

            for (let i = 0; i < direObjectives[k].length; i += 2) {
                let div = document.createElement("div");
                div.className = "towerDire";
                if (k != "t4") div.id = `npc_dota_badguys_tower${(i/2)+1}_${k}`;
                else div.id = `npc_dota_badguys_tower4_${i}`;
                div.innerHTML = '<img src="img/badguys_tower.png">'
                div.style.left = direObjectives[k][i]*toProcent + "%";
                div.style.top = i + direObjectives[k][i + 1]*toProcent + "%";
                map.appendChild(div);
            }
        else {
            for (const y in direObjectives.rax) {
                let divRange = document.createElement("div");
                divRange.className = "barrackDire";
                divRange.id = `npc_dota_badguys_range_rax_${y}`;

                let divMelee = document.createElement("div");
                divMelee.className = "barrackDire";
                divMelee.id = `npc_dota_badguys_melee_rax_${y}`;
                divMelee.innerHTML = '<img src="img/badguys_melee_rax.png">';
                map.appendChild(divRange);
                map.appendChild(divMelee);
                divRange.style.left = direObjectives.rax[y][0]*toProcent + "%";
                divRange.style.top = direObjectives.rax[y][1]*toProcent + "%";
                divRange.innerHTML = '<img src="img/badguys_range_rax.png">';

                divMelee.style.left = direObjectives.rax[y][2]*toProcent + "%";
                divMelee.style.top = direObjectives.rax[y][3]*toProcent + "%";
            }
        }

    }
    for (const k in radiantObjectives) {
        if (k != "rax")
            for (let i = 0; i < radiantObjectives[k].length; i += 2) {
                let div = document.createElement("div");
                div.className = "towerRadiant";
                if (k != "t4") div.id = `npc_dota_goodguys_tower${(i/2)+1}_${k}`;
                else div.id = `npc_dota_goodguys_tower4_${i}`;
                div.innerHTML = '<img src="img/goodguys_tower.png">'

                div.style.left = radiantObjectives[k][i]*toProcent + "%";
                div.style.top = i + radiantObjectives[k][i + 1] *toProcent + "%";
                map.appendChild(div);
            }
        else {
            for (const y in radiantObjectives.rax) {
                let divRange = document.createElement("div");
                divRange.className = "barrackRadiant";
                divRange.id = `npc_dota_goodguys_range_rax_${y}`;
                divRange.style.left = radiantObjectives.rax[y][0]*toProcent + "%";
                divRange.style.top = radiantObjectives.rax[y][1]*toProcent + "%";
                divRange.innerHTML = '<img src="img/goodguys_range_rax.png">';

                let divMelee = document.createElement("div");
                divMelee.className = "barrackRadiant";
                divMelee.id = `npc_dota_goodguys_melee_rax_${y}`;
                divMelee.innerHTML = '<img src="img/goodguys_melee_rax.png">';
                divMelee.style.left = radiantObjectives.rax[y][2]*toProcent + "%";
                divMelee.style.top = radiantObjectives.rax[y][3]*toProcent + "%";
                map.appendChild(divRange);
                map.appendChild(divMelee);

            }
        }

    }
    obj.forEach(element => {
        if (document.getElementById(element.key) != undefined) {
            let tower, url, building;
            tower = document.getElementById(element.key);


            if (element.unit.search("goodguys") != -1)
                url = "img/Radiant_icon.png"
            else if (element.unit.search("badguys") != -1)
                url = "img/Dire_icon.png"
            else
                url = `https://steamcdn-a.akamaihd.net/apps/dota2/images/heroes/${element.unit.replace("npc_dota_hero_","")}_icon.png`



            building = element.key.replace(/npc_dota_/, "").replace(/_top|_mid|_bot{1}/, "").replace(/\d/, "");
            tower.firstChild.style.backgroundColor = "rgba(162, 37, 37, 0.411)";
            tower.firstChild.style.zIndex = "2";
            tower.addEventListener("mouseover", (event) => {
                let img  = document.createElement("img");
                let img2=document.createElement("img");
                img.src = url;
                img2.src='img/swords.png';
                img2.style.position = "absolute";
                img2.style.right = "30px";
                img2.style.zIndex = 5;
                img2.style.backgroundColor = "rgba(162, 37, 37, 0.411)";
                img.style.backgroundColor = "rgba(162, 37, 37, 0.411)";
                
                
                img.style.position = "absolute";
                img.style.right = "55px";
                img.style.zIndex = 5;
                let p =document.createElement("p");
                p.innerHTML=getTime(element.time);
                p.style.position="absolute";
                p.style.right="30px";
                p.style.top="30px";
                p.style.padding='5px';
                p.style.backgroundColor="#e1e1e160";
                p.style.color="#000000";
                p.style.fontWeight=550;
                tower.appendChild(p);
                tower.insertBefore(img2, tower.firstChild);
                tower.insertBefore(img, img2);
            });
            tower.addEventListener("mouseout", (event) => {
                tower.firstChild.remove();
                tower.firstChild.remove();
                tower.lastChild.remove();

            })
            //    tower.innerHTML = ` <img src="img/${building}.png"> `;


        }

    });

}


function advGraph(arr,cW,cH) {
    let goldAdv = arr;

    let divParrent=document.createElement("div");
    divParrent.style.position="relative";
    let canvas = document.createElement("canvas");
    divParrent.appendChild(canvas);
    let mouseOnDiv=false;
    canvas.style.backgroundColor = "#2E3740";
    canvas.width = cW;
    canvas.height = cH;
    canvas.style.border = "1px solid black";
    let ctx = canvas.getContext("2d");
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < goldAdv.length / 5; i++) {
            ctx.beginPath();
            let x = canvas.width / Math.floor(goldAdv.length / 5);
            ctx.fillStyle = "#1C242D";
            ctx.fillRect((i * x) + 20, j * ((canvas.height - 10) / 4), x - 1, ((canvas.height - 10) / 4) - 1);
            if (j == 3) {
                ctx.beginPath();
                ctx.fillStyle = "#ffffff70";
                ctx.fillText(`${i*5}:00`, (i * x) + 10, canvas.height - 2);
                ctx.fill()
            }
        }


    }

    let rad = Math.ceil(Math.max(...goldAdv) / 1000);
    while (rad % 5 != 0) {
        rad++;
    }
    rad *= 1000;
    let dire = Math.ceil(Math.min(...goldAdv) / 1000);
    while (dire % 5 != 0) {
        dire--;
    }
    dire *= 1000;
    let max = Math.max(Math.abs(rad), Math.abs(dire));

    ctx.strokeStyle = "#92A525";
    ctx.lineCap = "round";
    ctx.lineWidth = "4";

    let cords = goldAdv.map((elem, i) => {
        ctx.lineTo(((i + 1) * ((canvas.width - 10) / goldAdv.length)) + 10, canvas.height / 2 - (canvas.height / 2 * elem / max));
        return [Math.floor(i * ((canvas.width - 10) / goldAdv.length)),Math.floor(canvas.height / 2 - (canvas.height / 2 * elem / max))];
    })
    ctx.stroke();

    ctx.lineTo(canvas.width, canvas.height / 2 - (canvas.height / 2 * goldAdv[goldAdv.length - 1] / max))
    ctx.lineTo(canvas.width, canvas.height / 2);

    ctx.fillStyle = "#92A52566";
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#ffffff50';
    ctx.fillText(max / 1000 + "k", 1, 10);
    ctx.fillText(max / 2000 + "k", 1, canvas.height / 4);
    ctx.fillText(0, 5, canvas.height / 2);
    ctx.fillText(max / 2000 + "k", 1, ((canvas.height / 4) * 3) - 10);
    ctx.fillText(max / 1000 + "k", 1, canvas.height - 10);
   


    divParrent.addEventListener("mousemove",(e)=>{
        let x = e.offsetX;
        if(divParrent.lastChild!=canvas){
        divParrent.lastChild.remove();
        divParrent.lastChild.remove();

        }
      
        for (let i = 0; i < cords.length; i++) {
            if(cords[i][0]-x<=10&&cords[i][0]-x>=-10){
                let div = document.createElement("div");
                div.style.padding="8px";
                div.style.backgroundColor="#C23C2A";
                div.style.borderRadius="10px";    
                div.style.position='absolute';
                
                div.style.left=cords[i][0]+14+"px";
                div.style.top=cords[i][1]-8+"px";
             
                divParrent.appendChild(div);

                let divInfo=document.createElement("div");
                if(goldAdv[i]>0){
                divInfo.innerHTML=`Radiant adventage at ${i}:00 : ${Math.round(goldAdv[i]/100)/10+"k"}`;
                divInfo.style.border="2px #92A525 solid";
                divInfo.style.backgroundColor="#92A52560";
                }
                else{
                divInfo.innerHTML=`Dire adventage at ${i}:00 : ${-Math.round(goldAdv[i]/100)/10+"k"}`;
                divInfo.style.border="2px #C23C2A solid";
                divInfo.style.backgroundColor="#C23C2A60";
                }
                divInfo.style.color="#e1e1e1";
                divInfo.style.fontWeight=600;
                divInfo.style.padding="5px";
                divInfo.style.position='absolute';
                divInfo.style.top=cords[i][1]+10+"px";
                if(e.srcElement==divInfo)
                console.log('divinfo')
                divParrent.appendChild(divInfo);
                let tempX=0;
                while(cords[i][0]+divInfo.clientWidth-tempX>canvas.width){
                tempX++;
                }
                divInfo.style.left=cords[i][0]-tempX+"px";
                
                break;
            }
        }
      
        // canvas.addEventListener("mouseout",(e)=>{
        //     if(divParrent.lastChild!=canvas&&mouseOnDiv==false){
        //         divParrent.lastChild.remove();
        //         divParrent.lastChild.remove();
        //     }
        // })
    })

  
    return divParrent;

}