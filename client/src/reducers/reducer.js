const mainpkg = (state = [], action) => {
  switch (action.type) {
    case "element":
      return [
        ...state,
        {
          web3: action.payload.web3,
          account: action.payload.account,
          contract: action.payload.contract,
        },
      ];

    default:
      return state;
  }
};
export default mainpkg;
