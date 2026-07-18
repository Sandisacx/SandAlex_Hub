import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { 
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKS-GvEQkd5scVyAhejnossKhEHJtGGio",
  authDomain: "sandalex-hub.firebaseapp.com",
  projectId: "sandalex-hub",
  storageBucket: "sandalex-hub.firebasestorage.app",
  messagingSenderId: "362037061596",
  appId: "1:362037061596:web:e5c84e98616ddc18251119",
  measurementId: "G-P07B3V13J6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// LIKE FUNCTION
window.likePost = async function(postId) {
const likeKey = "liked_post_" + postId;

if (localStorage.getItem(likeKey)) {
    alert("You have already liked this post.");
    return;
}
  const postRef = doc(db, "posts", "post" + postId);

  const postSnap = await getDoc(postRef);

  if (postSnap.exists()) {

    let currentLikes = postSnap.data().likes || 0;

    await updateDoc(postRef, {
      likes: currentLikes + 1
    });

  } else {

    await setDoc(postRef, {
      likes: 1,
      comments: []
    });

  }

  const updatedSnap = await getDoc(postRef);

  document.getElementById("like" + postId).textContent =
  updatedSnap.data().likes;
  localStorage.setItem(likeKey, "true");

};


// COMMENT FUNCTION
window.addComment = async function(postId) {

  const commentBox = document.getElementById("comment" + postId);
const nameBox = document.getElementById("name" + postId);
const commenterName = nameBox.value.trim();
  if(commenterName === ""){
  alert("Please enter your name before commenting");
  return;
  }
  const comment = commentBox.value.trim();

  if(comment === "") {
    alert("Please write a comment");
    return;
  }


  const postRef = doc(db, "posts", "post" + postId);

  const postSnap = await getDoc(postRef);


  if(postSnap.exists()) {

    await updateDoc(postRef, {

      comments: arrayUnion({
  name: commenterName,
  text: comment,
  time: new Date().toLocaleString()
})

    });


  } else {


    await setDoc(postRef, {

      likes: 0,
      comments: [comment]

    });

  }


  commentBox.value = "";

  alert("Comment posted successfully");

};
// LOAD SAVED DATA
async function loadPosts(){

  for(let i = 0; i < 3; i++){

    const postRef = doc(db, "posts", "post" + i);

    const postSnap = await getDoc(postRef);


    if(postSnap.exists()){

      const data = postSnap.data();


      // Show likes
      const likeElement = document.getElementById("like" + i);

      if(likeElement){
        likeElement.textContent = data.likes || 0;
      }


      // Show comments
      const commentsBox = document.getElementById("comments" + i);

      if(commentsBox && data.comments){

        commentsBox.innerHTML = "";

        data.comments.forEach(function(comment){

          const p = document.createElement("p");

          if(typeof comment === "string") {

  p.innerHTML = `
  💬 ${comment}
  `;

} else {

  p.innerHTML = `
<strong>👤 ${comment.name}</strong><br>
<small>🕒 ${comment.time}</small><br>
💬 ${comment.text}
`;

if (adminMode) {

    const del = document.createElement("button");

    del.textContent = "🗑 Delete";

    p.appendChild(del);

}

          }

          commentsBox.appendChild(p);

        });
const counter = document.getElementById("commentCount" + i);

if (counter) {
    counter.textContent = "Comments (" + data.comments.length + ")";
                                        }
      }

    }

  }

}


loadPosts();
window.adminMode = false;

window.adminLogin = function () {

    const password = prompt("Enter Admin Password");

    if (password === "isaacalexis") {

        adminMode = true;

        alert("Admin mode activated.");

        loadPosts();

    } else {

        alert("Wrong password.");

    }

};

window.adminMode = false;

window.adminLogin = function () {

    const password = prompt("Enter Admin Password");

    if (password === "Sandra123") {

        adminMode = true;

        alert("Admin mode activated.");

        loadPosts();

    } else {

        alert("Wrong password.");

    }

};
