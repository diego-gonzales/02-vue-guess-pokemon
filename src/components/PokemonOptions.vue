<template>
  <div class="options-container">
    <ul>
      <li v-for="pokemon in pokemons"
          :key="pokemon.id"
          @click="$emit('selectionPokemon', pokemon.id), clickedOption($event)">
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pokemons: {
      type: Array,
      required: true
    },
    optionColor: {
      type: String,
      required: true
    }
  },
  methods: {
    // Esto es un extra de mi parte
    clickedOption(event) {
      this.cleanColorOption();

      const optionSelected = event.target;
      optionSelected.classList.add('change-color')
    },
    cleanColorOption() {
      const liTags = document.querySelector('.change-color');
      if (liTags) liTags.classList.remove('change-color');
    }
  }
}
</script>

<style scoped>
.change-color {
  background-color: v-bind(optionColor);
}
ul {
    list-style-type: none;
    padding: 0px;
}
li {
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
}

li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
    display: flex;
    justify-content: center;
}
</style>