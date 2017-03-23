var playerToken = 'X';
var computerToken = 'O';

$('.square').click(function() {
    $(this).addClass('taken');
    $(this).append(playerToken);
    computerTurn();
});

function computerTurn() {
    var openSquares = $('.square').filter(':not(.taken)');
    var selectedSquare = openSquares[Math.floor(Math.random() * openSquares.length)];
    $(selectedSquare).addClass('taken');
    $(selectedSquare).append(computerToken);

    console.log(selectedSquare);
}