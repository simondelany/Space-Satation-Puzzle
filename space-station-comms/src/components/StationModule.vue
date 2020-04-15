<template>
  <div class="station-module">
    <p class="area-title">{{ data.title }}</p>
    <div class="console">
      <crew v-for="(person, index) of crew"
            v-bind:key="index"
            :data="person"
            v-on:selectPerson="selectPerson"
            v-on:deselectPerson="deselectPerson"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Person } from '@/store/Person.ts'
import Crew from '@/components/Crew.vue'
import store from '@/store'

interface StationData {
  title: string;
  selectedCrew: Person[];
}

@Component({
  components: {
    Crew
  }
})
export default class StationModule extends Vue {
  @Prop() private name!: string
  @Prop() private status!: string
  @Prop() private hasSuits!: boolean
  @Prop() private transferCapacity!: number
  @Prop() private crew!: Person[]
  @Prop() private msgBus!: Vue

  constructor () {
    super()
    this.msgBus.$on('clearLocalSelection', this.clearLocalSelection)
  }

  private data: StationData = {
    title: `Station Module ${this.name}`,
    selectedCrew: []
  }

  private selectPerson (person: Person) {
    if (this.hasSuits) {
      if (this.data.selectedCrew.length >= this.transferCapacity) {
        this.data.selectedCrew.pop()
      }
      this.data.selectedCrew.push(person)
      this.updateSelectedCrew()
    }
  }

  private deselectPerson (person: Person) {
    if (this.hasSuits) {
      this.data.selectedCrew = this.data.selectedCrew.filter((c: Person) => {
        return c !== person
      })
      this.updateSelectedCrew()
    }
  }

  private updateSelectedCrew () {
    store.commit('updateSelectedCrew', this.data.selectedCrew)
  }

  private clearLocalSelection () {
    this.data.selectedCrew = []
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  div {
    padding: 0;
  }

  .console {
    height: 50%;
    margin-top: 25%;
  }
</style>
