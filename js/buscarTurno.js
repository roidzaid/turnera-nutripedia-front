function buscarTurno(){

	window.location = "buscarTurno.html";

}

function Cancelar(){

	window.location = "inicioTurnera.html";

}

function buscarMisTurnos(){

	window.location = "misTurnos.html";

}


function buscarProfecionalesEspecialidad() {

	debugger;

	$("#comboProfesionales").empty();

	$.ajax({
		type: "GET",
		url: host + "profesionales/especialidad/"+$("#comboEspecialidades").val(),
		headers: {
			"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{

			debugger;
			$("#comboProfesionales").append('<option value="">Profesional</option>');

			for (var i = 0; i < response.length; i++) {

				var nombre = response[i].nombre;
				var apellido = response[i].apellido;
				var idProfesional = response[i].idProfesional;

				$("#comboProfesionales").append('<option value='+idProfesional+'>'+ apellido + ', ' + nombre +'</option>');
			}
		},

		dataType: "json",
		error: function(xhr, status, error) {
			
			debugger;
			if(status == 400 || status != 401){
				debugger;
				//pacientes($("#dni").val());


			}else{
				debugger;
			alert("Error al buscar el Profecionales");
			}

		}
	});
}	


function buscarTipoTurno(){
	debugger;

	var idProfesional = $("#comboProfesionales").val()

	$("#comboTipoTurno").empty();

	$("#idComboTipoTurno").css("display", "inline-block");

	debugger;

	$.ajax({
		type: "GET",
		url: host + "horarios/tiposDeTurnos/"+idProfesional,
		headers: {
			"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
			$("#comboTipoTurno").append('<option value="">Tipo de turno</option>');
			for (var i = 0; i < response.length; i++) {

				debugger;
				var tipoTurno = response[i];


				$("#comboTipoTurno").append('<option>'+tipoTurno+'</option>');
			}
		}
	});
}

	
function buscarDiasdeAtencion(){
	debugger;

	var idProfesional = $("#comboProfesionales").val()
	var tipoTurno = $("#comboTipoTurno").val()

	$("#comboFecha").empty();

	$("#idComboFecha").css("display", "inline-block");

	debugger;

	$.ajax({
		type: "GET",
		url: host + "horarios/fechas/"+idProfesional+"/"+tipoTurno,
		headers: {
			"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
			$("#comboFecha").append('<option value="">Fechas disponibles</option>');
			for (var i = 0; i < response.length; i++) {

				var diayFecha = response[i].diaSemana + " - " + response[i].fecha;
				var fecha = response[i].fecha;
				var idHorario = response[i].idHorario;


				$("#comboFecha").append('<option value='+idHorario+'-'+fecha+'>'+diayFecha+'</option>');
			}
		}
	});

}


function buscarHorariosDisponibles() {
	debugger;

	var partsArray = $("#comboFecha").val().split('-');
	var idHorario = partsArray[0];
	var fecha = partsArray[1]+"-"+partsArray[2]+"-"+partsArray[3];

	$("#comboHora").empty();

	$("#idComboHora").css("display", "inline-block");

	debugger;

	$.ajax({
		type: "GET",
		url: host + "turnos/disponibles/"+fecha+"/"+idHorario,
		headers: {
			"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
			$("#comboHora").append('<option value="">Horarios disponibles</option>');
			for (var i = 0; i < response.length; i++) {

				var hora = response[i].hora;
				var idConfiguracionTurno = response[i].idConfiguracionTurnos;

				$("#comboHora").append('<option value='+idConfiguracionTurno+'>'+hora+'</option>');
			}
		}
	});


}

function PedirTurno(){


	debugger;

	var datosOk = true;
	if($("#comboEspecialidades").val() == "" || $("#comboEspecialidades").val() == "Especialidades"){
		
        datosOk = false;
        $('#AlertaEspecialidades').css('display', 'block');
       	$("#AlertaEspecialidades").fadeTo(2000, 500).slideUp(500, function(){
       	$("#AlertaEspecialidades").slideUp(500);
       	});

    }else{

		if($("#comboProfesionales").val() == "" || $("#comboProfesionales").val() == "Profecionales"){
			
	        datosOk = false;
	        $('#AlertaProfesionales').css('display', 'block');
	       	$("#AlertaProfesionales").fadeTo(2000, 500).slideUp(500, function(){
	       	$("#AlertaProfesionales").slideUp(500);
	       	});

	    }else{

			if($("#comboTipoTurno").val() == "" || $("#comboTipoTurno").val() == "Tipo de turno"){
		
		        datosOk = false;
		        $('#AlertaTipoTurno').css('display', 'block');
		       	$("#AlertaTipoTurno").fadeTo(2000, 500).slideUp(500, function(){
		       	$("#AlertaTipoTurno").slideUp(500);
		       	});

		    }else{

		    	if($("#comboFecha").val() == "" || $("#comboFecha").val() == "Fechas disponibles"){
			
			        datosOk = false;
			        $('#AlertaFecha').css('display', 'block');
			       	$("#AlertaFecha").fadeTo(2000, 500).slideUp(500, function(){
			       	$("#AlertaFecha").slideUp(500);
			       	});

			    }else{

			    	 if($("#comboHora").val() == "" || $("#comboHora").val() == "Horarios disponibles"){
			
				        datosOk = false;
				        $('#AlertaHora').css('display', 'block');
				       	$("#AlertaHora").fadeTo(2000, 500).slideUp(500, function(){
				       	$("#AlertaHora").slideUp(500);
				       	});

				    }
			    }
			}
	    }
	}

    
    if(datosOk){

    	sessionStorage.setItem("sessionStorage_especialidad", $("#comboEspecialidades").val());
		sessionStorage.setItem("sessionStorage_idProfesional", $("#comboProfesionales").val());
		sessionStorage.setItem("sessionStorage_idHorarioYFecha", $("#comboFecha").val());
		sessionStorage.setItem("sessionStorage_idConfiguracionTurno", $("#comboHora").val());

		debugger;
		window.location = "buscarPaciente.html?dni="+$("#dni").val();
    }

}


/*function continuarADatosPersonales(){

	sessionStorage.setItem("sessionStorage_especialidad", $("#comboEspecialidades").val());
	sessionStorage.setItem("sessionStorage_idProfesional", $("#comboProfesionales").val());
	sessionStorage.setItem("sessionStorage_idHorarioYFecha", $("#comboFecha").val());
	sessionStorage.setItem("sessionStorage_idConfiguracionTurno", $("#comboHora").val());

	debugger;
	window.location = "buscarPaciente.html?dni="+$("#dni").val();

}*/


function confirmarTurno(){

	var idHorarioYFecha = sessionStorage.getItem("sessionStorage_idHorarioYFecha");

	var partsArray = idHorarioYFecha.split('-');
	var idHorario = partsArray[0];
	var fec = partsArray[1]+"-"+partsArray[2]+"-"+partsArray[3];

	debugger;

	var guardarTurno = {
		idConfiguracionTurno:sessionStorage.getItem("sessionStorage_idConfiguracionTurno"),
		fecha:fec,
		idProfesional:sessionStorage.getItem("sessionStorage_idProfesional"),
		especialidad:sessionStorage.getItem("sessionStorage_especialidad"),
		idPaciente:sessionStorage.getItem("sessionStorage_IdPaciente"),
		
	}

	JSON.stringify(guardarTurno);

	debugger;
	$.ajax({
		type: "POST",
		url: host + "turnos/asignar",
		headers: {
			"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;

			$('#turnoAsignado').css('display', 'block');
	       		$("#turnoAsignado").fadeTo(4000, 500).slideUp(500, function(){
	       		$("#turnoAsignado").slideUp(500);
	       		window.location = "inicioTurnera.html";
	       		});

		},

		dataType: "json",
		data: JSON.stringify(guardarTurno),

		error: function(jqXHR, textStatus, errorThrown) {
			debugger;
			$('#errorAltaTurno').css('display', 'block');
	       		$("#errorAltaTurno").fadeTo(2000, 500).slideUp(500, function(){
	       		$("#errorAltaTurno").slideUp(500);
	       		window.location = "inicioTurnera.html";
	       		});


		}
	})	
}


function misTurnos(){

	debugger;

	$.ajax({
		type: "GET",
		url: host + "turnos/misTurnos/"+$("#dni").val(),
		headers: {
			"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			var list = response;  

			debugger;

			$("#misTurnos").css("display", "none");
			$("#tMisTurnos").css("display", "none");
			$("#sinTurnos").css("display", "none");
			$("#misTurnos").css("btnOk", "block");
			

			if (list.length > 0){

				$("#misTurnos").css("display", "block");
				$("#tMisTurnos").css("display", "block");
				$("#tbodyMisTurnos").empty();

				for (var i = 0; i < list.length; i++) {

					debugger;
					var Especialidad = list[i].especialidad;
					var Profesional = list[i].apellidoProfesional + ', ' + list[i].nombreProfesional;
					var Fecha = list[i].fecha;
					var Hora = list[i].hora;
					debugger;

					$("#tbodyMisTurnos").append('<tr><td>'+Especialidad+'</td><td>'+Profesional+'</td><td>'+Fecha+'</td><td>'+Hora+'</td></tr>');

				}
			}else{
				$("#sinTurnos").css("display", "block");
			}
		}
	});
}