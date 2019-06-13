if(Meteor.isServer){
  Meteor.methods({
    //method for adding Jokes
    addJokes: function(jokeName,jokePost){
      if(!Meteor.userId()){//get the current userId or null if no user is logged in
        throw new Meteor.Error("not authorised");
        return false;
      }else{
        var username = Meteor.user().username;//get the current user record containing email etc or null if no user is logged in
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var day = new Date().getDate();
        var date = (day + "/" + month + "/" + year).toString();

        Jokes.insert({
          jokeName: jokeName,
          jokePost: jokePost,
          author: username,
          date: date,
          createdAt:new Date(),
          laughScore:0,
          frownScore:0,
          pukeScore:0,
          voted: [username],
          userId: Meteor.userId(),
        });

      }
    },

    addThread: function(threadName,threadDesc){
      if(!Meteor.userId()){//get the current userId or null if no user is logged in
        throw new Meteor.Error("not authorised");
        return false;
      }else{
        var username = Meteor.user().username;//get the current user record containing email etc or null if no user is logged in
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var day = new Date().getDate();
        var date = (day + "/" + month + "/" + year).toString();

        Threads.insert({
          threadName: threadName,
          threadDesc: threadDesc,
          author: username,
          date: date,
          createdAt:new Date(),
          subscribers: [],
          userId: Meteor.userId(),
        });

      }
    },

    addPost: function(postTitle, postDesc, qnNumber, chosenThread, chosenThreadName){
      if(!Meteor.userId()){//get the current userId or null if no user is logged in
        throw new Meteor.Error("not authorised");
        return false;
      }else{
        var username = Meteor.user().username;//get the current user record containing email etc or null if no user is logged in
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var day = new Date().getDate();
        var date = (day + "/" + month + "/" + year).toString();

        Posts.insert({
          postTitle: postTitle,
          postDesc: postDesc,
          qnNumber: qnNumber,
          chosenThread: chosenThread,
          chosenThreadName: chosenThreadName,
          author: username,
          date: date,
          createdAt:new Date(),
          upvoted: [username],
          downvoted: [username],
          userId: Meteor.userId(),
        });

      }
    },

    removeJoke: function(jokesId){
      if(!Meteor.userId()){
        throw new Meteor.Error("not authorised");
        return false;
      }else{
        Posts.remove(jokesId);
      }
    },

    countVote: function(thisJoke, Name){
      if(!Meteor.userId()){
        throw new Meteor.Error("not authorised");
        return false;
      }else{
        Jokes.update(thisJoke, {$addToSet: {voted: Name}});
      }
    },

    countSub: function(thisThread, Name){
      if(!Meteor.userId()){
        throw new Meteor.Error("not authorised");
        return false;
      }else{
        Threads.update(thisThread, {$addToSet: {subscribers: Name}});
      }
    },

    profileSubs: function(currUser, thisThread){
      if(!Meteor.userId()){
        throw new Meteor.Error("not authorised");
        return false;
      }else{
        Meteor.users.update(currUser, {$addToSet: {"profile.subscriptions": thisThread}});
      }
    },

    userPointLaugh: function(jokeAuthor){
      if(!Meteor.userId()){
        throw new Meteor.Error("not authorised");
        return false;
      }else{
        Meteor.users.update(jokeAuthor, {$inc: {"profile.laughScore": +1}});
      }
    },

    laughVote: function(thisUser, thisJoke){
      if(!thisUser){
        throw new Meteor.Error("not authorised");
        return false;
      }else{
        Jokes.update(thisJoke, {$inc: {laughScore: +1}});
      }
    },

    userPointFrown: function(jokeAuthor){
      if(!Meteor.userId()){
        throw new Meteor.Error("not authorised");
        return false;
      }else{
        Meteor.users.update(jokeAuthor, {$inc: {"profile.frownScore": +1}});
      }
    },

    frownVote: function(thisUser, thisJoke){
      if(!thisUser){
        throw new Meteor.Error("not authorised");
        return false;
      }else{
        Jokes.update(thisJoke, {$inc: {frownScore: +1}});
      }
    },

    userPointPuke: function(jokeAuthor){
      if(!Meteor.userId()){
        throw new Meteor.Error("not authorised");
        return false;
      }else{
        Meteor.users.update(jokeAuthor, {$inc: {"profile.pukeScore": +1}});
      }
    },

    pukeVote: function(thisUser, thisJoke){
      if(!thisUser){
        throw new Meteor.Error("not authorised");
        return false;
      }else{
        Jokes.update(thisJoke, {$inc: {pukeScore: +1}});
      }
    },



  });
}
