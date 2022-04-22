function buscarTurno(){

	window.location = "buscarTurno.html";

}

function Cancelar(){

	window.location = "inicioTurnera.html";

}

function login(){

	window.location = "login.html";

}

function buscarMisTurnos(){

	window.location = "misTurnos.html";

}

function registrarse(){

	window.location = "AltaProfesional.html";

}




function buscarProfecionalesEspecialidad() {

	debugger;

	$("#comboProfesionales").empty();

	$.ajax({
		type: "GET",
		url: host + "profesionales/especialidad/"+$("#comboEspecialidades").val(),
		headers: {
			//"Authorization": token,
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

	

	debugger;

	$.ajax({
		type: "GET",
		url: host + "horarios/tiposDeTurnos/"+idProfesional,
		headers: {
			//"Authorization": token,
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
			debugger;
			tarjetaProfesional();
		}
	});
}

	
function tarjetaProfesional() {

	$("#tarjeta1").css("display", "inline-block");	

	debugger;
	var idProfesional = $("#comboProfesionales").val()
	var especialidad = $("#comboEspecialidades").val()


	$.ajax({
		type: "GET",
		url: host + "profesionales/id/"+idProfesional,
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;

			buscarFotoPerfil();

			$("#tarjetaProfesional").text(response.apellido + ", " + response.nombre);
			$("#subtituloProfecional").text(especialidad);

			$("#parrafoValorConsulta").text("El valor de la consulta: " + new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(response.valorConsulta));

            debugger;
            buscarDias()
			
		}
	});
	
}

function buscarFotoPerfil(){

	debugger;

	var idProfesional = $("#comboProfesionales").val()

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

			var foto="imagenes/"+response;
			
			$("#fotoPerfil").attr("src", foto);

		}
	});

}


function buscarDias(){
	debugger;

	var idProfesional = $("#comboProfesionales").val()

	debugger;

	$.ajax({
		type: "GET",
		url: host + "horarios/diasDeAtencion/"+idProfesional,
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
			
			$('#listaHorarios').empty();
			for (var i = 0; i < response.length; i++) {

				var diayHora = response[i].diaDeSemana + " de " + response[i].horaDesde+ " a " + response[i].horaHasta;
				debugger;
            	
            	$('#listaHorarios').append("<li class=\"list-group-item\">"+diayHora+"</li>"); 
			}
		}
	});

}



function buscarDiasdeAtencion(){
	debugger;


	var idProfesional = $("#comboProfesionales").val()
	var tipoTurno = $("#comboTipoTurno").val()

	if (tipoTurno == "CONTROL DE ENFERMEDAD"){
		$("#idMotivoConsulta").css("display", "block");
	}else{
		$("#idMotivoConsulta").css("display", "none");
	} 


	$("#comboFecha").empty();


	debugger;

	$.ajax({
		type: "GET",
		url: host + "horarios/fechas/"+idProfesional+"/"+tipoTurno,
		headers: {
			//"Authorization": token,
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


	debugger;

	$.ajax({
		type: "GET",
		url: host + "turnos/disponibles/"+fecha+"/"+idHorario,
		headers: {
			//"Authorization": token,
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

	if($("#comboTipoTurno").val() == "CONTROL DE ENFERMEDAD" & $("#motivoConsulta").val() == ""){

		datosOk = false;
        $('#AlertaControlEnfermedad').css('display', 'block');
       	$("#AlertaControlEnfermedad").fadeTo(2000, 500).slideUp(500, function(){
       	$("#AlertaControlEnfermedad").slideUp(500);
      	});

	}

    
    if(datosOk){

    	sessionStorage.setItem("sessionStorage_especialidad", $("#comboEspecialidades").val());
		sessionStorage.setItem("sessionStorage_idProfesional", $("#comboProfesionales").val());
		sessionStorage.setItem("sessionStorage_idHorarioYFecha", $("#comboFecha").val());
		sessionStorage.setItem("sessionStorage_idConfiguracionTurno", $("#comboHora").val());
		sessionStorage.setItem("sessionStorage_tipoConsulta", $("#comboTipoTurno").val());
		sessionStorage.setItem("sessionStorage_motivoConsulta", $("#motivoConsulta").val());

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

	$("#btnConfirmarTurno").prop('disabled', true);

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
		tipoConsulta:sessionStorage.getItem("sessionStorage_tipoConsulta"),
		motivoConsulta:sessionStorage.getItem("sessionStorage_motivoConsulta")
	}

	JSON.stringify(guardarTurno);

	debugger;
	$.ajax({
		type: "POST",
		url: host + "turnos/asignar",
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;

			$('#idProgressBar').css('display', 'none');

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

			$('#idProgressBar').css('display', 'none');
			
			$('#errorAltaTurno').css('display', 'block');
	       		$("#errorAltaTurno").fadeTo(2000, 500).slideUp(500, function(){
	       		$("#errorAltaTurno").slideUp(500);
	       		window.location = "inicioTurnera.html";
	       		});


		}
	})
	$('#idProgressBar').css('display', 'block');
	           
}


function misTurnos(){

	debugger;

	$.ajax({
		type: "GET",
		url: host + "turnos/misTurnos/"+$("#dni").val(),
		headers: {
			//"Authorization": token,
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
					var idTurnoAsignado = list[i].idTurnoAsignado;
					var Especialidad = list[i].especialidad;
					var Profesional = list[i].apellidoProfesional + ', ' + list[i].nombreProfesional;
					var Fecha = list[i].fecha;
					var Hora = list[i].hora;
					debugger;

					$("#tbodyMisTurnos").append('<tr><td style="display: none;">'+idTurnoAsignado+'</td><td>'+Especialidad+'</td><td>'+Profesional+'</td><td>'+Fecha+'</td><td>'+Hora+'</td><<td colspan="2"><div align="center"><i onclick="PacienteCancelaTurno(\'' + idTurnoAsignado + '\')"class="material-icons button delete" style="margin-right:3px; cursor: pointer;">delete</i></div></td></tr>');

				}
			}else{
				$("#sinTurnos").css("display", "block");
			}
		}
	});
}

function cancelarTurno(idTurnoAsignado){

	debugger;

	$.ajax({
		type: "GET",
		url: host + "turnos/buscarTurno/"+idTurnoAsignado,
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
	
			var paciente=response.apellidoPaciente+", "+response.nombrePaciente; 
			var dia=response.fecha;
			var hora=response.hora;

			sessionStorage.setItem("sessionStorage_idTurnoAsignado", response.idTurnoAsignado);

			$("#parrafoConfirmacion").text("Usted esta cancelando el turno de " + paciente + " para el dia " + dia + " a las " + hora + "hs");
			
			$('#myModal').modal('show');		
				
		}
	});

}

function PacienteCancelaTurno(idTurnoAsignado){

	debugger;

	$.ajax({
		type: "GET",
		url: host + "turnos/buscarTurno/"+idTurnoAsignado,
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
	
			var profesional=response.apellidoProfesional+", "+response.nombreProfesional; 
			var dia=response.fecha;
			var hora=response.hora;

			sessionStorage.setItem("sessionStorage_idTurnoAsignado", response.idTurnoAsignado);

			$("#parrafoConfirmacion").text("Usted esta cancelando el turno de " + profesional + " para el dia " + dia + " a las " + hora + "hs");
			
			$('#myModal1').modal('show');		
				
		}
	});

}

function confirmarCacelacionTurno(){


	debugger;

	var idTurnoAsignado = sessionStorage.getItem("sessionStorage_idTurnoAsignado");
	
	$.ajax({
		type: "DELETE",
		url: host + "turnos/"+idTurnoAsignado,
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
			
			location.reload();
		}
	});

}



function PacienteConfirmaCacelacionTurno(){


	debugger;

	var idTurnoAsignado = sessionStorage.getItem("sessionStorage_idTurnoAsignado");
	
	$.ajax({
		type: "DELETE",
		url: host + "turnos/"+idTurnoAsignado,
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;

			$('#myModal1').modal('hide');	
			
			misTurnos();
		}
	});

}


function CancelarConfirmacion(){


	debugger;
			
	location.reload();

}


function PacienteCancelaConfirmacionDeCancelacion(){


	debugger;

	$('#myModal1').modal('hide');
			
	misTurnos();

}

