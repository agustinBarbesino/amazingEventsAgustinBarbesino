import * as modules from './functions.js'
let eventsArray = []
let currentDate = ""
fetch("https://aulamindhub.github.io/amazing-api/events.json")
.then(res => res.json())
   .then(data => {
      data.events.forEach(event => {
         eventsArray.push(event)
      })

      let pastEvents = []
      currentDate = data.currentDate
      const cardContainer = document.getElementById("cardContainer")
      cardContainer.innerHTML = ""
      
      for (let i = 0; i < eventsArray.length; i++) {
        
        let date2 = eventsArray[i].date
        
        if (currentDate > date2){
          pastEvents.push(eventsArray[i])
        }  
      }
      
      modules.generateCard(cardContainer, pastEvents);
      modules.generateCheckbox(pastEvents);

      let searchBox = document.getElementById("search")
      let checkArray = document.querySelectorAll(".check")

      checkArray.forEach(checkbox => {
         checkbox.addEventListener("change", () => {
          cardContainer.innerHTML = ""
          modules.applyFilters(searchBox, checkArray, pastEvents)}) 
      })

      searchBox.addEventListener("input", () => {
        cardContainer.innerHTML = ""
        modules.applyFilters(searchBox, checkArray, pastEvents)
      })
   })