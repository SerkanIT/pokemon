// Get poke list
const elPokemonsList = document.querySelector(".pokemons-list");

// Get Form element
const elPokeForm = document.querySelector(".poke__form");
const elSearchInput = document.querySelector(".input__search");
const elSelectCategory = document.querySelector(".category__select");
const elSelectSort = document.querySelector(".sort__select");
const elFromCandyCount = document.querySelector(".fromcandy__count-input");
const elToCandyCount = document.querySelector(".tocandy__count-input");

// Get BookmarkPoke 
const elBookmarkList = document.querySelector(".bookmark-list");
const elStartBtn = document.querySelector(".poke__btn-star");
const elPokeCount = document.querySelector(".count-pokemons");
const favoritePoke = []
const pokeOfcanavs = document.querySelector(".poke-count");

// Render pokemons star
function renderPoke(poke , regexMark = ""){
  elPokemonsList.innerHTML = "";
  const elFragment = document.createDocumentFragment();
  const elTemplate = document.querySelector(".poke__template").content;
  poke.forEach(item => {
    const elPokeclone = elTemplate.cloneNode(true);
    elPokeclone.querySelector(".poke__item");
    if (regexMark.source != "(?:)" && regexMark) {
      elPokeclone.querySelector(".poke__name").innerHTML = item.name.replace(regexMark,
        `<mark class="text-bg-info rounded">${regexMark.source.toLowerCase()}</mark>`);
      } else {
        elPokeclone.querySelector(".poke__name").textContent = item.name;
      }
      
      elPokeclone.querySelector(".poke__num").textContent = item.num;
      elPokeclone.querySelector(".poke__img").src = item.img;
      elPokeclone.querySelector(".poke__img").alt = item.name;
      elPokeclone.querySelector(".poke__type").textContent = item.type.join(" ");
      elPokeclone.querySelector(".poke__candy-count").textContent = `Candy count: ${item.candy_count}`;
      elPokeclone.querySelector(".poke__weigth").textContent = item.weight;
      // elPokeclone.querySelector(".poke__spawn-chance").textContent = item.avg_spawns;
      elPokeclone.querySelector(".poke__time").textContent = item.spawn_time;
      elPokeclone.querySelector(".poke__weknes").textContent = item.weaknesses.join(" ");
      elPokeclone.querySelector(".poke__btn-star").dataset.pokeId = item.id;
      
      elFragment.appendChild(elPokeclone);
    });
    elPokemonsList.appendChild(elFragment);
  }
  renderPoke(pokemons);
  // Render pokemons star
  
  // Category sort star 
  const weknesCategory = [];
  function selectOptionWeknes(){
    pokemons.forEach(item =>{
      item.weaknesses.forEach(element => {
        if(!weknesCategory.includes(element)){
          weknesCategory.push(element)
        }
      })
      weknesCategory.sort()
    })
  }
  selectOptionWeknes(pokemons)
  // Category sort finish
  
  // Render option star
  function renderOption(){
    const elFragment = document.createDocumentFragment();
    weknesCategory.forEach(item =>{
      const createOtion = document.createElement("option");
      createOtion.textContent = item;
      createOtion.value = item;
      elFragment.appendChild(createOtion);
    })
    elSelectCategory.appendChild(elFragment);
  }
  renderOption(weknesCategory)
  // Render option finish
  
  
  // Render sort name and weight start
  function sortPoke(item , sortValue){
    if(sortValue == "a-z"){
      item.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0)); 
    }else if (sortValue == "z-a"){
      item.sort((a,b)=> b.name.charCodeAt(0) - a.name.charCodeAt(0));
    }if(sortValue == "from"){
      item.sort((a, b) => a.weight.split(" ")[0] - b.weight.split(" ")[0]);
    }else if(sortValue == "to"){
      item.sort((a, b) => b.weight.split(" ")[0] - a.weight.split(" ")[0]);
    }
  }
  // Render sort name and weight finish
  
  
  //  Render bookmark star
  function addBookmark(bookmark, node) {
    elBookmarkList.innerHTML = "";
    elPokeCount.textContent = bookmark.length;
    pokeOfcanavs.textContent = bookmark.length;
    const elFragment = document.createDocumentFragment();
    const elTemplate = document.querySelector(".poke__template").content;
    bookmark.forEach((item) => {
      const elPokeclone = elTemplate.cloneNode(true);
      elPokeclone.querySelector(".poke__item");
      elPokeclone.querySelector(".poke__name").textContent = item.name;
      elPokeclone.querySelector(".poke__num").textContent = item.num;
      elPokeclone.querySelector(".poke__img").src = item.img;
      elPokeclone.querySelector(".poke__img").alt = item.name;
      elPokeclone.querySelector(".poke__type").textContent = item.type.join(" ");
      elPokeclone.querySelector(
        ".poke__candy-count"
        ).textContent = `Candy count: ${item.candy_count}`;
        elPokeclone.querySelector(".poke__weigth").textContent = item.weight;
        // elPokeclone.querySelector(".poke__spawn-chance").textContent = item.avg_spawns;
        elPokeclone.querySelector(".poke__time").textContent = item.spawn_time;
        elPokeclone.querySelector(".poke__weknes").textContent =
        item.weaknesses.join(" ");
        elPokeclone.querySelector(".poke__btn-star").dataset.pokeId = item.id;
        elPokeclone.querySelector(".js-delete-bookmark").dataset.deleteID =
        item.id;
        elPokeclone.querySelector(".poke__btn-star").classList.add("d-none");
        elPokeclone.querySelector(".js-delete-bookmark").classList.remove("d-none");
        elFragment.appendChild(elPokeclone);
        
      });
      node.appendChild(elFragment);
    }
    //  Render bookmark star
    
    
    
    // Listen event deligation for push poke start
    elPokemonsList.addEventListener("click", (evt) => {
      
      if (evt.target.matches(".poke__btn-star")) {
        
        const pokeBtn = Number(evt.target.dataset.pokeId);
        
        const pokeFindId = pokemons.find((item) => item.id == pokeBtn);
        
        const findDeleteBookmark = favoritePoke.findIndex(item => item.id == pokeBtn);
        
        
        if (!favoritePoke.includes(pokeFindId)) {
          
          evt.target.classList.add("favorited");
          favoritePoke.push(pokeFindId);
          addBookmark(favoritePoke, elBookmarkList);
          
          console.log(favoritePoke);
          
        } else if (evt.target.className == "btn poke__btn-star favorited") {
          
          evt.target.classList.remove("favorited");
          
          favoritePoke.splice(findDeleteBookmark, 1);
          
          addBookmark(favoritePoke, elBookmarkList);
          
          console.log(favoritePoke);
        }
      }
    });
    // Listen event deligation for push poke finish
    
    
    // Listen Bookmark event deligation for delete poke start
    elBookmarkList.addEventListener("click", (evt) => {
      if (evt.target.matches(".js-delete-bookmark")) {
        var deleteBookmark = evt.target.dataset.deleteID;
        const findDeleteBookmark = favoritePoke.findIndex((item) => {
          return item.id == deleteBookmark;
        });
        favoritePoke.splice(findDeleteBookmark, 1);
        addBookmark(favoritePoke, elBookmarkList);
      }
      const elFavoriteStar = document.querySelectorAll(".favorited");
      
      // const pokeFindId = pokemons.find((item) => item.id == deleteBookmark);
      
      
      if (pokeFindId) {
        elFavoriteStar.classList.remove("favorited");
        
        console.log(favoritePoke);
      }
    });
    // Listen Bookmark event deligation for delete poke start
    
    
    // Form listen for search and sort star
    elPokeForm.addEventListener("submit" , (evt) => {
      evt.preventDefault();
      const inputValue = elSearchInput.value;
      const sortValueSelect = elSelectSort.value.trim();
      const regexValue = new RegExp(inputValue, "gi");
      const searchPoke = pokemons.filter(item => {
        return (
          item.name.match(regexValue) &&
          (elSelectCategory.value == "all" ||
          item.weaknesses.includes(elSelectCategory.value)) &&
          (elFromCandyCount.value == "" ||
          Number(elFromCandyCount.value) <= item.candy_count) &&
          (elToCandyCount.value == "" ||
          Number(elToCandyCount.value) >= item.candy_count)
          );
        })
        if(searchPoke.length > 0){
          sortPoke(searchPoke,sortValueSelect);
          renderOption(pokemons)
          renderPoke(searchPoke, regexValue);
        }else{
          elPokemonsList.innerHTML = "not found poke"
        }
      })
      // Form listen for search and sort finish
      
      renderPoke(pokemons);
      
      
      
      
      