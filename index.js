"use strict";
const offersContainer = document.getElementById("offersContainer");
const filtersContainer = document.getElementById("filtersContainer");

let allTags = [];
let jobs;
let activeFilters = [];
let activeTags = [];
let condition;

async function getJobs() {
  await fetch("data.json")
    .then((res) => res.json())
    .then((data) => (jobs = data))
    .then(() => UI.displayJobs(jobs));
}

class UI {
  static displayJobs(datas) {
    if (datas === undefined || datas === null || datas.length === 0) {
      offersContainer.innerHTML = "<h3>No more job offers</h3>";
    } else {
      offersContainer.innerHTML = datas
        .map((data) => {
          let newArr = [
            data.level,
            ...data.languages,
            data.role,
            ...data.tools,
          ];
          let tags = newArr
            .map((tag) => {
              return `<div class="offer__filters__tag" id="tag--job" data-job="${tag}">${tag}</div>`;
            })
            .join("");
          return `<div class="offer" data-active="active" data-id="${data.id}" data-featured="${data.featured}">
                        <div class="offer__logo">
                            <img src="${data.logo}" alt="logo of the company" />
                        </div>
                        <div class="offer__company">
                            <h2 class="offer__company__name">${data.company}</h2>
                            <h5 class="offer__company__new" data-new="${data.new}">NEW!</h5>
                            <h5 class="offer__company__featured" data-featured="${data.featured}">FEATURED</h5>
                        </div>
                        <h4 class="offer__position">${data.position}</h4>
                        <ul class="offer__infos">
                            <li class="offer__infos__time">${data.postedAt}</li> 
                            <li class="offer__infos__type--contract">${data.contract}</li> 
                            <li class="offer__infos__location">${data.location}</li>
                        </ul>
                        <div class="offer__filters">
                            ${tags}
                        </div>
                    </div>
                `;
        })
        .join("");
    }
  }
  static displayJobAfterFiltering(domArray) {
    for (let i = 0; i < domArray.length; i++) {
      let keywords = [];
      let offerFilters = domArray[i].children[4];

      for (let j = 0; j < offerFilters.children.length; j++) {
        let keyword = offerFilters.children[j].dataset.job;
        keywords.push(keyword);
      }
      activeTags.forEach((tag) => {
        if (!keywords.includes(tag)) {
          domArray[i].dataset.active = false;
        }
      });
    }
  }
  static generateTags(array) {
    filtersContainer.innerHTML = array
      .map((tag) => {
        return `
      <div class="active--tag data-tag="${tag}">
        <div class="active--tag__name">${tag}</div>
        <button class="active--tag__btn"  data-closed-btn="${tag}">
          <img src="./images/icon-remove.svg" data-closed-btn="${tag}" id="closedBtn" alt="remove filter"/>
        </button>
      </div>
    `;
      })
      .join("");
  }
  static eventOnClick(e) {
    // note for later maybe use switch instead
    if (e.target.id === "tag--job") {
      e.target.setAttribute(
        "data-state",
        e.target.getAttribute("data-state") === "active"
          ? "isnotactive"
          : "active"
      );
      activeTags.push(e.target.textContent);
      activeTags = [...new Set(activeTags)];
    }
    if (e.target.id === "closedBtn") {
      let tagToDel = e.target.dataset.closedBtn;
      for (let i = 0; i < activeTags.length; i++) {
        if (activeTags[i] === tagToDel) {
          activeTags.splice(i, 1);
        }
      }
    }
    if (e.target.id === "clearTags") {
      activeTags = [];
    }
  }
}

window.addEventListener("load", () => {
  getJobs();
});

window.addEventListener("click", (e) => {
  UI.eventOnClick(e);
  UI.generateTags(activeTags);
  UI.displayJobs(jobs);
  const offers = document.querySelectorAll(".offer");
  UI.displayJobAfterFiltering(offers);

  const filterTags = document.querySelectorAll(".offer__filters__tag");

  filterTags.forEach((filterTag) => {
    activeTags.forEach((activeTag) => {
      if (activeTag === filterTag.dataset.job) {
        filterTag.setAttribute("data-state", "active");
      } else {
        filterTag.setAttribute("data-state", "isnotactive");
      }
    });
  });
});
