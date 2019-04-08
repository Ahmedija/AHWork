const initState = {
    posts: [
        { id: '1', title: 'VIP', content: 'Sinan Sakic Bombas' },
        { id: '2', title: 'Grand', content: 'Sejo Kalac Kolac' },
        { id: '3', title: 'Opstina', content: 'Pupan Ozdrljic Nacelnik' }
    ]
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_POST':
            console.log('created post', action.post)
            return state;
        case 'CREATE_POST_ERROR':
            console.log('create post error', action.err);
            return state;
        default:
            return state;
    }
}

export default postReducer