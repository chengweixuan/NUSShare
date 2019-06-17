//declare publishing methods for meteor/mongodb
if(Meteor.isServer){
  Meteor.publish('Jokes', function(){//'Jokes' has to correspond to the elements in collections aka mongodb
    if(!this.userId){// if "this" user is not logged in dont publish the jokeForm
      return false;
      throw new Meteor.Error("not authorised");
    }else{
      return Jokes.find();
    }
  });

  Meteor.publish('Users', function(){//'Users' has to correspond to the elements in collections aka mongodb
    if(!this.userId){// if "this" user is not logged in dont publish the jokeForm
      return false;
      throw new Meteor.Error("not authorised");
    }else{
      return Meteor.users.find();
    }
  });

  Meteor.publish("ProfileImages", function(){
    return ProfileImages.find();
  });

  Meteor.publish("UserImages", function(){
    return UserImages.find();
  });

  Meteor.publish('Threads', function(){//'Jokes' has to correspond to the elements in collections aka mongodb
    if(!this.userId){// if "this" user is not logged in dont publish the jokeForm
      return false;
      throw new Meteor.Error("not authorised");
    }else{
      return Threads.find();
    }
  });

  Meteor.publish('Posts', function(){//'Jokes' has to correspond to the elements in collections aka mongodb
    if(!this.userId){// if "this" user is not logged in dont publish the jokeForm
      return false;
      throw new Meteor.Error("not authorised");
    }else{
      return Posts.find();
    }
  });

  Meteor.publish('Comments', function(){//'Jokes' has to correspond to the elements in collections aka mongodb
    if(!this.userId){// if "this" user is not logged in dont publish the jokeForm
      return false;
      throw new Meteor.Error("not authorised");
    }else{
      return Comments.find();
    }
  });
}
