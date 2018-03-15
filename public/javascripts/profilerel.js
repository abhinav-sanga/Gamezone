
function myFunction(val) {
    document.getElementById("amountRech").value = val ;
}

$('#amountRech').on('input',function(e){
    $('input[name="amount"]').prop('checked',false);
});