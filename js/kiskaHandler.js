var kiskasOnScreen = 10
var kiskas = []

const db = firebaseApp.firestore()

function sendNewKiska(){
	var kiskaContent = document.getElementById('newKiskaContent').value

    db.collection('kiskas').add({
        author: firebaseApp.auth().currentUser.uid,
        authorUsername: firebaseApp.auth().currentUser.displayName,
        authorAvatarURL: firebaseApp.auth().currentUser.photoURL,
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

function showMore(){
    kiskasOnScreen += 5
	lastListener()

    lastListener = db.collection("kiskas").orderBy("created", "desc").limit(kiskasOnScreen)
		.onSnapshot((querySnapshot) => {
			kiskas = querySnapshot.docs
			
			document.getElementById('loadingKiskas').classList.remove('visually-hidden')

			ReactDOM.render(
				<KiskaArea kiskas={kiskas}></KiskaArea>,
				document.getElementById('homeContent')
			)

			document.getElementById('loadingKiskas').classList.add('visually-hidden')
		});
}

function Kiska(props){
	let authorIDStyling = {
		'fontSize': '1rem'
	}

    return  (
	<a href={props.url} className="list-group-item list-group-item-action d-flex gap-3 py-3">
		<img src={props.authorURL} width="32" height="32" className="rounded-circle flex-shrink-0"/>
		<div className="d-flex gap-2 w-100 justify-content-between">
			<div>
				<h6 className="mb-0"><a href={'/users/'+props.authorID}>{props.author}</a></h6>
				<p className="text-muted mb-2" style={authorIDStyling}>@{props.authorID}</p>
				<p className="mb-0">{props.content}</p>
			</div>
			<small className="opacity-50 text-nowrap">{props.date}</small>
		</div>
	</a>		
	)
}

function KiskaArea(props){
	var kiskas = props.kiskas
	var listKiskas = kiskas.map((kiska) => 
		<Kiska key={kiska.id} url={'/users/'+kiska.data().author+'/kiska/'+kiska.id} authorURL={kiska.data().authorAvatarURL} author={kiska.data().authorUsername} authorID={kiska.data().author} content={kiska.data().content} date={kiska.data().created.toDate().toLocaleString()}/>
	)

	var newKiskaFormStyling = {
		'height': '100px',
		'resize': 'none'
	}

	return (
		<div>
			<div className="form-floating m-2" id="newKiskaArea">
				<textarea className="form-control" placeholder="Leave a comment here" id="newKiskaContent" style={newKiskaFormStyling}></textarea>
				<label htmlFor="newKiskaContent"><i className="bi bi-chat-right-quote"></i> New Kiska</label>
				<button className="btn btn-primary" type="button" onClick={sendNewKiska}>Send</button>
			</div>
			<div className="list-group" id="kiskasArea">
				{listKiskas}
			</div>
			<div className="spinner-border visually-hidden" id='loadingKiskas'></div>
		</div>
	)
}

var lastListener = db.collection("kiskas").orderBy("created", "desc").limit(kiskasOnScreen)
    .onSnapshot((querySnapshot) => {
        kiskas = querySnapshot.docs

		ReactDOM.render(
			<KiskaArea kiskas={kiskas}></KiskaArea>,
			document.getElementById('homeContent')
		)
    });

window.onscroll = function(event) {
	if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 600) {
		showMore()
	}
};


