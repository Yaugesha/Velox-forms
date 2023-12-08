import { useBubbleMenu } from "../../../contexts/BubbleMenuContext";
import Rename from "./Rename";
import Delete from "./Delete";
import Edit from "./Edit";

function BubbleMenuItem({ data, item }) {
  const { openModal } = useBubbleMenu();
  const renameModal = <Rename data={data} callback={item.action} />;
  const deleteModal = <Delete data={data} callback={item.action} />;
  const editModal = <Edit data={data} callback={item.action} />;
  return (
    <div
      className="bubble-menu-item flex items-center gap-6 mt-1 p-1 cursor-pointer duration-100 hover:bg-zinc-100 hover:border-none"
      key={item.name}
      onClick={() => {
        if (item.name === "Rename") openModal(renameModal, "rename");
        else if (item.name === "Delete") openModal(deleteModal, "delete");
        else if (item.name === "Edit") openModal(editModal, "edit");
      }}
    >
      <img src={item.icon} alt={item.name} />
      <p>{item.name}</p>
    </div>
  );
}

export default BubbleMenuItem;
