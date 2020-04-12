// Recipe.js  const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
import axios from 'axios'

export default class Search{
    constructor(query){
        this.query = query

    }

    async getResults(query) {
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`)
            this.results = res.data.recipes
            console.log(this.results)
        } catch (error){
            alert(error)
        }       
    }        
}