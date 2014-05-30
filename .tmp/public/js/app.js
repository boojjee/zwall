/**
 * app.js
 *
 * This file contains some conventional defaults for working with Socket.io + Sails.
 * It is designed to get you up and running fast, but is by no means anything special.
 *
 * Feel free to change none, some, or ALL of this file to fit your needs!
 */


(function (io) {

  // as soon as this file is loaded, connect automatically, 
  var socket = io.connect();
  if (typeof console !== 'undefined') {
    log('Connecting to Sails.js...');
  }

  socket.on('connect', function socketConnected() {

    // Listen for Comet messages from Sails
    socket.on('message', function messageReceived(message) {

      ///////////////////////////////////////////////////////////
      // Replace the following with your own custom logic
      // to run when a new message arrives from the Sails.js
      // server.
      ///////////////////////////////////////////////////////////
      log('New comet message received :: ', message);
      //////////////////////////////////////////////////////

    });

    socket.on('show', function(data) {
      var url = data.show;
      $.ajax({
          url: url,
          type: 'POST',
          crossDomain: true,
          dataType: 'jsonp'
      }).done(function (data) {
          console.log(data);
          dataImageSTD = data.data[0].images.standard_resolution.url;
          
          ele = $('<div>', {class: 'item Hvh'}).html( 
            $('<img>',{id: data.data[0].id, src: dataImageSTD, width: 240, height: 240})
          );

          var $newItems = $(ele);
          $('#wall-container').prepend($newItems).isotope( 'reloadItems' ).isotope({ sortBy: 'original-order' });
          // $("#wall-container").prepend(ele);  

          

          last = $('#wall-container div:first-child');
          lastSrc = $('#wall-container div:first-child').find('img').attr('src');
          nextSrc = $('#wall-container div:nth-child(2)').find('img').attr('src');
          if( lastSrc === nextSrc ) {
            last.remove();
          }
          last = $('#wall-container').find(':first-child').removeClass('Hvh');

          console.log(data.data[0].images.standard_resolution.url)
      }); 
    });


    ///////////////////////////////////////////////////////////
    // Here's where you'll want to add any custom logic for
    // when the browser establishes its socket connection to 
    // the Sails.js server.
    ///////////////////////////////////////////////////////////
    log(
        'Socket is now connected and globally accessible as `socket`.\n' + 
        'e.g. to send a GET request to Sails, try \n' + 
        '`socket.get("/", function (response) ' +
        '{ console.log(response); })`'
    );
    ///////////////////////////////////////////////////////////


  });


  // Expose connected `socket` instance globally so that it's easy
  // to experiment with from the browser console while prototyping.
  window.socket = socket;


  // Simple log function to keep the example simple
  function log () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  }
  

})(

  // In case you're wrapping socket.io to prevent pollution of the global namespace,
  // you can replace `window.io` with your own `io` here:
  window.io

);
