
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ul = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
let myLeads = []
let oldLeads = []



// ["lead1", "lead2"] or null
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

// To keep the Leads persistent safe on the UI
if (leadsFromLocalStorage){
   // console.log( Boolean(leadsFromLocalStorage) )    // to verify if is "truthy" or "falsy"
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


// Save Tab
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})


// Log out the items in the myLeads array using a for loop
function render(leads){
    let listItems = ""
    for (let i = 0; i < leads.length; i++){
        listItems += 
        `<li>
            <a target='_blank' href='${leads[i]}'>${leads[i]}</a>
        </li>`
    }
    ul.innerHTML = listItems
}

// Clear All
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


// Event for the inputBtn
inputBtn.addEventListener("click", function(){
    myLeads.push( inputEl.value )
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

    // To verify that it works:
    console.log( localStorage.getItem("myLeads") )
})

