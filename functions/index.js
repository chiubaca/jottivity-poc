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
            "tags":{
              "mood" : [ {
                "colour" : "blue",
                "description" : "Happy",
                "tag" : "mood"
              } ],
              "productivity" : [ {
                "colour" : "blue",
                "description" : "Friends",
                "tag" : "productivity"
              } ]
            },
          }
        },
        "tags" :
        {
       "mood": [
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Happy"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Content"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Energetic"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Frustrated"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Angry"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Tired"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Optimistic"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Annoyed"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Dissatisfied"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Unmotivated"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Motiviated"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Satisfied"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Inspired"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Confused"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Sad"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Excited"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Demotivated"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Relaxed"
           },
           {
               "tag": "mood",
               "colour": "blue",
               "description": "Stressed"
           }
       ],
       "productivity": [
           {
               "tag": "productivity",
               "colour": "blue",
               "description": "Fitness"
           },
           {
               "tag": "productivity",
               "colour": "blue",
               "description": "Leisure"
           },
           {
               "tag": "productivity",
               "colour": "blue",
               "description": "Life"
           },
           {
               "tag": "productivity",
               "colour": "blue",
               "description": "Work"
           },
           {
               "tag": "productivity",
               "colour": "blue",
               "description": "Friends"
           },
           {
               "tag": "productivity",
               "colour": "blue",
               "description": "Family"
           },
           {
               "tag": "productivity",
               "colour": "blue",
               "description": "Holiday"
           }
       ]
     }
    }
  })
})