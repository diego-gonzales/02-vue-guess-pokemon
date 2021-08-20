import pokemonApi from '@/api/pokemonApi';


describe('pokemonApi', () => {
    test('axios baseURL should be configured with pokemon API', () => {
        expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon');
    });
});
