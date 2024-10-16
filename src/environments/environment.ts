export const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyCeiiz12sJ7tWxLukXwCy7C-hGhEadhGMs",
        authDomain: "mrnzd-d0f4d.firebaseapp.com",
        projectId: "mrnzd-d0f4d",
        storageBucket: "mrnzd-d0f4d.appspot.com",
        messagingSenderId: "885611008529",
        appId: "1:885611008529:web:d534fa51ee9f54ecd4d7b0"
    },

    firebaseAPI: "https://mrnzd-d0f4d-default-rtdb.firebaseio.com/users/1.json?auth=AIzaSyCeiiz12sJ7tWxLukXwCy7C-hGhEadhGMs",

    /**********STUFF APIS**********/

    //AUTH  'Accept': 'application/json',
    //      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTEyMGQxNDNmN2MyYmU5ODc0ZmJlNjk5Y2VlZWU1NyIsIm5iZiI6MTcyOTAxOTUyMC43OTYyNjMsInN1YiI6IjY2ZWRjMzk5N2ZmMmJmNTdjZDI1YzM0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOwyzV6lR5clCajqExC9K5PFMew31YZqzMzT3FXqz9E'
   
    newsAPI: 'https://newsapi.org/v2/everything?q=keyword&apiKey=c2b17af8d8dd434690f9104a14edb91f',
    moviesApi: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
    moviesTrending: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
    moviesPopular: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
    moviesTopRated: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
};