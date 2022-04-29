function Cancelar(){

	var idProfesional = sessionStorage.getItem("sessionStorage_idProfesional");

	window.location = "perfilProfesional.html?idProfesional="+idProfesional;

}




function guardarFoto(){

	debugger;

	var paramstr = window.location.search.substr(1);
		var paramarr = paramstr.split ("&");
		var params = {};

	for ( var i = 0; i < paramarr.length; i++) {
    	var tmparr = paramarr[i].split("=");
    	params[tmparr[0]] = tmparr[1];
	}

	var idProf = params["idProfesional"]


	var foto = document.querySelector("#idFoto").files[0];
	var fotoNombre = idProf+".jpg";
    

    var ajax = new XMLHttpRequest();
    ajax.responseType = 'json';
    //Progress Listener
    ajax.upload.addEventListener("progress", function (e) {

    }, false);
    //Load Listener
    ajax.addEventListener("load", function (e) {
        debugger
        if(event.target.status != 200 && event.target.status != 201){
             
             $('#idProgressBar').css('display', 'block');
              
             $('#alertaError').css('display', 'block');
             $("#alertaError").fadeTo(2000, 500).slideUp(500, function(){
                    $("#alertaError").slideUp(500);

                    $('#idProgressBar').css('display', 'none');

             });

        }else{
            
            debugger;
            
            $('#idProgressBar').css('display', 'none');
            
            $('#alertaOk').css('display', 'block');
            $("#alertaOk").fadeTo(2000, 500).slideUp(500, function(){
                   $("#alertaOk").slideUp(500);

            window.location = "perfilProfesional.html?idProfesional="+idProf;
            
            });
             
        }

    }, false);
    //Error Listener
    ajax.addEventListener("error", function (e) {
         debugger;

          $('#idProgressBar').css('display', 'none');
         
         $('#error').css('display', 'block');
         $("#error").fadeTo(2000, 500).slideUp(500, function(){
                $("#error").slideUp(500);
         });

    }, false);
    //Abort Listener
    ajax.addEventListener("abort", function (e) {

    }, false);

    ajax.open("POST", host + "fotos/"); // Your API .net, php
    //ajax.setRequestHeader("Authorization", token);

    debugger;

    var uploaderForm = new FormData();
    uploaderForm.append("fileMultipart", foto, fotoNombre); // append the next file for upload

    ajax.send(uploaderForm);


	
}



function buscarFoto(){

	debugger;

	var idProfesional = $("#idProfesional").val()

	debugger;

	$.ajax({
		type: "GET",
		url: host + "fotos/"+idProfesional,
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;

			//var foto="imagenes/"+response;
            var foto="/turnos/imagenes/"+response;
			
			$("#foto").attr("src", foto);

		}
	});

}
