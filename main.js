const kinoForm = document.querySelector("#form");
const kinoInput = document.querySelector("#input");
const kinoSort = document.querySelector("#select");
const kinoSort2 = document.querySelector("#select2");
const kinoBox = document.querySelector("#kinowrapper");

console.log(kinoForm, kinoInput, kinoSort, kinoSort2, kinoBox);

function renderMovies(kino) {
    kinoBox.innerHTML = "";
    kino.forEach(objectlar => {
        const newItem = document.createElement("li");
        newItem.className = "li";
        newItem.innerHTML = `
            <img class="img" src="kino.jpg">
            <h2>${objectlar.Title}</h2>
            <div class="ota">
                <span> ⭐${objectlar.imdb_rating}</span>                 <span> 📆 ${objectlar.movie_year}</span>         <span> 😛 ${objectlar.language}</span>
            </div>
            <p>${objectlar.Categories}</p>
            <button class="btn">More info</button>
        `;

        kinoBox.appendChild(newItem);
    });
}

renderMovies(movies);

kinoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputQiymati = kinoInput.value.toLowerCase();

    const filteredMovies = movies.filter(movie =>
        movie.Title && typeof movie.Title === "string" && movie.Title.toLowerCase().includes(inputQiymati)
    );

    renderMovies(filteredMovies);

    kinoInput.value = "";
});

kinoSort.addEventListener("change", (e) => {
    const selectedSort = e.target.value;

    const validMovies = movies.filter(movie => 
        movie.Title && typeof movie.Title === "string" &&
        movie.movie_year && typeof movie.movie_year !== "object" 
    );

    let sortedMovies = [...validMovies];

    if (selectedSort === "A-Z") {
        sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (selectedSort === "Z-A") {
        sortedMovies.sort((b, a) => a.Title.localeCompare(b.Title));
    } else if (selectedSort === "2018-2000") {
        sortedMovies.sort((a, b) => Number(b.movie_year) - Number(a.movie_year)); 
    } else if (selectedSort === "2000-2018") {
        sortedMovies.sort((a, b) => Number(a.movie_year) - Number(b.movie_year));
    }

    renderMovies(sortedMovies);
});
console.log(movies);

kinoSort2.addEventListener("change", (e) => {
    const selectedCategory = e.target.value;

    if (!selectedCategory || selectedCategory === "all") {
        renderMovies(movies);
        return;
    }

    const filteredMovies = movies.filter(movie => 
        typeof movie.Categories === "string" &&
        movie.Categories.split(",").some(cat => cat.trim().toLowerCase() === selectedCategory.toLowerCase())
    );

    renderMovies(filteredMovies);
});



