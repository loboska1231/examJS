let storage = JSON.parse(localStorage.getItem('pairList'))||[];

let addButton = document.getElementById('add');
let output = document.getElementById('pairList');
let deleteButton = document.getElementById('delete');
addButton.onclick = function (){
    let input = document.getElementById('pair');
    let str = input.value.match(/\s*\w+\s*=\s*\w+\s*/g)+'';
    console.log(str,input.value)
    if(input.value === str){
        let temp = input.value.split('=');
        let target = document.createElement('p');
        let obj = {
            name : temp[0],
            value : temp[1]
        };
        if(storage.find(el=>(el.name === obj.name))) {
            input.placeholder = 'ERROR';
        }
        else {
            target.innerText=obj.name+'='+obj.value;
            output.appendChild(target);
            target.classList.add('item');
            storage.push(obj);
            localStorage.setItem('pairList', JSON.stringify(storage));
            input.placeholder = '';
        }
    }
    else input.placeholder = 'ERROR';
    input.value = '';
}
output.onclick = function(ev){
    let selectedTarget = ev.target;
    if(selectedTarget.classList.contains('item'))
        selectedTarget.classList.toggle('selected');
}
window.onload = function (){
    for(let el of storage){
        let p = document.createElement('p');
        p.classList.add('item');
        p.innerText = el.name+'='+el.value;
        output.appendChild(p);
    }
}
// нужно додумать как выделять объект
deleteButton.onclick = function (ev){
    if(output.hasChildNodes()){
        let items = Array.from(document.querySelectorAll('.item.selected'));
        for (const item of items.values()) {
            let list = JSON.parse(localStorage.getItem('pairList'));
            item.remove();
            let itemName = item.innerText.split('=')[0];
            let result = [];
            list.forEach(el=>{
                if(el.name!==itemName) result.push(el);
            });
            localStorage.setItem('pairList',JSON.stringify(result));
        }
    }
    else console.log('err');
}