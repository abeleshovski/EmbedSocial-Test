let refresh = 0;
let loaded = 4;

function truncate(str, n) {
  return str?.length > n ? str.substring(0, n - 1) + "..." : str;
}

const showUsers = (refresh, loaded) => {
  fetch("data.json", {
    headers: {
      "Access-Control-Allow-Origin": "body",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      let info = data.slice(refresh, loaded);
      console.log(info);
      appendData(info);
    })
    .catch((err) => console.log(err));
};

const appendData = (data) => {
  const body = document.getElementById("wrapper");
  const root = document.getElementById("root");
  for (let i = 0; i < data.length; i++) {
    let div = document.createElement("div");
    div.className = "cards";

    const userInfo = document.createElement("div");
    userInfo.className = "userInfo";
    div.appendChild(userInfo);

    let profilePic = document.createElement("img");
    profilePic.src = data[i].profile_image;
    profilePic.className = "profilePic";
    div.appendChild(profilePic);

    let name = document.createElement("h4");
    name.innerHTML = data[i].name;
    name.className = "name";
    userInfo.appendChild(name);

    const instagram = document.createElement("img");
    instagram.className = "instagram";
    instagram.src = "./icons/instagram-logo.svg";

    div.appendChild(instagram);

    const date = document.createElement("p");
    let msec = Date.parse(data[i].date);
    const parsedDate = new Date(msec);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    date.innerHTML = parsedDate.toLocaleString("en-US", options);
    date.className = "date";
    userInfo.appendChild(date);

    div.append(userInfo);

    let image = document.createElement("img");
    image.className = "postImage";
    image.src = data[i].image;
    div.appendChild(image);

    let caption = document.createElement("p");
    caption.innerHTML = truncate(data[i].caption, 240);
    caption.className = "caption";
    div.appendChild(caption);

    const bottomRow = document.createElement("div");
    bottomRow.className = "bottomRow";

    const heart = document.createElement("img");
    heart.className = "heart";
    heart.src = "./icons/heart.svg";
    bottomRow.appendChild(heart);

    const likes = document.createElement("p");
    likes.innerHTML = data[i].likes;
    likes.className = "likes";
    bottomRow.appendChild(likes);

    div.appendChild(bottomRow);

    div.addEventListener("click", () => {
      body.className = "darken";
      document.querySelector("*").style.background = "gray";
      const focus = document.createElement("div");
      const focusImage = image.cloneNode(true);
      focus.id = "focus";
      focusImage.id = "focusImage";
      focus.appendChild(focusImage);

      const innerDiv = document.createElement("div");
      innerDiv.id = "innerDiv";
      focus.appendChild(innerDiv);

      const focusProfilePic = profilePic.cloneNode(true);
      focusProfilePic.id = "focusProfilePic";
      innerDiv.appendChild(focusProfilePic);

      const focusUserInfo = userInfo.cloneNode(true);
      focusUserInfo.id = "focusUserInfo";

      innerDiv.appendChild(focusUserInfo);

      const focusCaption = caption.cloneNode(true);
      focusCaption.id = "focusCaption";
      innerDiv.appendChild(focusCaption);

      const focusBottomRow = bottomRow.cloneNode(true);
      focusBottomRow.id = "focusBottomRow";
      innerDiv.appendChild(focusBottomRow);

      const front = document.getElementById("container");

      const removal = focus;

      removal.addEventListener("click", () => {
        document.getElementById("focus").remove();
        document.querySelector("*").style.background = "white";
        body.className = "";
      });

      front.appendChild(focus);
    });

    root.appendChild(div);
  }
  console.log(root);
};

let button = document.getElementById("showMore");

button.onclick = (e) => {
  e.preventDefault();
  loaded += 4;
  refresh += 4;
  showUsers(refresh, loaded);
};

console.log(button);

showUsers(refresh, loaded);
