import { useContext, createContext, useReducer } from "react";

const BubbleMenuContext = createContext();

const initialState = {
  isOpen: false,
  x: null,
  y: null,
  items: [],
  data: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "open":
      console.log(action.payload.x, action.payload.y);
      return {
        isOpen: true,
        x: action.payload.x - 130,
        y: action.payload.y + 30,
        items: action.payload.items,
        data: action.payload.data,
      };
    case "close":
      return {
        isOpen: false,
        x: null,
        y: null,
        data: {},
      };
    case "modal/open":
      return {
        ...state,
        isModalOpen: true,
        modal: action.payload.modal,
        name: action.payload.name,
      };
    case "modal/close":
      return {
        ...state,
        isModalOpen: false,
        modal: null,
        name: null,
      };
  }
}

export function BubbleMenuProvider({ children }) {
  const [bubbleMenu, dispatch] = useReducer(reducer, initialState);

  function open(cordinates, data, items) {
    dispatch({
      type: "open",
      payload: { x: cordinates.x, y: cordinates.y, data, items },
    });
  }
  function close() {
    dispatch({
      type: "close",
    });
  }
  function openModal(modal, name) {
    dispatch({ type: "modal/open", payload: { modal: modal, name: name } });
  }
  function closeModal() {
    dispatch({ type: "modal/close" });
  }

  const value = { bubbleMenu, open, close, openModal, closeModal };

  return (
    <BubbleMenuContext.Provider value={value}>
      {children}
    </BubbleMenuContext.Provider>
  );
}

export function useBubbleMenu() {
  const context = useContext(BubbleMenuContext);
  return context;
}
