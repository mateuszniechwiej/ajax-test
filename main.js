const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", baseURL + type + "/");// type can be people,vehicles ,palanets etc and we need trailing '/'.
    xhr.send();
}

function getTableHeaders(obj) {//created to iterated over the keys  to build a data without specyfing a propert('name' in this case)
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`)// function will iterate through  each key and push whole table cell
    });

    return `<tr>${tableHeaders}</tr>`; // we adding it to a row.
}

function writeToDocument(type) {      //witeToDocument has an onclick in index.html
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";  // used to clear the display information for previouse button we clicked after clicking new button.

    getData(type, function(data) {
        
        data = data.results; // to be able to display the data
        var tableHeaders = getTableHeaders(data[0]);// after we retrive data from getTableHeaders function we pass the first object to tableHeadears variable.

        data.forEach(function(item) { //for each element in data it's going to run this function(will take the item) 
            var dataRow = [];

            Object.keys(item).forEach(function(key) {  // passing an item into forEach to do another forEach loop inside.
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    });
}

