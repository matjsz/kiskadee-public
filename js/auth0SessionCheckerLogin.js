const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAsSZmqtmhg7l4uX2BZqWvuBdkYgAtQW9s",
    authDomain: "kiskadee-749da.firebaseapp.com",
    projectId: "kiskadee-749da",
    storageBucket: "kiskadee-749da.appspot.com",
    messagingSenderId: "929646087678",
    appId: "1:929646087678:web:5f77ba21e65c2eac9e04af",
    measurementId: "G-SV2R2VCKKT"
});

firebaseApp.auth().onAuthStateChanged((user) => {
    if (user) {
        window.location = "/home"
    } else {
        // Needs to sign in
    }
});