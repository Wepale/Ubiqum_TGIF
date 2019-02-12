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
  const filterMembers = getMembersOfParty(membersArr, party);
  let votesResults = filterMembers.map(member => member.votes_with_party_pct); //return an array whit the value of a key of all the objects
  return votesResults.reduce((vote1, vote2) => vote1 + vote2) / votesResults.length;

  //The same but whit-out variables
  /*
   return getMembersOfParty(membersArr, party).map(member => member.votes_with_party_pct).reduce((vote1, vote2) => vote1 + vote2)/getMembersOfParty(membersArr, party).length;
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
  let membersToGet = Math.round(membersArr.length * (percent / 100));
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
      element.numbersOfReps = numberOfMembersByParty(membersArr, party);
      element.averageVoteParty = votingPartyAverage(membersArr, party);
      element.leastMissedVotesMembers = topOrLowestMembers(orderMembersByKeyValue(membersArr, "missed_votes"), 10, "first", "missed_votes");
      element.mostMissedVotesMembers = topOrLowestMembers(orderMembersByKeyValue(membersArr, "missed_votes"), 10, "last", "missed_votes");
      element.leastLoyalMembers = topOrLowestMembers(orderMembersByKeyValue(membersArr, "votes_with_party_pct"), 10, "first", "votes_with_party_pct");
      element.mostLoyalMembers = topOrLowestMembers(orderMembersByKeyValue(membersArr, "votes_with_party_pct"), 10, "last", "votes_with_party_pct");
  }
}


///AT GLANCE///   Array with our table titles.
const atGlanceTableTitles = ["Party", "No. of Reps", "% Voted w/ Party"];
///AT GLANCE///   Array with our Keys from JSON
const atGlanceTableKeys = ["idParty", "numbersOfReps", "averageVoteParty"];

///ENGAGED TABLE///   Array with our table titles.
const engagedTableTitles = ["Name", "No. Missed Votes", "% Missed"];
///ENGAGED TABLE///   Array with our Keys from JSON
const engagedTableKeys = ["first_name", "middle_name", "last_name", "missed_votes", "missed_votes_pct"];

///LOYAL TABLE///   Array with our table titles.
const loyalTableTitles = ["Name", "No. Party Votes", "% Party Votes"]
///lOYAL TABLE///   Array with our Keys from JSON
const loyalTableKeys = ["first_name", "middle_name", "last_name", "total_votes", "votes_with_party_pct"];

// Set values for statistics onject
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

console.log(topMembersMissedVotes);
console.log(topMembersVotes);
console.log(topMembersMostLoyal);
console.log(topMembersLessLoyal);

//Create glance table
createTable(statistics.partys, atGlanceTableTitles, atGlanceTableKeys, "table1", "th1", "tb1", "tr1");

//Create Least Engaged Table
createTable(topMembersMissedVotes, engagedTableTitles, engagedTableKeys, "table2", "th2", "tb2", "tr2");

//Create Most Engaged Table
createTable(topMembersVotes, engagedTableTitles, engagedTableKeys, "table3", "th3", "tb3", "tr3");
//
// //Create Least Loyal Table
// createTable(topMembersLessLoyal, engagedTableTitles, loyalTableKeys, "table2");
//
// // //Create Most Loyal Table
// createTable(topMembersMostLoyal, engagedTableTitles, loyalTableKeys, "table3");
