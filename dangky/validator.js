// Người thực hiện: Trần Thị Thúy Hiền
// Xử lý sự kiện và kiểm tra input phải được nhập dữ liệu vào
Validator.isRequired = function(selector, message) {
    return {
        selector: selector, //Trả về selecttor tương ứng
        test: function(value) {
            if(value === '') {
                return message || 'Vui lòng nhập trường này'; // nếu nhập message thì sẽ nhận thông báo mà message ngược lại thì dùng
                //mặc định
            } else {
                return undefined;
            }
        }
    }
}

// Xử lý lỗi và kiểm tra email hợp lệ
Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function(value) {
            let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(!validRegex.test(value)) {
                return message || "Vui lòng nhập email hợp lệ";
            } else return undefined;
        }
    }
}
// Kiểm tra chuỗi nhập vào có độ dài lớn hơn min 
Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            if(value.length < min) {
                return message || `Vui lòng nhập tối thiếu ${min} ký tự`;
            } else {
                return undefined;
            }
        }
    }
}

// Kiểm tra chuỗi của input phải trùng với input từ checkContent
Validator.isConfirm = function(selector, checkContent, message) {
    return {
        selector: selector,
        test: function (value) {
            if(value === checkContent()) return undefined;
            else return message || 'Giá trị nhập vào chưa chính xác'
        }
    }
}

// Hàm xử lý sự kiện lỗi trong form
function Validator(options) {
    // Lấy form cần xử lý.
    let formElement = document.querySelector(options.form);
    // Hàm hiển thị lỗi trong input có hợp lệ hay không?
    function validate(element, rule) {
        let errorElement  = element.parentElement.querySelector(options.errorMessage);
        let errorMessage = rule.test(element.value.trim());
        if(errorMessage) {
            //Khi có lỗi
            errorElement.innerText = errorMessage;
            element.parentElement.classList.add('invalid');
        } else {
            // Khi sai sẽ thêm lớp không hợp lệ invalid
            errorElement.innerText = '';
            element.parentElement.classList.remove('invalid');
        }

        return !errorMessage;
    }
// Nếu có tồn tại form kiểm tra
    if(formElement) {
        // Sự kiện khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();
            let isFormValid = true;

            options.rules.forEach(rule => {
                var inputElement = formElement.querySelector(rule.selector);
                let isValid = validate(inputElement, rule);
                if(!isValid) isFormValid = false;
            })

            if(isFormValid) {
                // Lấy những element có thuộc tính name trong form
                let enableInputs = formElement.querySelectorAll('[name]');
                
                if(typeof options.onSubmit === 'function') {
                    let formValues = Array.from(enableInputs).reduce(function(values, input) {
                        values[input.name] = input.value;
                        return values;
                    }, {})
                    options.onSubmit(formValues);
                }
            }
        }
        // Xử lý lặp qua từng rule
        options.rules.forEach(rule => {
            let inputElement = formElement.querySelector(rule.selector);
            if(inputElement) {
                let errorElement  = inputElement.parentElement.querySelector(options.errorMessage);
                //Kiem tra noi dung trong text neu khong nhap hop le
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }
                //khi nguoi dung nhap thi khong hien thi loi
                inputElement.oninput = function () {
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        })
    }
}

// Xử lý chức năng cho người dùng đăng nhập vào hệ thống
const userSignIn = function (data) {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    let find = false;
    users.forEach(user => {
        if(user.email === data.email) {
            if(user.password == data.password) {
                find = true;
                localStorage.setItem('dangnhap', JSON.stringify(user));
                window.location.href = "/trangchu/trangchu.html";
            } else if(user.password !== data.pasword){
                alert("Nhập sai mật khẩu");
            }
        }
    })
    if(!find) alert("Bạn chưa đăng ký tài khoản");
}