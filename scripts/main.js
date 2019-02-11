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
 *@param membersArran array with all the members from the JSON
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
 *@param membersArr an array with all the members from the JSON
 *@param tableTitleArr an array with the titles of our table
 *@param keysArr an array with all the keys from the JSON we want to show. The strings inside the array must mach
 *       the keys of the JSON letter by letter.
 *@param tableID
 */

const createTable = (membersArr, tableTitlesArr, keysArr, tableID) => {
  createThead("myHead", tableID);
  createTbody("myBody", tableID);
  createTr("trTitle", "myHead");
  for (title of tableTitlesArr) {
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

/*
 *  Filter the members by partys
 *
 *@param membersArr an array with all the members from the JSON
 *@param partyArr an array whit the partys we want to filter
 *@return an array thah contains the memers filter by party
 */

const filterByParty = (membersArr, partyArr) => {
  if (partyArr.length) {
    let filterArr = [];
    for (party of partyArr) {
      filterArr.push(...membersArr.filter(member => member.party === party));
    }
    return filterArr;
  }
  return membersArr;
};

/*
 *  Filter the members by state
 *
 *@param membersArr an array with all the members from the JSON
 *@param state a string whit the state we want to filter
 *@return an array thah contains the memers filter by state
 */

const filterByState = (membersArr, state) => {
  return state === "all" ? membersArr : membersArr.filter(member => member.state === state);
};

/*
 * Delete the existing table and create a new one
 *
 *@param membersArr an array with all the members from the JSON
 *@param tableTitleArr an array with the titles of our table
 *@param keysArr an array with all the keys from the JSON we want to show. The strings inside the array must mach
 *       the keys of the JSON letter by letter.
 *@param tableID the id of the table we want to change
 */
const changeTable = (membersArr, tableTitlesArr, keysArr, tableID) => {
  let table = document.getElementById(tableID)
  while (table.hasChildNodes()) {
    table.removeChild(table.firstChild);
  }
  createTable(membersArr, tableTitlesArr, keysArr, tableID);
};

/*
 * This function is called when the user click on a element for filter the table
 *
 *@param membersArr an array with all the members from the JSON
 */

const filterAll = (membersArr) => {
  //Filter by Party
  let checkArr = Array.from(document.getElementsByName("party"));
  let helpArr = [];
  for (check of checkArr) {
    if (check.checked) helpArr.push(check.value);
  }
  helpArr = filterByParty(membersArr, helpArr);
  //Filter By State
  let opS = document.getElementById("state");
  helpArr = filterByState(helpArr, opS.options[opS.selectedIndex].value);
  //Delete table and create the new one
  changeTable(helpArr, tableTitles2, arrayInfo2, "senate_data")
}

/*
 * This fuction is called when the user click on a determinate element. Make
 * an associated element to show or hide, creating an accordion effect
 *
 *@param clickID the ID of the element in which the user clicks
 *@param accordionID the ID of the element that achieves the accordion effect
 */
const makeAccordion = (clickID = "accordion", accordionID = "panel") => {
  let myButton = document.getElementById("accordion");
  myButton.classList.toggle("active");
  let panel = document.getElementById("panel");
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  }
};


/////////////Statistics///////////

let statistics = {
  partys : [
    {
      id: "Democrats",
      numberOfDemocrats: null,
      numberOfRepublicans: null,
      numberOfIndependents: null,
      democratsVoteParty: null,
      republicantsVoteParty: null,
      mostMissedVotes: null,
      lessMissedVotes: null
    },
    {
      id: "Republicants",
      numberOfDemocrats: null,
      numberOfRepublicans: null,
      numberOfIndependents: null,
      democratsVoteParty: null,
      republicantsVoteParty: null,
      mostMissedVotes: null,
      lessMissedVotes: null
    },
    {
      id: "Independents",
      numberOfDemocrats: null,
      numberOfRepublicans: null,
      numberOfIndependents: null,
      democratsVoteParty: null,
      republicantsVoteParty: null,
      mostMissedVotes: null,
      lessMissedVotes: null
    }
]
};

/*
 *  Get the members of a determinate party
 *
 *@param membersArr an array with all the members from the JSON
 *@param party an string whit the value of the party. "D", "R" or "I"
 *return an array that contains the members of the party
 *
 */

const getMembersOfParty = (membersArr, party) => {
  switch (party) {
    case "D":
      return membersArr.filter(member => member.party === "D");

    case "R":
      return membersArr.filter(member => member.party === "R");

    case "I":
      return membersArr.filter(member => member.party === "I");

    default:
      return membersArr;
  }
};

/*
 * Get the quantity of members of a party
 *
 *@param membersArr an array with all the members from the JSON
 *@param party an string whit the value of the party. "D", "R" or "I"
 *@return a number that indicate the quantity of members of a determined party
 */

const numberOfMembersByParty = (membersArr, party) => {
  return getMembersOfParty(membersArr, party).length;
};

/*
 * Get the average voting with their party
 *
 *@param membersArr an array with all the members from the JSON
 *@param party an string whit the value of the party. "D", "R" or "I"
 *@return a number that indicate the average voting
 *
 */

const votingPartyAverage = (membersArr, party) => {
  const filterMembers = getMembersOfParty(membersArr, party);
  let votesResults = filterMembers.map(member => member.votes_with_party_pct);
  return votesResults.reduce((vote1, vote2) => vote1 + vote2) / votesResults.length;

  //The sameb but whit out variables
  /*
   return getMembersOfParty(membersArr, party).map(member => member.votes_with_party_pct).reduce((vote1, vote2) => vote1 + vote2)/getMembersOfParty(membersArr, party).length;
  */
};

/*
 * Order an array of objects by a value of a determined key. FROM LOWEST TO HIGHEST
 *
 *@param membersArr an array with all the members from the JSON
 *@param key a string equal to the key that we want to sort
 *@return an array sorted by the values of the key, from lowest to highest
 */

const orderMembersByKeyValue = (membersArr, key) => {
  return membersArr.sort((a, b) => (a[key] > b[key]) ? 1 : -1);
}

/*
 * Get the top or lowest members of an array. The amount of elements will be defined by the percentage.
 * If immediately after our last member there is another with the same value, this and the following will be added, until the value change.
 *
 *@param membersArr an array with all the members from the JSON. Ordered from lowest to highest.
 *@param percent a number from 0 to 100. 0 return 0% of elements of the array, 100% return all the elements of the array
 *@param *@param key a string equal to the key that the value we wont to check
 *@param topOrBottom a string. "top" or "lowest". lowest start getting element from the beginning of the array an top from the end.
 */

const topOrLowestMembers = (membersArr, percent, topOrLowest, key) => {
  let membersToGet = Math.round(membersArr.length * percent / 100);
  if (topOrLowest === "top") {
    membersArr.reverse()
  }
  for (let i = membersToGet; i < membersArr.length; i++) {
    if (membersArr[i][key] === membersArr[i - 1][key]) {
      membersToGet++;
    } else {
      break
    };
  }
  return membersArr.slice(0, membersToGet);
}


/////////////Execute JS///////////////

/****************************************************************************
                    MODIFY THIS ARRAYS TO CHANGE THE TABLE

The position of the elements in arrayInfo must be relative to the position of
elements of tableTitles


*****************************************************************************/

///MAIN TABLE///    Array with our table titles.
const mainTableTitles = ["Name", "Party", "State", "Years in Oficce", "% Votes w/ Party"];
///MAIN TABLE///    Array with our Keys from JSON
const mainTableKeys = ["first_name", "middle_name", "last_name", "party", "state", "seniority", "votes_with_party_pct"]

///AT GLANCE///   Array with our table titles.
const atGlanceTableTitles = ["Party", "No. of Reps", "% Voted w/ Party"];
///AT GLANCE///   Array with our Keys from JSON
const atGlanceTableKeys = [];

///ENGAGED TABLE///   Array with our table titles.
const engagedTableTitles = ["Name", "No. Missed Votes", "% Missed"];
///ENGAGED TABLE///   Array with our Keys from JSON
const engagedTableKeys = ["first_name", "middle_name", "last_name", "missed_votes" ,"missed_votes_pct"];

///LOYAL TABLE///   Array with our table titles.
const loyalTableTitles = ["Name", "No. Party Votes", "% Party Votes"]
///lOYAL TABLE///   Array with our Keys from JSON
const loyalTableKeys = ["first_name", "middle_name", "last_name", "total_votes", "votes_with_party_pct"];

//Array with all Senate Members
let memberList = senateData.results[0].members;
//Fill the dropdown menu whit all the state on the JSON
createStateSelection(memberList, "state");
//Create the inital table
createTable(memberList, mainTableTitles, mainTableKeys, "senate_data");


console.log(statistics.partys);
















// //Array with our table titles.
// const tableTitles2 = ["Name", "Party", "Office", "Years in Oficce", "% Votes w/ Party", "Total Votes", "Next election", "Birth"];
//
// //Array with our Keys from JSON
// const arrayInfo2 = ["first_name", "middle_name", "last_name", "party", "office", "seniority", "votes_with_party_pct", "total_votes", "next_election", "date_of_birth"];
//
// //Array with our table titles.
// const tableTitles3 = ["Party", "Office", "Years in Oficce", "% Votes w/ Party", "Last Update"];
//
// //Array with our Keys from JSON
// const arrayInfo3 = ["party", "office", "seniority", "votes_with_party_pct", "last_updated"];
