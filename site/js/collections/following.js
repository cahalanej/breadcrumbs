var app = app || {};

app.Following = Backbone.Collection.extend({
    model: app.User
});