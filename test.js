   let itemData;

   fetch("https://raw.githubusercontent.com/kriskate/dota-data/master/2019-03-05_23-21-25_70/items.json").then(data => data.json())
       .then(data => {
           let recipes = [];
           for (const k in data) {
               if (data[k].components != undefined) {
                   let temp = [];
                   data[k].components.forEach((elem, id) => {
                       temp.push(elem.replace('item_', ''));
                       
                   })
                   if (data[k].recipeCost != "")
                           temp.push("recipe");
                   temp.forEach((element, id) => {
                       data.forEach(elem => {
                           if (element == elem.tag && elem.components != undefined) {
                               temp.splice(id, 1);
                               elem.components.forEach(el => {
                                   temp.push(el.replace('item_',''));
                               })
                           }
                       })
                   });

                   recipes.push({
                       _itemName: data[k].tag,
                       _comp: temp
                   })

               }
           }
           itemData = recipes;
           return [recipes, data];
       })
       .then(data => {
           let x = new MiniGame(Math.floor(Math.random()*data[0].length), data[0], data[1],3,0);
           x.startGame();
           
           console.log(data);
       })

   class MiniGame {

       constructor(itemId, compItems, noCompitems,lives,scores) {
           this.item = compItems[itemId]._itemName;
           this.components = compItems[itemId]._comp;
           this.compItems = compItems;
           this.noCompitems = noCompitems;
           this.lives=lives;
           this.scores=scores;
       }
       startGame() {
           console.log(this.components.join())
           this.div = document.getElementById('vicotrine');
           this.div.innerHTML = '';
           this.div.style.display = 'flex';
           this.div.style.justifyContent = 'center';
           this.div.style.flexDirection = 'column';
           this.div.style.alignItems = 'center';
           this.div.style.position='relative';
           let currentItem = document.createElement('div');
           currentItem.id = 'currentItem';
           let currentItemImg = document.createElement('img');
           currentItemImg.src = `items/${this.item}.png`;
           currentItem.appendChild(currentItemImg);
           this.div.appendChild(currentItem);
           let section = document.createElement('section');
           section.style.display = 'grid';
           section.style.gridTemplateColumns = "repeat(10,auto)";
           section.style.gridTemplateRows = "50px,50px"
           let randomPositons = [];
           let lives = document.createElement('p');
           let scores=document.createElement('p');
           lives.innerHTML=this.lives;
           scores.innerHTML=this.scores;
           lives.style.position='absolute';
           lives.style.top='10px';
           lives.style.left='10px';
           scores.style.position='absolute';
           scores.style.top='10px';
           scores.style.right='10px';
           this.div.appendChild(lives);
           this.div.appendChild(scores);
           this.components.forEach(elem => {
               let temp = Math.round(Math.random() * 19);
               while (randomPositons.includes(temp)) {
                   temp = Math.round(Math.random() * 19);
               }
               randomPositons.push(temp);
           })
           let selectComponents = [];

           for (let i = 0; i < 20; i++) {
               selectComponents.push(this.noCompitems[Math.floor(Math.random() * this.noCompitems.length)].tag);
           }
           let selecSection = document.createElement('section');
           selecSection.style.display = 'flex';
           selecSection.style.justifyContent = 'center';

           randomPositons.forEach((elem, id) => {
               selectComponents.splice(elem, 1, this.components[id]);
               let div = document.createElement('div');
               div.style.display = 'inline-flex';
               div.style.margin = '5px';
               div.style.height = '35px';
               div.style.width = '45px';
               div.style.justifyContent = 'center';
               div.style.alignItems = 'center';
               div.style.backgroundColor = 'gray';
               selecSection.appendChild(div);
           })
           this.div.appendChild(selecSection);
           let answer = [];
           selectComponents.forEach(elem => {
               let img = document.createElement('img');
               img.src = `items/${elem}.png`;
               section.appendChild(img);
               img.height = 30;

               const check = (arr1,arr2)=>{
                let temp=0;
                arr1.forEach((elem,i)=>{
                    arr2.forEach(elem2=>{
                        if(elem==elem2)
                        {
                            temp++;
                            arr1[i]="";
                        }
                    })

                })
                return temp==arr1.length
               }

               const addImg=()=> {
                if (answer.length < selecSection.children.length) {
                    answer.push(elem);
                    img.style.position = 'absolute';
                    selecSection.children[answer.length - 1].appendChild(img);

                    if(answer.length == selecSection.children.length)
                    {
                       console.log(this.components)
                        if(check(answer,this.components)){
                            new MiniGame(Math.floor(Math.random()*data[0].length), data[0], data[1],3,0);
                        }
                        else{
                            if(this.lives>0)
                            {
                                this.lives--;
                                lives.innerHTML=this.lives;
                            }
                            else
                            alert('You Lose')

                        }
                    }
                } 
                img.removeEventListener('click', addImg);
            img.addEventListener('click', removeImg)
            }

               img.addEventListener('click', addImg);

               
               function removeImg() {
                img.style.position='relative';  
                answer.splice(answer.indexOf(elem),1) 
                section.appendChild(img);
                img.addEventListener('click', addImg);
                img.removeEventListener('click', removeImg)
            }
              
               
           })
           console.dir()

           this.div.appendChild(section);

       }

   }