let DOM_MinusButton = document.querySelector(".minus");
let DOM_PlusButton = document.querySelector(".plus");


DOM_PlusButton.addEventListener("click", function() 
{  
    let DOM_FornitureContainer = document.querySelector(".furnitureContainer");
    let DOM_Forniture = document.querySelectorAll(".furniture");

    let n = DOM_Forniture.length;
    if(n<8)
    {    let elem = document.createElement('div');
        elem.innerHTML = `
            <label class="label"> Arredamento ${n+1} </label>
            <input list="List2"  class="input" placeholder="Arredamento" >
            <input type="number" class="input" min="0" placeholder="Superficie Cm^2"> `;
        elem.className = 'furniture';
        DOM_FornitureContainer.appendChild(elem);
    }
});

DOM_MinusButton.addEventListener("click", function() 
{  
    let DOM_FornitureContainer = document.querySelector(".furnitureContainer");
    let DOM_Forniture = document.querySelectorAll(".furniture");

    let n = DOM_Forniture.length;
    if( n > 0)
    {
        DOM_FornitureContainer.removeChild(DOM_Forniture[n-1]);
    }
});