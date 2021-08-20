import getPokemonOptions, { getArrayNumbers, getPokemonNames } from '@/helpers/getPokemonOptions'
import { mockArrayPokemons } from '../mocks/pokemons.mock'

// Para estas prueba ver seccion 8 de curso de Vue
describe('getPokemonOptions', () => {
    test('should return an array of 650 numbers', () => {
        const arrayNumbers = getArrayNumbers()

        expect(arrayNumbers.length).toBe(650)
        expect(arrayNumbers[0]).toBe(1)
        expect(arrayNumbers[500]).toBe(501)
        expect(arrayNumbers[649]).toBe(650)
    })

    test("should return an array of 4 pokemons with ids equal to the function's arguments", async() => {
        const pokemons = await getPokemonNames([1, 2, 3, 4])

        expect(pokemons).toStrictEqual(mockArrayPokemons)
    })

    test('should return an array with 4 random pokemons', async() => {
        const pokemons = await getPokemonOptions()

        expect(pokemons.length).toBe(4)
        expect(pokemons).toEqual([
            { name: expect.any(String), id: expect.any(Number) },
            { name: expect.any(String), id: expect.any(Number) },
            { name: expect.any(String), id: expect.any(Number) },
            { name: expect.any(String), id: expect.any(Number) },
        ])
    })
    
    
})
