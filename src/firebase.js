// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOsq3fwbzoSl33OqsGpgz1bt1vc7O-LbM",
  authDomain: "netflix-clone-5e416.firebaseapp.com",
  projectId: "netflix-clone-5e416",
  storageBucket: "netflix-clone-5e416.appspot.com",
  messagingSenderId: "629854459455",
  appId: "1:629854459455:web:f9e0d91d744fb864538a8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// added by me
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",

            email,
        })
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email,password) =>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export{auth,db,login,signup,logout};