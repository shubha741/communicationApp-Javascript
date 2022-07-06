//Registration Array
let registerUser = new Array();

registerUser = JSON.parse(localStorage.getItem("registerUser"))
  ? JSON.parse(localStorage.getItem("registerUser"))
  : [];

// Login Array
let loginUser = new Array();

loginUser = JSON.parse(localStorage.getItem("loginUser"))
  ? JSON.parse(localStorage.getItem("loginUser"))
  : [];

//  Chat Page
let chatHistory = new Array();
chatHistory = JSON.parse(localStorage.getItem("chatHistory"))
  ? JSON.parse(localStorage.getItem("chatHistory"))
  : [];

//using As flag

let currentUser = new Array();

currentUser = JSON.parse(localStorage.getItem("currentUser"))
  ? JSON.parse(localStorage.getItem("currentUser"))
  : [];

// let files upload Array
let filesUpload = new Array();

filesUpload = JSON.parse(localStorage.getItem("filesUpload"))
  ? JSON.parse(localStorage.getItem("filesUpload"))
  : [];

// registration  Page



const registerHandler = () => {
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const atPos = email.indexOf("@");
  const dotPos = email.lastIndexOf(".");
  const password = document.getElementById("password").value;
  const Repassword = document.getElementById("Repassword").value;
  let id = Math.floor(Math.random() * 1000);

  if (fullName == "") {
    alert("please Enter you name");
    return false;
  } else if (atPos < 2) {
    alert("please Enter Proper Email ID");
    return false;
  } else if (dotPos - atPos < 3) {
    alert("please Enter Proper Email ID");
    return false;
  } else if (password == "") {
    alert("please Enter Password");
    return false;
  } else if (Repassword == "") {
    alert("please confirmed  Enter Password");
    return false;
  } else if (password != Repassword) {
    alert("Passwrod miss match");
    return false;
  } else if (
    registerUser.some((v) => {
      return v.email == email && v.fullName == fullName;
    })
  ) {
    alert("User Already Exists");
    return false;
  } else {
    registerUser.push({
      id,
      fullName,
      email,
      password,
    });

    localStorage.setItem("registerUser", JSON.stringify(registerUser));
  }
};

// login Page
const loginUserHandler = () => {
  let arrayData = new Array();

  arrayData = JSON.parse(localStorage.getItem("arrayData"))
    ? JSON.parse(localStorage.getItem("arrayData"))
    : [];

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email == "") {
    alert("please Enter you name");
    return false;
  } else if (password == "") {
    alert("please Enter Password");
    return false;
  } else if (
    registerUser.some((v) => {
      return v.email == email && v.password == password;
    })
  ) {
    alert("login pass");

    arrayData = registerUser.find((v) => {
      return v.email == email && v.password == password;
    });

    loginUser.push(arrayData);
    localStorage.setItem("loginUser", JSON.stringify(loginUser));
    localStorage.setItem("currentUser", true);
    window.location.href = "login-success.html";
  } else {
    alert("Incorrect Email or Password");
    return false;
  }
};


// window.onload =function()  {
//     if(currentUser  = ""){
//         window.location.href="../login.html"
//     }
// }












//login Sccussfull user Disaply

const displayUserName = () => {
    if(currentUser  = ""){
        window.location.href="../login.html"
    }
  document.getElementById("displayLoginEmail").innerHTML = `<b>Welcome!</b> ${loginUser[0].email}`;
};

//Logout fuction
const logOut = () => {
  localStorage.removeItem("loginUser");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("deletingUser");
  location.reload(true);

  window.location.href = "../logout.html";
};

// chat page Dispay

function chatPageHandler() {
 
    document.getElementById("displayName").innerHTML = loginUser[0].fullName;
    console.log(loginUser[0].fullName);
    let newTableChat = "";
    for (key in chatHistory) {
      newTableChat += `<tr><td>[ ${chatHistory[key].dateTime}]</td>
      <td> ${chatHistory[key].senderName} : </td> 
      <td> ${chatHistory[key].message}</td><tr>`;
    }

    document.getElementById("tableChat").innerHTML = newTableChat;

}

//chat typing fuction
const chatTypingHandler = () => {
  let chatID = Math.floor(Math.random() * 1000);

  let dateTime = new Date();
  let presentDay = dateTime.getDate();
  let presentMonth =
    dateTime.getMonth() < 10
      ? "0" + (dateTime.getMonth() + 1)
      : dateTime.getMonth();

  let presentYear = dateTime.getFullYear();
  let presentHour = dateTime.getHours();

  let presentMinutes =
    dateTime.getMinutes() < 10
      ? "0" + dateTime.getMinutes()
      : dateTime.getMinutes();
  let presentSeconds =
    dateTime.getSeconds() < 10
      ? "0" + dateTime.getSeconds()
      : dateTime.getSeconds();

  dateTime = `${presentYear}-${presentMonth}-${presentDay}  ${presentHour}:${presentMinutes}:${presentSeconds} `;
  let message = document.getElementById("typingBox").value;
  let senderName = loginUser[0].fullName;

  chatHistory.push({
    chatID,
    dateTime,
    message,
    senderName,
  });
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  typingBox.value = "";
  chatPageHandler();

};

//chat Refresger
const refreshChatHandler = () => {
  localStorage.removeItem("chatHistory");
  location.reload(true);
};

// register users Display

const displayRegisterList = () => {
 
    let onlineuser = "";
    for (key in registerUser) {
      let rid = registerUser[key].id;
      onlineuser += `<tr><td> ${registerUser[key].fullName}</td> <td> ${registerUser[key].email}</td>   <td> <a  onclick=EditRegister(${rid})>Edit </a>`;

      if (registerUser[key].id != loginUser[0].id) {
        onlineuser += `<a data-bs-toggle="modal" data-bs-target="#deleteModal" onclick=DeleteRegisterID(${rid})>Delete</a>`;
      } else {
        onlineuser += ` <button disabled>Delete</button></td></tr>`;
      }
    }

    document.getElementById("displayRegisterNames").innerHTML = onlineuser;

};

//storing deleting user id
const DeleteRegisterID = (rid) => {
  localStorage.setItem("deletingUser", rid);
};

//  Deleting Register users

const deleteRegister = () => {
  let rid = localStorage.getItem("deletingUser");

  let index;
  index = registerUser.findIndex((v) => {
    return v.id == rid;
  });
  registerUser.splice(index, 1);
  localStorage.setItem("registerUser", JSON.stringify(registerUser));
  displayRegisterList();
  localStorage.removeItem("deletingUser");
};

//Editing user id
const EditRegister = (rid) => {
  localStorage.setItem("EditingUser", rid);
  window.location.href = "edit-users.html";
};

//Edited user
const editFunction = () => {
  if (currentUser == "") {
    alert("U need  to  Login first");
    window.location.href = "../loginPages/login.html";
  } else {
    let rid = localStorage.getItem("EditingUser");
    let index = registerUser.findIndex((v) => {
      return v.id == rid;
    });

    document.getElementById("editUserName").value =
      registerUser[index].fullName;
    document.getElementById("editUserEmail").value = registerUser[index].email;
  }
};

//saving Edited user
const saveEditedUser = () => {
  let rid = localStorage.getItem("EditingUser");

  let index = registerUser.findIndex((v) => {
    return v.id == rid;
  });

  let loginindex = loginUser.findIndex((v) => {
    return v.id == rid;
  });

  let fullName = document.getElementById("editUserName").value;
  let email = document.getElementById("editUserEmail").value;
  const atPos = email.indexOf("@");
  const dotPos = email.lastIndexOf(".");

  if (fullName == "") {
    alert("Please Enter Name");
    return false;
  } else if (email == "") {
    alert("Please Enter Email");
    return false;
  } else if (atPos < 2) {
    alert("please Enter Proper Email ID");
    return false;
  } else if (dotPos - atPos < 3) {
    alert("please Enter Proper Email ID");
    return false;
  }

  if (loginindex == "") {
    registerUser[index].fullName = fullName;
    registerUser[index].email = email;
    loginUser[loginindex].fullName = fullName;
    loginUser[loginindex].email = email;
    localStorage.setItem("registerUser", JSON.stringify(registerUser));
    localStorage.setItem("loginUser", JSON.stringify(loginUser));
    window.location.href = "user-list.html";
  } else {
    registerUser[index].fullName = fullName;
    registerUser[index].email = email;
    localStorage.setItem("registerUser", JSON.stringify(registerUser));
    window.location.href = "user-list.html";
  }
  localStorage.removeItem("EditingUser");
};

// Files upload

let fileID = Math.floor(Math.random() * 10000);

let form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const reader = new FileReader();
  let fileDescription = document.getElementById("fileDescription").value;
  let fileName = document.getElementById("inputFileUpload").files[0].name;

  let fileID;
  fileID = Math.floor(Math.random() * 10000);
  reader.addEventListener("load", function () {
    if (this.result && localStorage) {
      if (fileDescription == "" && fileName == "") {
        alert("Input Was empty");
        return false;
      } else {
        let uploadedUserId;
        uploadedUserId = loginUser[0].id;

        filesUpload.push({
          fileID,
          fileDescription,
          fileName,
          uploadedUserId,
        });

        window.localStorage.setItem("filesUpload", JSON.stringify(filesUpload));
        document.getElementById("fileDescription").value = "";
        document.getElementById("inputFileUpload").files[0].name = " ";
        uploadPageHandler();
      }
    } else {
      alert("files Failed");
    }
  });

  reader.readAsDataURL(document.getElementById("inputFileUpload").files[0]);
});

//displaying login user fucnction
function uploadPageHandler() {
    let loginUserId = loginUser[0].id;
    let myupload = new Array();

    let uploadList = "<tr>";
    myupload = filesUpload.filter((v) => v.uploadedUserId == loginUserId);

    for (key in myupload) {
      let myFileId = myupload[key].fileID;

      uploadList += `<td>${myupload[key].fileDescription}</td>
        <td> ${myupload[key].fileName}</td>`;

      uploadList += `<td>  <a data-bs-toggle="modal" data-bs-target="#editUpload" onclick ="fileEditing(${myFileId})"> Edit </a> 
        <a data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="DeletingFileID(${myFileId})"> Delete </a>
         <a  onclick="fileShare(${myFileId})"> Share </a></td><tr>`;
    }

    uploadList += "</tr>";

    document.getElementById("uploadList").innerHTML = uploadList;
}

//Editing Files uploaded

const fileEditing = (myFileId) => {
  let idxFile = filesUpload.findIndex((v) => {
    return v.fileID == myFileId;
  });
  localStorage.setItem("EditingFileDec", myFileId);
  document.getElementById("EditingFileDec").value =
    filesUpload[idxFile].fileDescription;
};

//Save  Editwd Desc
const saveEditDesc = () => {
  let myFileId = localStorage.getItem("EditingFileDec");

  let idxFile = filesUpload.findIndex((v) => {
    return v.fileID == myFileId;
  });

  let fileDesc = document.getElementById("EditingFileDec").value;

  filesUpload[idxFile].fileDescription = fileDesc;

  localStorage.setItem("filesUpload", JSON.stringify(filesUpload));

  uploadPageHandler();
  localStorage.removeItem("EditingFileDec");
};

const EditCancel = () => {
  localStorage.removeItem("EditingFileDec");
};

const DeletingFileID = (rid) => {
  localStorage.setItem("DeletingFileID", rid);
};

//  Deleting Files users

const deletingFiles = () => {
  let rid = localStorage.getItem("DeletingFileID");

  let index;
  index = filesUpload.findIndex((v) => {
    return v.fileID == rid;
  });
  filesUpload.splice(index, 1);
  localStorage.setItem("filesUpload", JSON.stringify(filesUpload));
  uploadPageHandler();
  localStorage.removeItem("DeletingFileID");
};

const cancelDeleteFile = () => {
  localStorage.removeItem("DeletingFileID");
};

const cancelDeleteUser = () => {
  localStorage.removeItem("deletingUser");
};

const fileShare = (fileID) => {
  localStorage.setItem("shareFile", fileID);
  window.location.href = "share.html";
};


