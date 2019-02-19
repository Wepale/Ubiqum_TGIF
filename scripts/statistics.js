let memberList;

const loadJsonAndCreateTable = () => {
  if (window.location.href.includes("senate.html")) {
    //call getData function
    getData("https://api.propublica.org/congress/v1/115/senate/members.json", "kBfQKxtZzIQKC80wlPEvDUhKAFxVlBU63svN3B8O").then((data) => {
      memberList = data.results[0].members;

      setStatisticsValues(memberList, statistics.partys);

      //Last object in the array
      let allPartysStatistics = statistics.partys[statistics.partys.length - 1]
      // Top members whit most missed votes
      let topMembersMissedVotes = allPartysStatistics.mostMissedVotesMembers;

      // Top members whit lest missed votes
      let topMembersVotes = allPartysStatistics.leastMissedVotesMembers;

      // Top members most loyal
      let topMembersMostLoyal = allPartysStatistics.mostLoyalMembers;

      // Top members least Loyal
      let topMembersLessLoyal = allPartysStatistics.leastLoyalMembers;

      createTable(statistics.partys, atGlanceTableTitles, atGlanceTableKeys, table1);

      if (window.location.href.includes("party_loyalty_senate.html") || document.URL.includes("party_loyalty_house.html")) {
        //Create Least Loyal Table
        createTable(topMembersLessLoyal, loyalTableTitles, loyalTableKeys, table2);

        //Create Most Loyal Table
        createTable(topMembersMostLoyal, loyalTableTitles, loyalTableKeys, table3);

      } else {
        //Create Least Engaged Table
        createTable(topMembersMissedVotes, engagedTableTitles, engagedTableKeys, table2);

        //Create Most Engaged Table
        createTable(topMembersVotes, engagedTableTitles, engagedTableKeys, table3);
      }
      let myDivsTables = Array.from(document.getElementsByClassName("loader"));
      for (myDiv of myDivsTables) {
        myDiv.classList.remove("loader");
      }
      changeGridRowOnLongest(table2, table3, 6);
    });

  } else {
    getData("https://api.propublica.org/congress/v1/115/house/members.json", "kBfQKxtZzIQKC80wlPEvDUhKAFxVlBU63svN3B8O").then((data) => {
      memberList = data.results[0].members;

      setStatisticsValues(memberList, statistics.partys);

      //Last object in the array
      let allPartysStatistics = statistics.partys[statistics.partys.length - 1]
      // Top members whit most missed votes
      let topMembersMissedVotes = allPartysStatistics.mostMissedVotesMembers;

      // Top members whit lest missed votes
      let topMembersVotes = allPartysStatistics.leastMissedVotesMembers;

      // Top members most loyal
      let topMembersMostLoyal = allPartysStatistics.mostLoyalMembers;

      // Top members least Loyal
      let topMembersLessLoyal = allPartysStatistics.leastLoyalMembers;

      createTable(statistics.partys, atGlanceTableTitles, atGlanceTableKeys, table1);

      if (window.location.href.includes("party_loyalty_senate.html") || document.URL.includes("party_loyalty_house.html")) {
        //Create Least Loyal Table
        createTable(topMembersLessLoyal, loyalTableTitles, loyalTableKeys, table2);

        //Create Most Loyal Table
        createTable(topMembersMostLoyal, loyalTableTitles, loyalTableKeys, table3);

      } else {
        //Create Least Engaged Table
        createTable(topMembersMissedVotes, engagedTableTitles, engagedTableKeys, table2);

        //Create Most Engaged Table
        createTable(topMembersVotes, engagedTableTitles, engagedTableKeys, table3);
      }
      let myDivsTables = Array.from(document.getElementsByClassName("loader"));
      for (myDiv of myDivsTables) {
        myDiv.classList.remove("loader");
      }
      changeGridRowOnLongest(table2, table3, 6);
    });
  }
}

/////////////Statistics///////////

let statistics = {
  partys: [{
      idParty: "Democrats",
      numbersOfReps: null,
      averageVoteParty: null,
      leastMissedVotesMembers: null,
      mostMissedVotesMembers: null,
      leastLoyalMembers: null,
      mostLoyalMembers: null
    },
    {
      idParty: "Republicants",
      numbersOfReps: null,
      averageVoteParty: null,
      leastMissedVotesMembers: null,
      mostMissedVotesMembers: null,
      leastLoyalMembers: null,
      mostLoyalMembers: null
    },
    {
      idParty: "Independents",
      numbersOfReps: null,
      averageVoteParty: null,
      leastMissedVotesMembers: null,
      mostMissedVotesMembers: null,
      leastLoyalMembers: null,
      mostLoyalMembers: null
    },
    {
      idParty: "All Partys",
      numbersOfReps: null,
      averageVoteParty: null,
      leastMissedVotesMembers: null,
      mostMissedVotesMembers: null,
      leastLoyalMembers: null,
      mostLoyalMembers: null
    }
  ]
};

/*
 *  Get the members of a determinate party
 *
 *@param membersArr an array with members from the JSON
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
 *@param membersArr an array with members from the JSON
 *@param party an string whit the value of the party. "D", "R" or "I"
 *@return a number that indicate the quantity of members of a determined party
 */

const numberOfMembersByParty = (membersArr, party) => {
  return getMembersOfParty(membersArr, party).length;
};

/*
 * Get the average voting with their party
 *
 *@param membersArr an array with members from the JSON
 *@param party an string whit the value of the party. "D", "R" or "I"
 *@return a number that indicate the average voting
 *
 */

const votingPartyAverage = (membersArr, party) => {
  for (member of membersArr) {
    let votesResults = membersArr.map(member => member.votes_with_party_pct) //return an array whit the value of a key of all the objects
    if (votesResults.length) {
      return (votesResults.reduce((vote1, vote2) => vote1 + vote2) / votesResults.length).toFixed(2);
    }
  }


  //The same but whit-out variables
  /*
   return (getMembersOfParty(membersArr, party).map(member => member.votes_with_party_pct).reduce((vote1, vote2) => vote1 + vote2)/getMembersOfParty(membersArr, party).length).toFixed(2);
  */
};

/*
 * Order an array of objects by a value of a determined key. FROM LOWEST TO HIGHEST
 *
 *@param membersArr an array with members from the JSON
 *@param key a string equal to the key that we want to sort
 *@return an array sorted by the values of the key, from lowest to highest
 */

const orderMembersByKeyValue = (membersArr, key) => {
  return membersArr.sort((a, b) => (a[key] > b[key]) ? 1 : -1);

  /*
  sort() method of Array takes a callback function,
  which takes as parameters 2 objects contained in the array (which we call a and b).
  When we return 1, the function communicates to sort()
  that the object b takes precedence in sorting over the object a.
  Returning -1 would do the opposite.
  */

}

/*
 * Get the first or last members of an array. The amount of elements will be defined by the percentage.
 * If immediately after our last member there is another with the same value, this and the following will be added, until the value change.
 *
 *@param membersArr an array with members from the JSON. Ordered from lowest to highest.
 *@param percent a number from 0 to 100. 0 return 0% of elements of the array, 100% return all the elements of the array
 *@param *@param key a string equal to the key that the value we wont to check
 *@param firstOrlast a string. "first" or "last". "first" start getting element from the beginning of the array an "last" from the end.
 */

const topOrLowestMembers = (membersArr, percent, firstOrLast, key) => {
  let membersToGet = 0;
  if (membersArr.length < 10) {
    membersToGet = 1;
  } else {
    membersToGet = Math.round(membersArr.length * (percent / 100));
  }
  if (firstOrLast === "last") {
    membersArr.reverse()
  }
  for (let i = membersToGet; i < membersArr.length; i++) {
    if (membersArr[i][key] === membersArr[i - 1][key]) {
      membersToGet++;
    } else {
      break;
    }
  }
  return membersArr.slice(0, membersToGet);
};

const changeGridRowOnLongest = (element1, element2, rowEnd) => {
  const parentDiv1 = element1.parentNode.parentNode;
  let parentDiv2 = element2.parentNode.parentNode;
  console.log("Table2  " + element1.offsetHeight);
  console.log("Table3  " +element2.offsetHeight);
  if (element1.offsetHeight === element2.offsetHeight) {
    parentDiv1.style.gridRow = `${rowEnd - 1}/${rowEnd};`
    parentDiv2.style.gridRow = `${rowEnd - 1}/${rowEnd};`
  } else if (element1.offsetHeight > element2.offsetHeight) {
    parentDiv2.style.gridRow = `${rowEnd - 1}/${rowEnd}`;
    rowEnd++;
    parentDiv1.style.gridRow = `${rowEnd - 2}/${rowEnd}`;
  } else {
    parentDiv1.style.gridRow = `${rowEnd - 1}/${rowEnd}`;
    rowEnd++;
    parentDiv2.style.gridRow = `${rowEnd - 2}/${rowEnd}`;
  }

  while (parentDiv2.nextElementSibling != null) {
    rowEnd++;
    parentDiv2.nextElementSibling.style.gridRow = `${rowEnd-1}/${rowEnd}`;
    parentDiv2 = parentDiv2.nextElementSibling;
  }
};

const setStatisticsValues = (membersArr, statisticsByPartyArr) => {
  let party = null;
  for (element of statisticsByPartyArr) {
    switch (element.idParty) {
      case "Democrats":
        party = "D";
        break;
      case "Republicants":
        party = "R";
        break;
      case "Independents":
        party = "I";
        break;

      default:
        party = "All Partys";
    }
    let membersArrayByParty = getMembersOfParty(membersArr, party)
    if (membersArrayByParty.length) {
      element.numbersOfReps = membersArrayByParty.length
    } else {
      element.numbersOfReps = 0;
    }

    for (member of membersArrayByParty) {
      if (!("votes_with_party_pct" in member)) {
        membersArrayByParty.splice(membersArrayByParty.indexOf(member), 1);
      }
    }

    element.averageVoteParty = votingPartyAverage(membersArrayByParty, party) + "%";
    element.leastMissedVotesMembers = topOrLowestMembers(orderMembersByKeyValue(membersArrayByParty, "missed_votes_pct"), 10, "first", "missed_votes_pct");
    element.mostMissedVotesMembers = topOrLowestMembers(orderMembersByKeyValue(membersArrayByParty, "missed_votes_pct"), 10, "last", "missed_votes_pct");
    element.leastLoyalMembers = topOrLowestMembers(orderMembersByKeyValue(membersArrayByParty, "votes_with_party_pct"), 10, "first", "votes_with_party_pct");
    element.mostLoyalMembers = topOrLowestMembers(orderMembersByKeyValue(membersArrayByParty, "votes_with_party_pct"), 10, "last", "votes_with_party_pct");

    if (element.numbersOfReps === 0) {
      element.averageVoteParty = 0 + "%";
    }
  }
};


///AT GLANCE///   Array with our table titles.
const atGlanceTableTitles = ["Party", "No. of Reps", "% Voted w/ Party"];
///AT GLANCE///   Array with our Keys from JSON
const atGlanceTableKeys = ["idParty", "numbersOfReps", "averageVoteParty"];

///ENGAGED TABLE///   Array with our table titles.
const engagedTableTitles = ["Name", "No. Missed Votes", "% Missed"];
///ENGAGED TABLE///   Array with our Keys from JSON
const engagedTableKeys = ["first_name", "middle_name", "last_name", "missed_votes", "missed_votes_pct"];

///LOYAL TABLE///   Array with our table titles.
const loyalTableTitles = ["Name", "No. Party Votes", "% Party Votes"];
///lOYAL TABLE///   Array with our Keys from JSON
const loyalTableKeys = ["first_name", "middle_name", "last_name", "total_votes", "votes_with_party_pct"];

let table1 = document.getElementById("table1");
let table2 = document.getElementById("table2");
let table3 = document.getElementById("table3");
loadJsonAndCreateTable();
changeGridRowOnLongest(table2, table3, 6);
console.log("hey");
