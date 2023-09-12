function irModifespecialdad(idEspecialidad){

	window.location = "especialidades.html?idEspecialidad="+idEspecialidad;

}

function irAgregarEspecialidad(){

	window.location = "especialidades.html";

}


function deleteEspecialidad(idEspecialidad){

	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");

	debugger;
	
	$.ajax({
		type: "DELETE",
		url: host + "especialidades/"+idEspecialidad,
		headers: {
			"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
			
			location.reload();
			
		}
	});
}

function guardarEspecialidad(){

	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");

	debugger;

	var datosOk = true;
	if($("#especialidad").val() == ""){
		datosOk = false;
		$('#avisoError').css('display', 'block');
       		$("#avisoError").fadeTo(2000, 500).slideUp(500, function(){
       		$("#avisoError").slideUp(500);
       		});
	}

	if(datosOk){
		
	    debugger;

		var EspecialidadModel = {
			idEspecialidad:"",
			especialidad:$("#especialidad").val(),
		}

		JSON.stringify(EspecialidadModel);

		debugger;
		$.ajax({
			type: "POST",
			url: host + "especialidades",
			headers: {
				"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;

				

				$('#avisoOk').css('display', 'block');
			      	$("#avisoOk").fadeTo(2000, 500).slideUp(500, function(){
			      	$("#avisoOk").slideUp(500);

			      	window.location = "gestionEspecialidades.html";
			      	
			       	});
			},

			dataType: "json",
			data: JSON.stringify(EspecialidadModel),

			error: function(jqXHR, textStatus, errorThrown) {
				debugger;

				if(jqXHR.status == 500 || jqXHR.status == 501){
					debugger;
					datosOk = false;
					$('#yaExiste').css('display', 'block');
			       		$("#yaExiste").fadeTo(2000, 500).slideUp(500, function(){
			       		$("#yaExiste").slideUp(500);
			       		});


				}else{
					debugger;
					datosOk = false;
					$('#Error').css('display', 'block');
			       		$("#Error").fadeTo(2000, 500).slideUp(500, function(){
			       		$("#Error").slideUp(500);
			       		});
				};
			}

		})
		
	};
}

function modifEspecialidad(){}

function cancelarEspecialidad(){
	window.location = "gestionEspecialidades.html";
}

function buscarEspecialidad(idEspecialidad){}
