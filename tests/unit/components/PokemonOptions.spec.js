import { shallowMount } from '@vue/test-utils'
import PokemonOptions from '@/components/PokemonOptions'
import { mockArrayPokemons } from '../mocks/pokemons.mock'

describe('PokemonOptions Component', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(PokemonOptions, {
            props: {
                pokemons: mockArrayPokemons,
                optionColor: ''
            }
        })
    })

    test('should match with snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
        // expect(wrapper.html()).toMatchInlineSnapshot() // video 106 explica el toMatchInlineSnapshot()
    })

    test('should display all 4 options correctly in the "li"', () => {
        const liTags = wrapper.findAll('li')
        const [ li1, li2, li3, li4 ] = liTags

        expect(liTags.length).toBe(4)
        expect(li1.text()).toBe('bulbasaur')
        expect(li2.text()).toBe('ivysaur')
        expect(li3.text()).toBe('venusaur')
        expect(li4.text()).toBe('charmander')

    })

    test('should emit "selectionPokemon" with their respective parameters when I click on the "li"', () => {
        const [ li1, li2, li3, li4 ] = wrapper.findAll('li')

        li1.trigger('click'); // al hacer click esto es lo que se emitirá: $emit('selectionPokemon', pokemon.id)
        li2.trigger('click');
        li3.trigger('click');
        li4.trigger('click');

        // console.log(wrapper.emitted('selectionPokemon'))

        expect(wrapper.emitted('selectionPokemon').length).toBe(4)
        // lo que esta entre corchetes en el toEqual([1]) es el id del pokemon
        expect(wrapper.emitted('selectionPokemon')[0]).toEqual([1])
        expect(wrapper.emitted('selectionPokemon')[1]).toEqual([2])
        expect(wrapper.emitted('selectionPokemon')[2]).toEqual([3])
        expect(wrapper.emitted('selectionPokemon')[3]).toEqual([4])

        // prueba extra que hice para probar que se aplique la clase 'change-color' al hacer click en una option
        expect(li1.classes('change-color')).toBeTruthy()
    })
    
})
