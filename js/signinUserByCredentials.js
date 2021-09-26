const urlParams = new URLSearchParams(window.location.search);

var signedCodeAuth = 0

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAsSZmqtmhg7l4uX2BZqWvuBdkYgAtQW9s",
    authDomain: "kiskadee-749da.firebaseapp.com",
    projectId: "kiskadee-749da",
    storageBucket: "kiskadee-749da.appspot.com",
    messagingSenderId: "929646087678",
    appId: "1:929646087678:web:5f77ba21e65c2eac9e04af",
    measurementId: "G-SV2R2VCKKT"
});

const auth = firebaseApp.auth();

firebaseApp.auth().signInWithEmailAndPassword(urlParams.get('userEmail'), urlParams.get('userPassword'))
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user.uid)

        signedCodeAuth = 200

        document.getElementById('content').style.opacity = '0'
        document.getElementById('title').style.fontSize = '0px'
        document.getElementById('description').style.fontSize = '0px'
        document.getElementById('loading').style.fontSize = '0px'

        setTimeout(function(){window.location = "/home"}, 1500);
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode)
        console.log(errorMessage)

        signedCodeAuth = 404

        window.location = "authenticate-fail"
    });