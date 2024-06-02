import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

let loading = false;

const firebaseConfig = {
    apiKey: "AIzaSyCfZOEwgAphf0XL66oaoDtkgAKeQKlLmf4",
    authDomain: "contactform-90103.firebaseapp.com",
    databaseURL: "https://contactform-90103-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "contactform-90103",
    storageBucket: "contactform-90103.appspot.com",
    messagingSenderId: "408888185041",
    appId: "1:408888185041:web:58fb61a2d1f940e3dcf5f0"
  };


const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const email = emailjs.init("Z1jyCZozX_0RWb16t");

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    document.getElementById('submit').setAttribute("disabled","disabled");
    document.getElementById('submit').classList.add("disabled");
    document.getElementById('text-submit').style.visibility='hidden';
    document.getElementById('loader').style.visibility='visible';    
    try {
        const nameClient = document.getElementById('name').value;
        const emailClient = document.getElementById('email').value;
        const docRef = await addDoc(collection(db, "users"), {
          name: nameClient,
          email: emailClient
        });
        console.log("Document written with ID: ", docRef.id);

        if (docRef) {
          emailjs
            .send('default_service', 'template_x2v921v', {
              name: nameClient,
              reply_to: emailClient,
            })
            .then(
              (response) => {
                loading = false;
                document.getElementById('submit').removeAttribute("disabled");
                document.getElementById('submit').classList.remove("disabled");
                window.location.href = 'gracias';
              },
              (err) => {
                console.log(err);
                document.getElementById('submit').removeAttribute("disabled");
                document.getElementById('submit').classList.remove("disabled");
              }
            );
        }
      } catch (e) {
        console.error("Error adding document: ", e);
        loading=false;
        document.getElementById('submit').removeAttribute("disabled");
        document.getElementById('submit').classList.remove("disabled");
      }
});
