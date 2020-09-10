var firebaseConfig = {
    apiKey: "AIzaSyCTwLiVgSL6cMu9lYGsQL7JivfJGnrj__8",
    authDomain: "outreach-6d5ea.firebaseapp.com",
    databaseURL: "https://outreach-6d5ea.firebaseio.com",
    projectId: "outreach-6d5ea",
    storageBucket: "outreach-6d5ea.appspot.com",
    messagingSenderId: "57802047013",
    appId: "1:57802047013:web:7b80f0d6b38fd27bc709cc",
    measurementId: "G-LL6Y8H1P9S"
  };


  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();
let storage = firebase.storage();
let db = firebase.firestore();
let storageRef = storage.ref();

firebase.analytics();

console.log(window.location)

let currentUser;
let iithName;

function startLoadingSpinner(){
    $('#overlay').show()
}


firebase.auth().onAuthStateChanged(function(user){
    if(user){
        console.log(user)
        currentUser = user;

        if(currentUser.email.match(/@(iith\.ac\.in|cse\.iith\.ac\.in)$/g)){
            iithName = currentUser.email.split(/@(iith\.ac\.in|cse\.iith\.ac\.in)$/g)[0];


            // if(window.location.pathname.split("/").pop() !== 'home.html'){
            //     window.location = 'home.html';
                
            // }

            let username_el = document.getElementById('username-placeholder');
            username_el.innerHTML = user.displayName;
            document.getElementById('user-profile-placeholder').setAttribute('src',user.photoURL);
            $('#overlay').fadeOut();
            afterFirebaseLoad();
            
        }else{
            signout(false);
            alert("Please Login Using Only an IITH Mail ID")
        }

    }else if(!user){
        if(window.location.pathname.split("/").pop() == 'home.html'){
            window.location = 'index.html';
        }
        console.log('Authstatechanged2')
        $('#overlay').fadeOut();
    }
})

function startLoginWithGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result){
        var token = result.credential.token;
        var user = result.user;
        console.log('userInfo',user)
        

    }).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message

        var email = error.email;
        var credential = error.credential;
        console.log(errorCode,errorMessage,email,credential);
    })
}

                                                   
function signout(showAlert=true){
        firebase.auth().signOut().then(function(){
            //currentUser=null;
            if(showAlert){
                alert('logged out');
            }
           
            //setTimeout(function(){window.location='index.html'},3000);
        }).catch(function(){
            alert("An error occured")
        })
    }

// firebase.auth().onAuthStateChanged(function (user){
//     if(user){
//         window.location='home.html'
//     }else{
//         window.location='index.html'
//     }
// })





function loadHome(){
    console.log(currentUser)
}