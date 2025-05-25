let period_btns = document.querySelectorAll(".menu-period a");
period_btns.forEach(
    (btn) => btn.addEventListener("click", function(){
        document.querySelector(".active-period").classList.remove("active-period")
        this.classList.add("active-period");
        populateDom();
    })
)

function checkHrs(num){
    return num > 1 ? "hrs" : "hr";
}
function descriptionPeriod(period){
    if(period == "daily")   return "Yesterday";
    if(period == "weekly")  return "Last Week";
    if(period == "monthly") return "Last Month";
}

const populateDom = () => {
    let localStorageData = localStorage.getItem("data");
    let data = JSON.parse(localStorageData);
    let activePeriodID = document.querySelector(".active-period").id;
    console.log(data)
    data.forEach(item => {
        let curr_card = document.querySelector(`#${item.title.toLowerCase().replace(" ", "_")}`)
        let currentPeriod_num = item.timeframes[activePeriodID].current;
        let previouslyPeriod_num = item.timeframes[activePeriodID].previous;
        curr_card.querySelector(".current-state p").textContent = `${currentPeriod_num}${checkHrs(currentPeriod_num)}`;
        curr_card.querySelector(".previous-state p").textContent = `${descriptionPeriod(activePeriodID)} - ${previouslyPeriod_num}${checkHrs(previouslyPeriod_num)}`;
    });
}

fetch("assets/data.json").then((response) => {
    if(!response.ok) console.log("bad data");
    return response.json();
}).then((data) => {
    localStorage.setItem("data", JSON.stringify(data));
    populateDom();
})