function SortButton({ type, kind, changeKind, active, setActive, callback }) {
  function handleClick() {
    switch (type) {
      case "show":
        kind === "table" ? changeKind("list") : changeKind("table");
        break;
      case "name":
        setActive(type);
        kind === "ascending"
          ? changeKind("descending")
          : changeKind("ascending");
        break;
      case "date":
        setActive(type);
        kind === "ascending"
          ? changeKind("descending")
          : changeKind("ascending");
        break;
    }
  }
  return (
    <img
      onClick={handleClick}
      className={`cursor-pointer ${
        active === type ? "border-[2px] p-1 border-black" : ""
      }`}
      src={`/src/client/assets/icons/sorts/icon-${type + "-" + kind}.svg`}
      alt={`${type + "-" + kind}`}
    />
  );
}

export default SortButton;
