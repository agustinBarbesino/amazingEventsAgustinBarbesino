import * as modules from './functions.js'
let eventsArray = []
fetch("https://aulamindhub.github.io/amazing-api/events.json")
.then(res => res.json())
   .then(data => {
      data.events.forEach(event => {
         eventsArray.push(event)
      })
      const cardContainer = document.getElementById("cardContainer")
      cardContainer.innerHTML = ""
      
      modules.generateCard(cardContainer, eventsArray); 
      modules.generateCheckbox(eventsArray);

      let searchBox = document.getElementById("search")
      let checkArray = document.querySelectorAll(".check")

      checkArray.forEach(checkbox => {
         checkbox.addEventListener("change", () => {
            cardContainer.innerHTML = ""
            modules.applyFilters(searchBox, checkArray, eventsArray)}) 
      })

      searchBox.addEventListener("input", () => {
         cardContainer.innerHTML = ""
         modules.applyFilters(searchBox, checkArray, eventsArray)
      })
   })
   