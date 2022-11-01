"use strict";
const offersContainer = document.getElementById("offersContainer");
const filtersContainer = document.getElementById("filtersContainer");
let allTags = [];
let jobs;
let activeFilters = [];
let activeTags = [];

class UI {
  static displayJobs(datas) {
    console.log(datas);
    if (datas === undefined || datas === null || datas.length === 0) {
      offersContainer.innerHTML = "<h3>No more job offers</h3>";
      console.log(datas);
    } else {
      offersContainer.innerHTML = jobs

        .filter((data) => {
          let newArr = [
            data.level,
            ...data.languages,
            data.role,
            ...data.tools,
          ];
          let tags = newArr;
          if (activeFilters.length >= 0) {
            console.log("test");
            console.log(activeFilters.toString());
            return tags.includes("JavaScript", "Frontend");
          } else {
            return true;
          }
        })
        .map((data) => {
          let newArr = [
            data.level,
            ...data.languages,
            data.role,
            ...data.tools,
          ];
          let tags = newArr
            .map((tag) => {
              return `<div class="tags" id="tag--job">${tag}</div>`;
            })
            .join("");
          return `<div class="offer" data-id="${data.id}">
                        <div class="offer__logo">
                            <img src="${data.logo}" alt="logo of the company" />
                        </div>
                        <div class="offer__company">
                            <h2 class="offer__company__name">${data.company}</h2>
                            <h5 class="offer__company__new" data-new="${data.new}">NEW!</h5>
                            <h5 class="offer__company__featured" data-featured="${data.featured}">FEATURED</h5>
                        </div>
                        <h4 class="offer__position">${data.position}</h4>
                        <div class="offer__infos">
                            <span class="offer__infos__time">${data.postedAt}</span>.
                            <span class="offer__infos__type--contract">${data.contract}</span>.
                            <span class="offer__infos__location">${data.location}</span>
                        </div>
                        <div class="offer__filters">
                            ${tags}
                        </div>
                    </div>
                `;
        })
        .join("");
    }
  }
  static createFilter() {}
  static displayFilters(array) {
    filtersContainer.innerHTML = array
      .map((el) => {
        return `<div data-filter-active="${el}"class="active--tags">${el}</div>`;
      })
      .join("");
  }
}

window.addEventListener("load", () => {
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => (jobs = data))
    .then(() => {
      UI.displayJobs(jobs);
      let allTags = document.querySelectorAll("#tag--job");
      allTags.forEach((tag) => {
        tag.addEventListener("click", (e) => {
          let content = e.target.textContent;
          activeFilters.push(content);
          activeFilters = [...new Set(activeFilters)];
          UI.displayFilters(activeFilters);
          console.log(activeFilters.toString());
          let activeTags = document.querySelectorAll(".active--tags");
          activeTags.forEach((tag) => {
            tag.addEventListener("click", (e) => {});
          });
        });
      });
    });
});
