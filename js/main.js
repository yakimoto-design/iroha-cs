// ハンバーガーメニューの開閉
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// メニューリンクをクリックしたらメニューを閉じる
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// サービスを読み込む（静的JSON）
async function loadServices() {
    const servicesList = document.getElementById('services-list');
    
    try {
        const response = await fetch('data/services.json');
        const services = await response.json();
        
        // 公開済みのサービスのみをフィルタリング
        const publishedServices = services
            .filter(service => service.is_published)
            .sort((a, b) => a.display_order - b.display_order);
        
        if (publishedServices.length === 0) {
            servicesList.innerHTML = '<p class="no-services">まだサービスがありません。</p>';
            return;
        }
        
        servicesList.innerHTML = publishedServices.map(service => `
            <div class="service-item">
                ${service.image_url ? `<img src="${service.image_url}" alt="${service.title}" class="service-image" onerror="this.style.display='none'">` : '<p class="no-image">画像なし</p>'}
                <h3 class="service-title">${service.title}</h3>
                <p class="service-description">${service.description}</p>
                ${service.price ? `<p class="service-price">${service.price}</p>` : ''}
            </div>
        `).join('');
        
    } catch (error) {
        console.error('サービスの読み込みに失敗しました:', error);
        servicesList.innerHTML = '<p class="error">サービスの読み込みに失敗しました。</p>';
    }
}

// コラムを読み込む（静的JSON）
let allColumns = [];
let filteredColumns = [];
let displayedCount = 3;
const columnsPerPage = 3;

async function loadColumns() {
    const columnsList = document.getElementById('columns-list');
    
    try {
        const response = await fetch('data/columns.json');
        const columns = await response.json();
        
        // 公開済みのコラムのみをフィルタリング
        allColumns = columns
            .filter(column => column.is_published)
            .sort((a, b) => a.display_order - b.display_order);
        
        filteredColumns = [...allColumns];
        
        if (allColumns.length === 0) {
            columnsList.innerHTML = '<p class="no-works">まだコラムがありません。</p>';
            return;
        }
        
        // カテゴリーフィルターを作成
        createCategoryFilter();
        
        // 初回表示
        displayColumns();
        
    } catch (error) {
        console.error('コラムの読み込みに失敗しました:', error);
        columnsList.innerHTML = '<p class="error">コラムの読み込みに失敗しました。</p>';
    }
}

// カテゴリーフィルターを作成
function createCategoryFilter() {
    const filterContainer = document.querySelector('.category-filter');
    if (!filterContainer) return;
    
    // すべてのカテゴリーを取得
    const categories = [...new Set(allColumns.map(col => col.category))];
    
    // フィルターボタンを作成
    let filterHTML = '<button class="filter-btn active" data-category="all">すべて</button>';
    categories.forEach(category => {
        filterHTML += `<button class="filter-btn" data-category="${category}">${category}</button>`;
    });
    
    filterContainer.innerHTML = filterHTML;
    
    // フィルターボタンにイベントリスナーを追加
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // アクティブ状態を更新
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // フィルター実行
            const category = e.target.dataset.category;
            if (category === 'all') {
                filteredColumns = [...allColumns];
            } else {
                filteredColumns = allColumns.filter(col => col.category === category);
            }
            
            // 表示をリセット
            displayedCount = 3;
            displayColumns();
        });
    });
}

// コラムを表示
function displayColumns() {
    const columnsList = document.getElementById('columns-list');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    // 表示するコラムを取得
    const columnsToShow = filteredColumns.slice(0, displayedCount);
    
    if (columnsToShow.length === 0) {
        columnsList.innerHTML = '<p class="no-works">該当するコラムがありません。</p>';
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    columnsList.innerHTML = columnsToShow.map(column => {
        const date = new Date(column.created_at).toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // 本文を150文字に制限
        const shortDescription = column.description.length > 150 
            ? column.description.substring(0, 150) + '...' 
            : column.description;
        
        return `
            <article class="column-item">
                <img src="${column.image_url}" alt="${column.title}" class="column-image" onerror="this.src='https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop'">
                <div class="column-content">
                    <div class="column-meta">
                        <span class="column-category">${column.category}</span>
                        <time class="column-date" datetime="${column.created_at}">${date}</time>
                    </div>
                    <h3 class="column-title">${column.title}</h3>
                    <p class="column-description">${shortDescription}</p>
                    ${column.project_url ? `<a href="${column.project_url}" class="column-link" target="_blank" rel="noopener noreferrer">続きを読む</a>` : ''}
                </div>
            </article>
        `;
    }).join('');
    
    // 「もっと見る」ボタンの表示/非表示
    if (displayedCount >= filteredColumns.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// 「もっと見る」ボタンのイベントリスナー
document.addEventListener('DOMContentLoaded', () => {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            displayedCount += columnsPerPage;
            displayColumns();
        });
    }
    
    // データを読み込む
    loadServices();
    loadColumns();
});
