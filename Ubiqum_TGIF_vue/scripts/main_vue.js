// Vue.component('checkboxfilter', {
//   template: `<input type="checkbox" class="input" name="party" :id="item.relatedChekBox" onclick="filterAll(memberList)" autocomplete="off" :value="item.value">
//             <label :for="item.relatedChekBox" class="label">{{ item.party }}</label>`
// });


//
// Vue.component("accordionradiobuttons", {
//   prop: ['value'],
//   template: `   <div class="selectColumn1">
//                   <div>
//                   <button class="accordion" @click="makeAccordion">{{ column }}</button>
//                   <div ref="myPanel" class="panel">
//                   <div v-for="item of radioData">
//                       <input type="radio" class="input" :id="item.id" :value="value"
//       v-on:change="$emit('input', $event.target.checked)" autocomplete="off">
//                       <label :for="item.id" class="label">{{ item.text }}</label>
//                   </div>
//                     </div>
//                   </div>
//                   </div>`,
//   data: function(){
//     return{
//       radioData: [
//         {
//           id: "button1",
//           text: "Name",
//           myKey: ["first_name", "middle_name", "last_name"],
//         },
//         {
//           id: "button2",
//           text: "Party",
//           myKey: "party",
//         },
//         {
//           id: "button3",
//           text: "State",
//           myKey: "state",
//         },
//         {
//           id: "button4",
//           text: "Years in Oficce",
//           myKey: "seniority",
//         },
//         {
//           id: "button5",
//           text: "% Votes w/ Party",
//           myKey: "votes_with_party_pct",
//         },
//         {
//           id: "button6",
//           text: "Title",
//           myKey: "title",
//         },
//         {
//           id: "button6",
//           text: "Date Of Birth",
//           myKey: "date_of_birth"
//         },
//         {
//           id: "button7",
//           text: "Office",
//           myKey: "office"
//         },
//         {
//           id: "button8",
//           text: "Nº Phone",
//           myKey: "phone"
//         },
//         {
//           id: "button9",
//           text: "Nº Fax",
//           myKey: "fax"
//         },
//         {
//           id: "button10",
//           text: "Next Election",
//           myKey: "next_election"
//         },
//       ],
//       column: "Select Column",
//       dynamicID: 0,
//       membersList: senateData.results[0].members,
//       keysList:[],
//       titleList:[],
//       radioSelected:[],
//       isShow: false,
//     }
//   },
//   methods: {
//     makeAccordion() {
//       this.isShow = !this.isShow;
//       let panel = this.$refs.myPanel;
//       console.log(panel);
//       if (panel.style.maxHeight) {
//         panel.style.maxHeight = null;
//         setTimeout(function(){panel.style.padding = "0px"} , 700)
//       } else {
//         panel.style.padding = "10px";
//         panel.style.maxHeight = `${panel.scrollHeight}px`;
//       }
//     },
//
//     makeUserTable(){
//       this.keyList = this.radioSelected,
//       this.$refs
//     },
//     changeColumnNumber(){
//       for (let i = 0; i< this.radioData; i++) {
//         this.column = `${this.column} ${i+1}`
//       }
//     },
//     handleInput (e) {
//       this.$emit('change', this.content)
//     }
//
//   },
//   created(){
//     this.changeColumnNumber();
//   },
//   beforeUpdate(){
//     console.log(this.radioSelected);
//   }
//
// });

function test(variable) {
  console.log("Im the function outside vue instance");
  console.log(variable);
}

const myVue = new Vue({
  el: "#myVueElement",
  data: {
    showTable: false,
    isLoaded: false,
    membersConst: [],
    membersList: [],
    stateArray: [],
    mainTableTitles: ["Name", "Party", "State", "Years in Oficce", "% Votes w/ Party"],
    mainTableKeys: ["first_name", "middle_name", "last_name", "party", "state", "seniority", "votes_with_party_pct"],
    tableKeysMod: [],
    partySelected: [],
    checkSelected: [],
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
    ],

    radioData: [{
        id: "button1",
        text: "Name",
        myKey: ["first_name", "middle_name", "last_name"],
      },
      {
        id: "button2",
        text: "Party",
        myKey: "party",
      },
      {
        id: "button3",
        text: "State",
        myKey: "state",
      },
      {
        id: "button4",
        text: "Years in Oficce",
        myKey: "seniority",
      },
      {
        id: "button5",
        text: "% Votes w/ Party",
        myKey: "votes_with_party_pct",
      },
      {
        id: "button6",
        text: "Title",
        myKey: "title",
      },
      {
        id: "button7",
        text: "Date Of Birth",
        myKey: "date_of_birth"
      },
      {
        id: "button8",
        text: "Office",
        myKey: "office"
      },
      {
        id: "button9",
        text: "Nº Phone",
        myKey: "phone"
      },
      {
        id: "button10",
        text: "Nº Fax",
        myKey: "fax"
      },
      {
        id: "button11",
        text: "Next Election",
        myKey: "next_election"
      },
    ],

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

    filterByParty(membersArr, partyArr) {
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

    filterAll(membersArr) {
      this.showTable = false;
      let membersFilter = this.filterByParty(membersArr, this.partySelected);
      this.membersList = this.filterByState(membersFilter, this.stateSelected);
      this.showTable = true;
    },
    makeAccordion() {
      this.isShow = !this.isShow;
      let panel = this.$refs.myPanel;
      console.log(panel);
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        setTimeout(function() {
          panel.style.padding = "0px"
        }, 700)
      } else {
        panel.style.padding = "10px";
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    },

    async getData(jsonURL, apiKey) {
      //await the response of the fetch call
      let response = await fetch(jsonURL, {
        method: "GET",
        dataType: 'json',
        headers: {
          "X-API-Key": apiKey
        }
      });
      //proceed once the first promise is resolved.
      let data = await response.json()
      //proceed only when the second promise is resolved
      return data;
    }
  },

  beforeMount() {
    this.tableKeysMod = this.modKeysArr(this.mainTableKeys);
    if (window.location.href.includes("senate")) {
      this.getData("https://api.propublica.org/congress/v1/115/senate/members.json", "kBfQKxtZzIQKC80wlPEvDUhKAFxVlBU63svN3B8O").then((data) => {
        this.membersConst = data.results[0].members;
        this.membersList = this.membersConst;
        this.isLoaded = true;
        this.showTable = true;
      });
    } else {
      this.getData("https://api.propublica.org/congress/v1/115/house/members.json", "kBfQKxtZzIQKC80wlPEvDUhKAFxVlBU63svN3B8O").then((data) => {
        this.membersConst = data.results[0].members;
        this.membersList = this.membersConst;
        this.isLoaded = true;
        this.showTable = true;
      });
    }
  },

  beforeUpdate() {
    this.getStates(this.membersConst);
    test(this.showTable);
    console.log(this.checkSelected);
    console.log(this.partySelected);
  },

});
