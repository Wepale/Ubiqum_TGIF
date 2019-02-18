// Vue.component('checkboxfilter', {
//   template: `<input type="checkbox" class="input" name="party" :id="item.relatedChekBox" onclick="filterAll(memberList)" autocomplete="off" :value="item.value">
//             <label :for="item.relatedChekBox" class="label">{{ item.party }}</label>`
// });



// Vue.component("tablecreation", {
//   template: `<table id="table1" class="table table-striped table-hover">
//               <thead>
//                 <tr>
//                   <th v-for="title of mainTableTitles">{{ title }}</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr v-for="member of membersList">
//                   <td v-for="key of tableKeysMod"><a v-if="key === 'first_name'" :href="member.url"> {{ joinName(member) }} </a><span v-else> {{ checkNullValue(member[key]) }} </span></td>
//                 </tr>
//               </tbody>
//             </table>`,
//   data: function(){
//     return{
//       membersList: senateData.results[0].members,
//       mainTableTitles: ["Name", "Party", "State", "Years in Oficce", "% Votes w/ Party"],
//       mainTableKeys: ["first_name", "middle_name", "last_name", "party", "state", "seniority", "votes_with_party_pct"],
//       tableKeysMod: null,
//     }
//   },
//   methods: {
//
//     joinName(member) {
//       const nameData = Object.keys(member).filter(data => data === "first_name" || data === "middle_name" || data === "last_name");
//       let completeName = "";
//       for (name of nameData) {
//         if (member[name]) {
//           completeName = `${completeName} ${member[name]}`
//         }
//       }
//       console.log(this.template);
//       return completeName;
//     },
//
//     modKeysArr(keysArr) {
//       return keysArr.filter(data => data !== "middle_name" && data !== "last_name");
//     },
//
//     checkNullValue(value) {
//       if (value) {
//         return value;
//       } else {
//         return "---";
//       }
//     }
//   },
//
//   beforeMount() {
//     this.tableKeysMod = this.modKeysArr(this.mainTableKeys);
//   },
//
// });

const myVue = new Vue({
  el: "#myVueElement",
  data: {
    showTable: true,
    membersConst: senateData.results[0].members,
    membersList: senateData.results[0].members,
    stateArray: null,
    mainTableTitles: ["Name", "Party", "State", "Years in Oficce", "% Votes w/ Party"],
    mainTableKeys: ["first_name", "middle_name", "last_name", "party", "state", "seniority", "votes_with_party_pct"],
    tableKeysMod: null,
    partySelected: [],
    stateSelected: "all",
    checkboxData: [{
        party: "Republican",
        value: "R",
        relatedChekBox: "republicanCheckBox"
      },
      {
        party: "Democrat",
        value: "D",
        relatedChekBox: "democratCheckBox"
      },
      {
        party: "Independent",
        value: "I",
        relatedChekBox: "IndependentCheckBox"
      },
    ]

  },

  methods: {

    getStates(membersArr) {
      const states = [];
      for (member of membersArr) {
        if (!states.includes(member.state)) {
          states.push(member.state);
        }
      }
      this.stateArray = states.sort();
    },

    joinName(member) {
      const nameData = Object.keys(member).filter(data => data === "first_name" || data === "middle_name" || data === "last_name");
      let completeName = "";
      for (name of nameData) {
        if (member[name]) {
          completeName = `${completeName} ${member[name]}`
        }
      }
      return completeName;
    },

    modKeysArr(keysArr) {
      return keysArr.filter(data => data !== "middle_name" && data !== "last_name");
    },

    checkNullValue(value) {
      if (value) {
        return value;
      } else {
        return "---";
      }
    },

    filterByParty(membersArr, partyArr){
      if (partyArr.length) {
        let filterArr = [];
        for (party of partyArr) {
          filterArr.push(...membersArr.filter(member => member.party === party));
        }
        return filterArr;
      }
      return membersArr;
    },

    filterByState(membersArr, state) {
      return state === "all" ? membersArr : membersArr.filter(member => member.state === state);
    },

    filterAll(membersArr){
      this.showTable = false;
      let membersFilter = this.filterByParty(membersArr, this.partySelected);
      this.membersList = this.filterByState(membersFilter, this.stateSelected);
      this.showTable = true;
    },
  },

  beforeMount() {
    this.tableKeysMod = this.modKeysArr(this.mainTableKeys);
  },

  created() {
    this.getStates(this.membersList);
  },

});
