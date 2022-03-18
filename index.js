let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteAllBtn = document.getElementById("delete-all-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")
const deleteBtns = document.getElementsByClassName('deleteBtn')

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li class='lead-item'>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
                <button class='deleteBtn'>X</button>
            </li>
        `
    }
    ulEl.innerHTML = listItems
    for(let i=0; i<deleteBtns.length; i++){
        deleteBtns[i].addEventListener("click", () => {
           myLeads.splice(i,1)
           localStorage.setItem("myLeads", JSON.stringify(myLeads))
           render(myLeads)
        })
    }
}

deleteAllBtn.addEventListener("click", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})