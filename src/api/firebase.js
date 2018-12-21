import firebase from 'firebase';

var config = {
	apiKey: "AIzaSyCKrij55GIUI80GN7yXdLDnN8PUsSn3pF0",
	authDomain: "myward-amz.firebaseapp.com",
	databaseURL: "https://myward-amz.firebaseio.com",
	storageBucket: "myward-amz.appspot.com",
	projectId: "myward-amz",
	// messagingSenderId: "537809219287"
};

firebase.initializeApp(config);
var db = firebase.firestore();
db.settings({timestampsInSnapshots: true})

export { firebase, db };