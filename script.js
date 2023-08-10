document.addEventListener("DOMContentLoaded", function () {
    const sketchContainer = document.getElementById("container");
    const resetButton = document.getElementById("reset-button");
    //generate the initial grid
    function createGrid(size) {
        sketchContainer.innerHTML = "";
        sketchContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        sketchContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        for (let i = 0; i < size * size; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            let interactions = 0;
            //add event listener for hover effect
            square.addEventListener("mouseover", function () {
                interactions++;
                const randomColor = getRandomRGB();
                this.style.backgroundColor = randomColor;
                const darkenedColor = darkenedColor(randomColor, interactions);
                this.style.backgroundColor = darkenedColor;
            });
            sketchContainer.appendChild(square);
        }
    }
    createGrid(16); //initial grid size
    //reset button event listener
    resetButton.addEventListener("click", function () {
        const newSize = prompt("Enter a new grid size (1-100):");
        if (newSize !== null && newSize >= 1 && newSize <= 100) {
            createGrid(newSize);//convert string input into number
        } else {
            alert("Invalid grid size!");
        }
    });
    //generate a random rgb color
    function getRandomRGB() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
    //darken color based on the number of interactions
   function darkenedColor(color, interactions) {
        const percent = interactions * 10;
        const darkenedColor = color.replace("rgb", "rgba").replace(")", `,${percent / 100}`);
        return darkenedColor;
    }
});