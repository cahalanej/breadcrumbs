
var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#crumb',

    initialize: function( initialBooks ) {
        this.collection = new app.follower( );
        this.render();
    },

    // render library by rendering each book in its collection
    render: function() {
        this.collection.each(function( item ) {
            this.renderUser( item );
        }, this );
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderUser: function( item ) {
        var bookView = new app.BookView({
            model: item
        });
        this.$el.append( bookView.render().el );
    }
});