let addButton = document.getElementById('add');
let output = document.getElementById('pairList');
let deleteButton = document.getElementById('delete');
addButton.onclick = function (){
    let storage = JSON.parse(localStorage.getItem('pairList'))||[];
    let input = document.getElementById('pair');
    let str = input.value.match(/\s*[a-zA-Z0-9\s*]+\s*=\s*-?[a-zA-Z0-9\s]+\s*/g)+'';
    if(input.value === str){
        let temp = input.value.split('=');
        let target = document.createElement('p');
        let obj = {
            name : temp[0].replaceAll(' ',''),
            value : temp[1].replaceAll(' ','')
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
    let storage = JSON.parse(localStorage.getItem('pairList'))||[];
    for(let el of storage){
        let p = document.createElement('p');
        p.classList.add('item');
        p.innerText = el.name+'='+el.value;
        output.appendChild(p);
    }
}
deleteButton.onclick = function (){
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
let sortByName = document.getElementById('sortByName');
let sortByValue = document.getElementById('sortByValue');
sortByName.onclick = function (){
    let storage = JSON.parse(localStorage.getItem('pairList'))||[];
    if(output.hasChildNodes() && storage){
        output.innerHTML = '';
        let nums = [];
        let strs = [];
        storage.forEach(t=> (isNaN(Number(t.name))? strs:nums).push(t));
        nums.sort();
        strs.sort();
        storage = nums.concat(strs);
        localStorage.setItem('pairList',JSON.stringify(storage));
        for (const t of storage) {
            let p = document.createElement('p');
            p.classList.add('item');
            p.innerText=t.name+'='+t.value;
            output.appendChild(p);
        }
    }
    else console.log('err')
}
sortByValue.onclick = function (){
    let storage = JSON.parse(localStorage.getItem('pairList'))||[];
    if(output.hasChildNodes() && storage){
        output.innerHTML = '';
        let nums = [];
        let strs = [];
        storage.forEach(t=> (isNaN(Number(t.value))? strs:nums).push(t));
        nums.sort((a,b)=>Number(a.value)-Number(b.value));
        strs.sort();
        storage = nums.concat(strs);
        localStorage.setItem('pairList',JSON.stringify(storage));
        for (const t of storage) {
            let p = document.createElement('p');
            p.classList.add('item');
            p.innerText=t.name+'='+t.value;
            output.appendChild(p);
        }
    }
    else console.log('err')
}