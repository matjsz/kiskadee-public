const db = firebaseApp.firestore()

function sendNewKiska(kiskaContent){
    db.collection('kiskas').add({
        author: firebaseApp.auth().currentUser.uid,
        created: new Date(),
        content: kiskaContent,
        likes: [],
        answers: []
    })
    // .then((docRef) => {
    //     alert("Document written with ID: ", docRef.id);
    // })
    // .catch((error) => {
    //     alert("Error adding document: ", error);
    // });
}
