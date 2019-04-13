const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});


const createNotification = (notification => {
    return admin.firestore().collection('notifications')
        .add(notification)
        .then(doc => console.log('Notification added', doc));
})

exports.postCreated = functions.firestore
    .document('posts/{postId}')
    .onCreate(doc => {

        const post = doc.data();
        const notification = {
            content: 'Added new post',
            user: `${post.authorFirstName} ${post.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification);
    })

exports.userJoined = functions.auth.user()
    .onCreate(user => {

        return admin.firestore().collection('users')
            .doc(user.uid).get().then(doc => {

                const newuser = doc.data();
                const notification = {
                    content: 'Joined AHWork',
                    user: `${newUser.firstName} ${newuser.lastName}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }

                return createNotification(notification);
            })
    })