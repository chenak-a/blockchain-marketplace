import React, { Component, PureComponent, Suspense } from "react";
import controler from "./contracts/controler.json";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
import getWeb3 from "./getWeb3";
import img from "./images/but/img.jpg";
import pw from "./images/but/pw.png";
import cd from "./images/but/cd.jpg";
import ex from "./images/but/ex.jpg";
import pd from "./images/but/pd.jpg";
import vid from "./images/but/vid.jpg";
import wd from "./images/but/wd.jpg";
import copy from "./images/but/copy1.png";
import {
  Typography,
  List,
  message,
  Input,
  Spin,
  Drawer,
  Radio,
  Space,
} from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { withSnackbar } from "notistack";
import { Button } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { AudioOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import ehter from "./images/ether1.png";
import ipfs from "./ipfs";
import Nav from "./nav";
import store from "./sto";
import { identity } from "./identity";
import { Link } from "react-router-dom";
import "./Home.css";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      addresscontract: "",
      balance: 0,
      element: {
        nickname: "",
        name: "",
        ipfsh: "",
        type: "",
        privacy: false,
        price: 0,
      },
      lopping: 300,
      loading: false,
      hasMore: true,
      ipfsh: "",
      buffer: null,
      listelement: [],
      listsearch: [],
      elements: { value: "", key: 0 },
      newValuelistlenght: 0,
      Valuelistlenght: 0,
      web3: null,
      accounts: null,
      contract: null,
      visible: false,
      placement: "bottom",
    };
    this.capturefile = this.capturefile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.textchange = this.textchange.bind(this);
    this.privacyoptions = this.privacyoptions.bind(this);
    this.pricein = this.pricein.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.Search = this.Search.bind(this);
  }

  async main() {
    const { accounts, contract } = this.state;
    await contract.methods
      .getBalance()
      .call({ from: accounts[0] })
      .then((result) =>
        this.setState({
          balance: result,
        })
      );
    await contract.methods
      .on()
      .call({ from: accounts[0] })
      .then((result) =>
        this.setState({
          addresscontract: result[1],
        })
      );
    console.log(this.state.addresscontract);
    //get lenght of array
    contract.methods
      .length()
      .call({ from: accounts[0] })
      .then((result) =>
        this.setState({
          Valuelistlenght: result,
        })
      );

    this.setState({ newValuelistlenght: this.state.Valuelistlenght });
    //get element
    if (this.state.Valuelistlenght == 0) {
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
              listsearch: this.state.listsearch.concat({
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
    const interval = setInterval(() => {
      contract.methods
        .getBalance()
        .call({ from: accounts[0] })
        .then((result) =>
          this.setState({
            balance: result,
          })
        );
      contract.methods
        .length()
        .call({ from: accounts[0] })
        .then((result) =>
          this.setState({
            newValuelistlenght: result,
          })
        );

      if (this.state.newValuelistlenght - this.state.Valuelistlenght !== 0) {
        for (
          var i = this.state.Valuelistlenght;
          i <= this.state.newValuelistlenght;
          i++
        ) {
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
                  privacy: String(result[4]),
                  price: result[5],
                }),
                listsearch: this.state.listsearch.concat({
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
        this.setState({ Valuelistlenght: this.state.newValuelistlenght });
      } else {
        console.log(this.state.listelement.length);
        console.log(store.getState().list.length);
        if (
          store.getState().list.length !== this.state.listelement.length &&
          store.getState().list.length > this.state.listelement.length
        ) {
          for (var i = 0; i < this.state.listelement.length; i++) {
            store.dispatch({
              type: "contain",
              payload: {
                lit: this.state.listelement[i],
              },
            });
          }
        } else {
          console.log("true");
        }
      }
    }, this.state.lopping);
    this.componentWillUnmount = async () => {
      clearInterval(interval);
      this.unsubscribe();
      this.main();
    };
  }

  UNSAFE_componentWillMount = async () => {
    try {
      this.setState({
        contract: store.getState().mainpkg[0].contract,
        accounts: store.getState().mainpkg[0].account,
        web3: store.getState().mainpkg[0].web3,
      });
      console.log("k", await store.getState().mainpkg[0].contract);
      this.main();
    } catch (err) {
      console.log(err);
    }
  };

  unsubscribe = store.subscribe(async () => {
    this.setState({
      contract: store.getState().mainpkg[0].contract,
      accounts: store.getState().mainpkg[0].account,
      web3: store.getState().mainpkg[0].web3,
    });
    this.main();
  });

  async capturefile(event) {
    event.preventDefault();
    const file = event.target.files[0];

    this.setState({
      element: {
        name: event.target.files[0].name,
        type: event.target.files[0].type,
        nickname: this.state.element.nickname,
        privacy: this.state.element.privacy,
        price: this.state.element.price,
      },
    });
    console.log(this.state.element.privacy);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("weq", this.state.buffer);
    };
  }
  async onSubmit(event) {
    event.preventDefault();
    const { accounts, contract } = this.state;

    const identitye = await window.crypto.subtle.exportKey(
      "jwk",
      (await identity()).publicKey
    );

    ipfs.files.add(this.state.buffer, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({ ipfsh: result[0].hash });
      this.setState({
        element: {
          name: this.state.element.name,
          type: this.state.element.type,
          nickname: this.state.element.nickname,
          privacy: this.state.element.privacy,
          price: this.state.element.price,
        },
      });

      contract.methods
        .addelement(
          this.state.element.nickname,
          this.state.ipfsh,
          this.state.element.type,
          JSON.stringify(identitye),
          this.state.element.privacy,
          this.state.element.price
        )
        .send({ from: accounts[0], gasLimit: 3515355 });
      //, gasLimit:3515355
      this.setState({ buffer: null, ipfsh: "" });
      try {
        document.getElementById("fl").reset();
      } catch (err) {
        console.log(err);
      }
    });
  }

  async textchange(event) {
    event.preventDefault();
    this.setState({
      element: {
        nickname: event.target.value,
        name: this.state.element.name,
        type: this.state.element.type,
        privacy: this.state.element.privacy,
        price: this.state.element.price,
      },
    });
  }
  async privacyoptions(event) {
    event.preventDefault();
    var boolin;
    if ((event.target.value = "true")) {
      boolin = true;
    } else {
      boolin = false;
    }
    this.setState({
      element: {
        privacy: boolin,
        name: this.state.element.name,
        type: this.state.element.type,
        nickname: this.state.element.nickname,
        price: this.state.element.price,
      },
    });
  }
  async pricein(event) {
    event.preventDefault();
    this.setState({
      element: {
        price: event.target.value,
        privacy: this.state.element.privacy,
        name: this.state.element.name,
        type: this.state.element.type,
        nickname: this.state.element.nickname,
      },
    });
  }

  async withdraw(event) {
    const { accounts, contract } = this.state;
    contract.methods
      .window()
      .send({ from: accounts[0] })
      .then(() =>
        this.props.enqueueSnackbar("Successfully sent", {
          variant: "success",
        })
      )
      .catch(() =>
        this.props.enqueueSnackbar("Failed", {
          variant: "error",
        })
      );

    console.log("withdraw");
  }
  typeimageadd = (e) => {
    if (e.value.type == "image/jpeg" || e.value.type == "image/png") {
      return <img src={img}></img>;
    } else if (
      e.value.type ==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return <img src={wd}></img>;
    } else if (
      e.value.type ==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return <img src={ex}></img>;
    } else if (
      e.value.type == "text/javascript" ||
      e.value.type == "text/css"
    ) {
      return <img src={cd}></img>;
    } else if (e.value.type == "application/pdf") {
      return <img src={pw}></img>;
    } else {
      return <p></p>;
    }
  };
  handleInfiniteOnLoad = () => {
    let { listsearch } = this.state;

    this.setState({
      loading: true,
    });
    if (listsearch.length > 14) {
      message.warning("Infinite List loaded all");
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    try {
      this.fetchData((res) => {
        listsearch = listsearch.concat(res.results);
        this.setState({
          listsearch,
          loading: false,
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  Search = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    let { listsearch, listelement } = this.state;
    listsearch = listelement;
    var li = [];
    if (event.target.value !== "") {
      for (var i = 0; i < listsearch.length; i++) {
        if (
          event.target.value ===
          listsearch[i].name.slice(0, event.target.value.length)
        ) {
          console.log(listsearch[i]);
          li.push(listsearch[i]);
        }
      }
      this.setState({
        listsearch: li,
      });
    } else {
      this.setState({
        listsearch: listelement,
      });
    }
  };
  showDrawer = () => {
    this.setState({
      visible: true,
      lopping: 50000,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
      lopping: 300,
    });
  };
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    console.log(this.state.listsearch);
    var QRCode = require("qrcode.react");
    const { Text } = Typography;
    const { Search } = Input;
    const { placement, visible } = this.state;
    return (
      <div className="Home" id="Home">
        <Nav />
        <div className="profil1e" id="profil1e">
          <div className="addresscontract" id="addresscontract">
            <QRCode
              className="qr"
              id="qr"
              value={this.state.addresscontract}
            ></QRCode>
            <div className="info1" id="info1">
              <div className="id1" id="id1" ref={this.state.addresscontract}>
                Your Address{" : "}
                <Text
                  copyable={{
                    icon: (
                      <img
                        width="auto"
                        height="20hv"
                        margin-top="200px"
                        src={copy}
                      ></img>
                    ),
                    text: this.state.addresscontract,
                  }}
                >
                  {this.state.addresscontract.substr(0, 15)}
                </Text>
              </div>
              <div>
                <div>Your balance </div>
                <div>{this.state.balance}</div>
                <Button
                  size="small"
                  onClick={this.withdraw}
                  variant="contained"
                  color="primary"
                >
                  withdraw
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="contenant" id="contenant">
          <div>
            <Fab
              className="add"
              color="primary"
              aria-label="add"
              onClick={this.showDrawer}
            >
              <AddIcon />
            </Fab>
            <div className="infinite-container">
              <div className="search">
                <Search
                  className="SE"
                  placeholder="Search"
                  onChange={this.Search}
                  style={{ width: 500 }}
                />
              </div>
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={this.handleInfiniteOnLoad}
                hasMore={!this.state.loading && this.state.hasMore}
                useWindow={false}
              >
                <List
                  dataSource={this.state.listsearch}
                  renderItem={(item) => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        className="itemname"
                        avatar={<this.typeimageadd value={item} />}
                        title={<Link to={`/${item.ipfsh}`}>{item.name}</Link>}
                        description={item.type}
                      />
                      <List.Item.Meta
                        title={
                          <a>
                            Price{" "}
                            <img
                              wight="20px"
                              height="20px"
                              bottom="100%"
                              src={ehter}
                            ></img>
                          </a>
                        }
                        description={<a>{item.price} </a>}
                      />
                      <List.Item.Meta
                        className="itemprivet"
                        description={String(item.privacy)}
                        title={<a>privet</a>}
                      />
                    </List.Item>
                  )}
                >
                  {this.state.loading && this.state.hasMore && (
                    <div className="loading-container">
                      <Spin size="large" />
                    </div>
                  )}
                </List>
              </InfiniteScroll>
            </div>
          </div>
          <Drawer
            title="Add file"
            placement={placement}
            closable={false}
            onClose={this.onClose}
            visible={visible}
            key={placement}
          >
            <div className="addfile" id="addfile">
              <form id="fl" onSubmit={this.onSubmit}>
                <form id="fl" noValidate autoComplete="off">
                  <TextField
                    id="standard-basic"
                    label="name"
                    type="text"
                    onChange={this.textchange}
                  />
                </form>
                <FormControl fullWidth variant="outlined">
                  <InputLabel
                    className="price"
                    id="price"
                    htmlFor="outlined-adornment-amount"
                  >
                    Amount
                  </InputLabel>
                  <OutlinedInput
                    className="price"
                    id="price"
                    id="outlined-adornment-amount"
                    onChange={this.pricein}
                    startAdornment={
                      <InputAdornment position="start">
                        {" "}
                        <img
                          wight="20px"
                          height="20px"
                          bottom="100%"
                          src={ehter}
                        ></img>
                      </InputAdornment>
                    }
                    labelWidth={60}
                  />
                </FormControl>

                <input type="file" onChange={this.capturefile} />
                <select>
                  <option onChange={this.privacyoptions} value="false">
                    public
                  </option>
                  <option onChange={this.privacyoptions} value="true">
                    privet
                  </option>
                </select>
                <input type="submit" />
              </form>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default withSnackbar(Home);
