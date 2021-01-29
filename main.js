const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(type, cb) {//3a created this function to use it when status = 4
    var xhr = new XMLHttpRequest();//1.a inbuilt JS object allowing us to use APIs.

    xhr.onreadystatechange = function() {//1.b creat new function to retrive the data once ready status '4'(=operation completed)
        if (this.readyState == 4 && this.status == 200) {//status code200 = 'ok.successs'
            cb(JSON.parse(this.responseText));//2.a to use JSON .
        }
    };
    //1.c to open(get to retrive data) the conection  and then send
    xhr.open("GET", baseURL + type + "/"); // type can be people,vehicles ,palanets etc and we need trailing '/'.
    xhr.send();
}

function getTableHeaders(obj) {//9. created to iterated over the keys  to build a data without specyfing a propert('name' in this case)
    var tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`)// 10. function will iterate through  each key and push whole table cell
    });

    return `<tr>${tableHeaders}</tr>`; //11.  we adding it to a row.
}

function writeToDocument(type) {      //4. witeToDocument has an onclick in index.html
    var tableRows = [];// 13. empty array to hold eaxh row of data
    var el = document.getElementById("data"); //6. store data in variable
    el.innerHTML = "";  //8.  used to clear the display information for previouse button we clicked after clicking new button.

    getData(type, function(data) {
        
        data = data.results; //5. to be able to display the data
        var tableHeaders = getTableHeaders(data[0]);// 12. after we retrive data from getTableHeaders function we pass the first object to tableHeadears variable.

        data.forEach(function(item) { //7. for each element in data it's going to run this function(will take the item) 
            var dataRow = [];// 15. empty array for each individual row 

            Object.keys(item).forEach(function(key) {  // 16. passing an item into forEach to do another forEach loop inside.
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15); //18. shorten display from 0-15 char.
                dataRow.push(`<td>${truncatedData}</td>`);//17.-->19.
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;// 14. heading + row of data
    });
}

