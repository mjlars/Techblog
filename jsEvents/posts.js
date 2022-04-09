async function newPost (e) {

    e.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const postUrl = document.querySelector('input[name="post-url"]').value;

    const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            postUrl
        }),
        headers: { 'Content-Type': 'application/json' }

    });

    if (res.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(res.statusText);
    }
}

document.querySelector('.new-post').addEventListener('submit', newPost);

async function editPost (e) {

    e.preventDefault();
    
    const title = document.querySelector('input[name="post-title"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(res.statusText);
    }
}

document.querySelector('.edit-post').addEventListener('submit', editPost);

async function deletePost (e) {

    e.preventDefault();
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(res.statusText);
    }
}

document.querySelector('delete-post').addEventListener('submit', deletePost);

async function commentPost (e) {

    e.preventDefault();

    const comment = document.querySelector('textarea[name="comment-text"]').value.trim();
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment) {
        const res = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                comment,
                postId
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (res.ok) {
            document.location.reload();
        } else {
            alert(res.statusText);
        }
    }
}

document.querySelector('.comment-post').addEventListener('submit', commentPost);