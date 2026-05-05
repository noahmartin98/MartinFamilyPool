async function loadTable() {
      try {
        const response = await fetch(sheetUrl);
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: function(results) {
            const data = results.data;
            const fields = results.meta.fields;

            const headerRow = document.getElementById('tableHeader');
            const tableBody = document.getElementById('tableBody');

            // 1. Clear placeholder/old loading content
            headerRow.innerHTML = '';
            tableBody.innerHTML = '';

            // 2. Build the Table Headers
            fields.forEach(field => {
              const th = document.createElement('th');
              th.textContent = field;
              headerRow.appendChild(th);
            });

            // 3. Build the Table Rows
            data.forEach(row => {
              const tr = document.createElement('tr');
              fields.forEach(field => {
                const td = document.createElement('td');
                td.textContent = row[field];
                tr.appendChild(td);
              });
              tableBody.appendChild(tr);
            });
          }
        });

      } catch (error) {
        console.error("Failed to load spreadsheet:", error);
        document.getElementById('tableBody').innerHTML = "<tr><td>Error loading data.</td></tr>";
      }
    }

async function loadTablePicks() {
      try {
        const response = await fetch(sheetUrl);
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: false, 
          skipEmptyLines: true,
          complete: function(results) {
              // Start from Row 5
              const allRows = results.data.slice(4); 
              
              const headerRow = document.getElementById('tableHeader');
              const tableBody = document.getElementById('tableBody');
              headerRow.innerHTML = '';
              tableBody.innerHTML = '';

              // 1. Set Headers (Row 5) and remove last 4 columns
              const headers = allRows[0].slice(0, -8);
              headers.forEach(h => {
                  const th = document.createElement('th');
                  th.textContent = h;
                  headerRow.appendChild(th);
              });

              // 2. Handle Data Rows
              // .slice(1, -6) takes everything after header, but stops 6 rows before the end
              const middleData = allRows.slice(1, -6); 
              
              // Grab the very last row
              const lastRow = allRows[allRows.length - 1];
              
              // Combine them: Middle data + the single last row
              const finalDataList = middleData.concat([lastRow]);

              // 3. Render to Table
              finalDataList.forEach((row, index) => {
                const tr = document.createElement('tr');

                // Check if this is the last row in the array
                if (index === finalDataList.length - 1) {
                    tr.classList.add('total-row');
                }

                const visibleCells = row.slice(0, -8);
                visibleCells.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
                });
            }
          });


      } catch (error) {
        console.error("Failed to load spreadsheet:", error);
        document.getElementById('tableBody').innerHTML = "<tr><td>Error loading data.</td></tr>";
      }
    }
