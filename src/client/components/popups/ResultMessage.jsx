function ResultMessage({ isVisible, isCorrect, message }) {
  return (
    <>
      {isVisible && (
        <div>
          {!isCorrect ? (
            <p className="w-[357px]  text-red-700 font-bold -my-4 ">
              {message}
            </p>
          ) : (
            <p className="w-[357px]  text-green-700 font-bold -my-4 ">
              {message}
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default ResultMessage;
