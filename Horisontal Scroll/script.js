document.addEventListener("DOMContentLoaded", function() {
    const scrollRight = document.getElementById("scrollRight");
    const productListContainer = document.getElementById("productListContainer");
  
    scrollRight.addEventListener("click", function() {
      productListContainer.scrollBy({
        top: 0, 
        left: 620, 
        behavior: 'smooth'
      });
    });
  
    let isDown = false;
    let startX;
    let scrollLeft;
  
    productListContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      productListContainer.classList.add('active');
      startX = e.pageX - productListContainer.offsetLeft;
      scrollLeft = productListContainer.scrollLeft;
    });
  
    productListContainer.addEventListener('mouseleave', () => {
      isDown = false;
      productListContainer.classList.remove('active');
    });
  
    productListContainer.addEventListener('mouseup', () => {
      isDown = false;
      productListContainer.classList.remove('active');
    });
  
    productListContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - productListContainer.offsetLeft;
      const walk = (x - startX) * 2; //scroll-fast
      productListContainer.scrollLeft = scrollLeft - walk;
    });
  
    productListContainer.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - productListContainer.offsetLeft;
      scrollLeft = productListContainer.scrollLeft;
    });
  
    productListContainer.addEventListener('touchend', () => {
      isDown = false;
    });
  
    productListContainer.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - productListContainer.offsetLeft;
      const walk = (x - startX) * 2; //scroll-fast
      productListContainer.scrollLeft = scrollLeft - walk;
    });
  });
  