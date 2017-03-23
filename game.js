var playerToken = 'X';
var computerToken = 'O';

$('.square').click(function() {
    $(this).addClass('taken');
    $(this).append(playerToken);
    checkFinished();
    computerTurn();
});

function computerTurn() {
    var openSquares = $('.square').filter(':not(.taken)');
    var selectedSquare = openSquares[Math.floor(Math.random() * openSquares.length)];
    $(selectedSquare).addClass('taken');
    $(selectedSquare).append(computerToken);
    checkFinished();
}

function checkFinished() {
    var openSquares = $('.square').filter(':not(.taken)');
    if (openSquares.length == 0) {
        $('#endGame').removeClass('hidden');
    }
}