firebaseApp.firestore().collection('stack').get().then((query) => {
    if(query.docs.length == 1){
        document.getElementById("kiskers").classList.remove('spinner-border')
        document.getElementById("kiskers").innerHTML = `${query.docs.length} user is kisking now.`
    }
    else{
        document.getElementById("kiskers").classList.remove('spinner-border')
        document.getElementById("kiskers").style = "margin-left: 0;"
        document.getElementById("kiskers").innerHTML = `${query.docs.length} users are kisking now.`
    }
})