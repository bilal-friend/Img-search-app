// Project : Image Search App

const accessKey = "5oOmM9xjz0irL0PtDdR0tLdxPX3wWhJGpuncS4Yq5G4";
const form = document.forms[0];
const submitBtn = document.querySelector("button");
const input = document.querySelector("input");
const cardContent = document.querySelector(".cards-content");
const showMoreBtn = document.querySelector("section button");
const searchStatus = document.querySelector("h3");

let page = 1;

// search button styling
input.oninput = function () {
  if (input.value !== "") {
    submitBtn.classList.add("good-btn");
  }
};
input.onblur = function () {
  if (input.value === "") {
    submitBtn.classList.remove("good-btn");
  }
};
submitBtn.onclick = function (e) {
  if (!submitBtn.classList.contains("good-btn")) {
    e.preventDefault();
  }
};
//

form.onsubmit = function (e) {
  e.preventDefault();
  showMoreBtn.classList.remove("show");
  submitBtn.classList.remove("good-btn");
  cardContent.textContent = "";

  let search = input.value;
  // make input
  input.value = "";

  // create XML Request
  fetchImg(search);

  showMoreBtn.onclick = function () {
    ++page;
    fetchImg(search);
  };
};

// fetch function
function fetchImg(search) {
  const myRequest = new XMLHttpRequest();
  myRequest.open(
    "GET",
    `https://api.unsplash.com/search/photos?page=${page}&query=${search}&client_id=${accessKey}`
  );
  myRequest.send();

  myRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const myData = JSON.parse(this.responseText);
      if (!myData.results.length) {
        searchStatus.textContent = "No Result Found";
        return;
      } else {
        searchStatus.textContent = "Results For " + search;
        showMoreBtn.classList.add("show");
      }

      for (let i = 0; i < myData.results.length; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        let cardImg = document.createElement("img");
        card.appendChild(cardImg);
        cardImg.src = myData.results[i].urls.small;
        cardImg.alt = myData.results[i].alt_description;
        card.title = myData.results[i].alt_description;
        let div = document.createElement("div");
        let span = document.createElement("span");
        span.textContent = card.title;
        div.appendChild(span);
        card.appendChild(div);
        cardContent.appendChild(card);

        let downloadLink = document.createElement("a");
        downloadLink.href = myData.results[i].urls.small;
        downloadLink.setAttribute("download", "");
        let downloadImg = document.createElement("img");
        downloadImg.src = "imgs/icons8-download-24.png";
        downloadLink.appendChild(downloadImg);
        div.appendChild(downloadLink);

        card.onclick = function () {
          card.classList.toggle("showed");
        };
      }
    }
  };
}
