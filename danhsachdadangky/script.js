//Xu ly nhung su kien lien quan den khoa hoc (Nguoi thuc hien: Tran Thi Thuy Hien)
//data khoa hoc
const courses = [
    {
        id: 1,
        name: 'Toan',
        title: 'Toán học',
        course: 11,
        actor: 'hintrn',
        srcImg: 'ToanHoc11',
        path: '/chitietkhoahoc/toan/toan.html'
    },
    {
        id: 2,
        name: 'VatLy',
        title: 'Vật lý',
        course: 11,
        actor: 'hintrn',
        srcImg: 'vatLy10',
        path: '/chitietkhoahoc/vatly/vatly.html'
    },
    {
        id: 3,
        name: 'TiengAnh',
        title: 'Tiếng Anh',
        course: 12,
        actor: 'hintrn',
        srcImg: 'TiengAnh (1)',
        path: '/chitietkhoahoc/tienganh/tienganh.html'
    }, 
    {
        id: 4,
        name: 'HoaHoc',
        title: 'Hóa học',
        course: 12,
        actor: 'hintrn',
        srcImg: 'HoaHoc12',
        path: '/chitietkhoahoc/hoahoc/hoahoc.html'
    }
]

//data alert 
const dataAlert = {
    success: {
        name: 'success',
        message: 'Đăng ký khóa học thành công.'
    },
    fail: {
        name: 'fail',
        message: 'Đăng ký khóa học không thành công.'
    },
    removeSuccess: {
        name: 'removeSuccess',
        message: 'Xóa khóa học thành công'
    }
}

// -----Excute Modal -----
let dataModal = function(value) {
    return `
    <div class="modal hidden">
        <button class="modal__close" onclick="CloseModal()">
            &times;
        </button>
        <h2 class="section__title">Bạn có muốn đăng ký khóa học <span id="modal__courses">${value.title} ${value.course}</span> không ?</h2>
        <div class="modal__body">
            <div class="left modal__items">
                <div class="accept__link click__link" onclick="Accept()">
                    <img src="/danhsachdadangky/Accept.png" alt="accept" class="click__img">

                    <div class="modal__button">
                        <button class="btn btn__submit">Xác nhận</button>
                    </div>
                </div>
            </div>

            <div class="right modal__items">
                <div class="cancel__link click__link" onclick="CancelCourse()">
                    <img src="/danhsachdadangky/Cancel.png" alt="accept" class="click__img">
                    <div class="modal__button">
                        <button class="btn btn__cancel">Trở về</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="overlay hidden"></div>
`
}

// ----variables of modal-----
const IdModal = document.getElementById('modal');
let temp;
const btnDki = document.querySelector('.btn-dky');
btnDki.addEventListener('click', function() {
    let id = Number(this.id);
    const registed = btnDki.classList.contains('registed');
    courses.forEach( function(value) {
        if(id === value.id && !registed) {
            temp = value;
            IdModal.innerHTML = dataModal(value);
            const ClassModal = document.querySelector('.modal');
            const overlay = document.querySelector('.overlay');
            overlay.addEventListener('click', CloseModal);
            ShowModal(ClassModal, overlay);
        }
    })
})
//----Close modal----
function CloseModal() {
    IdModal.innerHTML = dataModal(temp);
    const ClassModal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    ClassModal.classList.add('hidden');
    overlay.classList.add('hidden');
    IdModal.removeChild(ClassModal);
    IdModal.removeChild(overlay);
}
//----show modal----
function ShowModal(modal, overlay) {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
//-----Excute Alert-----
let ElementAlert = function(object) {
    return `
    <div class="alert alert__${object.name}">
        <h4 class="alert__title">${object.message}</h4>
        <p class="alert__message"></p>
    </div>
    `
}
// Register success (dang ky thanh cong)
let cart = JSON.parse(localStorage.getItem('courses')) || [];  // lay danh sach khoa hoc da duoc dang ky
let IdAlert = document.getElementById('alert'); 
function Accept() {
    CloseModal();
    btnDki.classList.remove('btn-dky');
    let courseItem = temp;  
    if(!courseItem.dky) {       // kiem tra khoa hoc do da dang ky hay chua
        courseItem.dky = true;
        cart.push(courseItem);
    }
    localStorage.setItem('courses', JSON.stringify(cart));
    document.getElementById('alert').innerHTML = ElementAlert(dataAlert.success);
    checkCourses();
}

// Check courses registed
function checkCourses() {
    if(cart !== null) {
        cart.forEach(function(item) {
            if(item.dky && item.id === Number(btnDki.id)) {
                btnDki.textContent = 'Đã đăng ký';
                btnDki.classList.add('registed');
            }
        })
    } else {
        btnDki.classList.remove('registed');
    }
}

// Register fail (dang ky khong thanh cong)
function CancelCourse() {
    CloseModal();
    document.getElementById('alert').innerHTML = ElementAlert(dataAlert.fail);
}