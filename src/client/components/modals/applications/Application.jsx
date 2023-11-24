import Popup from "../Popup";

function Application({ application, setIsOpen }) {
  function handleClose(e) {
    if (
      e.target.classList.contains("w-full") ||
      e.target.classList.contains("close-btn")
    ) {
      setIsOpen(false);
      document.body.style.overflow = "auto";
    }
  }
  return (
    <Popup handleClose={handleClose}>
      <div className="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="leading-6 text-xl" id="modal-headline">
                Application Information
              </h3>
              <div className="mt-4">
                <p className="text-gray-700">
                  Date of Submission: {application.date}
                </p>
                <div className="mt-3">
                  <h4 className="text-xl leading-6 font-medium text-gray-900">
                    Application Data
                  </h4>
                  <ul className="mt-2 text-gray-700">
                    <li>Category: {application.data.category}</li>
                    <li>Name: {application.data.name}</li>
                    <li>Comment: {application.data.comment}</li>
                  </ul>
                </div>
                <div className="mt-3">
                  <h4 className="text-xl leading-6 font-medium text-gray-900">
                    Application Statuses
                  </h4>
                  <div className="mt-2 text-gray-700">
                    {application.statuses.map((status) => {
                      return (
                        <ul key={application.id}>
                          <li>Name: {status.name}</li>
                          <li>Comment: {status.comment}</li>
                          <li>Time of Change: {status.date}</li>
                        </ul>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={handleClose}
            className=" close-btn w-full inline-flex justify-center border-2 border-black px-4 py-2 transition duration-500 hover:bg-black hover:text-white sm:ml-3 sm:w-auto sm:text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default Application;
