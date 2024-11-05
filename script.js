const SHEET_ID = 'your_sheet_id';
const API_URL = `https://spreadsheets.google.com/feeds/cells/${SHEET_ID}/1/public/full?alt=json`;

async function fetchData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayData(data) {
    const tableBody = document.getElementById("price-table").querySelector("tbody");
    tableBody.innerHTML = '';

    // Отримуємо значення комірок
    const entries = data.feed.entry;
    const numColumns = 6; // кількість колонок у вашій таблиці
    for (let i = numColumns; i < entries.length; i += numColumns) {
        const row = document.createElement("tr");
        for (let j = 0; j < numColumns; j++) {
            const cell = document.createElement("td");
            cell.textContent = entries[i + j].gs$cell.$t;
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
}

fetchData();
