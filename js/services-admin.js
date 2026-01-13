// サービス管理画面JavaScript
let currentEditId = null;

document.addEventListener('DOMContentLoaded', () => {
    loadAdminServices();
    setupFormSubmit();
});

// サービスを読み込む（管理画面用）
async function loadAdminServices() {
    const servicesList = document.getElementById('admin-services-list');
    
    try {
        const response = await fetch('tables/services?limit=100&sort=display_order');
        const result = await response.json();
        
        if (!result.data || result.data.length === 0) {
            servicesList.innerHTML = `
                <div class="empty-state">
                    <p>まだサービスがありません。</p>
                    <button class="btn btn-primary" onclick="openModal()">最初のサービスを追加</button>
                </div>
            `;
            return;
        }

        // サービスリストをHTML化
        servicesList.innerHTML = result.data.map(service => createAdminServiceItem(service)).join('');
        
    } catch (error) {
        console.error('サービスの読み込みに失敗しました:', error);
        servicesList.innerHTML = '<div class="loading">サービスの読み込みに失敗しました。</div>';
    }
}

// 管理画面用のサービスアイテムを作成
function createAdminServiceItem(service) {
    const statusClass = service.published ? 'status-published' : 'status-draft';
    const statusText = service.published ? '公開中' : '下書き';
    const price = service.price ? `<div class="admin-work-meta">💰 ${service.price}</div>` : '';
    
    // 画像がある場合は表示、ない場合はプレースホルダー
    const imageDisplay = service.icon 
        ? `<img src="${service.icon}" alt="${service.title}" class="admin-work-image" onerror="this.src='https://via.placeholder.com/150x100?text=No+Image'">`
        : `<div class="admin-work-image" style="display: flex; align-items: center; justify-content: center; background-color: var(--light-gray); color: var(--secondary-color); font-size: 14px;">画像なし</div>`;
    
    return `
        <div class="admin-work-item">
            ${imageDisplay}
            <div class="admin-work-info">
                <h3 class="admin-work-title">${service.title}</h3>
                <div class="admin-work-meta">🔢 表示順序: ${service.display_order}</div>
                ${price}
                <p class="admin-work-description">${service.description}</p>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="admin-work-actions">
                <button class="btn btn-edit" onclick="editService('${service.id}')">編集</button>
                <button class="btn btn-danger" onclick="deleteService('${service.id}', '${service.title}')">削除</button>
            </div>
        </div>
    `;
}

// モーダルを開く（新規追加）
function openModal() {
    currentEditId = null;
    document.getElementById('modal-title').textContent = '新規サービスを追加';
    document.getElementById('service-form').reset();
    document.getElementById('service-id').value = '';
    document.getElementById('published').checked = true;
    document.getElementById('display_order').value = '0';
    document.getElementById('modal').classList.add('active');
}

// モーダルを閉じる
function closeModal() {
    document.getElementById('modal').classList.remove('active');
    currentEditId = null;
}

// サービスを編集
async function editService(id) {
    try {
        const response = await fetch(`tables/services/${id}`);
        const service = await response.json();
        
        currentEditId = id;
        document.getElementById('modal-title').textContent = 'サービスを編集';
        document.getElementById('service-id').value = service.id;
        document.getElementById('title').value = service.title;
        document.getElementById('description').value = service.description;
        document.getElementById('icon').value = service.icon;
        document.getElementById('price').value = service.price || '';
        document.getElementById('display_order').value = service.display_order || 0;
        document.getElementById('published').checked = service.published;
        
        document.getElementById('modal').classList.add('active');
        
    } catch (error) {
        console.error('サービスの読み込みに失敗しました:', error);
        alert('サービスの読み込みに失敗しました。');
    }
}

// サービスを削除
async function deleteService(id, title) {
    if (!confirm(`「${title}」を削除してもよろしいですか？`)) {
        return;
    }
    
    try {
        await fetch(`tables/services/${id}`, {
            method: 'DELETE'
        });
        
        alert('サービスを削除しました。');
        loadAdminServices();
        
    } catch (error) {
        console.error('サービスの削除に失敗しました:', error);
        alert('サービスの削除に失敗しました。');
    }
}

// フォーム送信の設定
function setupFormSubmit() {
    const form = document.getElementById('service-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            icon: document.getElementById('icon').value,
            price: document.getElementById('price').value,
            display_order: parseInt(document.getElementById('display_order').value) || 0,
            published: document.getElementById('published').checked
        };
        
        try {
            let response;
            
            if (currentEditId) {
                // 更新
                response = await fetch(`tables/services/${currentEditId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
            } else {
                // 新規追加
                response = await fetch('tables/services', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
            }
            
            if (response.ok) {
                alert(currentEditId ? 'サービスを更新しました。' : 'サービスを追加しました。');
                closeModal();
                loadAdminServices();
            } else {
                throw new Error('保存に失敗しました');
            }
            
        } catch (error) {
            console.error('保存に失敗しました:', error);
            alert('保存に失敗しました。もう一度お試しください。');
        }
    });
}

// モーダルの外側をクリックしたら閉じる
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal();
    }
});
