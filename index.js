window.onload = function() {
    adjustStickerGridPosition(); 
};

document.addEventListener('DOMContentLoaded', function() {
    const filterBtn = document.getElementById('filter-btn');
    const filterContent = document.getElementById('filter-content');
    const stickerGrid = document.querySelector('.sticker-grid');
    const leftTopCorner = document.querySelector('.left-top-corner');
    const filterItems = document.querySelectorAll('.filter-item');
    const subFilterOptions = document.querySelectorAll('.sub-filter div');
    const selectedFiltersList = document.getElementById('selected-filters-list');

    filterBtn.addEventListener('click', function() {
        filterContent.style.display = filterContent.style.display === "block" ? "none" : "block";
        adjustStickerGridPosition();
    });

    filterItems.forEach(item => {
        item.querySelector('.toggle-sub-filter').addEventListener('click', function() {
            var subFilter = item.querySelector('.sub-filter');
            subFilter.style.display = subFilter.style.display === "none" ? "block" : "none";
            adjustStickerGridPosition();
        });
    });

    subFilterOptions.forEach(option => {
        option.addEventListener('click', function() {
            this.classList.toggle('selected');
            filterStickers();
            displaySelectedFilters();
        });
    });

    window.onclick = function(event) {
        if (!event.target.matches('#filter-btn') && !event.target.matches('.toggle-sub-filter') && !event.target.closest('.filter-item')) {
            var dropdowns = document.getElementsByClassName("filter-content");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.style.display === "block") {
                    openDropdown.style.display = "none";
                }
            }
            adjustStickerGridPosition();
        }
    };

  


    function adjustStickerGridPosition() {
        // 确保所有图片都加载完成
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === images.length) {
                        updatePosition();
                    }
                });
            }
        });
    
       
        if (images.length === 0 || loadedImages === images.length) {
            updatePosition();
        }
    
        function updatePosition() {
            setTimeout(() => {
                const filterContentHeight = filterContent.style.display === "none" ? 0 : filterContent.offsetHeight;
                const targetTopPosition = leftTopCorner.offsetHeight + filterContentHeight + 10;
                stickerGrid.style.top = `${targetTopPosition}px`;
            }, 10);
        }
    }
    

    adjustStickerGridPosition();





    function filterStickers() {
        const selectedFilters = {};
        document.querySelectorAll('.sub-filter div.selected').forEach(sel => {
            const category = sel.closest('.filter-item').getAttribute('data-category');
            let attribute = `data-${category}`;
            if (category === 'botanical') {
                attribute = 'data-botanical-classification';
            }
            const value = sel.getAttribute('data-value').toLowerCase();
            if (!selectedFilters[attribute]) {
                selectedFilters[attribute] = [];
            }
            selectedFilters[attribute].push(value);
        });
    
        const stickers = document.querySelectorAll('.sticker-grid img');
        stickers.forEach(img => {
            const isDisplayed = Object.keys(selectedFilters).every(attribute => {
                const attributeValue = img.getAttribute(attribute) ? img.getAttribute(attribute).toLowerCase() : '';
                return selectedFilters[attribute].length === 0 || selectedFilters[attribute].includes(attributeValue);
            });
            img.style.display = isDisplayed ? '' : 'none';
        });
    }
    

    function displaySelectedFilters() {
        selectedFiltersList.innerHTML = ''; 
        const selectedOptions = document.querySelectorAll('.sub-filter div.selected');
        selectedOptions.forEach(option => {
            const value = option.getAttribute('data-value');
            const filterTag = document.createElement('li');
            filterTag.textContent = `${value}`;
            filterTag.setAttribute('data-value', value);
            filterTag.classList.add('selected-filter-tag');
            filterTag.addEventListener('click', () => {
                option.classList.remove('selected'); 
                filterTag.remove(); 
                filterStickers(); 
            });
            selectedFiltersList.appendChild(filterTag);
        });
    }





document.querySelectorAll('.sticker-grid img').forEach(img => {
    img.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
    });
});


const clearButton = document.getElementById('clear-stickers');
clearButton.addEventListener('click', function() {
    const rightSide = document.querySelector('.right-side');
    document.querySelectorAll('.sticker-copy').forEach(copy => {
        copy.remove();
    });
});


const rightSide = document.querySelector('.right-side');
    rightSide.addEventListener('dragover', function(event) {
        event.preventDefault();
    });

    rightSide.addEventListener('drop', function(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text/plain');
        const sticker = document.getElementById(id);
        const stickerCopy = sticker.cloneNode(true);
        
        stickerCopy.classList.add('sticker-copy');

        const rect = rightSide.getBoundingClientRect(); 
        const offsetX = event.clientX - rect.left; 
        const offsetY = event.clientY - rect.top;
    
        stickerCopy.style.position = 'absolute';
        stickerCopy.style.width = '80px'; 
        stickerCopy.style.height = 'auto'; 
        stickerCopy.style.left = `${offsetX - 50}px`; 
        stickerCopy.style.top = `${offsetY - 50}px`; 
    
        rightSide.appendChild(stickerCopy);
    });
});



// document.querySelectorAll('.circle').forEach(circle => {
//     circle.addEventListener('click', function() {
//         const imgPath = this.getAttribute('data-img');
//         document.getElementById('displayedImage').src = imgPath;
//     });
// });