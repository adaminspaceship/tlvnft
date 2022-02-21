import { getDatabase, ref, set, query, orderByChild, equalTo, get, update } from "firebase/database";
import { app, initApp } from "./firebase.communicator";

class AiServer {

    database;

    constructor() {
        initApp();
        this.database = getDatabase(app);
    }

    getImagesFromServer = async () => new Promise((res, rej) => {
        const dbRef = ref(this.database, 'cogito_art');
        const unShownImages = get(query(dbRef, orderByChild('wasShown'), equalTo(false)));
        unShownImages.then(snapshot => {
            const value = snapshot.val();
            if (!!value) {
                console.log(Object.values(snapshot.val()).sort((a,b) => b.timestamp - a.timestamp));
                res(Object.values(snapshot.val()).sort((a,b) => a.timestamp - b.timestamp));
                this.writeShown(Object.keys(snapshot.val()));
            } else {
                res([]);
            }
        })
    });

    writeShown = (pieceIds) => {
        pieceIds.forEach(pieceId => {
            update(ref(this.database, `cogito_art/${pieceId}`), {wasShown: true});
        });
    }

}
const aiServer = new AiServer();
export { aiServer };