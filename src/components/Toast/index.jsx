import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  background: "#181818",
  color: "#fff",
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", MySwal.stopTimer);
    toast.addEventListener("mouseleave", MySwal.resumeTimer);
  },
});

export default toast;
