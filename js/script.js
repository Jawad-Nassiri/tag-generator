const $ = document,
  tagsContainer = $.querySelector('ul'),
  tagCountElem = $.querySelector('.tag-count'),
  inputElem = $.querySelector('input');

let tags = [];
const MAX = 10;

inputElem.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;

  const tagValue = inputElem.value.trim();
  if (!tagValue) return;

  if (tags.length >= MAX) {
    e.preventDefault();
    return; // Stop adding more
  }

  if (tagValue.includes(',')) {
    // Split and clean commas
    let splitValue = tagValue.split(',').map(t => t.trim()).filter(Boolean);
    for (let tag of splitValue) {
      if (tags.length >= MAX) break;
      tags.unshift(tag);
      tagsContainer.insertAdjacentHTML('afterbegin',
        `<li>${tag}<i class="fa-solid fa-xmark"></i></li>`
      );
    }
  } else {
    tags.unshift(tagValue);
    tagsContainer.insertAdjacentHTML('afterbegin',
      `<li>${tagValue}<i class="fa-solid fa-xmark"></i></li>`
    );
  }

  inputElem.value = '';
  tagCountElem.textContent = String(tags.length);
  e.preventDefault();
});
