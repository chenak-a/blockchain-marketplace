const list = (state = [], action) => {
  switch (action.type) {
    case "contain":
      return [
        ...state,
        {
          lit: [action.payload.lit],
        },
      ];
    default:
      return state;
  }
};
export default list;
