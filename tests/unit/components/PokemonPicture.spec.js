import { shallowMount } from '@vue/test-utils'
import PokemonPicture from '@/components/PokemonPicture'

describe('PokemonPicture Component', () => {

    test('should match with snapshot', () => {
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 1,
                showPokemon: false
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

    test('should show the pokemon shadow image if prop showPokemon: false, which should have class "hidden-pokemon", and also show the pokemon number 100', () => {
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,
                showPokemon: false
            }
        })

        const [ image1, image2 ] = wrapper.findAll('img')

        expect(image1.exists()).toBeTruthy()
        expect(image2).toBe(undefined)
        expect(image1.classes('hidden-pokemon')).toBeTruthy()
        expect(image1.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg')
    })

    test('should reveal the pokemon image if prop showPokemon: true', () => {
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,
                showPokemon: true
            }
        })
        /* ver video 105 de curso Vue. Siempre existirá una imagen en el DOM, ya que hay un v-if-else osea
        lo de la prueba anterior se podía hacer de esta manera nada más, ya que la img2 siempre será 'undefined' */
        const img = wrapper.find('img')

        expect(img.exists()).toBeTruthy()
        expect(img.classes('hidde-pokemon')).toBe(false)
        expect(img.classes('fade-in')).toBe(true)
    })
    
})
