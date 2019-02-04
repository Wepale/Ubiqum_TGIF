/*
Create a new tr element
@param trID the id attribute of this new tr
@param tableID the id attribute of the table we want to append this new tr
*/

const createTr = (trID, tableID) => {
  let newTr = document.createElement("TR");
  newTr.setAttribute("id", trID);
  document.getElementById(tableID).appendChild(newTr);
}

/*
Create a new th element
@param info the info inside this th (<th>info</th>)
@param trID the id attribute of the tr we want to append this new th
*/

const createTh = (info, trID) => {
  let newTh = document.createElement("TH");
  newTh.appendChild(document.createTextNode(info));
  document.getElementById(trID).appendChild(newTh);
}

/*
Create a new td element
@param info the info inside this td (<td>info</td>)
@param trID the id attribute of the tr we want to append this new td
*/

const createTd = (info, trID) => {
  let newTd = document.createElement("TD");
  newTd.appendChild(document.createTextNode(info));
  document.getElementById(trID).appendChild(newTd);
}

let membersList = senateData.results[0].members; //Array with all Senate Members
console.log(membersList);
let tableTitles = ["Name", "Party", "State", "Years in Oficce", "% Votes w/ Party"]
createTr("tableTitles", "senate_data");
for (title of tableTitles) {
  createTh(title, "tableTitles");
}









//document.getElementById("senate_data").innerHTML = JSON.stringify(senateData, null, 2);
