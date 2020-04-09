<template>
  <div class="transfer">
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
  @Prop() private status!: boolean
  @Prop() private crew!: Person[]
  private data = {
    title: 'Transfer'
  }

  private type () {
    return (this.status) ? 'Return' : 'Outward'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/definitions/_variables.scss";
  .transfer {
    padding-left: $grid-spacer;
    padding-right: $grid-spacer;

    .console {
        height: 30%;
        margin-top: 60%;
        padding: 0;
    }
  }

</style>
