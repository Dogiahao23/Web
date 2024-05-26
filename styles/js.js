let isLoggedIn = false;
    let cart = [];
    let users = [];
    function toggleSection(sectionId) {
    var sections = document.querySelectorAll('.toggle-section');
    sections.forEach(function(section) {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        isLoggedIn = true;
        document.getElementById('login').classList.add('hidden');
        alert('Đăng nhập thành công');
        showBuyButtons();
    } else {
        alert('Tên người dùng hoặc mật khẩu không đúng');
    }

    return false; // Ngăn chặn hành vi mặc định của form
}

function handleSignup(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
        alert('Tên người dùng đã tồn tại');
    } else {
        users.push({ username, password });
        alert('Đăng ký thành công');
        toggleSection('login');
    }

    return false; // Ngăn chặn hành vi mặc định của form
}

function showBuyButtons() {
    if (isLoggedIn) {
        var buttons = document.querySelectorAll('.product button');
        buttons.forEach(function(button) {
            button.style.display = 'inline-block';
        });
    }
}

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    alert('Đã thêm vào giỏ hàng');
    updateCart();
}

function updateCart() {
    var cartSection = document.getElementById('cart-items');
    cartSection.innerHTML = '';
    let total = 0;
    cart.forEach(function(item, index) {
        total += item.price;
        var cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `<h4>${item.name}</h4><span>${item.price} VND</span>`;
        cartSection.appendChild(cartItem);
    });
    document.getElementById('cart-total').innerText = `Tổng: ${total} VND`;
}

function handleCheckout() {
    if (cart.length > 0) {
        alert('Thanh toán thành công!');
        cart = [];
        updateCart();
        toggleSection('products');
    } else {
        alert('Giỏ hàng của bạn đang trống.');
    }
}