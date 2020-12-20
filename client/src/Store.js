import React, { Component } from "react";
import store from "./sto";
import ehter from "./images/ether1.png";
import { Link } from "react-router-dom";
import Nav from "./nav";
import { Button } from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";
import Fab from "@material-ui/core/Fab";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import LayersIcon from "@material-ui/icons/Layers";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./Store.css";
export class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listelement: [],
      image: [],
      video: [],
      chose: "image",
      hidden: true,
      newValuelistlenght: 0,
      Valuelistlenght: 0,
      web3: null,
      accounts: null,
      contract: null,
      container: "",
      loeading: "",
      mouseenter: false,
    };
    this.onWheel = this.onWheel.bind(this);
    this.buy = this.buy.bind(this);
    this.imageplace = this.imageplace.bind(this);
  }
  main() {
    this.interval = setInterval(() => {
      const { contract, accounts } = this.state;
      contract.methods
        .lengthshop()
        .call({ from: accounts[0] })
        .then((result) =>
          this.setState({
            Valuelistlenght: result,
          })
        );
      this.setState({ newValuelistlenght: this.state.Valuelistlenght });
      if (
        this.state.listelement.length == 0 ||
        this.state.listelement.length === this.state.Valuelistlenght
      ) {
        for (var i = 0; i < this.state.Valuelistlenght; i++) {
          contract.methods
            .shop(i)
            .call({ from: accounts[0] })
            .then((result) =>
              contract.methods
                .container(result)
                .call({ from: accounts[0] })
                .then((result) => {
                  if (result[3] === "image/jpeg" || result[3] === "image/png") {
                    this.setState({
                      listelement: this.state.listelement.concat({
                        seller: result[0],
                        name: result[1],
                        ipfsh: result[2],
                        type: result[3],
                        address: result[4],
                        privacy: result[5],
                        price: result[6],
                      }),
                      image: this.state.image.concat({
                        seller: result[0],
                        name: result[1],
                        ipfsh: result[2],
                        type: result[3],
                        address: result[4],
                        privacy: result[5],
                        price: result[6],
                      }),
                    });
                  } else if (
                    result[3] === "video/mp4" ||
                    result[3] === "video/x-matroska"
                  ) {
                    this.setState({
                      video: this.state.video.concat({
                        seller: result[0],
                        name: result[1],
                        ipfsh: result[2],
                        type: result[3],
                        address: result[4],
                        privacy: result[5],
                        price: result[6],
                      }),
                    });
                  }
                })
            );
        }
        if (this.state.newValuelistlenght - this.state.Valuelistlenght !== 0) {
          for (
            var i = this.state.Valuelistlenght;
            i <= this.state.newValuelistlenght;
            i++
          ) {}
          this.setState({ Valuelistlenght: this.state.newValuelistlenght });
        } else {
        }
      }
      this.componentWillUnmount = () => {
        clearInterval(this.interval);
        this.unsubscribe();
        this.main();
      };
    }, 800);
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

  unsubscribe = store.subscribe(async () => {
    this.setState({
      contract: store.getState().mainpkg[0].contract,
      accounts: store.getState().mainpkg[0].account,
      web3: store.getState().mainpkg[0].web3,
    });
    this.main();
  });
  onWheel = (e) => {
    const container = document.getElementById("framin");
    const containerScrollPosition = document.getElementById("framin")
      .scrollLeft;
    container.scrollTo({
      top: "2",
      left: containerScrollPosition + e.deltaY,
      behaviour: "smooth",
    });
  };

  buy = (e) => {
    const { contract, accounts } = this.state;

    contract.methods
      .buy1(e.address)
      .send({ value: e.price, from: accounts[0], gasLimit: 2100000 });
  };
  imageplace = () => {
    console.log(this.state.chose);
    if (this.state.chose === "image") {
      return (
        <div
          className="framin"
          id="framin"
          onMouseEnter={() => (document.body.style.overflow = "hidden")}
          onMouseLeave={() => (document.body.style.overflow = "visible")}
          onWheel={this.onWheel}
        >
          {this.state.image.map((value, index) => (
            <div className="itim">
              {" "}
              <div key={index} value={value.name}>
                <h5 className="itimename" id="itimename">
                  {value.name}
                </h5>
                <div type="secret" className="classimage">
                  {" "}
                  <img
                    className="image"
                    src={`https://ipfs.io/ipfs/` + value.ipfsh}
                    onError={(i) => (i.target.src = "")}
                  />{" "}
                </div>
                <div className="listprice">
                  <h6 className="itimeprice" id="itimeprice">
                    {value.price}{" "}
                    <img
                      wight="20px"
                      height="20px"
                      bottom="100%"
                      src={ehter}
                    ></img>
                  </h6>
                  <div className="buybt">
                    {" "}
                    <Button
                      size="small"
                      onClick={() => this.buy(value)}
                      variant="contained"
                      color="primary"
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (this.state.chose === "video") {
      return (
        <div
          className="framin"
          id="framin"
          onMouseEnter={() => (document.body.style.overflow = "hidden")}
          onMouseLeave={() => (document.body.style.overflow = "visible")}
          onWheel={this.onWheel}
        >
          {this.state.video.map((value, index) => (
            <div className="itim">
              {" "}
              <div className="itimin" key={index} value={value.name}>
                <h5 className="itimename" id="itimename">
                  {value.name}
                </h5>
                <div
                  type="secret"
                  className="classimage"
                  onMouseEnter={() => {
                    var video = document.getElementById(`image` + index);
                    video.play();
                  }}
                  onMouseLeave={() => {
                    var video = document.getElementById(`image` + index);

                    video.currentTime = 0;
                    video.pause();
                  }}
                >
                  <video
                    loop
                    muted
                    className="image"
                    id={`image` + index}
                    src={`https://ipfs.io/ipfs/` + value.ipfsh}
                    type='video/x-matroska; codecs="theora, vorbis"'
                  ></video>
                </div>
                <div className="listprice">
                  <h6 className="itimeprice" id="itimeprice">
                    {value.price}{" "}
                    <img
                      wight="20px"
                      height="20px"
                      bottom="100%"
                      src={ehter}
                    ></img>
                  </h6>
                  <div className="buybt">
                    {" "}
                    <Button
                      size="small"
                      onClick={() => this.buy(value)}
                      variant="contained"
                      color="primary"
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };
  render() {
    return (
      <div className="Store">
        <div>
          <Nav />
        </div>
        <div className="contenante" id="contenante">
          <this.imageplace />

          <Fab
            color="primary"
            aria-label="add"
            className="bar"
            onMouseEnter={() => this.setState({ hidden: false })}
          >
            <LayersIcon />
          </Fab>
          <div
            className="obj"
            onMouseLeave={() => this.setState({ hidden: true })}
          >
            <Fab
              size="small"
              className="ig"
              aria-label="add"
              value="image"
              hidden={this.state.hidden}
              onClick={() => this.setState({ chose: "image" })}
            >
              <PhotoLibraryIcon />
            </Fab>
            <Fab
              size="small"
              className="vd"
              aria-label="add"
              hidden={this.state.hidden}
              value="video"
              onClick={() => this.setState({ chose: "video" })}
            >
              <VideoLibraryIcon />
            </Fab>
          </div>
        </div>
        <div className="contain" id="contain">
          {this.state.listelement.map((value, index) => (
            <div className="itt">
              {" "}
              <div key={index} value={value.name}>
                <h5 className="itimename" id="itimename">
                  {value.name}
                </h5>
                <div type="secret" className="classimage">
                  {" "}
                  <img
                    className="image"
                    src={`https://ipfs.io/ipfs/` + value.ipfsh}
                    onError={(i) => (i.target.src = "")}
                  />{" "}
                </div>
                <div className="listprice">
                  <h6 className="itimeprice" id="itimeprice">
                    {value.price}{" "}
                    <img
                      wight="20px"
                      height="20px"
                      bottom="100%"
                      src={ehter}
                    ></img>
                  </h6>
                  <div className="buybt">
                    {" "}
                    <Button
                      size="small"
                      onClick={() => this.buy(value)}
                      variant="contained"
                      color="primary"
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Store;
