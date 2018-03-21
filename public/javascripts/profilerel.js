
function myFunction(val) {
    document.getElementById("amountRech").value = val ;
}

$('#amountRech').on('input',function(e){
    $('input[name="amount"]').prop('checked',false);
});


/*

$(".dates").on("input",function(){
    if($(this).val().length>0){
        $(this).addClass("full");
    }
    else{
        $(this).removeClass("full");
    }
});

*/

$(function () {
    $('#datetimepicker7').datetimepicker();
    $('#datetimepicker8').datetimepicker({
        useCurrent: false
    });
    $("#datetimepicker7").on("dp.change", function (e) {
        $('#datetimepicker8').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker8").on("dp.change", function (e) {
        $('#datetimepicker7').data("DateTimePicker").maxDate(e.date);
    });
});