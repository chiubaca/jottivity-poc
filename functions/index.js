// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// The Firebase Admin SDK to access the Firebase Realtime Database.
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const ref = admin.database().ref()

exports.createUserAccount = functions.auth.user().onCreate( (user) => {
  
  const uid = user.uid
  const email = user.email

  const newUserRef = ref.child(`/users/${uid}`)
  return newUserRef.set({
    userData:{
      email:email
    },
    notebooks:{
      0:{
        "metadata":{
          "dateCreated":"n/a",
          "notebookAlias":"Your First Notebook"
        },
        "posts":{
          0:{
            "title": "Edit This Post",
            "contents":"",
            "date":"n/a",
            "mood": ["happy"],
            "productivity": ["life"],
          }
        },
        "tags" : [ {
          "mood" : [ "Happy", "Content", "Energetic", "Frustrated", "Angry", "Tired", "Optimistic", "Annoyed", "Dissatisfied", "Unmotivated", "Motiviated", "Satisfied", "Inspired", "Confused", "Sad", "Excited", "Demotivated", "Relaxed", "Stressed" ]
        }, {
          "productivity" : [ "Fitness", "Leisure", "Life", "Work", "Friends", "Family", "Holiday" ]
        } ] 
      }
    }
  })
})