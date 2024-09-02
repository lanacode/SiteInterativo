let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');
let container = document.querySelector('.container');
let itens = container.querySelectorAll('.list .item');
let indicador = document.querySelector('.indicators');
let dots = indicador.querySelectorAll('ul li'); 

let active = 0;
let firstPosition = 0;
let lastPosition = itens.length - 1; 

prevButton.onclick = () => {
    
}

nextButton.onclick = () => {
    let itemOld = container.querySelector('.list, .item.active')
    itemOld.classlist.remove('active')
    active = active + 1 > lastPosition ? 0 : active + 1
    itens[active].classlist.add('active')
}
