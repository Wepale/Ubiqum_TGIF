/*
 *Create a new tbody element
 *@param tBodyID the id attribute of this new tbody
 *@param tableID the id attribute of the table we want to append this new tr
 */
const createTbody = (tBodyID, tableID) => {
  const newTbody = document.createElement("TBODY");
  newTbody.setAttribute("id", tBodyID);
  document.getElementById(tableID).appendChild(newTbody);
}

/*
 *Create a new thead element
 *@param tHeadID the id attribute of this new thead
 *@param elementID the id attribute of the table we want to append this new thead
 */

const createThead = (tHeadID, elementID) => {
  const newThead = document.createElement("THEAD");
  newThead.setAttribute("id", tHeadID);
  document.getElementById(elementID).appendChild(newThead);
}

/*
 *Create a new tr element
 *@param trID the id attribute of this new tr
 *@param elementID the id attribute of the table we want to append this new tr
 */

const createTr = (trID, elementID) => {
  const newTr = document.createElement("TR");
  newTr.setAttribute("id", trID);
  document.getElementById(elementID).appendChild(newTr);
}

/*
 *Create a new th element
 *@param info the info inside this th (<th>info</th>)
 *@param trID the id attribute of the tr we want to append this new th
 */

const createTh = (info, trID) => {
  let newTh = document.createElement("TH");
  newTh.appendChild(document.createTextNode(info));
  document.getElementById(trID).appendChild(newTh);
}

/*
 *Create a new td element
 *@param info the info inside this td (<td>info</td>)
 *@param trID the id attribute of the tr we want to append this new td
 */

const createTd = (info, trID) => {
  let newTd = document.createElement("TD");
  newTd.appendChild(document.createTextNode(info));
  document.getElementById(trID).appendChild(newTd);
}

const createTdwithLink = (info, link, trID) => {
  //Create Link (<a href="Link">info</a>)
  let newLink = document.createElement("a");
  newLink.setAttribute('href', link);
  let myText = document.createTextNode(info);
  newLink.appendChild(myText);
  //Create td
  let newTd = document.createElement("TD");
  newTd.appendChild(newLink);
  document.getElementById(trID).appendChild(newTd);

}

//Array with all Senate Members
let senateMembersList = senateData.results[0].members;
// //Array with all House of Representative Members
// let houseMembersList = houseData.results[0].members;

/****************************************************************************
                    MODIFY THIS ARRAYS FOR CHANGE THE TABLE

The position of the elements in arrayInfo must be relative to the position of
elements of tableTitles


*****************************************************************************/

//Array with our table titles.
const tableTitles = ["Name", "Party", "State", "Years in Oficce", "% Votes w/ Party"];

//Array with our Keys from JSON
const arrayInfo = ["first_name", "middle_name", "last_name", "party", "state", "seniority", "votes_with_party_pct"]

//Array with our table titles.
const tableTitles2 = ["Name", "Party", "Office", "Years in Oficce", "% Votes w/ Party", "Total Votes", "Next election", "Birth"];

//Array with our Keys from JSON
const arrayInfo2 = ["first_name", "middle_name", "last_name", "party", "office", "seniority", "votes_with_party_pct", "total_votes", "next_election", "date_of_birth"];

//Array with our table titles.
const tableTitles3 = ["Party", "Office", "Years in Oficce", "% Votes w/ Party", "Last Update"];

//Array with our Keys from JSON
const arrayInfo3 = ["party", "office", "seniority", "votes_with_party_pct", "last_updated"];

/*
 * Create the table
 *
 *@param membersArr an array with all the members from the JSON
 *@param tableTitleArr an array with the titles of our table
 *@param info an array with all the keys from the JSON we want to show. The strings inside the array must mach
 *       the keys of the JSON letter by letter.
 */

const createTable = (membersArr, tableTitlesArr, keysArr) => {
  createThead("myHead", "senate_data");
  createTbody("myBody", "senate_data");
  createTr("trTitle", "myHead");
  for (let title of tableTitlesArr) {
    createTh(title, "trTitle");
  }
  let dynamicID = 0;
  let modkeysArr = keysArr.filter(data => data !== "middle_name" && data !== "last_name");
  for (member of membersArr) {
    //Create the names of the variables dynamically. let is not possible because of scope problems
    eval(`var {${keysArr.join(", ")}} = member`);
    let id = `member${++dynamicID}`;
    createTr(id, "myBody");
    //Concatenate the names without null values
    const fullNameArray = keysArr.filter(name => eval(name) !== null && (name === "first_name" || name === "middle_name" || name === "last_name"));
    if (fullNameArray.length) {
      let completeName = "";
      for (name of fullNameArray) {
        completeName += eval(name) + " ";
      }
      first_name = completeName.trim();
    }
    //Add % on "votes_with_party_pct"
    if (modkeysArr.includes("votes_with_party_pct")) {
      votes_with_party_pct += "%";
    }
    //Fill table with links on names
    for (variable of modkeysArr) {
      // createTd(eval(variable), id);
      if (variable === "first_name") {
        createTdwithLink(eval(variable), member.url, id);
      } else {
        createTd(eval(variable), id);
      }
    }
  }
}
createTable(senateMembersList, tableTitles2, arrayInfo2);
