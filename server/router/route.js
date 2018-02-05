exports.route=function(app){
  var userController=require('./../controller/userController'),
  todoController=require('./../controller/todoController');

  app.get('/task',todoController.getAll);
  app.post('/task',userController.loginRequired,todoController.add);

  app.patch('/task/:id',todoController.upd);
  app.delete('/task/:id',todoController.del);
  app.get('/task/:id',todoController.getOne);

  app.post('/task/register',userController.register);
  app.post('/task/signIn',userController.signIn);
};