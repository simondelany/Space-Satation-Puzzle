import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { Person } from '@/store/Person'

Vue.use(Vuex)

const crew: Person[] = []

export default new Vuex.Store({
  state: {
    crew,
    suitPosition: 0
  },
  mutations: {
    loadCrewData (state, data) {
      state.crew = data
    },
    movePeople (state, people) {
      for (const person of people) {
        state.crew.find(c => c.uuid === person.uuid)
      }
    }
  },
  actions: {
    fetchCrewData (store) {
      Axios.get(process.env.VUE_APP_API_EMPLOYEES).then(employeeRequest => {
        let employees: Person[] = []
        if (employeeRequest.status === 200) {
          employees = employeeRequest.data.map((person: Person) => {
            person.position = 0
            return person
          })
        }
        store.commit('loadCrewData', employees)
      }).catch(() => {
        console.warn('Could not load employee physical assesments!')
      })
    },
    sendPeople (store) {
      // a
    },
    returnPerson (store) {
      // b
    }
  },
  getters: {
    getCrewA: (state) => () => {
      return state.crew.filter((person: Person) => {
        return person.position === 0
      })
    },
    getCrewB: (state) => () => {
      return state.crew.filter((person: Person) => {
        return person.position === 1
      })
    },
    getCrewInTransit: (state) => () => {
      return state.crew.filter((person: Person) => {
        return person.position === 2
      })
    }
  }
})
