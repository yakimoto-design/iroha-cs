// 管理画面JavaScript
let currentEditId = null;

document.addEventListener('DOMContentLoaded', () => {
    loadAdminWorks();
    setupFormSubmit();
});

// コラムを読み込む（管理画面用）
async function loadAdminWorks() {
    const worksList = document.getElementById('admin-works-list');
    
    try {
        const response = await fetch('tables/works?limit=100&sort=display_order');
        const result = await response.json();
        
        if (!result.data || result.data.length === 0) {
            worksList.innerHTML = `
                <div class="empty-state">
                    <p>まだコラムがありません。</p>
                    <button class="btn btn-primary" onclick="openModal()">最初のコラムを追加</button>
                </div>
            `;
            return;
        }

        // コラムリストをHTML化
        worksList.innerHTML = result.data.map(work => createAdminWorkItem(work)).join('');
        
    } catch (error) {
        console.error('コラムの読み込みに失敗しました:', error);
        worksList.innerHTML = '<div class="loading">コラムの読み込みに失敗しました。</div>';
    }
}

// 管理画面用のコラムアイテムを作成
function createAdminWorkItem(work) {
    const imageUrl = work.image_url || 'https://via.placeholder.com/150x100?text=No+Image';
    const statusClass = work.published ? 'status-published' : 'status-draft';
    const statusText = work.published ? '公開中' : '下書き';
    const projectUrl = work.project_url ? `<div class="admin-work-meta">🔗 ${work.project_url}</div>` : '';
    
    // 作成日時をフォーマット
    const date = work.created_at ? new Date(work.created_at).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }) : '';
    
    return `
        <div class="admin-work-item">
            <img src="${imageUrl}" alt="${work.title}" class="admin-work-image" onerror="this.src='https://via.placeholder.com/150x100?text=No+Image'">
            <div class="admin-work-info">
                <h3 class="admin-work-title">${work.title}</h3>
                <div class="admin-work-meta">📁 ${work.category} | 🔢 表示順序: ${work.display_order} ${date ? `| 📅 ${date}` : ''}</div>
                ${projectUrl}
                <p class="admin-work-description">${work.description.substring(0, 150)}${work.description.length > 150 ? '...' : ''}</p>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="admin-work-actions">
                <button class="btn btn-edit" onclick="editWork('${work.id}')">編集</button>
                <button class="btn btn-danger" onclick="deleteWork('${work.id}', '${work.title}')">削除</button>
            </div>
        </div>
    `;
}

// モーダルを開く（新規追加）
function openModal() {
    currentEditId = null;
    document.getElementById('modal-title').textContent = '新規コラムを追加';
    document.getElementById('work-form').reset();
    document.getElementById('work-id').value = '';
    document.getElementById('published').checked = true;
    document.getElementById('display_order').value = '0';
    document.getElementById('modal').classList.add('active');
}

// モーダルを閉じる
function closeModal() {
    document.getElementById('modal').classList.remove('active');
    currentEditId = null;
}

// コラムを編集
async function editWork(id) {
    try {
        const response = await fetch(`tables/works/${id}`);
        const work = await response.json();
        
        currentEditId = id;
        document.getElementById('modal-title').textContent = 'コラムを編集';
        document.getElementById('work-id').value = work.id;
        document.getElementById('title').value = work.title;
        document.getElementById('description').value = work.description;
        document.getElementById('category').value = work.category;
        document.getElementById('image_url').value = work.image_url || '';
        document.getElementById('project_url').value = work.project_url || '';
        document.getElementById('display_order').value = work.display_order || 0;
        document.getElementById('published').checked = work.published;
        
        document.getElementById('modal').classList.add('active');
        
    } catch (error) {
        console.error('コラムの読み込みに失敗しました:', error);
        alert('コラムの読み込みに失敗しました。');
    }
}

// コラムを削除
async function deleteWork(id, title) {
    if (!confirm(`「${title}」を削除してもよろしいですか？`)) {
        return;
    }
    
    try {
        await fetch(`tables/works/${id}`, {
            method: 'DELETE'
        });
        
        alert('コラムを削除しました。');
        loadAdminWorks();
        
    } catch (error) {
        console.error('コラムの削除に失敗しました:', error);
        alert('コラムの削除に失敗しました。');
    }
}

// フォーム送信の設定
function setupFormSubmit() {
    const form = document.getElementById('work-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            category: document.getElementById('category').value,
            image_url: document.getElementById('image_url').value,
            project_url: document.getElementById('project_url').value,
            display_order: parseInt(document.getElementById('display_order').value) || 0,
            published: document.getElementById('published').checked
        };
        
        try {
            let response;
            
            if (currentEditId) {
                // 更新
                response = await fetch(`tables/works/${currentEditId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
            } else {
                // 新規追加
                response = await fetch('tables/works', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
            }
            
            if (response.ok) {
                alert(currentEditId ? 'コラムを更新しました。' : 'コラムを追加しました。');
                closeModal();
                loadAdminWorks();
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
