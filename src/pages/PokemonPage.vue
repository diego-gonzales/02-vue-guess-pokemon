<template>
  <h1 v-if="!correctPokemon">
    Please wait a moment...
  </h1>
  <div v-else>
    <h1>Who is that pokemon?</h1>
    <PokemonPicture :pokemon-id="correctPokemon.id"
                    :show-pokemon="showPokemon"
    />
    <PokemonOptions :pokemons="pokemonsArray"
                    @selection-pokemon="checkAnswer"
    />

    <template v-if="showAnswer">
      <h2>
        {{ message }}
      </h2>
      <button @click="newGame">
        New game
      </button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from '../components/PokemonPicture';
import PokemonOptions from '../components/PokemonOptions';
import getPokemonOptions from '@/helpers/getPokemonOptions';

export default {
  name: 'PokemonPage',
  components: {
    PokemonPicture,
    PokemonOptions
  },
  data() {
    return {
      pokemonsArray: [],
      correctPokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: ''
    }
  },
  methods: {
    async getPokemons() {
      this.pokemonsArray = await getPokemonOptions();
      const randomNumber = Math.floor(Math.random() * 4);

      this.correctPokemon = this.pokemonsArray[randomNumber];
    },
    checkAnswer(pokemonIdEvent) {
      this.showPokemon = true;
      this.showAnswer = true;
      (this.correctPokemon.id === pokemonIdEvent)
          ? this.message = `Correct!`
          : this.message = `Incorrect!. Its ${this.correctPokemon.name}`;
    },
    newGame() {
      this.pokemonsArray = []
      this.correctPokemon = null
      this.showPokemon = false
      this.showAnswer = false
      this.getPokemons();
    }
  },
  mounted() {
    // Podríamos decir que el mounted() es equivalente al ngOnInit() en Angular
    this.getPokemons();
  }
}
</script>