let eventsArray = []
let currentDate = ""  
fetch("https://aulamindhub.github.io/amazing-api/events.json")
.then(res => res.json())
   .then(data => {
      data.events.forEach(event => {
         eventsArray.push(event)
      })
      currentDate = data.currentDate
      let eventID = window.location.href
      eventID = new URL(eventID).searchParams.get("value")
      console.log(eventID)
      let eventDetails = document.getElementById("eventDetails")

      generateDetails(eventDetails, eventsArray)

      function generateDetails(eventDetails, events) {
        for (let i = 0; i < events.length; i++) {
          if (events[i]._id == eventID) {
            let details = document.createElement("div")
            details.classList.add("row", "justify-content-center", "align-items-center")
            details.innerHTML = 
            `<div class="col-md-4">
                <img src="${events[i].image}" class="img-fluid rounded-start" alt="">
            </div>
            <div class="col-md-4">
                <div cla4ss="card-body">
                    <h6>${events[i].name}</h6>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Date: ${events[i].date < currentDate? "The event is gone!":events[i].date}</li>
                    <li class="list-group-item">Category: ${events[i].category}</li>
                    <li class="list-group-item">Place: ${events[i].place}</li>
                    <li class="list-group-item">Capacity: ${events[i].capacity}</li>
                    <li class="list-group-item">${events[i].date < currentDate?"Assistance: "+events[i].assistance:"Estimate: "+events[i].estimate}</li>
                    <li class="list-group-item">Price: ${events[i].price}</li>
                </ul>
            </div>`
            eventDetails.appendChild(details)  
          }
        }
      }
    })


