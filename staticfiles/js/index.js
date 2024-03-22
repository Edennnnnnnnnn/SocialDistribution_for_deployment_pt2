'use strict';


document.addEventListener('DOMContentLoaded', () => {
    const postContainer = document.getElementById('post-container');
    createPostBlocks(remotePosts, postContainer);

    fetch('/api/pps/')
    .then(response => response.json())
    .then(posts => {
        const postContainer = document.getElementById('post-container');
        createPostBlocks(posts, postContainer); // Call the method to create and append post blocks
    })
    .catch(error => console.error('Error:', error));
})

function createPostBlocks(posts, container) {
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';

        const postLink = document.createElement('a');
        postLink.href = `/posts/${post.id}`;
        postLink.className = 'post-link';

        const datePosted = new Date(post.date_posted);
        const formattedDate = `${datePosted.getFullYear()}-${String(datePosted.getMonth() + 1).padStart(2, '0')}-${String(datePosted.getDate()).padStart(2, '0')}`;

        const userInfoHTML = `
            <div class="user-info">
                <img src="${post.avatar}" alt="profile avatar" class="user-avatar">
                <div class="username">${post.username || 'Unknown User'}</div>
                <div class="post-time">${formattedDate}</div>
                <div class="corner-icon">
                    ${post.content_type === 'COMMONMARK' ? '<ion-icon name="logo-markdown"></ion-icon>' : ''}
                </div>
            </div>
        `;

        const contentHTML = `
            <div class="content">
                <div class="title">${post.title}</div>
                <p class="post-content">${post.content}</p>
            </div>
        `;

        const interactionHTML = `
            <div class="interact-container">
                <button id="comment-${post.id}" type="button" data-post-id="${post.id}">
                    <ion-icon size="small" name="chatbox-ellipses-outline"></ion-icon>
                    ${post.comment_count > 0 ? '' : 'Comment'} <span class="comment-count">${post.comment_count > 0 ? post.comment_count : ''}</span>
                </button>
                <button id="like-${post.id}" type="button" data-post-id="${post.id}">
                    <ion-icon size="small" name="heart-outline"></ion-icon>
                    ${post.likes_count > 0 ? '' : 'Like'} <span class="like-count">${post.likes_count > 0 ? post.likes_count : ''}</span>
                </button>
            </div>
        `;

        postLink.innerHTML = userInfoHTML + contentHTML + interactionHTML;
        postElement.appendChild(postLink);
        container.appendChild(postElement);
    });
}




function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
