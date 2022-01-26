const getPostsByUsers = (usersPosts) => {
  const postsByUsers = {};

  for (let post of usersPosts) {
      if (!postsByUsers[post.user_id]) {
          postsByUsers[post.user_id] = {
              userId: post.user_id,
              firstName: post.first_name,
              lastName: post.last_name,
              email: post.email,
              posts: [],
          };
      }

      postsByUsers[post.user_id].posts.push({
          title: post.title,
          content: post.content,
      });

  }

  return Object.values(postsByUsers);
};
const getWatchListByUsers = (WatchLists) => {
  const UsersWatchLists = {};

  for (let post of WatchLists) {
      if (!UsersWatchLists[post.user_id]) {
          UsersWatchLists[post.user_id] = {
              userId: post.user_id,
              firstName: post.first_name,
              lastName: post.last_name,
              email: post.email,
              moviesInWatchList: [],
          };
      }

      UsersWatchLists[post.user_id].moviesInWatchList.push({
          movieId: post.movie_id,
      });

  }

  return Object.values(UsersWatchLists);
};

  
  
  const getWatchListByUser = (post) => {
    const UsersWatchLists = {};
  
   
        if (!UsersWatchLists[post.user_id]) {
            UsersWatchLists[post.user_id] = {
                userId: post.user_id,
                moviesInWatchList: [],
            };
        
  
        UsersWatchLists[post.user_id].moviesInWatchList.push({
            movieId: post.movie_id,
        });
  
    }
  
    return Object.values(UsersWatchLists);
  };
module.exports = {
  getPostsByUsers,
  getWatchListByUsers,
  getWatchListByUser

};