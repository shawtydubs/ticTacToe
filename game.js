var gameOver = false;

var playerToken = 'X';
var computerToken = 'O';

var rows = [
    'top',
    'middle',
    'bottom',
    'left',
    'center',
    'right',
    'diag-one',
    'diag-two'
]

$('.square').click(function() {
    $(this).addClass('taken').addClass('player');
    $(this).append(playerToken);
    checkFinished();
    if (!gameOver) computerTurn();
});

function computerTurn() {
    var openSquares = $('.square').filter(':not(.taken)');
    var selectedSquare = openSquares[Math.floor(Math.random() * openSquares.length)];
    $(selectedSquare).addClass('taken').addClass('computer');
    $(selectedSquare).append(computerToken);
    checkFinished();
}

function checkFinished() {
    var playerSquares = $('.square').filter('.player')
    var computerSquares = $('.square').filter('.computer');
    var takenSquares = $('.square').filter('.taken');
    
    var playerCount = addSquares(playerSquares);
    var computerCount = addSquares(computerSquares);

    console.group('Player Count');console.log(playerCount);console.groupEnd();
    console.group('Computer Count');console.log(computerCount);console.groupEnd();

    if (Object.values(playerCount).indexOf(3) > -1) {
        $('#endGame').append('You won!').removeClass('hidden');
        endGame();
    } 
    else if (Object.values(computerCount).indexOf(3) > -1) {
        $('#endGame').append('Computer won!').removeClass('hidden');
        endGame();
    } 
    else if (takenSquares.length == 9) {
        $('#endGame').append("It's a draw").removeClass('hidden');
        endGame();
    }
}

function addSquares(squares) {
    var squareCount = {};
    for (c = 0; c < rows.length; c++) {
        for (s = 0; s < squares.length; s++) {
            if ($(squares[s]).hasClass(rows[c])) {
                squareCount[rows[c]] = squareCount[rows[c]] + 1 || 1;
            }
        }
    }
    return squareCount;
}

function endGame() {
    gameOver = true;
    $('.square').addClass('taken');
}
