var app = app || {};

app.BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'userContainer',
    template: _.template( $( '#userTemplate' ).html() ),

    // initiate_geolocation: function() {
    // 	navigator.geolocation.getCurrentPosition(handle_geolocation_query,handle_errors);
    // }

    // handle_errors: function() {
    //     switch(error.code)  
    //     {  
    //         case error.PERMISSION_DENIED: alert("user did not share geolocation data");  
    //         break;  
    //         case error.POSITION_UNAVAILABLE: alert("could not detect current position");  
    //         break;  
    //         case error.TIMEOUT: alert("retrieving position timed out");  
    //         break;  
    //         default: alert("unknown error");  
    //         break;  
    //     }     	
    // }

    // handle_geolocation_query: function() {
    // 	alert('Lat: ' + position.coords.latitude +  
    //           ' Lon: ' + position.coords.longitude);  
    // }

    // initialize: function() {
    //     jQuery("#btnInit").click(initiate_geolocation);  
    // },

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ) );

        return this;
    },


});