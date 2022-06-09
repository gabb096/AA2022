let DOM_MinusButton = document.querySelector(`.minus`);
let DOM_PlusButton = document.querySelector(`.plus`);
let DOM_EnterButton = document.querySelector(`.enter`);
//let DOM_PlotSection = document.querySelector(`.plotSection`);
let frequencies = [125, 250, 500, 1000, 2000, 4000];// The frequencies (Hz) at which the coefficients were calculated 

let lang = 0;

// Add new furniture input, max 8 elements
DOM_PlusButton.addEventListener(`click`, function() 
{  
    let DOM_FornitureContainer = document.querySelector(`.furnitureContainer`);
    let DOM_Forniture = document.querySelectorAll(`.furniture`);

    let string = [`Arredamento,sedili,persone`, `Furniture,seats,people`, `Superficie`, `Surface`]

    let n = DOM_Forniture.length;
    if(n<8)
    {   
        let elem = document.createElement('div');
        elem.innerHTML = `
            <label class="label">${n+1}</label>
            <input list="List2"  class="input" name="furniture" placeholder=${ string[lang] } >
            <input type="number" class="input" min="0" placeholder="${ string[lang+2] } Cm^2"> `;
        elem.className = 'furniture';
        DOM_FornitureContainer.appendChild(elem);
    }
});

// Remove last furniture input 
DOM_MinusButton.addEventListener(`click`, function() 
{  
    let DOM_FornitureContainer = document.querySelector(`.furnitureContainer`);
    let DOM_Forniture = document.querySelectorAll(`.furniture`);

    let n = DOM_Forniture.length;

    if( n > 0)
        DOM_FornitureContainer.removeChild(DOM_Forniture[n-1]);
});

// Calculate RT60 and show plot 
DOM_EnterButton.addEventListener(`click`, function(){

    // if(checkFormSubmition)
    //     return;

    // Calculate RT60 with Sabine's formula for each frequency and their average
    let RT60perFreq = CalculateRT60();
    let averageRT60 = 0;

    for(let i=0; i<RT60perFreq.length; i++)
        averageRT60 += RT60perFreq[i]/RT60perFreq.length;

    // Define Data
    Pre_Treatment = {
        x: [`125`, `250`, `500`, `1000`, `2000`, `4000`],
        y: RT60perFreq,
        type: 'bar',
        name: 'Pre',
        marker: { color: 'rgb(76, 175, 80)'}
      };
      
    let data = [Pre_Treatment];
    // Define Layout
    let layout = {
        title: 'RT60',
        xaxis: {
          tickangle: -45,
          title: "Hz",
          type:"category"
        },
        yaxis: {
            tickangle: -45,
            title: "Seconds"
          },
        barmode: 'group'
      };
    // Display using Plotly

    Plotly.newPlot(`myPlot`, data, layout);
});

function chekForm(){
// TO-DO
}

function CalculateRT60(){

    // Get the all input values
    let userInput = document.querySelectorAll(`input`);
    /* 
    The user inputs are formatted so we know that:

    userInput[0].value is the width  in cm of the room,
    userInput[1].value is the height in cm of the room,
    userInput[2].value is the depth  in cm of the room,

    userInput[3].value is the perimeter wall material,
    userInput[4].value is the ceiling material,
    userInput[5].value is the floor material,

    userInput[6].value is the number of doors,
    userInput[7].value is the number of windows, 
    
    From now it continues in pairs, 
    userInput[8].value is the material and userInput[9].value is its surface area in cm^2,
    userInput[10].value is the material and userInput[11].value is its surface area in cm^2,
    and so on until we run out of inputs.
    */

    // Room's volume in m^3
    let V = userInput[0].value * userInput[1].value * userInput[2].value / Math.pow(100,3);
    // We assume that Ceiling and Floor surfaces (m^2) are equals
    let CFsurface = userInput[0].value * userInput[2].value / Math.pow(100,2);
    // Surface of perimeter walls in m^2
    let Pwall = userInput[1].value * ( Number(userInput[0].value) + Number(userInput[2].value)) * 2 / Math.pow(100,2);

    // From which we remove the surfaces of any doors (0.8x2.5 = 2 m^2 ) and windows sash (0.45x1 = 0.45 m^2)
    Pwall -= Number(userInput[6].value) * 2 + Number(userInput[7].value) * 0.45;
    
    let A_perFreq = [0, 0, 0, 0, 0, 0];  // Total absorption per frequency
    let RT60_perFreq = [0, 0, 0, 0, 0, 0]; 
    let k = CoefMatrix.length-1; //

    // Absorption coefficients of perimeter wall, ceiling and floor 
    let n = [CoefMatrix[lang].indexOf(String(userInput[3].value)), 
             CoefMatrix[lang].indexOf(String(userInput[4].value)), 
             CoefMatrix[lang].indexOf(String(userInput[5].value)) ];

    for(let j=0; j<A_perFreq.length; j++)
    {
        A_perFreq[j] += CoefMatrix[k][ n[0] ][j] * Pwall;     // Absorption of perimeter walls
        A_perFreq[j] += CoefMatrix[k][ n[1] ][j] * CFsurface; // Absorption of ceiling
        A_perFreq[j] += CoefMatrix[k][ n[2] ][j] * CFsurface; // Absorption of floor
    }

    if(userInput.length>7)
        for(let i=8; i<userInput.length; i+=2)
        {
            n = CoefMatrix[lang].indexOf(String(userInput[i].value));
            
            if(n!=-1)
                for(let j=0; j<A_perFreq.length; j++)
                    A_perFreq[j] += CoefMatrix[k][n][j] * Number(userInput[i+1].value) / Math.pow(100,2);
        }

    for(let i=0; i<RT60_perFreq.length; i++)
        RT60_perFreq[i] = (0.16*V/A_perFreq[i]).toFixed(3);
    
    console.log(RT60_perFreq)

    return RT60_perFreq;
}

function changeLanguage(newLang){
    let DOM_TextsToChange = document.querySelectorAll(`.LangText`);
    let DOM_List = document.querySelectorAll(`.List`);

    document.documentElement.lang = newLang;

    switch(newLang) {
        case `It`:
            lang = 0;

        case `Eng`:
            lang = 1;

        default:
            lang = 1;
    }

// Change all label texts
    for( let i=0; i<DOM_TextsToChange.length; i++)
        DOM_TextsToChange[i].innerHTML = LangText[lang][i];

// Change all texts in the `materials` list
   
    for( let j=0; j<DOM_List.length; j++)
        DOM_List[j].value=CoefMatrix[lang][j];
}
