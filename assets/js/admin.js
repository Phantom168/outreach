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
  console.log(window.location)

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
let database = firebase.database();
let storage = firebase.storage();
let db = firebase.firestore();
let storageRef = storage.ref();

firebase.analytics();
const publicationsRef=db.collection('publications');
let data = publicationsRef.get()
            .then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                    console.log(doc.id," => ",doc.data())
                })
                console.log(querySnapshot)
            })
            .catch(function(error){
                console.log(error)
            })





// console.log("Reached starting")
// db.collection('publications').doc("cs19btech11047-3").set({
//     name:"Brijesh",
//     title:"IEEE",
//     timestamp:"2020-9-9-2-55-00"
// })
// .then(function() {
//     console.log("Document successfully written!");
// })
// .catch(function(error) {
//     console.error("Error writing document: ", error);
// });
