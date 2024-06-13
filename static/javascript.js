let parking_space_data = [];
let flag = 0;
// acuire data from mysql database
$(document).ready(function() {
    $('#recommend').click(function() {
        parking_space_data = [];
        $.getJSON('/get-data', function(data) {
            $('#dataContainer').empty();
            data.forEach(function(row) {
                parking_space_data.push(row);
            });
            checkEmptySpaces();
        });
    });

});

function checkEmptySpaces() {
    parking_space_data = [];
    $.getJSON('/get-data', function(data) {
        $('#dataContainer').empty();
        data.forEach(function(row) {
            parking_space_data.push(row);
        });
        console.log(parking_space_data);
        const emptySpaces = {
            '81': { x: 843, y: 540 }, 
            '82': { x: 843, y: 421 },
            '83': { x: 1095, y: 540 }, 
            '84': { x: 1095, y: 421 },
            '85': { x: 843, y: 210 }, 
            '86': { x: 843, y: 90 },
            '87': { x: 1095, y: 210 }, 
            '88': { x: 1095, y: 90 },
            '91': { x: 504, y: 90 }, 
            '92': { x: 504, y: 210 },
            '93': { x: 253, y: 90 }, 
            '94': { x: 253, y: 210 },
            '95': { x: 504, y: 421}, 
            '96': { x: 504, y: 545 },
            '97': { x: 253, y: 421 }, 
            '98': { x: 253, y: 545 },
        };

        flag = 0;
        flag = determineEmptySpaces(0, emptySpaces, flag);
        flag = determineEmptySpaces(2, emptySpaces, flag);
        flag = determineEmptySpaces(1, emptySpaces, flag);
        flag = determineEmptySpaces(3, emptySpaces, flag);
        flag = determineEmptySpaces(4, emptySpaces, flag);
        flag = determineEmptySpaces(6, emptySpaces, flag);
        flag = determineEmptySpaces(5, emptySpaces, flag);
        flag = determineEmptySpaces(7, emptySpaces, flag);
        flag = determineEmptySpaces(15, emptySpaces, flag);
        flag = determineEmptySpaces(13, emptySpaces, flag);
        flag = determineEmptySpaces(14, emptySpaces, flag);
        flag = determineEmptySpaces(12, emptySpaces, flag);
        flag = determineEmptySpaces(11, emptySpaces, flag);
        flag = determineEmptySpaces(9, emptySpaces, flag);
        flag = determineEmptySpaces(10, emptySpaces, flag);
        flag = determineEmptySpaces(8, emptySpaces, flag);
    }); 
}

function determineEmptySpaces(i, emptySpaces, flag) {
    if (parking_space_data[i][1] === 'empty') {
        if (flag === 0){
            highlightSpace_nearest(emptySpaces[parking_space_data[i][0]], parking_space_data[i][0]);
            flag = 1;
        }
        else{
            highlightSpace(emptySpaces[parking_space_data[i][0]], parking_space_data[i][0]);
        }
    }
    else{
        emptySpace(emptySpaces[parking_space_data[i][0]], parking_space_data[i][0]);
    }
    return flag;
}

function highlightSpace(coordinates, number) {
    // Get the highlight overlay element
    const overlay = document.getElementById('highlight-overlay'+number);
    const space_cross = document.getElementById('cross'+number);
  
    // Position the overlay on the empty space
    overlay.style.left = `${coordinates.x}px`;
    overlay.style.top = `${coordinates.y}px`;
    overlay.style.width = '155px';
    overlay.style.height = '95px';
    overlay.style.border = '5px solid #578bce';
  
    // Show the overlay
    overlay.style.display = 'block';
    space_cross.style.display = 'none';
  }

  function highlightSpace_nearest(coordinates, number) {
    // Get the highlight overlay element
    const overlay = document.getElementById('highlight-overlay'+number);
    const space_cross = document.getElementById('cross'+number);
  
    // Position the overlay on the empty space
    overlay.style.left = `${coordinates.x}px`;
    overlay.style.top = `${coordinates.y}px`;
    overlay.style.width = '155px';
    overlay.style.height = '95px';
    overlay.style.border = '5px solid #8edc70';
    // Show the overlay
    overlay.style.display = 'block';
    space_cross.style.display = 'none';
  }

  function emptySpace(coordinates, number) {
    // Get the highlight overlay element
    const overlay = document.getElementById('highlight-overlay'+number);
    const space_cross = document.getElementById('cross'+number);
    overlay.style.display = 'none';
    space_cross.style.display = 'block';
  }

  setInterval(checkEmptySpaces, 1000);

  