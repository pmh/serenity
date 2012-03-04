#### About
Serenity is an MVC framework for JavasScript built on top of KnockoutJS. It uses convention over configuration and data-binding together with a powerful object model to eliminate boilerplate and help you structure your applications.

#### Tutorial
Every JS MVC framework must have a todo app, so let's build one!

We start by require'ing serenity and setting up our application object, here we call it App but you can name it whatever you want. 

    var Serenity = require('./vendor/serenity'),
        App      = Serenity.app();

Next we set up our model, this is done by clone'ing Serenity.Model.
You may be wondering about that clone thing, well it basically creates and returns a new object with the receiver set as it's prototype. If clone is called with a function then it will execute it in the context of the newly created object.

TODO: Explain Serenity's object model in more detail.

    App.Task = Serenity.Model.clone(function () {

Serenity.Model automatically installs a method called create on it's child objects which basically creates a new clone of the current object and then invokes the init method on it passing along any arguments.

      this.method('init', function (task) {
        this.set({task: task, isDone: false});
      });
    });

Now let's create a controller, in this case we want a controller that keeps track of all our model objects so we create a clone of Serenity.ArrayController.

    App.Tasks = Serenity.ArrayController.clone(function () {

We want a way to mark all tasks as done so let's add a completeAll method

      this.method('completeAll', function () {

In order to mark all tasks as done we need to iterate over all tasks and mark them as done, but we dont have a collection of tasks to iterate over, right? Well actually we do. When we cloned Serenity.ArrayController it actually added a tasks field to our controller (It's named tasks since our controller is named Tasks).
We iterate over the tasks collection using the each method, one of many collection methods in Serenity. collection#each takes a function as it's arguments and invokes it, for it's side effects, once for every item in the collection, but notice that we dont pass it a function instead we pass it a specially formatted string (though a regular function would work as well, albeit a bit more verbose), this is called a string lambda and it actually expands to a function. (String Lambdas where extracted from Oliver Steele's wonderful functionaljs library, http://osteele.com/sources/javascript/functional/).

        this.tasks.each('_.isDone(true)');
      });

We also want a way to see how many tasks are remaining so we define a remaining method, however this time we specify it as a computed method instead of a regular one since it is dependent on the value of tasks which is an observable value.

      this.computed('remaining', function () {
        var length = this.tasks().length;
        return length + " " + (length === 1 ? " task" : " tasks") + "remaining";
      });
    });

Views in Serenity are a bit special in that besides their own state they also have access to their controllers state and they typically deals with dom related actions.
    
    App.TaskView = Serenity.View.clone(function () {

Every view you define should specify an element where it should render it's template (in this case the templates under templates/tasks/*.html). It will render the index template initially and you can tell it to render other templates as response to user actions using the renderTemplate method, eg. renderTemplate('show')

      this.set("el", "#container");

We also need a way to create new tasks and we do this by binding the submit button of our task form to a view method, which we call submit. This method extracts the text from the task input field and calls create on the controller (which in turn calls create on Task) 
 
      this.method('submit', function (formElement) {
        this.create($(formElement).find('input[name="task"]').val());
      });
    });

Lastly we invoke the run method to kick off the run loop.

    App.run();