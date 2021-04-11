// Get covid data from cdc
const covidDataURL = "https://data.cdc.gov/resource/9mfq-cb36.json?$limit=100000"
const covidChart = document.getElementById('chart');
const navBar = document.getElementById('mainnav');

//search to see if the state exists in traces and if true return the object reference
function findInArray(item, array){
    let exists = false
    for(let i=0; i < array.length; i++){
        if (item == array[i].name){
            return array[i];
        }
    }
    return false;
}

// Sort the data based on date and then create the chart
function loadChar(jsonData){
    let traces = [];
    // Sorting
    jsonData.sort(function(a, b) {
        return ((a.submission_date < b.submission_date) ? -1 : ((a.name == b.name) ? 0 : 1));
    });
    // Create an object for all of the states/places found in the data
    for (let i = 0; i < jsonData.length; i++) {
        if (!(findInArray(jsonData[i].state, traces))){
            let trace= {
                x: [],
                y: [],
                mode: 'lines',
                name: jsonData[i].state
            }
            traces.push(trace);
        }
    }

    // add the points
    for (let i = 0; i < jsonData.length; i++) {
        trace = findInArray(jsonData[i].state, traces)
        trace.x.push(jsonData[i].submission_date);
        trace.y.push(jsonData[i].tot_cases);
    }
    // if more than one object, create the chart
    if (traces.length > 0){
        Plotly.newPlot('chart', traces, {
            width: 1200,
            height: 800,
            title: "Covid Cases in US States",
            hovermode: 'closest',
        });
    }
};

// get the covid cases data as a JSON file from cdc url
function fetchData() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let returnData = JSON.parse(this.responseText);
            loadChar(returnData);
        }
    };
    xmlhttp.open("GET", covidDataURL, true);
    xmlhttp.send();
};

// run
fetchData();