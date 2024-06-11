
export function generateCard(cardContainer, array) {
  
  cardContainer.innerHTML=""
    
  if (array.length != 0) {
    for (let i = 0; i < array.length; i++) {
      
    let newCard = document.createElement("div")
        
    newCard.classList.add("card", "col-6",  "col-md-3", "p-3")
    
    newCard.innerHTML = `<img src="${array[i].image}" class="card-img-top p-2" alt="food">
    <div class="card-body">
      <h5 class="card-title">${array[i].name}</h5>
      <p class="card-text">${array[i].description}</p>
    </div>
    <div class="card-body">
      <a href="#" class="card-link">Price: $${array[i].price}</a>
      <a href="details.html?value=${array[i]._id}" class="details card-link">Details</a>
    </div>`
          
    cardContainer.appendChild(newCard) 
    }
  } else {
    console.log("el arreglo no tiene eventos");
  } 
}

export function generateCheckbox(array) {

  let divcheck = document.getElementById("divSearch")
  divcheck.innerHTML = ""
  let categorys = [] 
  
  for (let i = 0; i < array.length; i++) {
    if (!categorys.includes(array[i].category)) {
      categorys.push(array[i].category)
    } 
  }
    
  for (let i = 0; i < categorys.length; i++) {
    let check = document.createElement("div")
    check.classList.add("m-3", "form-check")
    check.innerHTML = 
    `<input type="checkbox" class="check form-check-input" value="${categorys[i]}">
    <label class="form-check-label" for="check">${categorys[i]}</label>`
        
    divcheck.appendChild(check)
      
  } 
}

export function applyFilters(searchBox, checkArray, array) {
  
  let text = searchBox.value
  let filteredEvents = [...array]
  console.log(filteredEvents);
  if (text !== "") {
    filteredEvents = filterSearch(text, filteredEvents)
  }
  
  filteredEvents = filterCheck(checkArray, filteredEvents)
  if (filteredEvents.length == 0) {
    alert("No events were founded! Try again.")
  }
  generateCard(cardContainer, filteredEvents.length > 0 ? filteredEvents : array);

}

export function filterCheck(checkArray, array) {
    let checkedEvents = []
     
    checkArray.forEach(checkbox => {
      if (checkbox.checked) {
        array.forEach(event => {
          if (event.category === checkbox.value) {
            checkedEvents.push(event)
            console.log(checkedEvents);
          }
        })
      }  
    })
    if (checkedEvents.length != 0) {
      return checkedEvents
    } else {
      return array
    }
}

export function filterSearch(text, array) {
    let searchedEvents = array.filter(event => event.name.toLowerCase().includes(text.toLowerCase()))
    return searchedEvents
}
  