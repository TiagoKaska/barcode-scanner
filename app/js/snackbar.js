var snackbar = {};

var snackBarElement = document.querySelector('.app__snackbar');

//To show notification
snackbar.show = (msg, options=3000) => {
  if (!msg) return;
  
  var snackbarMsg = document.createElement('div');  
  snackbarMsg.className = 'app__snackbar-msg';
  snackbarMsg.textContent = msg;
  snackBarElement.appendChild(snackbarMsg);

  //Show toast for 3secs and hide it
  setTimeout(function () {
    snackbarMsg.remove();
  }, options);
};

exports.snackbar = snackbar;