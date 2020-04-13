import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'
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
        await state.search.getResults()

        //Render results on Ui
        clearLoader();
        searchView.renderRes(state.search.results)
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


