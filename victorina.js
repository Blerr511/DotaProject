// if (window.location.search.search('miniGame') != -1) {
//     fetch("https://raw.githubusercontent.com/kriskate/dota-data/master/2019-03-05_23-21-25_70/items.json").then(data => data.json())
//         .then(data => {
//             let recipes = [];
//             for (const k in data) {
//                 if (data[k].components != undefined) {
//                     let temp = [];
//                     data[k].components.forEach((elem, id) => {
//                         temp.push(elem.replace('item_', ''));
//                         if (data[k].recipeCost != "")
//                             temp.push("recipe");
//                     })
//                     temp.forEach((element, id) => {
//                         data.forEach(elem => {
//                             if (element == elem.tag && elem.components != undefined) {
//                                 temp.splice(id, 1);
//                                 elem.components.forEach(el => {
//                                     temp.push(el);
//                                 })
//                             }
//                         })
//                     });

//                     recipes.push({
//                         _itemName: data[k].tag,
//                         _comp: temp
//                     })

//                 }
//             }
//             itemData = recipes;
//             console.log(data)
//         })
// }

// class MiniGame {

//     constructor(itemId) {
//         this.item = itemData[itemId]._itemName;
//         this.components = itemData[itemId].components;
//     }
//     startGame(){
//         this.div=document.createElement('div');
//         div.id='vicotrine';
//     }
//     startRound(){
        
//     }
// }