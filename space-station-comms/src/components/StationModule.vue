<template>
  <div class="station-module">
    <p class="area-title">{{ data.title }}</p>
    <div class="console">
      <crew v-for="(person, index) of crew"
            v-bind:key="index"
            :data="person"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Person } from '@/store/Person.ts'

@Component
export default class StationModule extends Vue {
  @Prop() private name!: string
  @Prop() private status!: string
  @Prop() private crew!: Person[]
  private data = {
    title: `Station Module ${this.name}`
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
