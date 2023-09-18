document.addEventListener("DOMContentLoaded", function () {
    const sketchContainer = document.getElementById("container");
    const resetButton = document.getElementById("reset-button");
    const colorPicker = document.getElementById("color-picker");
    const randomColorButton = document.getElementById("random-color-button");

    let interactions = 0; // Counter for tracking interactions
    let gridSize = 16; // Initial grid size
    let selectedColor = "random"; // Default color
    let isSketching = false; // To indicate is sketch is active
 
    // Generate the initial grid
    createGrid(gridSize);
    function createGrid(size) {
        sketchContainer.innerHTML = "";
        sketchContainer.style.setProperty("--grid-size", size);
        for (let i = 0; i < size * size; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            // Add event listener for hover effect
            square.addEventListener("mousedown", startSketching);
            square.addEventListener("mouseup", stopSketching);
            square.addEventListener("mouseover", handleSquareHover);
            sketchContainer.appendChild(square);
        }
    }

    function startSketching() {
        isSketching = true;
    }

    function stopSketching() {
        isSketching = false;
    }

    function handleSquareHover() {
        if (isSketching) {
            interactions++;
            let color;
            if (selectedColor === "random") {
                color = getRandomRGB(); // Generate a random color
            } else {
                color = selectedColor; // Use the selected color from the color picker
            }
            this.style.backgroundColor = color;
            const darkenedColor = darkenColor(color, interactions);
            this.style.backgroundColor = darkenedColor;
        }
    }

    // Reset button event listener
    resetButton.addEventListener("click", function () {
        const newSize = prompt("Enter a new grid size (1-100):");
        if (newSize !== null && newSize >= 1 && newSize <= 100) {
            gridSize = parseInt(newSize);
            createGrid(newSize); // Reset the grid with the new size
        } else {
            alert("Invalid grid size!");
        }
    });

    // Color picker event listener
    colorPicker.addEventListener("input", function () {
        selectedColor = colorPicker.value; // Updated the color when it changes
    });

    // Generate a random rgb color
    randomColorButton.addEventListener("click", function () {
        selectedColor = "random"; // Set selected color to random
    });
    function getRandomRGB() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Darken color based on the number of interactions
   function darkenColor(color, interactions) {
        const percent = interactions * 10;
        const darkenedColor = color.replace("rgb", "rgba").replace(")", `,${percent / 100}`);
        return darkenedColor;
    }
});