import { useDocuments } from "../../contexts/DocumentsContext";

function SortButton({ type, kind, changeKind, active, setActive, callback }) {
  const { sort } = useDocuments();
  function handleClick() {
    switch (type) {
      case "show":
        kind === "table" ? changeKind("list") : changeKind("table");
        break;
      case "name":
        setActive(type);
        if (type === active) {
          const newKind = kind === "ascending" ? "descending" : "ascending";
          sort(type, newKind);
          changeKind(newKind);
        } else sort(type, kind);
        break;
      case "date":
        setActive(type);
        if (type === active) {
          const newKind = kind === "ascending" ? "descending" : "ascending";
          sort(type, newKind);
          changeKind(newKind);
        } else sort(type, kind);
        break;
    }
  }
  const isActive = active === type ? "-active" : "";
  return (
    <img
      onClick={() => {
        handleClick();
      }}
      className="cursor-pointer"
      src={`/src/client/assets/icons/sorts/icon-${
        type + "-" + kind + isActive
      }.svg`}
      alt={`${type + "-" + kind}`}
    />
  );
}

export default SortButton;
