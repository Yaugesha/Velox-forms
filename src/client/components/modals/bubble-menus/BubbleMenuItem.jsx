import Rename from "./Rename";
import Delete from "./Delete";
import Edit from "./Edit";

function BubbleMenuItem({ data, item, setModalOpen, setIsOpen, setModal }) {
  const renameModal = (
    <Rename
      data={data}
      setBubbleMenu={setIsOpen}
      setOpen={setModalOpen}
      callback={item.action}
    />
  );
  const deleteModal = (
    <Delete
      data={data}
      setBubbleMenu={setIsOpen}
      setOpen={setModalOpen}
      callback={item.action}
    />
  );
  const editModal = (
    <Edit
      data={data}
      setBubbleMenu={setIsOpen}
      setOpen={setModalOpen}
      callback={item.action}
    />
  );
  return (
    <div
      className="bubble-menu-item flex items-center gap-6 mt-2 cursor-pointer"
      key={item.name}
      onClick={() => {
        if (item.name === "Rename") setModal(renameModal);
        else if (item.name === "Delete") setModal(deleteModal);
        else if (item.name === "Edit") setModal(editModal);
        setModalOpen(true);
      }}
    >
      <img src={item.icon} alt={item.name} />
      <p>{item.name}</p>
    </div>
  );
}

export default BubbleMenuItem;
