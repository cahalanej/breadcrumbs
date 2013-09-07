var app = app || {};

app.Follower = Backbone.Collection.extend({
    model: app.User
});