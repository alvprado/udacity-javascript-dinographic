import { Human } from "./human.js";
import {
  loadDinos,
  buildGrid
} from "./utils.js";

(function(){
  const form = document.getElementById("dino-compare");
  const btn = document.getElementById("btn");

  btn.addEventListener("click", function(event){
    event.preventDefault();
    form.requestSubmit();
  })

  form.addEventListener("submit", async function(event){
    event.preventDefault();

    const heightInInches = form.feet.value * 12 + form.inches.value;

    const human = new Human({
        name: form.name.value,
        height: heightInInches,
        weight: form.weight.value,
        diet: form.diet.value
    });

    const dinos = await loadDinos();

    const grid = buildGrid(human, dinos);

    form.style.display = "none";     
    grid.style.display = "grid";
  })
})()

