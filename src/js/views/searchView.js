import {elem} from './base'

export const getInput = () => elem.searchInput.value

export const clearInput = () => {
 elem.searchInput.value = ''
}

export const clearRes = () => {
 elem.searchList.innerHTML = ''

}

const renderRecip = recipe => {
 const markUp = `
 <li>
 <a class="results__link" href="#${recipe.recipe_id}">
     <figure class="results__fig">
         <img src="${recipe.image_url}" alt="${recipe.title}">
     </figure>
     <div class="results__data">
         <h4 class="results__name">${recipe.title}</h4>
         <p class="results__author">${recipe.publisher}</p>
     </div>
 </a>
</li>
 `

elem.searchList.insertAdjacentHTML("beforeend", markUp)
}

export const renderRes = recipes => {
    recipes.forEach(renderRecip);
}