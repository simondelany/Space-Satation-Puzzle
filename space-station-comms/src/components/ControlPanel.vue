<template>
  <div class="control-panel">
    <p>{{ data.title }}</p>
    <div class="h-container p-0">
      <station-module ref="moduleAlpha"
      :name="'Alpha'"
        :status="'DAMAGED'"
        :transferCapacity="2"
        :hasSuits="suitPosition === 0"
        :crew="crewInA"
        :msgBus="data.msgBus"/>
      <transfer :status="suitPosition"
        :crew="crewInTransit"
        :selectedCrew="selectedCrew"
        :selected="selectedCrew"
        :transferCapacity="(suitPosition) ?  1 : 2"
        v-on:startTransfer="startTransfer"/>
      <station-module ref="moduleBravo"
        :name="'Bravo'"
        :status="'OK'"
        :hasSuits="suitPosition === 1"
        :transferCapacity="1"
        :crew="crewInB"
        :msgBus="data.msgBus"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import StationModule from '@/components/StationModule.vue'
import Transfer from '@/components/Transfer.vue'
import store from '@/store'
import { Person } from '@/store/Person'

@Component({
  components: {
    StationModule,
    Transfer
  }
})
export default class ControlPanel extends Vue {
  private data = {
    title: 'Space Station Control Panel',
    msgBus: new Vue() // we use a vue instance as a message bus to the station modules
  }

  get transitStatus (): number {
    return store.state.suitPosition
  }

  get crewInA (): Person[] {
    const crew = store.getters.getCrewA()
    return crew
  }

  get crewInB (): Person[] {
    const crew = store.getters.getCrewB()
    return crew
  }

  get crewInTransit (): Person[] {
    return store.getters.getCrewInTransit()
  }

  get selectedCrew (): Person[] {
    return store.getters.getSelectedCrew()
  }

  get suitPosition (): number {
    return store.state.suitPosition
  }

  private startTransfer () {
    store.dispatch('startTransfer')
    this.data.msgBus.$emit('clearLocalSelection')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .area-title {
    text-align: center;
    color: #bbbb;
  }
</style>
