/*
This matrix contains for each row the name in Italian of the material, followed by the name in English, 
and in the third column we find an array with the coefficients of the material ordered 
with respect to frequencies [125, 250, 500, 1000, 2000, 4000]

Writing like this :

CoefMatrix[0].indexOf("material") it returns the index of the keyword material (in Italian)
CoefMatrix[1].indexOf("material") it returns the index of the keyword material (in English)

CoefMatrix[2][n] Returns the array of coefficients of the (n-1)-th material   

CoefMatrix[2][n][1] returns the 2nd coefficient of the (n-1)-th material

*/
const CoefMatrix = [
[`Mattoni`, `Calcestruzzo`, `Intonaco`, `Intonaco Cemento`, `Intonaco Gesso`, `Marmo Lucidato`, `Parquet Incollato`, 
`Parquet su Listelli`, `Ceramica`, `Linoleum`, `Moquette su Cemento`, `Gomma`, `Gesso liscio Sospeso`, `Specchio`,
`Bocchette ventilazione`,`Tenda Cotone no Drappeggio`, `Tenda Cotone poco Drappeggio`, `Tenda Cotone molto Drappeggio`,
`Tappeto Pesante`,`Perlinato Inchiodato`, `Sedia Legno Libera`, `Sedia Legno Occupata`, `Sedia Poco Imbottita Libera`,
`Sedia Poco Imbottita Occupata`, `Sedia Imbottita Libera`, `Sedia Imbottita Occupata`, `Persona Adulta`, `Finestra`, `Porta`, 
`Pannello Fonoassorbente generico 120x120`],

[`Briks`, `Concrete`, `Plaster`, `Cement Plaster`, `Gypsum plaster`, `Polished marble`, `Glued Parquet`,
`Parquet on Laths`, `Ceramics`, `Linoleum`, `Carpet on Cement`, `Rubber`, `Plain plaster Suspended`, `Mirror`,
`Vents`, `Cotton curtain no drape`, `Cotton Tent Little Draping`,`Cotton curtain much Drapery`,
`Heavy Carpet`, `Nailed-in Perlinato`,`Free Wooden Chair`, `Occupied Wooden Chair`, `Low Padded Free Chair`,
`Low Padded Occupied Chair`, `Padded Free Chair`, `Padded Occupied Chair`, `Adult Person`, `Window`, `Door`,
`Generic Soundproofing Panel 120x120` ], 

[[0.02, 0.02, 0.03, 0.04, 0.05, 0.07],  [0.01, 0.01, 0.02, 0.02, 0.02, 0.03], [0.01, 0.01, 0.02, 0.02, 0.02, 0.03],
 [0.02, 0.02, 0.033, 0.03, 0.04, 0.04], [0.02, 0.02, 0.03, 0.03, 0.03, 0.03], [0.01, 0.01, 0.01, 0.02, 0.02, 0.02],
 [0.02, 0.03, 0.04, 0.05, 0.05, 0.1],   [0.2, 0.15, 0.1, 0.1, 0.09, 0.07],    [0.01, 0.01, 0.02, 0.02, 0.03, 0.03],
 [0.02, 0.02, 0.03, 0.03, 0.04, 0.04],  [0.05, 0.08, 0.21, 0.26, 0.27, 0.3],  [0.04, 0.04, 0.06, 0.08, 0.08, 0.06],
 [0.25, 0.2, 0.1, 0.05, 0.05, 0.1],     [0.03, 0.02, 0.02, 0.02, 0.02, 0.02], [0.15, 0.2, 0.3, 0.35, 0.3, 0.2],
 [0.03, 0.05, 0.1, 0.15, 0.25, 0.3],    [0.08, 0.3, 0.5, 0.5, 0.6, 0.6],      [0.5, 0.5, 0.7, 0.9, 0.9, 0.9],
 [0.1, 0.2, 0.25, 0.3, 0.3, 0.3],       [0.6, 0.3, 0.1, 0.09, 0.09, 0.09],    [0.03, 0.05, 0.05, 0.1, 0.15, 0.1],
 [0.15, 0.25, 0.4, 0.4, 0.45, 0.4],     [0.03, 0.05, 0.05, 0.1, 0.15, 0.1],   [0.15, 0.25, 0.4, 0.4, 0.45, 0.4],
 [0.1, 0.2, 0.3, 0.3, 0.3, 0.35],       [0.2, 0.4, 0.45, 0.45, 0.5, 0.45],    [0.23, 0.32, 0.42, 0.42, 0.46, 0.46],
 [0.1, 0.4, 0.03, 0.02, 0.02, 0.2],     [0.12, 0.11, 0.10, 0.09, 0.08, 0.07], [0.6, 1, 1.8, 2.5, 2.5, 2.4] ]  
];

// Interface texts in different languages

const LangText = [
    [`Tempo di riverbero`,`Inserisci le dimensioni della stanza`, `Larghezza`, `Altezza`, `Profondità`, 
     `Di che materiali sono le pareti?`, `Muri perimetrali`, `Soffitto`, `Pavimento`, `Porte e finestre`, `Porte`, 
     `Finestre (ante)`, `Arredamento, sedili e persone`, `Calcola!`, `Risultato`, `Trattamento`],
    
    [`Reverberation time`, `Enter room dimensions`, `Width`, `Height`, `Depth`, `What materials are the walls made of?`,
     `Perimeter walls`, `Ceiling`, `Floor`, `Doors and windows`, `Doors`, `Windows (sash)`, `Furniture, seats and people`, 
     `Calculate!`, `Result`, `Treatment`]];
