//Array with all Senate Members
let memberList = senateData.results[0].members;
/*
 *  Create a new tbody tag
 *
 *@param tBodyID the id attribute of this new tbody
 *@param tableID the id attribute of the table we want to append this new tr
 */
const createTbody = (tBodyID, tableID) => {
  const newTbody = document.createElement("TBODY");
  newTbody.setAttribute("id", tBodyID);
  document.getElementById(tableID).appendChild(newTbody);
};

/*
 *  Create a new thead tag
 *
 *@param tHeadID the id attribute of this new thead
 *@param elementID the id attribute of the table we want to append this new thead
 */

const createThead = (tHeadID, elementID) => {
  const newThead = document.createElement("THEAD");
  newThead.setAttribute("id", tHeadID);
  document.getElementById(elementID).appendChild(newThead);
};

/*
 *  Create a new tr tag
 *
 *@param trID the id attribute of this new tr
 *@param elementID the id attribute of the table we want to append this new tr
 */

const createTr = (trID, elementID) => {
  const newTr = document.createElement("TR");
  newTr.setAttribute("id", trID);
  document.getElementById(elementID).appendChild(newTr);
};

/*
 *  Create a new th tag
 *
 *@param info the info inside this th (<th>info</th>)
 *@param trID the id attribute of the tr we want to append this new th
 */

const createTh = (info, trID) => {
  let newTh = document.createElement("TH");
  newTh.appendChild(document.createTextNode(info));
  document.getElementById(trID).appendChild(newTh);
};

/*
 *  Create a new td tag
 *
 *@param info the info inside this td (<td>info</td>)
 *@param trID the id attribute of the tr we want to append this new td
 */

const createTd = (info, trID) => {
  let newTd = document.createElement("TD");
  newTd.appendChild(document.createTextNode(info));
  document.getElementById(trID).appendChild(newTd);
};

/*
 *  Create a new td tag with a link inside
 *
 *@param info the text inside the a (<a href="#">info</a>)
 *@param link the ur inside the href atributte (<a href="link"><a>)
 *@param trID the id attribute of the tr we want to append this new td
 */

const createTdWithLink = (info, link, trID) => {
  //Create Link (<a href="Link">info</a>)
  let newLink = document.createElement("a");
  newLink.setAttribute('href', link);
  let myText = document.createTextNode(info);
  newLink.appendChild(myText);
  //Create td
  let newTd = document.createElement("TD");
  newTd.appendChild(newLink);
  document.getElementById(trID).appendChild(newTd);
};

/*
 *  Create a new option tag
 *
 *@param info the text inside the option and the vakue attribute (<option value="info">info</option>)
 *@param id the id attribute of the section tag we want to append this option
 */

const createOption = (info, id) => {
  let newOption = document.createElement('option');
  newOption.setAttribute("value", info);
  newOption.innerHTML = info;
  document.getElementById(id).appendChild(newOption);
};

/*
 *  Fill the dropdown menu of <select> whit <option> that contains the states of the memebers
 *
 *@param membersArran array with members from the JSON
 *@param id the id attribute of the element we want to append the options
 */
const createStateSelection = (membersArr, id) => {
  const states = [];
  for (member of membersArr) {
    if (!states.includes(member.state)) {
      states.push(member.state);
    }
  }
  for (state of states.sort()) {
    createOption(state, id);
  }
};

/*
 * Create the table
 *
 *@param membersArr an array with members members from the JSON
 *@param tableTitleArr an array with the titles of our table
 *@param keysArr an array with all the keys from the JSON we want to show. The strings inside the array must mach
 *       the keys of the JSON letter by letter.
 *@param tableID
 */

const createTable = (membersArr, tableTitlesArr, keysArr, tableID, theadID, tbodyID, trTitleID) => {
  createThead(theadID, tableID);
  createTbody(tbodyID, tableID);
  createTr(trTitleID, theadID);
  for (title of tableTitlesArr) {
    createTh(title, trTitleID);
  }
  let dynamicID = 0;
  let modkeysArr = keysArr.filter(data => data !== "middle_name" && data !== "last_name");
  for (member of membersArr) {
    //Create the names of the variables dynamically. let is not possible because of scope problems
    eval(`var {${keysArr.join(", ")}} = member`);
    let id = `${tableID}Member${dynamicID}`;
    dynamicID++;
    createTr(id, tbodyID);
    //Concatenate the names without null values
    const fullNameArray = keysArr.filter(name => eval(name) !== null && (name === "first_name" || name === "middle_name" || name === "last_name"));
    if (fullNameArray.length) {
      let completeName = "";
      for (name of fullNameArray) {
        completeName = `${completeName} ${eval(name)}`;
      }
      first_name = completeName;
    }
    //Add % on "votes_with_party_pct"
    if (modkeysArr.includes("votes_with_party_pct")) {
      votes_with_party_pct += "%";
    }
    for (variable of modkeysArr) {
      if (variable === "first_name") {
        createTdWithLink(eval(variable), member.url, id);
      } else {
        createTd(eval(variable), id);
      }
    }
  }
};
