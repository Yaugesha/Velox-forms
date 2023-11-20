function SortButton({ type, kind, changeKind, active, setActive, callback }) {
  function handleClick() {
    switch (type) {
      case "show":
        kind === "table" ? changeKind("list") : changeKind("table");
        break;
      case "name":
        setActive(type);
        if (type === active)
          kind === "ascending"
            ? changeKind("descending")
            : changeKind("ascending");
        break;
      case "date":
        setActive(type);
        if (type === active)
          kind === "ascending"
            ? changeKind("descending")
            : changeKind("ascending");
        break;
    }
  }
  const isActive = active === type ? "-active" : "";
  return (
    <img
      onClick={handleClick}
      className="cursor-pointer"
      src={`/src/client/assets/icons/sorts/icon-${
        type + "-" + kind + isActive
      }.svg`}
      alt={`${type + "-" + kind}`}
    />
  );
}

export default SortButton;
