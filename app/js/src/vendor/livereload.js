var socket = io.connect();

socket.on( 'reload-js'   , function (file) {
   location.reload();
});

socket.on( 'reload-html' , function (file) {});

socket.on( 'reload-css'  , function (file) {
  $("link[href='" + file + "']").attr("href", file);
});