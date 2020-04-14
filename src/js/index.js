import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
import * as recipeView from './views/recipeView'
import {elem, renderLoad, clearLoader} from './views/base'


/*Global state of our app
 -Search object
 -Current recipe object
 -Shopping list object
 -Like recipes
*/
const state = {}

// Search Controller
const controlSearch = async () => {
    // get query from view
    const query = searchView.getInput()
    // create new search object

    if(query){
        // New search object and add to state
        state.search = new Search(query)

        // Prepare Ui for results
        searchView.clearInput();
        searchView.clearRes();
       
        renderLoad(elem.searchRes)
        // search for the recipres
        try {
        await state.search.getResults()

        //Render results on Ui
        clearLoader();
        searchView.renderRes(state.search.results)
        } catch (err) {
            alert('Something went wrong searching')
            clearLoader();
        }
    } 

}

elem.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch()
})


elem.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearRes();
        searchView.renderRes(state.search.results, goToPage)
    }
})


//Recipe Controller
const r = new Recipe(46956);
r.getRecipe()
console.log(r)

const controlRec = async () => {
    // entire url hash from browser
    const id = window.location.hash.replace('#', '');
    console.log(id)

    if(id){

        // Prepare UI for changes
        recipeView.clearRecipe()
        renderLoad(elem.recipe)
        // Create new recipe object
        state.recipe = new Recipe(id)

        // Highlight slected search
        if(state.search){
        searchView.highlightSelect(id)
        }
        
        try{

        // Get recipe data and parse ingredients
        await state.recipe.getRecipe()
        state.recipe.parseIngredients()
        // Calculate servings and time

        state.recipe.calcTime()
        state.recipe.calcServings()
        // Render Recipe

            clearLoader();
            recipeView.renderRecipe(state.recipe)
        
        } catch (err){
            alert('Error loading recipe')
        }
    }
}
// window.addEventListener('hashchange', controlRec)
// window.addEventListener('load', controlRec)
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRec))