const RouteNames = {
    root:"/",
    dist:'/dist',
    user:'/api/users/:userId',
    userphoto:"/api/users/photo/:userId",
    users:'/api/users',
    defaultphoto:'/api/users/defaultphoto',
    follow:'/api/users/follow',
    unfollow:'/api/users/unfollow',
    finduser:'/api/users/findpeople/:userId',
    login:'/auth/signin',
    logout:'/auth/signout',
    newpost:'/api/posts/new/:userId',
    postphoto:'/api/posts/photo/:postId',
    userposts:'/api/posts/by/:userId'
};

export default RouteNames;