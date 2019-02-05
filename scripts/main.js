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

const createFullname = (namesArray) => {
  if (namesArray.length === 3) {
    for ([i, value] of namesArray.entries()) {
      if (value === null) namesArray[i] = "";
    }
    return `${namesArray[0]} ${namesArray[1]} ${namesArray[2]}`;

  } else if (namesArray.length === 2) {
    for (name of namesArray) {
      if (!name) { name = ""};
    }
    return `${namesArray[0]} ${namesArray[1]}`;

  } else if (namesArray.length === 1) {

    return !namesArray[0] ? namesArray[0] = "No name" : namesArray[0];
  }
}

let membersList = senateData.results[0].members; //Array with all Senate Members
//console.log(membersList);
const tableTitles = ["Name", "Party", "State", "Years in Oficce", "% Votes w/ Party"];
//const infoToShow = "first_name, middle_name, last_name, party, seniority, votes_with_party_pct";
const arrayInfo = ["first_name", "middle_name", "last_name", "party", "seniority", "votes_with_party_pct"]
console.log(arrayInfo.join(", "));



const createTable = (membersArr, tableTitlesArr, info) => {
  let dynamicID = 1;
  createTr("trTitle", "senate_data");
  for (let title of tableTitlesArr) {
    createTh(title, "trTitle");
  }
  for (member of membersArr) {
    eval(`var {${info.join(", ")}} = member`); //let is not possible because of scope problems
    let id = `member${++dynamicID}`;
    createTr(id, "senate_data");
    for (variable of info) {
      createTd(eval(variable), id);

    }



    // console.log(first_name);
    // console.log(middle_name);
    // console.log(last_name);
    // console.log(party);
    // console.log(seniority);
    // console.log(votes_with_party_pct);
  }

}
let apellido = null;
console.log(createFullname(["Yeray", apellido, "Martin"]));
console.log(createFullname(["Yeray", "Rodriguez", null]));
console.log(createFullname([null, "Rodriguez", "Martin" ]));
console.log(createFullname(["Yeray", null]));
console.log(createFullname([null]));
console.log(createTable(membersList, tableTitles, arrayInfo));









//document.getElementById("senate_data").innerHTML = JSON.stringify(senateData, null, 2);
