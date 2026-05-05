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
