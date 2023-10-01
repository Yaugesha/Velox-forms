function EditorMenuButton({ name, editor, handleClick, buttonClass, img }) {
  if (editor == undefined) return;

  return (
    <button className={buttonClass} onClick={handleClick}>
      {img === undefined ? name : <img src={img} alt={name} />}
    </button>
  );
}

export default EditorMenuButton;
