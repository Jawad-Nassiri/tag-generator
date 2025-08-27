const $ = document,
    tagsContainer = $.querySelector('ul'),
    tagCountElem = $.querySelector('.tag-count'),
    inputElem = $.querySelector('input'),
    removeAllTagsBtn = $.querySelector('.remove-btn');

let tags = [];
const MAX = 10;


inputElem.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;

    let tagValue = inputElem.value.trim();
    if (!tagValue) return;
    
    if (tags.length >= MAX) {
        e.preventDefault();
        return;
    }

    if (tagValue.includes(',')) {
        let splitValue = tagValue.split(',').map(val => val.trim()).filter(Boolean);
        
        for (let tag of splitValue) {
            if (tags.length >= MAX) break;

            let isTagExist = tags.find(t => t === tag)

            if (isTagExist === undefined) {
                tags.unshift(tag);
                tagsContainer.insertAdjacentHTML('afterbegin',
                    `<li>${tag}<i class="fa-solid fa-xmark"></i></li>`
                );
            }
            
        }
    } else {
        let isTagExist = tags.find(t => t === tagValue)
        if (isTagExist === undefined) {
            tags.unshift(tagValue);
            tagsContainer.insertAdjacentHTML('afterbegin',
                `<li>${tagValue}<i class="fa-solid fa-xmark"></i></li>`
            );
        }
    }


    inputElem.value = '';
    tagCountElem.textContent = String(tags.length);
    e.preventDefault();

})

const removeTagHandler = (e) => {
    let mainParentElem = e.target.parentElement;
    let tagValue = mainParentElem.firstChild.textContent.trim();
    mainParentElem.remove();
    tags = tags.filter(tag => tag !== tagValue);
    tagCountElem.textContent = String(tags.length);
}

const removeAllTagsHandler = () => {
    tags = [];
    let tagElements = document.querySelectorAll('li');
    tagElements.forEach(tag => {
        tag.remove();
    });
    
    tagCountElem.textContent = 0;
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-xmark')) {
        removeTagHandler(e);
    }
})


removeAllTagsBtn.addEventListener('click', removeAllTagsHandler);