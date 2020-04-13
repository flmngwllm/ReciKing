import Search from './models/Search'
import * as searchView from './views/searchView'
import {elem} from './views/base'

/*Global state of our app
 -Search object
 -Current recipe object
 -Shopping list object
 -Like recipes
*/
const state = {}

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
        // search for the recipres
        await state.search.getResults()

        //Render results on Ui
        searchView.renderRes(state.search.results)
    }
}

elem.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch()
})


