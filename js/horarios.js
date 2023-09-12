function Cancelar(){

	var idProfesional = sessionStorage.getItem("sessionStorage_idProfesional");
	window.location = "perfilProfesional.html?idProfesional="+idProfesional;

	//window.location = "misHorarios.html";
}


function guardarHorario(){

	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");

	debugger;

	var datosOk = true;
	if($("#comboDiaDeSemana").val() == "Seleccione dia de la semana" || $("#tipoTurno").val() == "" || $("#horaDesde").val()== "" || $("#minutosDesde").val()== "" || $("#horaHasta").val()== "" || $("#minutosHasta").val()== "" || $("#duracionTurnos").val()== ""){
		datosOk = false;
		$('#errorHorario').css('display', 'block');
       		$("#errorHorario").fadeTo(2000, 500).slideUp(500, function(){
       		$("#errorHorario").slideUp(500);
       		});
	}


	if ($("#checkboxTurnoEventual").is(":checked")){
		if($("#fechaEventual").val() == ""){
			datosOk = false;
			
			$('#errorHorario').css('display', 'block');
       		$("#errorHorario").fadeTo(2000, 500).slideUp(500, function(){
       		$("#errorHorario").slideUp(500);
       		});
		}
	}


	if(datosOk){
		
		idProfesional = sessionStorage.getItem("sessionStorage_idProfesional");
	    debugger;

	    var fecha = "";
	    if($("#fechaEventual").val() != ""){
	    	
		    var paramarr = $("#fechaEventual").val().split ("-");

			var diaEventual = paramarr[2];
			var mesEventual = paramarr[1];
			var añoEventual = paramarr[0];

			fecha = diaEventual+"-"+mesEventual+"-"+añoEventual;
		}

		var horario = {
			diaDeSemana:$("#comboDiaDeSemana").val().toUpperCase(),
			tipoTurno:$("#comboTipoTurno").val().toUpperCase(),
			horaDesde:$("#horaDesde").val(),
			minutosDesde:$("#minutosDesde").val(),
			horaHasta:$("#horaHasta").val(),
			minutosHasta:$("#minutosHasta").val(),
			duracionTurnos:$("#duracionTurnos").val(),
			fechaHorarioEventual:fecha
		}

		JSON.stringify(horario);

		debugger;
		$.ajax({
			type: "PUT",
			url: host + "profesionales/horario/"+idProfesional,
			headers: {
				"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;

				

				$('#horarioOk').css('display', 'block');
			      	$("#horarioOk").fadeTo(2000, 500).slideUp(500, function(){
			      	$("#horarioOk").slideUp(500);

			      	window.location = "perfilProfesional.html?idProfesional="+idProfesional;
			      	//window.location = "misHorarios.html";
			      	
			       	});
			},

			dataType: "json",
			data: JSON.stringify(horario),

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
					$('#error').css('display', 'block');
			       		$("#error").fadeTo(2000, 500).slideUp(500, function(){
			       		$("#error").slideUp(500);
			       		});
				};
			}

		})
		
	};
}


function irModifHorarios() {

	var idHorario = sessionStorage.getItem("sessionStorage_idHorario");
	var idProfesional = sessionStorage.getItem("sessionStorage_idProfesional");
	debugger;
	window.location = "horarios.html?idProfesional="+idProfesional+"&idHorario="+idHorario;

 } 


 function CancelarIrModifHorarios() {
 	
	$('#myModalModifHorarios').modal('hide');

 } 



function modifHorario(){

	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");

	debugger;

	var datosOk = true;
	if($("#comboDiaDeSemana").val() == "Seleccione dia de la semana" || $("#tipoTurno").val() == "" || $("#horaDesde").val()== "" || $("#minutosDesde").val()== "" || $("#horaHasta").val()== "" || $("#minutosHasta").val()== "" || $("#duracionTurnos").val()== ""){
		datosOk = false;
		$('#errorHorario').css('display', 'block');
       		$("#errorHorario").fadeTo(2000, 500).slideUp(500, function(){
       		$("#errorHorario").slideUp(500);
       		});
	}


	if ($("#checkboxTurnoEventual").is(":checked")){
		if($("#fechaEventual").val() == ""){
			datosOk = false;
			
			$('#errorHorario').css('display', 'block');
       		$("#errorHorario").fadeTo(2000, 500).slideUp(500, function(){
       		$("#errorHorario").slideUp(500);
       		});
		}
	}



	if(datosOk){
		
		var idProfesional = sessionStorage.getItem("sessionStorage_idProfesional");
		var idHorario = sessionStorage.getItem("sessionStorage_idHorario");

	    debugger;

	    var fecha = "";
	    if($("#fechaEventual").val() != ""){
	    	
		    var paramarr = $("#fechaEventual").val().split ("-");

			var diaEventual = paramarr[2];
			var mesEventual = paramarr[1];
			var añoEventual = paramarr[0];

			fecha = diaEventual+"-"+mesEventual+"-"+añoEventual;
		}


		var horario = {
			diaDeSemana:$("#comboDiaDeSemana").val().toUpperCase(),
			tipoTurno:$("#comboTipoTurno").val().toUpperCase(),
			horaDesde:$("#horaDesde").val(),
			minutosDesde:$("#minutosDesde").val(),
			horaHasta:$("#horaHasta").val(),
			minutosHasta:$("#minutosHasta").val(),
			duracionTurnos:$("#duracionTurnos").val(),
			fechaHorarioEventual:fecha
		}

		JSON.stringify(horario);

		debugger;
		$.ajax({
			type: "PUT",
			url: host + "horarios/"+idHorario,
			headers: {
				"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;

				

				$('#horarioOk').css('display', 'block');
			      	$("#horarioOk").fadeTo(2000, 500).slideUp(500, function(){
			      	$("#horarioOk").slideUp(500);

			      	window.location = "perfilProfesional.html?idProfesional="+idProfesional;
			      	//window.location = "misHorarios.html";
			      	
			       	});
			},

			dataType: "json",
			data: JSON.stringify(horario),

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
					$('#error').css('display', 'block');
			       		$("#error").fadeTo(2000, 500).slideUp(500, function(){
			       		$("#error").slideUp(500);
			       		});
				};
			}

		})
		
	};
}


function buscarTodosLosTiposDeTurno(){
	
	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");

	debugger;
			
		$.ajax({
			type: "GET",
			url: host + "tipoTurno/all",
			headers: {
				"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;
				$("#comboTipoTurno").append('<option value="">Tipos de Turnos</option>');
				for (var i = 0; i < response.length; i++) {

					var tipoTurno = response[i].tipoTurno;

					$("#comboTipoTurno").append('<option>'+tipoTurno+'</option>');
				}
			}
		});

}


function esEventual() {
	
	if ($("#checkboxTurnoEventual").is(":checked")){

		$("#fechaTurnoEventual").css("display", "inline-block");
		$("#comboDiaDeSemana").prop('disabled', true);

	}else{

		$("#fechaTurnoEventual").css("display", "none");
		$("#comboDiaDeSemana").prop('disabled', false);

	}

}


function buscarDiaEventual(){

	debugger;

	var date = new Date($("#fechaEventual").val());

	var dia = date.getDay();	

	switch (dia){
        case 0: $("#comboDiaDeSemana").val("LUNES");
            break;
        case 1: $("#comboDiaDeSemana").val("MARTES");
            break;
        case 2: $("#comboDiaDeSemana").val("MIERCOLES");
            break;
        case 3: $("#comboDiaDeSemana").val("JUEVES");
            break;
        case 4: $("#comboDiaDeSemana").val("VIERNES");
            break;
        case 5: $("#comboDiaDeSemana").val("SABADO");
            break;
        case 6: $("#comboDiaDeSemana").val("DOMINGO");
        	break;
    }



}