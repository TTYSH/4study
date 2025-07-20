// Người thục hiện: Trần Thị Thúy Hiền.
// Đây là file xử lý những sự kiện chung trong web: header, footer, navbar, modal, alert
// Tuong tac giua menu trong mobile va tablet (Nguoi thuc hien: Tran Thi Thuy Hien)
const menuIcon = document.querySelector('.menu--icon');
const menuBar = document.querySelector('.navbar__list--mobile');
const closeMenubar = document.querySelector('.navbar__close-icon');

menuIcon.addEventListener('click', function() {
    menuBar.classList.remove('hidden');
})

closeMenubar.addEventListener('click', function() {
    menuBar.classList.add('hidden');
})

// Xu ly su kien cua thanh navbar  
const navbarLink = document.querySelectorAll('.navbar__link');
navbarLink.forEach(function(navbarItem) {
    navbarItem.addEventListener('click', function() {
        navbarLink.forEach(function(nav) {
            if(nav.classList.contains('navbar--active')) {
                nav.classList.remove('navbar--active');
            }
        })
        this.classList.add('navbar--active'); 
    })
})

// Xu ly thanh banner (trang chu)  (Nguoi thuc hien: Hồ Gia Huy)
//slider
const slides = document.querySelector('.slider-container');
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;
let slideCount = dots.length;

function showSlide(index) {
    console.log(index)
    slides.style.transform = `translateX(-${index * 50}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
    currentIndex = index;
    console.log(currentIndex)
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