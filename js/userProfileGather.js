const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAsSZmqtmhg7l4uX2BZqWvuBdkYgAtQW9s",
    authDomain: "kiskadee-749da.firebaseapp.com",
    projectId: "kiskadee-749da",
    storageBucket: "kiskadee-749da.appspot.com",
    messagingSenderId: "929646087678",
    appId: "1:929646087678:web:5f77ba21e65c2eac9e04af",
    measurementId: "G-SV2R2VCKKT"
});

const db = firebaseApp.firestore()

// Gather
var req = new XMLHttpRequest();
req.open('GET', document.location, false);
req.send(null);

const userID = req.getResponseHeader('user-id')
const userUsername = req.getResponseHeader('user-username')
const userAvatarURL = req.getResponseHeader('user-avatar-url')
var userKiskas = db.collection('kiskas').where("author", "==", userID)

// Back-end Debug
document.body.insertAdjacentHTML('afterend', `<br><br>User ID: ${userID}<br>Username: ${userUsername}<br><img src='${userAvatarURL}' height='100px'>`)

userKiskas.get().then((query) => {
    query.forEach((doc) => {
        kiska = doc.data()

        document.body.insertAdjacentHTML('afterend', `<br><br>${userUsername} | @${userID}<br>${kiska.content}<br>Posted in: ${kiska.created.toDate()} | Likes: ${kiska.likes.length}`)
    })
})