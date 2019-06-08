Router.configure({
  layoutTemplate: 'main_layout'
});

Router.map(function(){
  //Jokes
  this.route('jokes',{
    path: '/jokes',
    template: 'jokes'
  });

  this.route('login',{
    path: '/',
    template: 'login'
  });

  this.route('signup',{
    path: '/signup',
    template: 'signup'
  });

  this.route('profile',{
    path: '/profile',
    template: 'profile'
  });

  this.route('rankings',{
    path: '/rankings',
    template: 'rankings'
  });

  this.route('search',{
    path: '/search',
    template: 'search'
  });

  this.route('threadForm',{
    path: '/threadForm',
    template: 'threadForm'
  });

  this.route('postForm',{
    path: '/postForm',
    template: 'postForm'
  });
});
