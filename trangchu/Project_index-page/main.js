//----Animation navbar ----
const navbarItems = document.querySelectorAll('.navbar__items');
const line = document.querySelector('.line');
const navBarLink = document.querySelectorAll('.navbar__link');

navbarItems.forEach(function(itemNav) {
    itemNav.addEventListener('click', function() {
        navBarLink.forEach(function(link) {
            link.classList.remove('active');
        })
        const linkNav = this.querySelector('.navbar__link');
        linkNav.classList.add('active');

        let leftSize = itemNav.offsetLeft;
        let widthSize = itemNav.offsetWidth;
        
        line.style.left = leftSize + 'px';
        line.style.width = widthSize + 'px';
    })
})
//scroll to top
document.querySelector('.to_top').addEventListener('click', function(event) {
    event.preventDefault(); // Ngăn đổi URL
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn mượt lên đầu
  });

//slider
const slides = document.getElementById("slides");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;
  let slideCount = dots.length;

  function showSlide(index) {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
    currentIndex = index;
  }

  function nextSlide() {
    let nextIndex = (currentIndex + 1) % slideCount;
    showSlide(nextIndex);
  }

  // Auto chuyển mỗi 30 giây
  let autoSlide = setInterval(nextSlide, 10000);

  // Cho phép người dùng click dot vẫn hoạt động
  function manualSlide(index) {
    clearInterval(autoSlide);
    showSlide(index);
    autoSlide = setInterval(nextSlide, 10000);
  }