let storage = JSON.parse(localStorage.getItem('pairList'))||[];

let addButton = document.getElementById('add');
let output = document.getElementById('pairList');
let deleteButton = document.getElementById('delete');
addButton.onclick = function (){
    let input = document.getElementById('pair');
    let target =document.createElement('p');
    target.innerText=input.value + '\n';
    target.classList.add('item');
    output.appendChild(target);
    storage.push(input.value);
    // заготовочка под локал стораге
    localStorage.setItem('pairList',JSON.stringify(storage));
    input.value='';
}
// нужно додумать как выделять объект
deleteButton.onclick = function (ev){
//    if(output.clinld?){
//        array items = document.querySelectorAll('.item.selected?');
//        items.for( item.delete)
//    }
//    else 'err'
}