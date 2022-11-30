let population = [
  {
    nom: "Denis",
    age: "30",
    taille: "Grand",
    corpulence: "Gros",
  },
  {
    nom: "Fabienne",
    age: "52",
    taille: "Petit",
    corpulence: "Mince",
  },
  {
    nom: "Eleonor",
    age: "20",
    taille: "Grand",
    corpulence: "Normal",
  },
  {
    nom: "Alexandre",
    age: "24",
    taille: "Moyen",
    corpulence: "Athlétique",
  },
];

let { nom } = ["Denis", "Fabienne", "Eleonor", "Alexandre"];

let filtre = ["Petit", "Gros"];
let tousLesValeurs = ["Petit", "Gros", "Moyen", "Grand"];
const tableau = document.getElementById("tableau");

tableau.innerHTML = population
  .map((personne) => {
    let adj = [personne.corpulence, personne.taille];
    return ` <div class="carte">
                <div>${personne.nom}</div>
                <div>${personne.age}</div>
                <div>Tags</div>
                <div class="container__adjectif">${adj
                  .map((el) => {
                    return `
                    <div class="adjectif">${el}</div>
                    `;
                  })
                  .join("")}</div>
            </div>
    `;
  })
  .join("");

// console.log(population);
// let newArr = population.filter((el) => {
//   let adj = [el.corpulence, el.taille];
//   return adj.includes("Gros");
// });
// console.log(newArr);

// let newArr = population.filter((el) => {
//   let adj = [el.corpulence, el.taille];
//   return adj.includes("Moyen" && "Gros");
// });

// console.log(newArr);

var array = [
  { id: 1, name: "test1" },
  { id: 2, name: "test2" },
  { id: 3, name: "test3" },
  { id: 4, name: "test4" },
];

var anotherOne = [
  { id: 2, name: "test2" },
  { id: 4, name: "test4" },
];

var filteredArray = array.filter(function (array_el) {
  return (
    anotherOne.filter(function (anotherOne_el) {
      return anotherOne_el.id == array_el.id;
    }).length == 0
  );
});
console.log(filteredArray);

let newArr = population.filter((el) => {
  let adj = [el.corpulence, el.taille];
  console.log(adj);
  console.log(filtre);
  return adj.every((el) => {});
});

console.log(newArr);


//----------------------------------------



const wrapper = document.getElementById('wrapper');
const queriesWrapper = document.getElementById('queries-wrapper');
const clearQueriesBtn = document.getElementById('clear-queries-button');
 
 
let jobListings = [];  
fetch("data.json") 
.then(resp => {
    return resp.json() 
}).then(data => {
    jobListings = data.map(listing => {
       const job = document.createElement('div');
       job.classList.add('job-listing'); 
       job.innerHTML = `<div class="main-info">
                            <img class="company-logo" src="${listing.logo}" alt="${listing.company} logo">
                            <div class="company-and-job-status">
                              <p class="company">${listing.company}</p>
                            </div>
                            <p class="position">${listing.position}</p>
                            <div class="job-details"> 
                              <p class="time-posted">${listing.postedAt}</p>
                              <p class="contract">${listing.contract}</p> 
                              <p class="location">${listing.location}</p>
                            </div>
                        </div>
                        <div class="tags"></div>`;  
 
        if(listing.role) {
            const roleElement = document.createElement('p');
            roleElement.classList.add('tag'); 
            roleElement.innerText = listing.role;
            job.lastElementChild.appendChild(roleElement) 
        }
        if(listing.level) {
            const levelElement = document.createElement('p');
            levelElement.classList.add('tag');
            levelElement.innerText = listing.level;
            job.lastElementChild.appendChild(levelElement) 
        }
        listing.languages.forEach(language => { 
             const languageElement = document.createElement('p');
             languageElement.classList.add('tag'); 
             languageElement.innerText = language;
             job.lastElementChild.appendChild(languageElement); 
        }) 
        listing.tools.forEach(tool => { 
             const toolElement = document.createElement('p');
             toolElement.classList.add('tag');  
             toolElement.innerText = tool; 
             job.lastElementChild.appendChild(toolElement); 
        })  
        if(listing.new) {
            const newTag = document.createElement('p');
            newTag.classList.add('new-tag')
            newTag.innerText = 'new!';  
            job.firstElementChild.children[1].append(newTag); 
        }  
        if(listing.featured) { 
            const featuredTag = document.createElement('p');
            featuredTag.classList.add('featured-tag')
            featuredTag.innerText = 'featured'; 
            job.classList.add('featured')
            job.firstElementChild.children[1].append(featuredTag);  
        }
        wrapper.append(job); 
        return {keywords: [listing.role,listing.level,...listing.languages,...listing.tools], element: job} 
    });    
}); 

function hideListings() { 
    jobListings.forEach(jobListing => {  
        let isVisible = value.every(query => {
            return jobListing.keywords.includes(query);
        })  
        jobListing.element.classList.toggle('hidden-listing', !isVisible);   
    }) 
}




let value = [];  
function filter(e) {   
    if(value.includes(e.target.innerText)) { 
        return;  
    }
    value.push(e.target.innerText);   
    hideListings();     
    const query = document.createElement('p');
    const removeQueryBtn = document.createElement('button');
    removeQueryBtn.innerHTML = `<img src="images/icon-remove.svg" alt=""></img>`;
    removeQueryBtn.classList.add('remove-query-button');
    query.classList.add('query');
    query.innerText = e.target.innerText; 
    query.appendChild(removeQueryBtn) 
    queriesWrapper.appendChild(query);   
    removeQueryBtn.addEventListener('click', () => {
           removeQueryBtn.parentElement.remove(); 
           value.splice(value.indexOf(removeQueryBtn.previousSibling.textContent),1);
           hideListings(); 
    })   
} 
setTimeout(() => { 
    tags = document.querySelectorAll('.tag'); 
    tags.forEach(tag => {
        tag.addEventListener('click', filter);
    }) 
},300)        


clearQueriesBtn.addEventListener('click', () => {
    jobListings.forEach(jobListing => {
        jobListing.element.classList.remove('hidden-listing'); 
    }) 
    queriesWrapper.innerHTML = '';  
    value = []; 
}) 
