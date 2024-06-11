let eventsArray = []
let upcomingEvents = []
let pastEvents = []
let currentDate = ""

fetch("https://aulamindhub.github.io/amazing-api/events.json")
.then(res => res.json())
    .then(data => {
        currentDate = data.currentDate
        
        data.events.forEach(event => {
            eventsArray.push(event)
        })
        console.log(eventsArray);
        eventsArray.forEach(event => {
            currentDate > event.date? pastEvents.push(event) : upcomingEvents.push(event)
        })

        console.log(pastEvents);
        firstTable(eventsArray, pastEvents, upcomingEvents)

        function percentagePast(array) {
            let percArray = []
            array.forEach(event => {
                let perc = (event.assistance / event.capacity) * 100
                event.perc = perc
                percArray.push(event)
            });
            percArray.sort((a, b) => b.perc - a.perc)
            return percArray
        }

        function percentageUpcoming(array) {
            let percArray = []
            array.forEach(event => {
                let perc = (event.estimate / event.capacity) * 100
                event.perc = perc
                percArray.push(event)
            });
            percArray.sort((a, b) => b.perc - a.perc)
            return percArray
        }

        function summarizePast(events) {
            const summary = {};
          
            events.forEach(event => {
              if (!summary[event.category]) {
                summary[event.category] = {
                  totalRevenue: 0,
                  totalAssistance: 0,
                  totalCapacity: 0
                };
              }
          
              summary[event.category].totalRevenue += event.price * event.assistance;
              summary[event.category].totalAssistance += event.assistance;
              summary[event.category].totalCapacity += event.capacity;
            });
            console.log(summary);
            return Object.keys(summary).map(category => {
              const totalRevenue = summary[category].totalRevenue;
              const totalAssistance = summary[category].totalAssistance;
              const totalCapacity = summary[category].totalCapacity;
              const attendancePercentage = (totalAssistance / totalCapacity) * 100;
          
              return {
                category,
                totalRevenue,
                attendancePercentage: attendancePercentage.toFixed(2)
              };
            });
        }

        function summarizeUpcoming(events) {
            const summary = {};
          
            events.forEach(event => {
              if (!summary[event.category]) {
                summary[event.category] = {
                  totalRevenue: 0,
                  totalEstimate: 0,
                  totalCapacity: 0
                };
              }
          
              summary[event.category].totalRevenue += event.price * event.estimate;
              summary[event.category].totalEstimate += event.estimate;
              summary[event.category].totalCapacity += event.capacity;
            });
            
            return Object.keys(summary).map(category => {
              const totalRevenue = summary[category].totalRevenue;
              const totalEstimate = summary[category].totalEstimate;
              const totalCapacity = summary[category].totalCapacity;
              const attendancePercentage = (totalEstimate / totalCapacity) * 100;
          
              return {
                category,
                totalRevenue,
                attendancePercentage: attendancePercentage.toFixed(2)
              };
            });
            
        }

        function firstTable(array, arrayPast, arrayUpcoming) {
            let container = document.getElementById("divTables")
            container.innerHTML = ""
            
            let table1 = document.createElement("table")
            table1.classList.add("table")
            
            let table2 = document.createElement("table")
            table2.classList.add("table")
            
            let table3 = document.createElement("table")
            table3.classList.add("table")
            
            let percArray = percentagePast(arrayPast)
            
            let capacitySort = array.sort((a,b) => b.capacity - a.capacity)
            console.log(capacitySort);
            table1.innerHTML = 
            `<tr class="table-dark" >
                <th scope="col" colspan="3">Events Statistics</th>
            </tr>
            <tr>
                <td>Event with Highest % of Assistance</td>
                <td>Event with Lowest % of Assistance</td>
                <td>Event with Larger Capacity</td>
            </tr>
            <tr>
                <td>${percArray[0].name} (${(percArray[0].perc).toFixed(2)})</td>
                <td>${percArray[percArray.length - 1].name} (${percArray[percArray.length - 1].perc})</td>
                <td>${capacitySort[0].name} (${capacitySort[0].capacity})</td>
            </tr>`

            let categorysPast = summarizePast(arrayPast)
            let categorysUpcoming = summarizeUpcoming(arrayUpcoming)

            table2.innerHTML = 
            `<tr class="table-dark" >
                <th scope="col" colspan="3">Upcoming Events Statistics by Category</th>
            </tr>
            <tr>
                <td>Categories</td>
                <td>Revenues</td>
                <td>Porcentage of Assistance</td>
            </tr>`
            for (let i = 0; i < categorysPast.length; i++) {
                 let categoryPast = document.createElement("tr")
                 categoryPast.innerHTML = 
                 `<td>${categorysPast[i].category}</td>
                 <td>$${categorysPast[i].totalRevenue}</td>
                 <td>${categorysPast[i].attendancePercentage}</td>`
                 table2.appendChild(categoryPast)
            }

            table3.innerHTML = 
            `<tr class="table-dark" >
                <th scope="col" colspan="3">Past Events Statistics by Category</th>
            </tr>
            <tr>
                <td>Categories</td>
                <td>Revenues</td>
                <td>Porcentage of Assistance</td>
            </tr>`
            for (let i = 0; i < categorysUpcoming.length; i++) {
                let categoryUpcoming = document.createElement("tr")
                categoryUpcoming.innerHTML = 
                `<td>${categorysUpcoming[i].category}</td>
                <td>$${categorysUpcoming[i].totalRevenue}</td>
                <td>${categorysUpcoming[i].attendancePercentage}</td>`
                table3.appendChild(categoryUpcoming)
            }

            container.appendChild(table1)
            container.appendChild(table2)
            container.appendChild(table3)

        }
    })