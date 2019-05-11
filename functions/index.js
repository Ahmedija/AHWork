const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const Busboy = require('busboy');
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;
const projectId = 'social-network-clone-c2fa4'
const fs = require('fs')

/*const gcconfig = {
    projectId: "social-network-clone-c2fa4",
    ketFilename: "social-network-clone-c2fa4-firebase-adminsdk-rt3zh-737d54339a.json"
}*/

const { Storage } = require('@google-cloud/storage');


let gcs = new Storage({
    projectId: "social-network-clone-c2fa4",
    ketFilename: "social-network-clone-c2fa4-firebase-adminsdk-rt3zh-737d54339a.json"
});




admin.initializeApp(functions.config().firebase);



exports.uploadFIle = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(500).json({
                message: 'Access denied'
            });
        }
        const busboy = new Busboy({ headers: req.headers });
        let uploadData = null;

        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            const filepath = path.join(os.tmpdir(), filename);
            uploadData = { file: filepath, type: mimetype };
            file.pipe(fs.createWriteStream(filepath)); //create file in system
        });

        busboy.on('finish', () => {
            const bucket = gcs.bucket('social-network-clone-c2fa4.appspot.com')
            bucket.upload(uploadData.file, {
                uploadType: "media",
                metadata: {
                    metadata: {
                        contentType: uploadData.type
                    }
                }
            })
                //if upload fails then output error
                .then(() => {
                    res.status(200).json({
                        message: 'It worked'
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });

                });
        });
        busboy.end(req.rawBody);
    });
});



//file manipulation resize

exports.onFileChange = functions.storage.object().onFinalize(event => {
    const bucket = event.bucket;
    const contentType = event.contentType;
    const filePath = event.name;

    console.log('FIle changed, function started executing.')

    if (path.basename(filePath).startsWith('resized-')) {
        console.log('We already renamed this data!!')
        return;
    }

    const destBucket = gcs.bucket(bucket);
    const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
    const metadata = { contentType: contentType };

    return destBucket.file(filePath).download({
        destination: tmpFilePath
    }).then(() => {
        return spawn('convert', [tmpFilePath, '-resize', '500x500', tmpFilePath])
    }).then(() => {
        return destBucket.upload(tmpFilePath, {
            destination: 'resized-' + path.basename(filePath),
            metadata: metadata
        })
    });
});

//rename
/*
exports.onFileChange = functions.storage.object().onFinalize(event => {
    document('users/{userId}')
    const object = event.data;
    const bucket = event.bucket;
    const contentType = event.contentType;
    const filePath = event.name;

    console.log('FIle changed, function started executing.')


    if (path.basename(filePath).startsWith('renamed-')) {
        console.log('We already renamed this data!!')
        return;
    }


    const destBucket = gcs.bucket(bucket);
    const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
    const metadata = { contentType: contentType };
    const uid = user

    return destBucket.file(filePath).download({
        destination: tmpFilePath
    }).then(() => {
        return destBucket.upload(tmpFilePath, {
            destination: 'renamed-' + uid,
            metadata: metadata
        })
    })
});
*/





exports.onFileDelete = functions.storage.object().onDelete(event => {
    console.log(event, 'File deleted'); return;
});


//noticikacije
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

                const newUser = doc.data();
                const notification = {
                    content: 'Joined AHWork',
                    user: `${newUser.firstName} ${newUser.lastName}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }

                return createNotification(notification);
            })
    });