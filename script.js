let DOM_MinusButton = document.querySelector(".minus");
let DOM_PlusButton = document.querySelector(".plus");

DOM_PlusButton.addEventListener("click", function() 
{  
    let n = document.querySelectorAll(".furniture").length;  

    if( n < 8)
    {
        let DOM_c = document.querySelector(".furnitureContainer");
        DOM_c.innerHTML += ` 
        <div class="furniture">
            <label class="label"> Arredamento ${n+1} </label>
            <input list="List2"  class="input" placeholder="Arredamento" >
            <input type="number" class="input" min="0" placeholder="Superficie in Cm^2"> 
        </div>`;
    }
    console.log(n);
});

DOM_MinusButton.addEventListener("click", function() 
{  
    const n = document.querySelectorAll(".furniture").length;  

    if( n > 0)
    {

    }
});