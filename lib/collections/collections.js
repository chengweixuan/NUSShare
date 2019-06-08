//Mongodb collecitons
Jokes = new Mongo.Collection("Jokes");

Threads = new Mongo.Collection("Threads");

ProfileImages = new FS.Collection("ProfileImages", {
  stores: [new FS.Store.GridFS("ProfileImages")]
});
//set Meteor colection rules

ProfileImages.allow({
  insert: function(userId, doc){
    return true;
  },
  update: function(userId, doc, fields, modifier){
    return true;
  },
  download: function(){
    return true;
  },
});

UserImages = new Mongo.Collection("UserImages");

UserImages.allow({
  insert: function(){
    return true;
  },
  update: function(UserId, doc, fields, modifier){
    return true;
  },
});

//for EasySearch
////////////////

JokesIndex = new EasySearch.Index({
  engine: new EasySearch.MongoDB({
    sort: function(){
      return{createdAt: -1}
    },
    selector: function(searchObject, options, aggregation){
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
      categoryFilter = options.search.props.categoryFilter;

      if(_.isString(categoryFilter) && !isEmpty(categoryFilter)){
        selector.category = categoryFilter;
      }
      return selector;
    },
  }),
  collection : Jokes,
  fields: ['jokeName'],
  defaultSearchOptions: {
    limit: 8
  },
  permissions: () =>{
    return true;
  }
});
