// 製品データを取得
let productsData = [];

// データ読み込み
fetch('data/products.json')
    .then(response => response.json())
    .then(data => {
        productsData = data;
        initPage();
    })
    .catch(error => console.error('Error loading products:', error));

// ページ初期化
function initPage() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);

    if (filename === 'index.html' || filename === '') {
        initHomePage();
    } else if (filename === 'products.html') {
        initProductsPage();
    } else if (filename === 'product-detail.html') {
        initProductDetailPage();
    } else if (filename === 'manufacturers.html') {
        initManufacturersPage();
    } else if (filename === 'manufacturer-detail.html') {
        initManufacturerDetailPage();
    } else if (filename === 'submit.html') {
        initSubmitPage();
    }
}

// ホームページ
function initHomePage() {
    // コメント付き製品を表示
    const featuredProducts = productsData.filter(p => p.hasComment).slice(0, 6);
    displayProducts(featuredProducts, 'featured-products');

    // 注目のメーカーを表示
    const manufacturers = getManufacturers();
    displayManufacturers(manufacturers.slice(0, 6), 'featured-manufacturers');
}

// 製品一覧ページ
function initProductsPage() {
    // フィルター設定
    const categoryFilter = document.getElementById('category-filter');
    const manufacturerFilter = document.getElementById('manufacturer-filter');
    const commentFilter = document.getElementById('comment-filter');

    // メーカーフィルターのオプションを追加
    const manufacturers = [...new Set(productsData.map(p => p.manufacturer))].sort();
    manufacturers.forEach(m => {
        const option = document.createElement('option');
        option.value = m;
        option.textContent = m;
        manufacturerFilter.appendChild(option);
    });

    // URLパラメータからカテゴリーを取得
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        categoryFilter.value = categoryParam;
    }

    // フィルター変更時
    categoryFilter.addEventListener('change', filterProducts);
    manufacturerFilter.addEventListener('change', filterProducts);
    commentFilter.addEventListener('change', filterProducts);

    // 初期表示
    filterProducts();
}

function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const manufacturerFilter = document.getElementById('manufacturer-filter').value;
    const commentFilter = document.getElementById('comment-filter').checked;

    let filtered = productsData;

    if (categoryFilter !== 'all') {
        filtered = filtered.filter(p => p.category === categoryFilter);
    }

    if (manufacturerFilter !== 'all') {
        filtered = filtered.filter(p => p.manufacturer === manufacturerFilter);
    }

    if (commentFilter) {
        filtered = filtered.filter(p => p.hasComment);
    }

    displayProducts(filtered, 'products-list');
}

// 製品詳細ページ
function initProductDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const asin = urlParams.get('asin');

    if (!asin) {
        document.getElementById('product-detail-content').innerHTML = '<p>製品が見つかりません</p>';
        return;
    }

    const product = productsData.find(p => p.asin === asin);
    if (!product) {
        document.getElementById('product-detail-content').innerHTML = '<p>製品が見つかりません</p>';
        return;
    }

    // パンくずリスト
    document.getElementById('product-name-breadcrumb').textContent = product.name;

    // 製品詳細を表示
    const html = `
        <div class="product-image">
            <img src="https://via.placeholder.com/400x400?text=${encodeURIComponent(product.manufacturer)}" 
                 alt="${product.name}">
        </div>
        <div class="product-info">
            <h1>${product.name}</h1>
            <p class="manufacturer">
                <a href="manufacturer-detail.html?name=${encodeURIComponent(product.manufacturer)}">
                    ${product.manufacturer}
                </a>
            </p>
            <p class="category">${product.category}</p>
            <p class="price">${product.price}</p>
            ${product.hasComment ? `
                <div class="comment-box">
                    <h3>✨ コメント</h3>
                    <p>${product.comment}</p>
                </div>
            ` : ''}
            <a href="${product.amazonUrl}" class="btn-primary btn-large" target="_blank" rel="noopener">
                Amazonで見る
            </a>
        </div>
    `;
    document.getElementById('product-detail-content').innerHTML = html;
}

// メーカー一覧ページ
function initManufacturersPage() {
    const manufacturers = getManufacturers();
    displayManufacturers(manufacturers, 'manufacturers-list');
}

// メーカー詳細ページ
function initManufacturerDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    if (!name) {
        document.getElementById('manufacturer-detail-content').innerHTML = '<p>メーカーが見つかりません</p>';
        return;
    }

    const products = productsData.filter(p => p.manufacturer === name);
    if (products.length === 0) {
        document.getElementById('manufacturer-detail-content').innerHTML = '<p>メーカーが見つかりません</p>';
        return;
    }

    // パンくずリスト
    document.getElementById('manufacturer-name-breadcrumb').textContent = name;

    // メーカー情報を表示
    const categories = [...new Set(products.map(p => p.category))];
    const html = `
        <h1>${name}</h1>
        <p class="product-count">製品数: ${products.length}</p>
        <p class="categories">カテゴリー: ${categories.join(', ')}</p>
    `;
    document.getElementById('manufacturer-detail-content').innerHTML = html;

    // 製品一覧を表示
    displayProducts(products, 'manufacturer-products-list');
}

// 投稿フォームページ
function initSubmitPage() {
    const form = document.getElementById('submit-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('form-message');
        formMessage.style.display = 'block';
        formMessage.className = 'form-message success';
        formMessage.textContent = 'ご投稿ありがとうございます！内容を確認の上、掲載を検討させていただきます。';
        
        form.reset();
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}

// 製品を表示
function displayProducts(products, elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '<p>製品が見つかりません</p>';
        return;
    }

    const html = products.map(product => `
        <a href="product-detail.html?asin=${product.asin}" class="product-card">
            <h3>${product.name}</h3>
            <p class="manufacturer">${product.manufacturer}</p>
            <p class="category">${product.category}</p>
            ${product.hasComment ? `
                <div class="comment">"${product.comment}"</div>
                <span class="badge">✨ コメント付き</span>
            ` : ''}
            <p class="price">${product.price}</p>
        </a>
    `).join('');

    container.innerHTML = html;
}

// メーカー一覧を取得
function getManufacturers() {
    const manufacturerMap = {};
    
    productsData.forEach(product => {
        if (!manufacturerMap[product.manufacturer]) {
            manufacturerMap[product.manufacturer] = {
                name: product.manufacturer,
                productCount: 0,
                categories: new Set()
            };
        }
        manufacturerMap[product.manufacturer].productCount++;
        manufacturerMap[product.manufacturer].categories.add(product.category);
    });

    return Object.values(manufacturerMap).map(m => ({
        name: m.name,
        productCount: m.productCount,
        categories: Array.from(m.categories)
    }));
}

// メーカーを表示
function displayManufacturers(manufacturers, elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;

    const html = manufacturers.map(m => `
        <a href="manufacturer-detail.html?name=${encodeURIComponent(m.name)}" class="manufacturer-card">
            <h3>${m.name}</h3>
            <p class="product-count">製品数: ${m.productCount}</p>
            <p class="categories">カテゴリー: ${m.categories.join(', ')}</p>
        </a>
    `).join('');

    container.innerHTML = html;
}