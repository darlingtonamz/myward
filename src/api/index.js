import {db} from './firebase'

const getData = (ref) => {
	var docRef = db.collection("cities").doc("SF");
	return ref.get()
};

export { db, getData }