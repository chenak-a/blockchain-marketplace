pragma solidity >=0.4.21 <0.7.0;
// change set only ipfs address , price, privecy -> rest meta data in ipfs
//
contract Mycontact {
  struct user{
    element[]  listin ;
  }
  struct element {
    string   name;
    string  object;
    string  type_object;
    string  publicadress;
    bool    privet;
    uint price;
  }
  address payable owner;
  address wallet;
  element[]newfile;
  mapping(address => user) userstructure;
  constructor( address payable _wallet) public {
    owner =  _wallet;
    wallet = msg.sender;
  }
  modifier onlyowner() {
    require ( wallet ==  msg.sender,"no user");
    _;
  }
  function addelement(string calldata _name,string calldata _object,string calldata _type_objebt,string calldata _publicadress,bool _privet,uint _price) external  onlyowner{
    
    userstructure[owner].listin.push(element(_name,_object,_type_objebt,_publicadress,_privet,_price));
  }
  function Vueelement(uint32 inp) external view   onlyowner returns(string memory, string  memory,string  memory,string  memory,bool  _privet,uint _price){
    return (userstructure[owner].listin[inp].name,userstructure[owner].listin[inp].object,userstructure[owner].listin[inp].type_object,userstructure[owner].listin[inp].publicadress,userstructure[owner].listin[inp].privet,userstructure[owner].listin[inp].price);
  }
 function update(uint32 inp,string calldata _name,string calldata _type_objebt,bool _privet,uint _price) external   onlyowner{
    userstructure[owner].listin[inp].name = _name;
    userstructure[owner].listin[inp].type_object = _type_objebt;
    userstructure[owner].listin[inp].privet = _privet;
    userstructure[owner].listin[inp].price = _price;

    }
  function length()external view   onlyowner returns
  (uint){
      return userstructure[owner].listin.length;
  }
  function owner1()public view returns(address){
    return owner;
  }

  
    function () external payable {
        
    }
    function widrow() external payable{
        owner.transfer(address(this).balance);
    }
  function getBalance() public view returns (uint) {
    return address(this).balance;
}
   
}
contract controler {
    bool public amin;
  mapping(address=>Mycontact) lista;
  struct elementin {
    Mycontact   seller;
    string   name;
    string  object;
    string  type_object;
    string  publicadress;
    bool    privet;
    uint price ;
    address[] buyers;
  }
    struct obj{
    string[]  listin ;
  }
  string[] public shop ;
  mapping(string => elementin) public container ;   
  mapping(string => string) public typeobj ;
 
  
  address public client ;
  constructor() public {
    client =  msg.sender;
    
  }

  function adds() external returns(Mycontact){
    Mycontact c = new Mycontact(msg.sender);
    lista[msg.sender] = c;
    Mycontact b = Mycontact(lista[msg.sender]);
    return (b) ;
  }
  
  function on() public view returns(address,Mycontact){
    return (msg.sender,lista[msg.sender]);
  }
  
   function onwner() public view returns(address){
    Mycontact b = Mycontact(lista[msg.sender]);
    return b.owner1();
  }
  
  function addelement(string calldata _name,string calldata _object,string calldata _type_objebt,string calldata _publicadress,bool _privet,uint _price) external  {
    Mycontact b = Mycontact(lista[msg.sender]);
    if(_privet==false){
        shop.push(_publicadress);
        container[_publicadress].buyers.push(msg.sender);
        container[_publicadress]= elementin(lista[msg.sender],_name,_object,_type_objebt,_publicadress,_privet,_price,  container[_publicadress].buyers);
        typeobj[_type_objebt] = _publicadress;
        b.addelement(_name,_object,_type_objebt,_publicadress,_privet,_price);
    }else {
         b.addelement(_name,_object,_type_objebt,_publicadress,_privet,_price);
    }
  }
  
  function length() external  view returns( uint){
    Mycontact b = Mycontact(lista[msg.sender]);
    return b.length();
  }
   function Vueelement(uint32 inp) external  view returns(string memory, string  memory,string  memory,string  memory,bool ,uint ){
    Mycontact b = Mycontact(lista[msg.sender]);
    return b.Vueelement(inp);
  }
  //add the rest element mb change privesie de false and you need to add
   function update(uint32 inp,string calldata _publicadress,string calldata _name,string calldata _type_objebt,bool _privet,uint _price) external  {
    Mycontact b = Mycontact(lista[msg.sender]);
     if(_privet==false){
        container[_publicadress].name = _name;
        container[_publicadress].type_object = _type_objebt;
        container[_publicadress].privet = _privet;
        container[_publicadress].price = _price;
        b.update( inp,_name,_type_objebt,_privet,_price);
     }else {
        b.update( inp,_name,_type_objebt,_privet,_price);
     }
  }

  function buy1 (string calldata _publicadress)payable external returns(bool) {
        if (msg.value == container[_publicadress].price ){
            address(container[_publicadress].seller).transfer(msg.value);
             Mycontact b = Mycontact(lista[msg.sender]);
             b.addelement(container[_publicadress].name,container[_publicadress].object,container[_publicadress].type_object,container[_publicadress].publicadress,true,0);
            return true;
        }else {
            revert("not enough money");
        }
    }

    function getBalance() external view returns(uint) {
    Mycontact b = Mycontact(lista[msg.sender]);
    return b.getBalance();
    }
    function window()external {
      Mycontact b = Mycontact(lista[msg.sender]);
      b.widrow();
    }
     function lengthshop()external view returns(uint){ 
      return shop.length ;
    }
}