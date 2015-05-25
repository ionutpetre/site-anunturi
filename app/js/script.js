$(document).ready(function() {

    var stareOpt1 = false;
    var stareOpt2 = false;
    var stareOpt3 = false;
    
    $("#opt1").click(function(){
         if (stareOpt1 == false) {
            $("#creare").show();
            stareOpt1 = true;
            $("#opt1 h2").html("Creare &uArr;");
        }
        else {
            $("#creare").hide();
            stareOpt1 = false;
            $("#opt1 h2").html("Creare &dArr;");
        }
    });
    
    $("#opt2").click(function(){
         if (stareOpt2 == false) {
            $("#modificare").show();
            stareOpt2 = true;
            $("#opt2 h2").html("Modificare &uArr;");
        }
        else {
            $("#modificare").hide();
            stareOpt2 = false;
            $("#opt2 h2").html("Modificare &dArr;");
        }
    });
    
    $("#opt3").click(function(){
         if (stareOpt3 == false) {
            $("#stergere").show();
            stareOpt3 = true;
            $("#opt3 h2").html("Stergere &uArr;");
        }
        else {
            $("#stergere").hide();
            stareOpt3 = false;
            $("#opt3 h2").html("Stergere &dArr;");
        }
    });
    
});

function refresh() {
    location.reload();
}

