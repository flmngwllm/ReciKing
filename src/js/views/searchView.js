import {elem} from './base'

export const getInput = () => elem.searchInput.value

export const clearInput = () => {
 elem.searchInput.value = ''
}

export const clearRes = () => {
 elem.searchList.innerHTML = ''
 elem.searchResPages.innerHTML = ''

}

const limitRecTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0); 

        return `${newTitle.join(' ')} ...` 
    }
     return title   
}

const renderRecip = recipe => {
 const markUp = `
 <li>
 <a class="results__link" href="#${recipe.recipe_id}">
     <figure class="results__fig">
         <img src="${recipe.image_url}" alt="${recipe.title}">
     </figure>
     <div class="results__data">
         <h4 class="results__name">${limitRecTitle(recipe.title)}</h4>
         <p class="results__author">${recipe.publisher}</p>
     </div>
 </a>
</li>
 `

elem.searchList.insertAdjacentHTML('beforeend', markUp)
}


const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
    </button>
`


const renderButton = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage)
    let button
    if(page === 1 && pages > 1){
        // Button goes to next page
       button = createButton(page, 'next')
    } else if (page < pages){
        // Both buttons
        button = `${createButton(page, 'prev')}
                ${createButton(page, 'next')} `

    } else if (page === pages && pages > 1){
        // Only button to go to prev page
        button = createButton(page, 'prev')

    }

elem.searchResPages.insertAdjacentHTML('afterbegin', button)

}

export const renderRes = (recipes, page = 1, resPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage

    recipes.slice(start,end).forEach(renderRecip);

    // render pagination buttons
    renderButton(page, recipes.length, resPerPage)
}