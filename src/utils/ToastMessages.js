import Toast from 'react-native-toast-message';

function showError(message) {
  Toast.show({
    type: 'error',
    text1: message,
  });
}
function showSuccess(message) {
  Toast.show({
    type: 'success',
    text1: message,
  });
}
function showWarning(message) {
  Toast.show({
    type: 'info',
    text1: message,
  });
}
export {showError, showSuccess, showWarning};
