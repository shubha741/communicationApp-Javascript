//Registration Array
let registerUser = new Array();

registerUser = JSON.parse(localStorage.getItem("registerUser"))
  ? JSON.parse(localStorage.getItem("registerUser"))
  : [];
// file Array
let filesUpload = new Array();

filesUpload = JSON.parse(localStorage.getItem("filesUpload"))
  ? JSON.parse(localStorage.getItem("filesUpload"))
  : [];

const fetchFileDetails = () => {
  let sharedFileID = localStorage.getItem("shareFile");

  let sharedFileName = filesUpload.filter((v) => {
    return v.fileID == sharedFileID;
  });

  document.getElementById("SharedFileName").innerHTML =
    sharedFileName[0].fileName;

  let options;
  options = registerUser.map((item) => {
    return item.fullName;
  });

  let select = document.getElementById("selectUser");
  // let options = userList

  for (let i = 0; i < options.length; i++) {
    let opt = options[i];
    let el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }


  return options
};

// const addToUser = (options) => {
//   let sharedFileID = localStorage.getItem("shareFile");

//      fileIndex = filesUpload.filter((v) => {
//     return v.fileID == sharedFileID;
//   });
// }

// let sharedTo =  [];

// sharedTo.push(options)

// filesUpload[fileIndex].shareTo