import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
!firebase.apps.length && firebase.initializeApp(firebaseConfig);
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const {displayName,photoURL,email} = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        }
        return signedInUser;
      })
      .catch(err => {
        console.log(err)
      })

}
  
export   const handleFbSingIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
   return firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var accessToken = credential.accessToken;
        var user = result.user;
        user.success = true;
        return user;
     
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(error.message)
      });
}
  
export const handleSignOut = () => {
   return firebase.auth().signOut().then(() => {
        const signedOutUser = {
            isSignedIn: false,
            name: '',
            email: '',
            photo: '',
            success: false
        }
     return signedOutUser;
    }).catch((err) => {
        console.log(err);
    });
}

export const createUserWithEmailAndPassword = (name,email,password) => {
         return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {

          console.log(res)
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          updateUserName(name);
          return newUserInfo;
          console.log(res.user)


        })
        .catch((error) => {
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;

        });
}

export const signInWithEmailAndPassword = (email,password) => {
     return firebase.auth().signInWithEmailAndPassword(email,password)
  .then(res => {
         const newUserInfo =res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          return newUserInfo;
  })
  .catch((error) => {
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          return newUserInfo;

  });
}

 const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then( res => {
      console.log('username updated successfully')
    }).catch(function (error) {
      console.log(error);
    });
  }