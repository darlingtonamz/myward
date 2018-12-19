import {db} from './firebase'

const getData = (ref) => {
	var docRef = db.collection("cities").doc("SF");
	return ref.get()
};

const updateUserData = (user) => {
	// Sets user data to firestore on login
	const usersRef = db.collection('users')
	const data = {
		...user,
		roles: {
			sponsor: true
		}
	}
	return usersRef.set(data, {merge: true})

};

export { db, getData }