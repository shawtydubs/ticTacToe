var gameOver = false;

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

$('#X').click(function() {
    playerToken = 'X';
    computerToken = 'O';
    unhideBoard();
});

$('#O').click(function() {
    playerToken = 'O';
    computerToken = 'X';
    unhideBoard();
    computerTurn();
});

function unhideBoard() {
    $('#decision').addClass('hidden');
    $('#board').removeClass('hidden');
}

$('.square').click(function() {
    $(this).addClass('taken player');
    $(this).append(playerToken);
    checkFinished();
    if (!gameOver) computerTurn();
});

function computerTurn() {
    var openSquares = $('.square').filter(':not(.taken)');
    var selectedSquare = openSquares[Math.floor(Math.random() * openSquares.length)];
    $(selectedSquare).addClass('taken computer');
    $(selectedSquare).append(computerToken);
    checkFinished();
}

function checkFinished() {
    var playerSquares = $('.square').filter('.player')
    var computerSquares = $('.square').filter('.computer');
    var takenSquares = $('.square').filter('.taken');
    
    var playerCount = addSquares(playerSquares);
    var computerCount = addSquares(computerSquares);

    if (Object.values(playerCount).indexOf(3) > -1) {
        $('#endGame').append('Game Over. You won!').removeClass('hidden');
        endGame();
    } 
    else if (Object.values(computerCount).indexOf(3) > -1) {
        $('#endGame').append('Game Over. The computer won!').removeClass('hidden');
        endGame();
    } 
    else if (takenSquares.length == 9) {
        $('#endGame').append("Gamve Over. It's a draw").removeClass('hidden');
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
    $('#reset').removeClass('hidden');
}

$('#reset-button').click(function() {
    $('#endGame, .square').empty();
    $('#decision').removeClass('hidden');
    $('#endGame, #reset, #board').addClass('hidden');
    $('.square').removeClass('taken player computer');
    gameOver = false;
})
