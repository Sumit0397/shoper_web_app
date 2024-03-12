import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const passwordNotify = () => {
    toast.error("Password Not Matched!!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}


export default passwordNotify;