let memberList;
//
// fetch("https://api.propublica.org/congress/v1/115/senate/members.json", {
//     method: "GET",
//     dataType: 'json',
//     headers: {
//       "X-API-Key": "kBfQKxtZzIQKC80wlPEvDUhKAFxVlBU63svN3B8O"
//     }
//   })
//   .then((res) => {
//     console.log(res);
//     if (res.ok) {
//       return res.json();
//     }
//   })
//   .then((data) => {
//     memberList = data.results[0].members;
//     createStateSelection(memberList, "state");
//     createTable(memberList, mainTableTitles, mainTableKeys, table1);
//   });


// async function getData() {
//   //await the response of the fetch call
//   let response = await fetch("https://api.propublica.org/congress/v1/115/senate/members.json", {
//     method: "GET",
//     dataType: 'json',
//     headers: {
//       "X-API-Key": "kBfQKxtZzIQKC80wlPEvDUhKAFxVlBU63svN3B8O"
//     }
//   });
//   //proceed once the first promise is resolved.
//   let data = await response.json()
//   //proceed only when the second promise is resolved
//   return data;
// };
//
// //call getData function
// getData().then((data) => {
//   memberList = data.results[0].members;
//   createStateSelection(memberList, "state");
//   createTable(memberList, mainTableTitles, mainTableKeys, table1);
// });

// const getData = async (jsonURL, apiKey) => {
//   //await the response of the fetch call
//   let response = await fetch(jsonURL, {
//     method: "GET",
//     dataType: 'json',
//     headers: {
//       "X-API-Key": apiKey
//     }
//   });
//   //proceed once the first promise is resolved.
//   let data = await response.json()
//   //proceed only when the second promise is resolved
//   return data;
// };


const loadJsonAndCreateTable = () => {
  if (window.location.href.includes("senate.html")) {
    //call getData function
    getData("https://api.propublica.org/congress/v1/115/senate/members.json", "kBfQKxtZzIQKC80wlPEvDUhKAFxVlBU63svN3B8O").then((data) => {
      memberList = data.results[0].members;
      createStateSelection(memberList, "state");
      createTable(memberList, mainTableTitles, mainTableKeys, table1);
      // makeFixedHeader();
      let myDivsTables = Array.from(document.getElementsByClassName("loader"));
      for (myDiv of myDivsTables) {
        myDiv.classList.remove("loader");
      }
    });

  } else {
    getData("https://api.propublica.org/congress/v1/115/house/members.json", "kBfQKxtZzIQKC80wlPEvDUhKAFxVlBU63svN3B8O").then((data) => {
      memberList = data.results[0].members;
      createStateSelection(memberList, "state");
      createTable(memberList, mainTableTitles, mainTableKeys, table1);
      // makeFixedHeader();
      let myDivsTables = Array.from(document.getElementsByClassName("loader"));
      for (myDiv of myDivsTables) {
        myDiv.classList.remove("loader");
      }
    });
  }
}
loadJsonAndCreateTable();

/*
 *  Filter the members by partys
 *
 *@param membersArr an array with members from the JSON
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
 *@param membersArr an array with members from the JSON
 *@param state a string whit the state we want to filter
 *@return an array thah contains the memers filter by state
 */

const filterByState = (membersArr, state) => {
  return state === "all" ? membersArr : membersArr.filter(member => member.state === state);
};

/*
 * Delete the existing table and create a new one
 *
 *@param membersArr an array with members from the JSON
 *@param tableTitleArr an array with the titles of our table
 *@param keysArr an array with all the keys from the JSON we want to show. The strings inside the array must mach
 *       the keys of the JSON letter by letter.
 *@param tableID the id of the table we want to change
 */

const changeTable = (membersArr, tableTitlesArr, keysArr, table) => {
  while (table.hasChildNodes()) {
    table.removeChild(table.firstChild);
  }
  createTable(membersArr, tableTitlesArr, keysArr, table);
};

/*
 * This function is called when the user click on a element for filter the table
 *
 *@param membersArr an array with members from the JSON
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
  changeTable(helpArr, mainTableTitles, mainTableKeys, table1);
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

/////////////Execute JS///////////////

/****************************************************************************
                    MODIFY THIS ARRAYS TO CHANGE THE TABLE

The position of the elements in Titles arrays must be relative to the position of
elements of Keys array


*****************************************************************************/

///MAIN TABLE///    Array with our table titles.
const mainTableTitles = ["Name", "Party", "State", "Years in Oficce", "% Votes w/ Party"];
///MAIN TABLE///    Array with our Keys from JSON
const mainTableKeys = ["first_name", "middle_name", "last_name", "party", "state", "seniority", "votes_with_party_pct"];



//Fill the dropdown menu whit all the state on the JSON
// createStateSelection(memberList, "state");

//Create the inital table
let table1 = document.getElementById("table1");
// createTable(memberList, mainTableTitles, mainTableKeys, table1);

const makeFixedHeader = () => {
document.getElementById("wrap").addEventListener("scroll", function() {
   var translate = "translate(0,"+this.scrollTop+"px)";
   this.querySelector("thead").style.transform = translate;
});
}
makeFixedHeader();
