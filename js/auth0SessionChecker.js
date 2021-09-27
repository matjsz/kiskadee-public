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
        // Sibebar Profile
        var profilePic = document.getElementById('sidebarProfilePic')
        var profileUsername = document.getElementById('sidebarProfileUsername')
        var profileID = document.getElementById('sidebarProfileID')

        profilePic.src = user.photoURL
        profilePic.classList.remove('placeholder')
        profileUsername.innerHTML = user.displayName
        profileID.innerHTML = '@'+user.uid

        // Sidebar
        var sidebarHome = document.getElementById('sidebarHome')
        var sidebarTopics = document.getElementById('sidebarTopics')
        var sidebarProfile = document.getElementById('sidebarProfile')

        sidebarHome.innerHTML = '<i class="bi bi-house"></i> Home'
        sidebarHome.href = '/home'
        sidebarTopics.innerHTML = '<i class="bi bi-asterisk"></i> Topics'
        sidebarTopics.href = '/topics'
        sidebarProfile.innerHTML = '<i class="bi bi-person-circle"></i> My Profile'
        sidebarProfile.href = '/users/'+user.uid

        if(user.emailVerified == false){
            document.getElementById('emailVerifiedBadgeLink').href = `/verifyEmail?email=${user.email}`
            document.getElementById('emailVerifiedBadge').classList.remove('visually-hidden')
        }
    } else {
        window.location = "/login"
    }
});

function logout(){
    firebase.auth().signOut().then(() => {
        window.location = "/"
    }).catch((error) => {
        alert("something went wrong! :(")
    });
}