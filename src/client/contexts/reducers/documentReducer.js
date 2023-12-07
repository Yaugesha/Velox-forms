export default function reducer(state, action) {
  switch (action.type) {
    case "documents/loaded": {
      return {
        documents: action.payload,
        allDocuments: action.payload,
      };
    }
    case "document/saved": {
      return {
        ...state,
        documents: [...state.allDocuments, action.payload],
        allDocuments: [...state.allDocuments, action.payload],
      };
    }
    case "document/deleted": {
      return {
        ...state,
        documents: state.documents.filter((document) => {
          return document.id !== action.payload;
        }),
        allDocuments: state.allDocuments.filter((document) => {
          return document.id !== action.payload;
        }),
      };
    }
    case "document/renamed": {
      return {
        documents: [
          ...state.documents.map((document) => {
            if (document.id !== action.payload.documentId) return document;
            else return { ...document, title: action.payload.newName };
          }),
        ],
        allDocuments: [
          ...state.allDocuments.map((document) => {
            if (document.id !== action.payload.documentId) return document;
            else return { ...document, title: action.payload.newName };
          }),
        ],
      };
    }
    case "search": {
      return {
        ...state,
        documents: state.allDocuments.filter((document) => {
          return document.title
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        }),
      };
    }
    case "date-ascending": {
      return {
        ...state,
        documents: state.documents.sort((doc1, doc2) => {
          const date1 = new Date(doc1.date);
          const date2 = new Date(doc2.date);
          return date1 > date2 ? 1 : -1;
        }),
      };
    }
    case "date-descending": {
      return {
        ...state,
        documents: state.documents.sort((doc1, doc2) => {
          const date1 = new Date(doc1.date);
          const date2 = new Date(doc2.date);
          return date1 < date2 ? 1 : -1;
        }),
      };
    }
    case "name-ascending": {
      return {
        ...state,
        documents: state.documents.sort((doc1, doc2) => {
          return doc1.title < doc2.title ? 1 : -1;
        }),
      };
    }
    case "name-descending": {
      return {
        ...state,
        documents: state.documents.sort((doc1, doc2) => {
          return doc1.title > doc2.title ? 1 : -1;
        }),
      };
    }
  }
}
