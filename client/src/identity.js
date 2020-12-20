// creat credential
export async function identity() {
  let identity = await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 5096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );

  return identity;
}
/*function importer() {
    const ff = await window.crypto.subtle.exportKey("jwk",(await identity).privateKey)
    //save to localStorage 
    localStorage.setItem("identity",JSON.stringify(ff))
    const hm =localStorage.getItem("identity")
    // import credential from json
    const fi = await window.crypto.subtle.importKey(
    "jwk",
    JSON.parse(hm), 
    {
        name: "RSA-OAEP",
        hash: "SHA-256",
        publicExponent: new Uint8Array([1, 0, 1]),
        modulusLength: 5096,
    }
    ,true
    ,["decrypt"]);
    console.log(fi)
}*/
