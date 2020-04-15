import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { Person } from '@/store/Person'
import { CommsChannel } from '@/store/CommsChannel'
import { SpaceStationSim } from '@/store/SpaceStationSim'

Vue.use(Vuex)

const crew: Person[] = []
const commsChannel = new CommsChannel()
const broadcaster = (msg: string) => {
  commsChannel.broadcast(msg)
}
const sim = new SpaceStationSim(broadcaster)

export default new Vuex.Store({
  state: {
    ready: false,
    crew,
    suitPosition: 0,
    remainingTime: 21
  },
  mutations: {
    loadCrewData (state, data) {
      state.crew = data
    },
    movePeople (state, data) {
      // move the crew
      state.crew = state.crew.map((c: Person) => {
        const beingMoved = data.people.find((p: Person) => {
          return p.uuid === c.uuid
        })
        if (beingMoved) {
          c.location = data.position
        }
        return c
      })

      // When completing a transit
      if (data.position !== 2) {
        // switch suit position
        state.suitPosition = 1 - state.suitPosition

        // clear the selections
        state.crew = state.crew.map((c: Person) => {
          c.selected = false
          return c
        })

        state.remainingTime -= data.transferTime
      }
    },
    updateSelectedCrew (state, selected: Person[]) {
      state.crew = state.crew.map((c: Person) => {
        const beingSelected = selected.find((s: Person) => {
          return s.uuid === c.uuid
        })
        if (beingSelected) {
          c.selected = true
        } else {
          c.selected = false
        }
        return c
      })
    },
    openCommsChannel (state, msgHandler: ((msg: string) => void)) {
      commsChannel.subscribe(msgHandler)
    },
    ready (state) {
      state.ready = true
    }
  },
  actions: {
    fetchCrewData (store) {
      // start the simulation - intro messages will show while we load the data
      sim.startSimulation(() => {
        store.commit('ready')
      })

      Axios.get(process.env.VUE_APP_API_EMPLOYEES).then(employeeRequest => {
        let employees: Person[] = []
        if (employeeRequest.status === 200) {
          employees = employeeRequest.data.map((person: Person) => {
            person.location = 0
            person.selected = false
            person.status = 'OK'
            return person
          })
        }
        store.commit('loadCrewData', employees)
      }).catch(() => {
        console.warn('Could not load employee physical assesments!')
      })
    },
    startTransfer: (store) => {
      const selected = store.getters.getSelectedCrew()
      const transferTime = Math.max(...selected.map((s: Person) => s.transferTime))
      commsChannel.broadcast('Commencing crew transfer...')
      commsChannel.broadcast(`E.T.A. to completion: ${transferTime} minute${(transferTime > 1) ? 's' : ''}`)

      // move selected into the void of space
      store.commit(
        'movePeople',
        {
          people: selected,
          position: 2,
          transferTime
        }
      )

      setTimeout(() => {
        // complete transfer if we have enough time remaining
        store.commit(
          'movePeople',
          {
            people: (store.state.remainingTime >= transferTime) ? selected : [],
            position: (store.state.remainingTime >= transferTime) ? 1 - store.state.suitPosition : store.state.suitPosition,
            transferTime
          }
        )

        const stillInTransit = store.getters.getCrewInTransit()

        if (!stillInTransit.length) {
          commsChannel.broadcast('Crew transfer complete.')
          commsChannel.broadcast('They made it across safely!')
        }

        if (store.state.remainingTime > 0) {
          commsChannel.broadcast(`Only ${store.state.remainingTime} minute${(store.state.remainingTime > 1) ? 's' : ''} left!`)
        } else {
          const lost = [].concat(store.getters.getCrewA(), stillInTransit)
          if (lost.length) {
            store.commit('loadCrewData', store.getters.getCrewB())
            commsChannel.broadcast(`... automated critical message ...\nModule Alpha destroyed!\nCrew Lost:\n* ${lost.map((c: Person) => c.firstName).join('\n* ')}`)
          } else {
            commsChannel.broadcast('You did it! We\'re all safely across!')
          }
        }
      }, transferTime * 1000)
    }
  },
  getters: {
    getCrewA: (state) => () => {
      return state.crew.filter((person: Person) => {
        return person.location === 0
      })
    },
    getCrewB: (state) => () => {
      return state.crew.filter((person: Person) => {
        return person.location === 1
      })
    },
    getCrewInTransit: (state) => () => {
      return state.crew.filter((person: Person) => {
        return person.location === 2
      })
    },
    getSelectedCrew: (state) => () => {
      return state.crew.filter((person: Person) => {
        return (person.selected === true) && (person.location !== 2)
      })
    },
    isReady: (state) => () => {
      return state.ready
    }
  }
})
