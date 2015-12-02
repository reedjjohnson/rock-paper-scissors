if (Meteor.isClient) {
  Template.task.events({
    "click .submit": function () {
      // Set the checked property to the opposite of its current value
      var x = document.getElementById("mySelect");
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
