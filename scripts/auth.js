

const signupForm = document.querySelector('#signup-form')

//signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then(cred =>{
        console.log("cred")
    })
})