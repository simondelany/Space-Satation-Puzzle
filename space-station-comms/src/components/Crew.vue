<template>
    <div class="crew">
        <div class="crew__block"
            v-bind:class="{selected: data.selected}"
            draggable="true"
            @click="handleClick">
            <p class="person-name">{{ data.firstName }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Person } from '@/store/Person.ts'

@Component
export default class Crew extends Vue {
  @Prop() private data!: Person

  private handleClick () {
    if (this.data.selected) {
      this.$emit('deselectPerson', this.data)
    } else {
      this.$emit('selectPerson', this.data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/definitions/_variables.scss";
  .crew {
    padding: 0.5vmin;

    &__block {
      background-color: rgb(36, 33, 65);
      height: 100%;
      padding: 0;
      margin-top: auto;
    }

    &__block.selected {
      background-color: blue;
    }
  }

</style>
