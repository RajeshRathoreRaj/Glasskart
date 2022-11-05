import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
function isEmpty(txt) {
  if (txt.length == 0) {
    return true;
  } else {
    return false;
  }
}

function isAlphabets(txt) {
  if (/^[a-z A-Z]+/.test(txt)) {
    return true;
  } else {
    return false;
  }
}

function isDigits(txt) {
  if (/^[0-9]+/.test(txt)) {
    return true;
  } else {
    return false;
  }
}

function isMobile(txt) {
  if (/^[0-9]{10}/.test(txt)) {
    return true;
  } else {
    return false;
  }
}

function isEmail(txt) {
  if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(txt)) {
    return true;
  } else {
    return false;
  }
}

function errorMessage(message) {
  toast.error(`🐞 ${message}`, {
    position: "top-right",
    autoClose: 10000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export { isEmpty, isAlphabets, isEmail, isMobile, isDigits, errorMessage };
