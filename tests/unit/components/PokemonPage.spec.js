import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from '@/pages/PokemonPage'
import { mockArrayPokemons } from '../mocks/pokemons.mock'


describe('PokemonPage Component', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(PokemonPage)
    })

    // Este snapshot no servirá de mucho ya que solo muestra el loading
    test('should match with snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('should call getPokemons() when my app has been mounted', () => {
        /* Para esta parte ver video 108 para más detalle. El spy debe definirse antes del shallowMount()
        ya que cuando hago el spy entonces ya es muy tarde para espiar el metodo getPokemons(), debido a que
        el componente ya esta totalmente montado y el getPokemns() solo estará disponible en el momento en que se está
        montando la app */
        const getPokemonsSpy = jest.spyOn(PokemonPage.methods, 'getPokemons')
        shallowMount(PokemonPage)

        expect(getPokemonsSpy).toHaveBeenCalled()
    })

    /* Esta sería otra forma de tener un snapshot completo de mi componente (EXPLICADO MEJOR EN EL VIDEO 109,
    vale la pena verlo para conocer la diferencia entre SHALLOWMOUNT() y MOUNT()) */
    test('should match with snapshot when load all pokemons', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonsArray: mockArrayPokemons,
                    correctPokemon: mockArrayPokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                    optionColor: ''
                }
            }
        })

        expect(wrapper.html()).toMatchSnapshot();
    })

    test('should display the PokemonPicture and PokemonOptions components', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonsArray: mockArrayPokemons,
                    correctPokemon: mockArrayPokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                    optionColor: ''
                }
            }
        })

        const pokemonPicture = wrapper.find('pokemon-picture-stub')
        const pokemonOptions = wrapper.find('pokemon-options-stub')

        expect(pokemonPicture.exists()).toBeTruthy()
        expect(pokemonOptions.exists()).toBeTruthy()
        expect(pokemonPicture.attributes('pokemonid')).toBe('1') // que sea iguala uno porque ese es el id del pokemon en la posicion 0, ver la data enviada arriba
        expect(pokemonOptions.attributes('pokemons')).toBeTruthy()
    })

    test('should trigger checkAnswer() method', async() => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonsArray: mockArrayPokemons,
                    correctPokemon: mockArrayPokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                    optionColor: ''
                }
            }
        })

        await wrapper.vm.checkAnswer(mockArrayPokemons[0].id) // colocamos await ya que ese metodo hará modificaciones al DOM

        expect(wrapper.find('h2').exists()).toBeTruthy();
        expect(wrapper.vm.showPokemon).toBe(true);
        expect(wrapper.find('h2').text()).toBe('Correct!')

        await wrapper.vm.checkAnswer(7)
    
        expect(wrapper.vm.message).toBe(`Incorrect!. Its ${mockArrayPokemons[0].name}`)
    })
    
})
