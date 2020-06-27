function colorMatch(a,b,c,d){
  if(a === b && a === c && a === d && a !== 'rgb(128, 128, 128)' && a !== undefined)
  return true;

}
function horizontalWinCheck(){
  for(var row=0;row < 6;row++)
  {
    for(var col=0;col < 4;col++)
    {
      if(colorMatch(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3)))
      {
        console.log("You won starting at this row,col");
        console.log(row);
        console.log(col);
        return true;
      }
    }
  }
}
function verticalWinCheck(){
  for(var col=0;col < 7;col++)
  {
    for(var row=0;row < 3;row++)
    {
      if(colorMatch(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col)))
      {
        console.log("You won starting at this row,col");
        console.log(row);
        console.log(col);
        return true;
      }
    }
  }

}
function diagonalWinCheck() {
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if (colorMatch(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log("You won starting at this row,col");
        console.log(row);
        console.log(col);
        return true;
      }else if (colorMatch(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
        console.log("You won starting at this row,col");
        console.log(row);
        console.log(col);
        return true;
      }
    }
  }
}
function changeColor(rowIndex,colIndex,color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}
function returnColor(rowIndex,colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}
function checkBottom(colIndex)
{
  for(var row=5;row > -1; row--)
  {
    var colorReport=returnColor(row,colIndex)
    if(colorReport === 'rgb(128, 128, 128)')
    return row;
  }
}
var player1=prompt("enter your name,you will be blue")
player1Color='rgb(47, 38, 201)';
var player2=prompt("enter your name,you will be red")
player2Color='rgb(251, 6, 10)';
var game_on=true;
var table=$('table tr');

let currentPlayer=1;
let currentName=player1;
let currentColor=player1Color;
let nextPlayer='';
$('h3').text(currentName+" it is your turn")
$('.board button').on('click',function(){
//   // This is the Column Number (starts at zero):
  //console.log('This is the row:');
  //console.log($(this).closest("tr").index());
  var col=$(this).closest("td").index();
  var row=$(this).closest("tr").index();
  var bottomAvail=checkBottom(col);
 //console.log(bottomAvail)

 if(game_on)
 {

  if(currentPlayer ===1)
  {
    currentColor=player1Color;
    currentName=player1;
    currentPlayer=0;
    nextPlayer=player2;
  }
  else {
    currentColor=player2Color;
    currentName=player2;
    currentPlayer=1;
    nextPlayer=player1;
  }
  $('h3').text(nextPlayer+" it is your turn")

  changeColor(bottomAvail,col,currentColor)
  if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck())
  {
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
    $('h1').text(currentName+" you won! Refresh your browser to play again!");
    game_on=false;
  }
 }

});
