import Popup from "./Popup";
function ApplicationResult({ message, setMessage }) {
  const handleClose = (e) => {
    if (
      e.target.classList.contains("popup-container") ||
      e.target.classList.contains("close-btn")
    ) {
      document.body.style.overflow = "auto";
      setMessage(false);
    }
  };

  return (
    <Popup handleClose={handleClose}>
      <div className="w-[500px] h-[180px] flex flex-col justify-center items-center bg-white">
        <p className="text-xl mb-8 text-center">{message}</p>
        <button
          className="close-btn bg-black text-white px-2"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </Popup>
  );
}

export default ApplicationResult;
