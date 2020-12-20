import React, { Component } from "react";
import controler from "./contracts/controler.json";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router";
import getWeb3 from "./getWeb3";
import ipfs from "./ipfs";
import Nav from "./nav";

import Profile from "./Profile";
import Store from "./Store";
import Home from "./Home";
import store from "./sto";
import itimes from "./itimes";

import "./App.css";

class App extends Component {
  constructor(proprs) {
    super(proprs);
    this.state = { web3: null, accounts: null, contract: null, data: false };
  }
  componentWillMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = controler.networks[networkId];
      const instance = new web3.eth.Contract(
        controler.abi,
        deployedNetwork && deployedNetwork.address
      );
      store.dispatch({
        type: "element",
        payload: {
          web3: web3,
          account: accounts,
          contract: instance,
        },
      });
      console.log("here");
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.VALUES);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  VALUES = async () => {
    const { accounts } = this.state;

    //refresh page when user change
    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.reload(false);
    });
  };
  render() {
    return (
      <div className="App">
        <Router history={useHistory}>
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/Store" exact component={Store} />
            <Route path="/:id" exact component={itimes} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
