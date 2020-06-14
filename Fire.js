import firebase from "firebase";
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCQZrC5v123DyGjtBpBQvg_xsj8AAmWWKc",
    authDomain: "todo-app-react-native-aea79.firebaseapp.com",
    databaseURL: "https://todo-app-react-native-aea79.firebaseio.com",
    projectId: "todo-app-react-native-aea79",
    storageBucket: "todo-app-react-native-aea79.appspot.com",
    messagingSenderId: "206538393081",
    appId: "1:206538393081:web:70a85435ab69ea0b40a928"
}

class Fire {
    constructor(callback) {
        this.init(callback);
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    get ref() {
        return firebase.firestore().collection('users').doc(this.userId).collection('lists');
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user);
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                })
            }
        })
    }

    getLists(callback) {
        let ref = this.ref;

        this.unsubscribe = ref.onSnapshot(snapShot => {
            let lists = [];

            snapShot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data()})
            });

            callback(lists);
        })
    }

    addList(list) {
        let ref = this.ref;

        ref.add(list);
    }

    updateList(list) {
        let ref = this.ref;

        ref.doc(list.id).update(list);
    }

    deleteList(listId) {
        let ref = this.ref;

        ref.doc(listId).delete();
    }

    detach() {
        this.unsubscribe();
    }
}

export default Fire;
