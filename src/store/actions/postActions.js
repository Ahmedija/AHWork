export const createPost = (post) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //async call to db
        const firestore = getFirestore();
        firestore.collection('posts').add({
            ...post,
            authorFirstName: 'Sejo',
            authorLastName: 'Kalac',
            authorId: 12345,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_POST', post });
        }).catch((err) => {
            dispatch({ type: 'CREATE_POST_ERROR', err });
        })

    }
};