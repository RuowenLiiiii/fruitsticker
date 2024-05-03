document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.main-container');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const fruits = document.querySelectorAll('.fruit-container');
    let placedFruits = [];
    const reservedTopSpace = 70;

    function isOverlapping(elemRect, otherRects) {
        for (let i = 0; i < otherRects.length; i++) {
            if (!(elemRect.right <= otherRects[i].left ||
                  elemRect.left >= otherRects[i].right ||
                  elemRect.bottom <= otherRects[i].top ||
                  elemRect.top >= otherRects[i].bottom)) {
                return true;
            }
        }
        return false;
    }

     fruits.forEach(fruitContainer => {
        let maxAttempts = 500;
        let placed = false;
        const textSize = 50;

        while (!placed && maxAttempts-- > 0) {
            const screenSize = window.innerWidth;
            let size; 
            if (screenSize < 750) {
                size = Math.random() * (200 - 100) + 100; 
            } else {
                size = Math.random() * (300 - 150) + 150; 
            }
       
            fruitContainer.style.width = `${size}px`;
            fruitContainer.style.height = `${size}px`;
        

            
            const x = Math.random() * (containerWidth - size);

            const y = Math.random() * (containerHeight - size - reservedTopSpace) + reservedTopSpace;

            const fruitRect = {
                left: x,
                top: y,
                right: x + size,
                bottom: y + size
            };

            if (!isOverlapping(fruitRect, placedFruits)) {
      
                fruitContainer.style.left = `${x}px`;
                fruitContainer.style.top = `${y}px`;
                const arrowAndName = document.createElement('div');
                arrowAndName.innerHTML = `&#x27A4; ${fruitContainer.querySelector('img').alt}`;
                arrowAndName.style.position = 'absolute';
                arrowAndName.style.left = '50%'; 
            arrowAndName.style.bottom = `${size + 5}px`; 
            arrowAndName.style.transform = 'translateX(-50%)'; 
                arrowAndName.style.color = '#000';
                fruitContainer.appendChild(arrowAndName);
                
                placedFruits.push(fruitRect);
                placed = true;
            }
        }


        if (!placed) {
            console.log('Could not place fruit without overlapping after 100 attempts:', fruitContainer);
        }
    });

});


function navigateToFruitPage(fruitName) {

    switch(fruitName) {
        case 'page1':
            window.location.href = 'index.html'; 
            break;
        case 'banana':
            window.location.href = 'banana.html'; 
            break;
        case 'blueberry':
            window.location.href = 'blueberry.html'; 
            break;
        case 'kiwi':
            window.location.href = 'kiwi.html'; 
            break;
        case 'mango':
            window.location.href = 'mango.html'; 
            break;
        case 'orange':
            window.location.href = 'orange.html';
            break;
        case 'pineapple':
            window.location.href = 'pineapple.html'; 
            break;
        case 'watermelon':
            window.location.href = 'watermelon.html'; 
            break;
        default:
            console.error('Unknown fruit:', fruitName);
 
    }
}
