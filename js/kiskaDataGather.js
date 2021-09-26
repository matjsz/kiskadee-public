const db = firebaseApp.firestore()

// Gather
var req = new XMLHttpRequest();
req.open('GET', document.location, false);
req.send(null);

const kiskaID = req.getResponseHeader('kiska-id')
const kiskaAuthorUsername = req.getResponseHeader('kiska-author-username')

db.collection('kiskas').doc(kiskaID).get().then((query) => {
    var kiska = query.data()

    document.body.insertAdjacentHTML('afterend', `<br><br>${kiskaAuthorUsername} | @${kiska.author}<br>${kiska.content}<br>Posted in: ${kiska.created.toDate()} Likes: ${kiska.likes}`)
})