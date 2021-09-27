const db = firebaseApp.firestore()
var kiskasOnScreen = 10

// Gather
var req = new XMLHttpRequest();
req.open('GET', document.location, false);
req.send(null);

const userID = req.getResponseHeader('user-id')
const userUsername = req.getResponseHeader('user-username')
const userAvatarURL = req.getResponseHeader('user-avatar-url')

// Back-end Debug
// document.getElementById('profileContent').innerHTML = `<br><br>User ID: ${userID}<br>Username: ${userUsername}<br><img src='${userAvatarURL}' height='100px'>`

// Load Profile
document.getElementById('profileUsername').innerHTML = `${userUsername}`
document.getElementById('profileUsernameID').innerHTML = `${userID}`
document.getElementById('profilePhotoImg').classList.remove('placeholder')
document.getElementById('profilePhotoImg').src = `${userAvatarURL}`

function checkProfile(){
    firebaseApp.auth().onAuthStateChanged((user) => {
        if (user) {
            if(userID == user.uid){
                document.getElementById('sidebarProfile').classList.add('active')
                document.getElementById('sidebarProfile').classList.remove('link-dark')
                document.getElementById('followButtonBtn').innerHTML = "Edit"
            } else{
                document.getElementById('sidebarProfile').classList.remove('active')
                document.getElementById('sidebarProfile').classList.add('link-dark')
            }
        } else {
            window.location = "/login"
        }
    });
}

// Kiskas
var kiskas = []

function showMore(){
    kiskasOnScreen += 5
	lastListener()

    lastListener = db.collection('kiskas').where("author", "==", userID).limit(kiskasOnScreen).onSnapshot((query) => {
			kiskas = query.docs
			
			document.getElementById('loadingKiskas').classList.remove('visually-hidden')

			ReactDOM.render(
                <KiskaAreaProfile kiskas={kiskas}></KiskaAreaProfile>,
                document.getElementById('profileContent')
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
				<h6 className="mb-0">{props.author}</h6>
				<p className="text-muted mb-2" style={authorIDStyling}>{props.authorID}</p>
				<p className="mb-0">{props.content}</p>
			</div>
			<small className="opacity-50 text-nowrap">{props.date}</small>
		</div>
	</a>		
	)
}

function KiskaAreaProfile(props){
	var kiskas = props.kiskas
	var listKiskas = kiskas.map((kiska) => 
		<Kiska key={kiska.id} url={'/users/'+kiska.data().author+'/kiska/'+kiska.id} authorURL={kiska.data().authorAvatarURL} author={kiska.data().authorUsername} authorID={kiska.data().author} content={kiska.data().content} date={kiska.data().created.toDate().toLocaleString()}/>
	)

	var followButtonStyling = {
		'borderRadius': '1.75rem',
		'right': '20rem',
		'top': '15rem'
	}

	var profileUsernameStyling = {
		'marginTop': '5rem',
		'marginLeft': '2.5rem'
	}

	var profileUsernameIDStyling = {
		'marginTop': '0',
		'marginLeft': '2.5rem'
	}

	var profileImgStyling = {
		'top': '10rem',
		'left': '20rem'
	}

	var profileBannerStyling = {
		'backgroundColor': 'wheat',
		'width': '100%',
		'height': '14rem'
	}

	return (
		<div>
			<div id="profileHeader" className="shadow">
				<div id="profileBanner" style={profileBannerStyling}>&emsp;</div>
				<div id="profilePhoto">
					<img width="128" height="128" src={userAvatarURL} className="rounded-circle me-2 position-absolute" style={profileImgStyling} id="profilePhotoImg"/>
				</div>
				<div id="followButton">
					<button className="btn btn-outline-primary btn-lg position-absolute" style={followButtonStyling} id="followButtonBtn">Follow</button>
				</div>
				<div id="profileNames">
					<p className="fs-3 mb-0" style={profileUsernameStyling} id="profileUsername"><span className="">{userUsername}</span></p>
					<p className="fs-5 text-muted pb-4" style={profileUsernameIDStyling} id="profileUsernameID"><span className="">@{userID}</span></p>
				</div>
			</div>
			<div id="profileKiskas" className='list-group' id='kiskasArea'>
				{listKiskas}
			</div>
			<div className="spinner-border visually-hidden" id='loadingKiskas'></div>
		</div>
	)
}

var lastListener = db.collection('kiskas').where("author", "==", userID).limit(kiskasOnScreen).onSnapshot((query) => {
    kiskas = query.docs

    ReactDOM.render(
        <KiskaAreaProfile kiskas={kiskas}></KiskaAreaProfile>,
        document.getElementById('profileContent')
    )
    
    checkProfile()
})

window.onscroll = function(event) {
	if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 600) {
		showMore()
	}
};
