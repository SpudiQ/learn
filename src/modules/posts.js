
const createPostBtn = document.querySelector("#create-post-btn");
const savePostBtn = document.querySelector("#save-post-btn");
const cancelPostBtn = document.querySelector("#cancel-post-btn");
const postsContainer = document.querySelector("#posts-container");
const createPostModal = document.querySelector("#create-post-modal");
const createPostArticle = document.querySelector("#createPostArticle")

let posts = JSON.parse(localStorage.getItem("posts")) || [];

createPostBtn.addEventListener("click", showCreatePostModal);
savePostBtn.addEventListener("click", savePost);
cancelPostBtn.addEventListener("click", hideCreatePostModal);

renderPosts();

function showCreatePostModal() {
    createPostModal.style.display = "block";
    createPostBtn.style.display = "none";
}

function hideCreatePostModal() {
    createPostModal.style.display = "none";
    createPostBtn.style.display = "block";
    clearInputs();
}

function clearInputs() {
    const inputs = createPostModal.querySelectorAll("input, textarea");
    inputs.forEach((input) => (input.value = ""));
}

function savePost() {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timezone: 'UTC',
        hour12: 'false',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }

    const username = document.querySelector("#username").value;
    const article = document.querySelector("#article").value;
    const text = document.querySelector("#text").value;
    const date = new Date().toLocaleDateString("en-US", options);

    posts.push({ username, article, text, date });
    localStorage.setItem("posts", JSON.stringify(posts));

    hideCreatePostModal();
    renderPosts();
}

function renderPosts() {
    postsContainer.innerHTML = "";
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const postEl = document.createElement("div");
        postEl.classList.add('post')
        postEl.innerHTML = `<h3>by ${post.username}</h3> <h4>${post.article}</h4> <p class="post_text">${post.text}</p> <p class="date">${post.date}</p> <button class="post_buttons" id="edit-post-${i}">Edit</button> <button class="post_buttons" id="delete-post-${i}">Delete</button>`;
        postsContainer.prepend(postEl);

        const editPostBtn = postEl.querySelector(`#edit-post-${i}`);
        const deletePostBtn = postEl.querySelector(`#delete-post-${i}`);

        editPostBtn.addEventListener("click", () => editPost(i));
        deletePostBtn.addEventListener("click", () => deletePost(i));
    }
}

function editPost(index) {
    const post = posts[index];
    document.querySelector("#username").value = post.username;
    document.querySelector("#article").value = post.article;
    document.querySelector("#text").value = post.text;
    createPostArticle.innerHTML = "Edit Post"

    savePostBtn.removeEventListener("click", savePost);
    savePostBtn.addEventListener("click", () => updatePost(index));
    showCreatePostModal();
}

function updatePost(index) {
    const username = document.querySelector("#username").value;
    const article = document.querySelector("#article").value;
    const text = document.querySelector("#text").value;

    posts[index] = { username, article, text, date: posts[index].date };
    localStorage.setItem("posts", JSON.stringify(posts));

    hideCreatePostModal();
    renderPosts();
    savePostBtn.addEventListener("click", savePost);
    savePostBtn.removeEventListener("click", updatePost);
    createPostArticle.innerHTML = "Create Post"
}

function deletePost(index) {
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
}

export default renderPosts