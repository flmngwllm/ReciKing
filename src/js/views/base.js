export const elem = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
}

export const elemStrings = {
    loader: 'loader'
}

export const renderLoad = parent => {
    const loader = `
     <div class="${elemStrings.loader}">
        <svg>
        <use href="img/icons.svg#icon-cw"></use>
        </svg>
     </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader)

}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elemStrings.loader}`)
    if(loader) {
        loader.parentElement.removeChild(loader)
    }
}