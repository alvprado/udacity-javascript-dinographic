import { Dino } from "./dino.js";

/**
 * Compares the weight of dino dino to a human
 * @param {object} human 
 * @param {object} dino 
 * @returns A string commenting the weight comparison between dino and human
 */
function compareWeight(human, dino)
{
    const weight_difference = dino.weight - human.weight;

    if(weight_difference > 0)
    {
        return `A ${dino.species} weight ${weight_difference} pounds more than ${human.name}.`
    }
    
    if (weight_difference < 0) {
        return `${human.name} weights ${Math.abs(weight_difference)} pounds more than a ${dino.species}.`
    }  
    
    return `A ${dino.species} and ${human.name} weight the same.`
}

/**
 * Compares the height of dino dino to a human
 * @param {object} human 
 * @param {object} dino 
 * @returns A string commenting the height comparison between dino dino and the human
 */
function compareHeight(human, dino)
{
    const height_difference = dino.height - human.height
    
    if(height_difference > 0)
    {
        return `A ${dino.species} is ${height_difference} inches taller more than ${human.name}.`
    } 

    if (height_difference < 0) 
    {
        return `${human.name} is ${Math.abs(height_difference)} inches taller more than a ${dino.species}.`
    }  
    
    return `A ${dino.species} and ${human.name} are the same height.`
    
}

/**
 * Compares the diet of dino dino to a human
 * @param {object} human 
 * @param {object} dino 
 * @returns A string commenting the diet comparison between dino dino and the human
 */
function compareDiet(human, dino)
{
    return `${human.name} is ${human.diet}, whereas a ${dino.species} is ${dino.diet}.`
}

/**
 * Gets a random element from a container (array)
 * @param {array} container 
 * @returns 
 */
function pickRandomElementFromContainer(container)
{
    return container[Math.floor(Math.random() * container.length)];
}

/**
 * Choose a random fact
 * @param {object} dino 
 * @param {object} human 
 * @returns A string being a random fact
 */
function chooseFact(dino, human) {
  if (dino.species === "Pigeon") return "All birds are dinosaurs.";

  const pool = [
    () => dino.fact,                                       
    () => `Lived in ${dino.where}.`,                       
    () => `From the ${dino.when} period.`,                 
    () => compareWeight(human, dino),                      
    () => compareHeight(human, dino),                      
    () => compareDiet(human, dino)                         
  ];

  return pickRandomElementFromContainer(pool)();
}


/**
 * Creates a dino tile
 * @param {object} dino 
 * @param {object} human 
 * @returns A tile of a dino
 */
function createDinoTile(dino, human) {
    const tile = document.createElement("div");
    tile.className = "grid-item";

    const title = document.createElement("h3");
    title.textContent = dino.species;

    const img = document.createElement("img");
    img.src = dino.image;          // you already set this in the class
    img.alt = dino.species;

    const fact = document.createElement("p");
    fact.textContent = chooseFact(dino, human); 

    tile.appendChild(title);
    tile.appendChild(img);
    tile.appendChild(fact);

    return tile;
}

/**
 * Creates a human tile
 * @param {Object} human 
 * @returns A tile of an human
 */
export function createHumanTile(human)
{
    const tile = document.createElement("div");
    tile.className = "grid-item";

    const title = document.createElement("h3");
    title.textContent = human.name

    const img = document.createElement("img");
    img.src = `./images/human.png`
    img.alt = "human"

    tile.appendChild(title);
    tile.appendChild(img)
    
    return tile;
}

/**
 * Load dinos from json
 * @returns 
 */
export async function loadDinos() {
  const res  = await fetch("dino.json");
  const data = await res.json();    

  const dinos = data.Dinos.map(d => new Dino(d));
  return dinos;        
}

/**
 * Build a grid
 * @param {object} human 
 * @param {object} dinos 
 * @returns A grid of human and dinos
 */
export function buildGrid(human, dinos)
{
    const grid = document.getElementById("grid");

    const tiles = [
        dinos[0], dinos[1], dinos[2],
        dinos[3], "HUMAN",  dinos[4],
        dinos[5], dinos[6], dinos[7]
    ];

    // Clear grid and render
    grid.innerHTML = "";
    tiles.forEach(item => {
        if (item === "HUMAN") {
        grid.appendChild(createHumanTile(human));
        } else {
        grid.appendChild(createDinoTile(item, human));
        }
    });

    return grid;
}