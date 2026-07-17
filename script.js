let likes = [0, 0, 0];

function likePost(post) {
    likes[post]++;
    document.getElementById("like" + post).textContent = likes[post];
}

function sharePost() {
    if (navigator.share) {
        navigator.share({
            title: "SANDALEX HUB",
            text: "Check out this article on SANDALEX HUB!",
            url: window.location.href
        });
    } else {
        alert("Sharing is not supported on this device.");
    }
}

function addComment(post) {
    const textarea = document.getElementById("comment" + post);
    const comment = textarea.value.trim();

    if (comment === "") {
        alert("Please enter a comment.");
        return;
    }

    const commentsDiv = document.getElementById("comments" + post);
    const p = document.createElement("p");
    p.textContent = "💬 " + comment;

    commentsDiv.appendChild(p);
    textarea.value = "";
}
