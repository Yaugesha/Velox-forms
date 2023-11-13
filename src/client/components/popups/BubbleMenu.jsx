function BubbleMenu({ top, left, setIsOpen, items, width }) {
  function handleClose() {
    setIsOpen(false);
    console.log("close");
  }
  return (
    <>
      <div
        onClick={handleClose}
        style={{ height: document.body.scrollHeight + "px" }}
        className={`absolute top-0 left-0 w-full h-full`}
      >
        <div
          style={{ top: top + "px", left: left + "px" }}
          className={`relative w-[${width}px] py-2 px-2 shadow-md bg-white`}
        >
          {items.map((item) => {
            return (
              <div
                className="flex items-center gap-6 mt-2 cursor-pointer"
                key={item.name}
              >
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default BubbleMenu;
