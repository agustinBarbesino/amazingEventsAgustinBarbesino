import * as modules from './functions.js'
let eventsArray = []
let currentDate = ""
fetch("https://aulamindhub.github.io/amazing-api/events.json")
.then(res => res.json())
   .then(data => {
      data.events.forEach(event => {
         eventsArray.push(event)
      })

      let upcomingEvents = []
      currentDate = data.currentDate
      const cardContainer = document.getElementById("cardContainer")
      cardContainer.innerHTML = ""
      
      for (let i = 0; i < eventsArray.length; i++) {
        
        let date2 = eventsArray[i].date
        
        if (currentDate < date2){
          upcomingEvents.push(eventsArray[i])
        }  
      }

      modules.generateCard(cardContainer, upcomingEvents);
      modules.generateCheckbox(upcomingEvents);

      let searchBox = document.getElementById("search")
      let checkArray = document.querySelectorAll(".check")

      checkArray.forEach(checkbox => {
         checkbox.addEventListener("change", () => {
          cardContainer.innerHTML = ""
          modules.applyFilters(searchBox, checkArray, upcomingEvents)}) 
      })

      searchBox.addEventListener("input", () => {
        cardContainer.innerHTML = ""
        modules.applyFilters(searchBox, checkArray, upcomingEvents)
      })
   })