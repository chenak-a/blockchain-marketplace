import React, { Component } from "react";
import { connect } from "react-redux";
import store from "./sto";
import Nav from "./nav";
import "./itimes.css";
export class itimes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listelement: [],
      theelement: [],
      newValuelistlenght: 0,
      Valuelistlenght: 0,
      web3: null,
      accounts: null,
      contract: null,
      container: "",
      loeading: "",
    };
  }
  main() {
    this.interval = setInterval(() => {
      const { contract, accounts } = this.state;
      contract.methods
        .length()
        .call({ from: accounts[0] })
        .then((result) =>
          this.setState({
            Valuelistlenght: result,
          })
        );
      if (
        this.state.listelement.length == 0 ||
        this.state.listelement.length === this.state.Valuelistlenght
      ) {
        for (var i = 0; i < this.state.Valuelistlenght; i++) {
          contract.methods
            .Vueelement(i)
            .call({ from: accounts[0] })
            .then((result) =>
              this.setState({
                listelement: this.state.listelement.concat({
                  name: result[0],
                  ipfsh: result[1],
                  type: result[2],
                  address: result[3],
                  privacy: result[4],
                  price: result[5],
                }),
              })
            );
        }
      }
      for (let index = 0; index < this.state.listelement.length; index++) {
        const element = this.state.listelement[index].ipfsh;
        if (element == this.props.match.params.id) {
          this.setState({
            theelement: this.state.listelement[index],
          });
          this.typeimage(this.state.listelement[index]);
          clearInterval(this.interval);
          break;
        }
      }
    }, 150);
  }
  UNSAFE_componentWillMount() {
    try {
      this.setState({
        contract: store.getState().mainpkg[0].contract,
        accounts: store.getState().mainpkg[0].account,
      });
      this.main();
    } catch (Err) {
      console.log(Err);
    }
  }
  componentWillUnmount = () => {
    clearInterval(this.interval);
    this.unsubscribe();
    this.main();
  };
  unsubscribe = store.subscribe(async () => {
    this.setState({
      contract: store.getState().mainpkg[0].contract,
      accounts: store.getState().mainpkg[0].account,
      web3: store.getState().mainpkg[0].web3,
    });
    this.main();
  });
  typeimage = (element) => {
    console.log(this.state.theelement.ipfsh);
    console.log(this.state.theelement.type);

    if (this.state.theelement.ipfsh !== null) {
      if (
        this.state.theelement.type == "image/jpeg" ||
        this.state.theelement.type == "image/png"
      ) {
        return (
          <img
            className="object"
            id="object"
            frameborder="0"
            allowfullscreen="true"
            src={"https://ipfs.io/ipfs/" + this.props.match.params.id}
          ></img>
        );
      } else if (
        this.state.theelement.type == "text/javascript" ||
        this.state.theelement.type == "" ||
        this.state.theelement.type == "text/css" ||
        this.state.theelement.type == "application/pdf" ||
        this.state.theelement.type == "video/mp4" ||
        this.state.theelement.type == "video/x-matroska"
      ) {
        return (
          <iframe
            className="object"
            id="object"
            marginWidth="100%"
            src={"https://ipfs.io/ipfs/" + this.props.match.params.id}
          ></iframe>
        );
      } else if (
        this.state.theelement.type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        this.state.theelement.type ==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        return (
          <iframe
            className="object"
            id="object"
            marginWidth="100%"
            src={
              "https://view.officeapps.live.com/op/embed.aspx?src=https://ipfs.io/ipfs/" +
              this.props.match.params.id
            }
          ></iframe>
        );
      } else {
        return (
          <div class="sk-cube-grid">
            <div class="sk-cube sk-cube1"></div>
            <div class="sk-cube sk-cube2"></div>
            <div class="sk-cube sk-cube3"></div>
            <div class="sk-cube sk-cube4"></div>
            <div class="sk-cube sk-cube5"></div>
            <div class="sk-cube sk-cube6"></div>
            <div class="sk-cube sk-cube7"></div>
            <div class="sk-cube sk-cube8"></div>
            <div class="sk-cube sk-cube9"></div>
          </div>
        );
      }
    }
  };

  render() {
    return (
      <div className="itimes" id="itimes">
        <Nav />
        <div className="framina" id="framina">
          <div className="itima" id="itim">
            {this.props.match.params.id}
          </div>
        </div>
        <div className="objectin">
          <this.typeimage />
        </div>
      </div>
    );
  }
}

export default itimes;
