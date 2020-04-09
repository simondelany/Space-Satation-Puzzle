<template>
  <div class="control-panel">
    <p>{{ data.title }}</p>
    <div class="h-container p-0">
      <station-module :name="'Alpha'"
        :status="'DAMAGED'"
        :crew="crewInA"/>
      <transfer :status="data.transferStatus"
        :crew="crewInTransit"/>
      <station-module :name="'Bravo'"
        :status="'OK'"
        :crew="crewInB"/>
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
    title: 'Space Station Control Panel'
  }

  get transitStatus (): number {
    return store.state.suitPosition
  }

  get crewInA (): Person[] {
    const crew = store.getters.getCrewA()
    console.dir(crew)
    return crew
  }

  get crewInB (): Person[] {
    const crew = store.getters.getCrewB()
    console.dir(crew)
    return crew
  }

  get crewInTransit (): Person[] {
    return store.getters.getCrewInTransit()
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
