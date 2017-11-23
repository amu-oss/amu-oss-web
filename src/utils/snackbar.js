const notify = {
  snackbar: false,
  color: '',
  timeout: 6000,
  text: 'Hello, I\'m a snackbar'
};

function showSnackbar(message) {
  notify.text = message;
  notify.snackbar = true;
}

function success(message) {
  notify.color = 'success';
  showSnackbar(message);
}

function error(message) {
  notify.color = 'error';
  showSnackbar(message);
}

export default {
  model: notify,
  showSnackbar: showSnackbar,
  success: success,
  error: error
}