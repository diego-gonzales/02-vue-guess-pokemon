import pokemonApi from '@/api/pokemonApi';


export const getArrayNumbers = () => {
    const pokemonsArray = Array.from(Array(650)); // lógica explicada en el video 91 de curso de Vue
    return pokemonsArray.map((_, index) => index + 1);
};

const getPokemonOptions = async() => {
    const mixedArrayNumbers = getArrayNumbers().sort(() => Math.random() - 0.5);
    const pokemons = await getPokemonNames(mixedArrayNumbers.splice(0, 4));
    return pokemons;
};

export const getPokemonNames = async ([a, b, c, d] = []) => {
    const promisesArray = [
        pokemonApi.get(`${a}`),
        pokemonApi.get(`${b}`),
        pokemonApi.get(`${c}`),
        pokemonApi.get(`${d}`)
    ];

    const [ response1, response2, response3, response4 ] = await Promise.all(promisesArray);

    return [
        { name: response1.data.name, id: response1.data.id },
        { name: response2.data.name, id: response2.data.id },
        { name: response3.data.name, id: response3.data.id },
        { name: response4.data.name, id: response4.data.id }
    ];
};


export default getPokemonOptions;