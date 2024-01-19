function buscarTurno(){

	window.location = "buscarTurno.html";

}


function buscarMisDatos(){

	window.location = "buscarPaciente.html?dni="+$("#dni").val();

}



function Cancelar(){

	window.location = "index.html";

}

function login(){

	window.location = "login.html";

}

function buscarMisTurnos(){

	window.location = "misTurnos.html";

}


function salir() {
    debugger;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    window.location = "login.html";
}

/*function registrarse(){

	window.location = "altaProfesional.html";

}*/




function buscarProfecionalesEspecialidad() {

	debugger;

	$("#comboProfesionales").empty();
	$("#comboTipoTurno").empty();
	$("#comboFecha").empty();
	$("#comboHora").empty();
	$("#idMotivoConsulta").css("display", "none");
	$("#idMotivoConsultaNutricion").css("display", "none");

	$("#tarjeta1").css("display", "none");	



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
	$("#comboFecha").empty();
	$("#comboHora").empty();
	$("#idMotivoConsulta").css("display", "none");
	$("#idMotivoConsultaNutricion").css("display", "none");

	$("#redes").css("display", "none");	

	$("#linkRedes").empty();
	$("#linkRedes").attr("href", "#");
	

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

	$("#tarjeta").css("display", "inline-block");	

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

			debugger;
			$("#tarjetaProfesional").text(response.apellido + ", " + response.nombre);
			$("#subtituloProfecional").text(especialidad);

			debugger;
			buscarLicencias(idProfesional);

			debugger;
			if(response.instagram != "" && response.instagram != null){
				// $("#redes").css("display", "inline-block");	
				
				var partsArray = response.instagram.split('/');
				var aliasInsta = partsArray[3];

				$("#linkRedes").text("@"+aliasInsta);
				$("#linkRedes").attr("href", response.instagram);


			}

			/*$("#parrafoValorConsulta").text("El valor de la consulta: " + new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(response.valorConsulta));*/

            /*debugger;
            buscarDias()*/

            debugger;
            buscarValoresDeConsulta();
			
		}
	});
	
}


function buscarLicencias(idProfesional){

	debugger;
	$.ajax({
		type: "GET",
		url: host + "licencias/lista/"+idProfesional,
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;

        	var diaDesde = response[0].diaDesde;
			var diaHasta = response[0].diaHasta;
			var motivoDeLicencia = response[0].motivoDeLicencia;

			debugger;
			$("#licencias").text("Licencia desde el " + diaDesde + " hasta el " + diaHasta);

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
		url: host + "/horarios/horariosTarjeta/"+idProfesional,
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;

			var list = response;
			
			$('#listaHorarios').empty();
			for (var i = 0; i < response.length; i++) {

				var dias = response[i];
				debugger;
            	
            	$('#listaHorarios').append("<li class=\"list-group-item\">"+dias+"</li>"); 
			}
		}
	});

}


function buscarValoresDeConsulta(){
	
	debugger;

	var idProfesional = $("#comboProfesionales").val()

		$.ajax({
			type: "GET",
			url: host + "valorConsulta/all/"+idProfesional,
			headers: {
				//"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;
				$('#listaValorConsulta').empty();
				for (var i = 0; i < response.length; i++) {

					var vc = response[i].tipoConsulta + ": " + new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(response[i].valorConsulta);
					debugger;
	            	
	            	$('#listaValorConsulta').append("<li id=\"idLiValores\" class=\"list-group-item\">"+vc+"</li>"); 
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

	if ($("#comboEspecialidades").val() == "NUTRICION"){
		$("#idMotivoConsultaNutricion").css("display", "block");
	}else{
		$("#idMotivoConsultaNutricion").css("display", "none");
	} 

	if (tipoTurno == "CONTROL OFTALMOLOGICO"){
		$("#idMotivoConsultaOftalmologia").css("display", "block");
	}else{
		$("#idMotivoConsultaOftalmologia").css("display", "none");
	}


	$("#comboFecha").empty();
	$("#comboHora").empty();


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



function verDescOftalmologia(){
	if($("#flexCheckSeAtendioPreviamente").is(":checked")){
		$("#idDescOftalmologia").css("display", "block");
	}else{
		$("#idDescOftalmologia").css("display", "none");
	}
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

				debugger;
				var hora = response[i].hora;
				var idConfiguracionTurno = response[i].idConfiguracionTurnos;

				$("#comboHora").append('<option value='+idConfiguracionTurno+'>'+hora+'</option>');
			}

			debugger;

			if ($("#comboTipoTurno").val() == "CONTROL DE ENFERMEDAD" && response.length <= 0){

				debugger;
				telefonoProfesional();
				
			}

			if (response.length <= 0){

				debugger;
				sinDisponibilidad();
				
			}

		}
	});


}


function telefonoProfesional() {

	debugger;
	var idProfesional = $("#comboProfesionales").val();
	debugger;

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
			
			var telefono = response.telefono;

			$("#parrafoControEnfermedad").text("Por favor enviar un mensaje al " + telefono + " para coordinar un turno por control de enfermedad");
				
			$('#myModalControEnfermedad').modal('show');
			
		}
	});
	
}

function sinDisponibilidad() {

	debugger;
				
	$('#myModalSinDisponibilidad').modal('show');
	
	
}

function cerrarmyModalSinDisponibilidad() {

	debugger;
				
	$('#myModalSinDisponibilidad').modal('hide');
	
	
}


function cerrarmyModalControEnfermedad(){

	$('#myModalControEnfermedad').modal('hide');

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

	if($("#comboEspecialidades").val() == "NUTRICION" & $("#comboMotivoConsultaNutricion").val() == ""){

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
	

		if($("#comboEspecialidades").val() == "NUTRICION"){
			sessionStorage.setItem("sessionStorage_motivoConsulta", $("#comboMotivoConsultaNutricion").val());
		}else{

			if($("#comboEspecialidades").val() == "OFTALMOLOGIA INFANTIL"){

				if($("#flexCheckFondoDeOjo").is(":checked")){

					if($("#flexCheckSeAtendioPreviamente").is(":checked")){
						sessionStorage.setItem("sessionStorage_motivoConsulta", "Requiere fondo de ojo - Fue atendidx previamente en: " + $("#DescOftalmologia").val());
					}else{
						sessionStorage.setItem("sessionStorage_motivoConsulta", "Requiere fondo de ojo - Primera vez");
					}

				}else{
					if($("#flexCheckSeAtendioPreviamente").is(":checked")){
						sessionStorage.setItem("sessionStorage_motivoConsulta", "No requiere fondo de ojo - Fue atendidx previamente en: " + $("#DescOftalmologia").val());
					}else{
						sessionStorage.setItem("sessionStorage_motivoConsulta", "No requiere fondo de ojo - Primera vez");
					}		
				}

			}else{

				sessionStorage.setItem("sessionStorage_motivoConsulta", $("#motivoConsulta").val());

			}
			
		}


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


function pagarSeña(){

	$("#btnPagarSeña").prop('disabled', true);

	//grabo el turno en la base como turno asignado pendiente de pago
	//confirmarTurno();

	var idHorarioYFecha = sessionStorage.getItem("sessionStorage_idHorarioYFecha");

	var partsArray = idHorarioYFecha.split('-');
	var idHorario = partsArray[0];
	var fec = partsArray[1]+"-"+partsArray[2]+"-"+partsArray[3];

	debugger;

	var pagarReserva = {
		idReserva:"",
		idPaciente:sessionStorage.getItem("sessionStorage_IdPaciente"),
		idTurno:sessionStorage.getItem("sessionStorage_idTurno"),
		nombrePaciente:sessionStorage.getItem("sessionStorage_NombrePaciente"),
		apellidoPaciente:sessionStorage.getItem("sessionStorage_ApellidoPaciente"),
		mailPaciente:sessionStorage.getItem("sessionStorage_MailPaciente"),
	    idProfesional:sessionStorage.getItem("sessionStorage_idProfesional"),
	    fechaTurno:fec,
	    horaTurno:idHorario,
	    seña:sessionStorage.getItem("sessionStorage_valorDeSeña"),
	    estado:"",
	    idPagoMP:""
	}

	JSON.stringify(pagarReserva);

	debugger;
	$.ajax({
		type: "POST",
		url: hostPagos + "cobros/reservaTurno",
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{

			/*// Obtener el valor del parámetro "source" de la URL
			const urlParams = new URLSearchParams(window.location.search);
			const source = urlParams.get('source');

			// Validar la fuente y tomar acciones en consecuencia
			if (source === 'app') {
			    // La respuesta proviene de la aplicación de Mercado Pago
			    // Realiza acciones específicas para la aplicación
			    debugger;
				window.location = "PagoAceptado.html";
			} else if (source === 'web') {
			    // La respuesta proviene de la web
			    // Realiza acciones específicas para la web
			    debugger;
				window.location = response.initPoint;
			}*/

			debugger;
			window.location = response.initPoint;

			
		},

		dataType: "json",
		data: JSON.stringify(pagarReserva),

		error: function(jqXHR, textStatus, errorThrown) {
			debugger;

			$('#idProgressBar').css('display', 'none');
			
			$('#errorPagoReserva').css('display', 'block');
	       		$("#errorPagoReserva").fadeTo(2000, 500).slideUp(500, function(){
	       		$("#errorPagoReserva").slideUp(500);
	       		window.location = "index.html";
	       		});


		}
	})

}


function confirmarPago(idTurnoAsignado, idPagoMP, estadoPago){

	$('#idProgressBarModal').css('display', 'block');

	debugger;

	
	$.ajax({
		type: "PUT",
		url: host + "turnos/"+idTurnoAsignado+"/"+idPagoMP+"/"+estadoPago,
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;

			//location.reload();
			
		}
	});

}


function verificarPagoManual(idTurnoAsignado){

	$('#idProgressBarModal').css('display', 'block');

	debugger;

	
	$.ajax({
		type: "PUT",
		url: host + "turnos/"+idTurnoAsignado,
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;

			$.ajax({
				type: "PUT",
				url: hostPagos + "cobros/registrarEstadoManual/"+idTurnoAsignado,
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
	});

}



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
		motivoConsulta:sessionStorage.getItem("sessionStorage_motivoConsulta"),
		estadoPago:"PENDIENTE", 
		idPagoMP:""
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

			sessionStorage.setItem("sessionStorage_idTurno", response.idTurnoAsignado);

			/*$('#idProgressBar').css('display', 'none');

            $('#turnoAsignado').css('display', 'block');
       		$("#turnoAsignado").fadeTo(4000, 500).slideUp(500, function(){
       		$("#turnoAsignado").slideUp(500);
       		});*/
       		enviarMails(guardarTurno);

       		pagarSeña();


       		//window.location = "index.html";
       		

	            
		},

		dataType: "json",
		data: JSON.stringify(guardarTurno),

		error: function(jqXHR, textStatus, errorThrown) {
			debugger;

			$('#idProgressBar').css('display', 'none');
			
			$('#errorAltaTurno').css('display', 'block');
	       		$("#errorAltaTurno").fadeTo(2000, 500).slideUp(500, function(){
	       		$("#errorAltaTurno").slideUp(500);
	       		window.location = "index.html";
	       		});


		}
	})
	
	$('#idProgressBar').css('display', 'block');
	           
}


function enviarMails(guardarTurno){

	JSON.stringify(guardarTurno);

	debugger;
	$.ajax({
		type: "POST",
		url: host + "mails/enviar",
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
	            
		},

		dataType: "json",
		data: JSON.stringify(guardarTurno),

		error: function(jqXHR, textStatus, errorThrown) {
			debugger;

			$('#idProgressBar').css('display', 'none');
			
			$('#errorAltaTurno').css('display', 'block');
	       		$("#errorAltaTurno").fadeTo(2000, 500).slideUp(500, function(){
	       		$("#errorAltaTurno").slideUp(500);
	       		window.location = "index.html";
	       		});


		}
	})

}


function enviarMailsCancelacion(idTurnoAsignado){

	
	debugger;
	$.ajax({
		type: "POST",
		url: host + "mails/enviarCancelacion/"+idTurnoAsignado,
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
	            
		},

		error: function(jqXHR, textStatus, errorThrown) {
			debugger;

			$('#idProgressBar').css('display', 'none');
			
			$('#errorAltaTurno').css('display', 'block');
	       		$("#errorAltaTurno").fadeTo(2000, 500).slideUp(500, function(){
	       		$("#errorAltaTurno").slideUp(500);
	       		window.location = "index.html";
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

			$("#parrafoConfirmacion").text("Usted está cancelando el turno de " + paciente + " para el dia " + dia + " a las " + hora + "hs");
			
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

			$("#parrafoConfirmacion").text("Usted está cancelando el turno con " + profesional + " para el dia " + dia + " a las " + hora + "hs");
			
			$('#myModal1').modal('show');		
				
		}
	});

}

function confirmarCacelacionTurno(){

	$('#idProgressBarModal').css('display', 'block');

	debugger;

	var idTurnoAsignado = sessionStorage.getItem("sessionStorage_idTurnoAsignado");

	debugger;
	$.ajax({
		type: "POST",
		url: host + "mails/enviarCancelacion/"+idTurnoAsignado,
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
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

					$('#idProgressBarModal').css('display', 'none');
					
					$('#turnoAsignadoModal').css('display', 'block');
			       		$("#turnoAsignadoModal").fadeTo(2000, 500).slideUp(500, function(){
			       		$("#turnoAsignadoModal").slideUp(500);
			       	
			       		$('#myModal1').modal('hide');	
					
						//enviarMailsCancelacion(idTurnoAsignado);

						location.reload();
			       		});
					
					
				}
			});
	            
		},

		error: function(jqXHR, textStatus, errorThrown) {
			debugger;

			$('#idProgressBar').css('display', 'none');
			
			$('#errorAltaTurno').css('display', 'block');
	       		$("#errorAltaTurno").fadeTo(2000, 500).slideUp(500, function(){
	       		$("#errorAltaTurno").slideUp(500);
	       		window.location = "index.html";
	       		});


		}
	})

}


function CacelacionTurnoPagoRechazado(idTurno){


	debugger;

	
	$.ajax({
		type: "DELETE",
		url: host + "turnos/"+idTurno,
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
			
		}
	});

}



function PacienteConfirmaCacelacionTurno(){

	$('#idProgressBarModal').css('display', 'block');

	debugger;

	var idTurnoAsignado = sessionStorage.getItem("sessionStorage_idTurnoAsignado");


	debugger;
	$.ajax({
		type: "POST",
		url: host + "mails/enviarCancelacion/"+idTurnoAsignado,
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
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

					$('#idProgressBarModal').css('display', 'none');
					
					$('#turnoAsignadoModal').css('display', 'block');
			       		$("#turnoAsignadoModal").fadeTo(2000, 500).slideUp(500, function(){
			       		$("#turnoAsignadoModal").slideUp(500);
			       	
			       		$('#myModal1').modal('hide');	
					
						//enviarMailsCancelacion(idTurnoAsignado);

						misTurnos();
			       		});

					
				}
			});
	            
		},

		error: function(jqXHR, textStatus, errorThrown) {
			debugger;

			$('#idProgressBar').css('display', 'none');
			
			$('#errorAltaTurno').css('display', 'block');
	       		$("#errorAltaTurno").fadeTo(2000, 500).slideUp(500, function(){
	       		$("#errorAltaTurno").slideUp(500);
	       		window.location = "index.html";
	       		});
		}
	})
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

function verDatosPaciente(dni){

	$('#myModalPaciente').modal('show');	

	$.ajax({
		type: "GET",
		url: host + "pacientes/"+dni,
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
			
			$("#nomYApe").text(response.apellido +", " +response.nombre);
			      $("#dni").val("DNI: "+response.dni);
			 $("#fechaNac").val("Fecha de nac: "+response.fechaNac);
			$("#direccion").val("Direccion: "+response.direccion);
			$("#localidad").val("Localidad: "+response.localidad);
			 $("#telefono").val("Telefono: "+response.telefono);
			     $("#mail").val("Mail: "+response.mail);

			
			$("#dni").prop('disabled', true);
			$("#fechaNac").prop('disabled', true);
			$("#direccion").prop('disabled', true);
			$("#localidad").prop('disabled', true);
			$("#telefono").prop('disabled', true);
			$("#mail").prop('disabled', true);

		},
		dataType: "json",
		error: function(xhr, status, error) {
			
			if(status == 400 || status != 401){
				debugger;
				window.location = "altaPacientes.html?dni="+$("#dni").val();


			}else{
				debugger;
			alert("Error al buscar el paciente");
			}

		}
	});	
}

function buscarPorFechaAgenda(){
	
	debugger;

	if($("#idFiltroFecha").val()=="" || $("#idFiltroFecha").val()==null){
		location.reload();
	}else{

		var idProfesional = sessionStorage.getItem("sessionStorage_idProfesional");

		debugger;

		$.ajax({
			type: "GET",
			url: host + "turnos/agenda/"+idProfesional+"/"+$("#idFiltroFecha").val(),
			headers: {
				//"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				var list = response;  

				debugger;

				if (list.length > 0){

					$("#tbodyAgenda").empty();

					for (var i = 0; i < list.length; i++) {

						debugger;
						var idTurnoAsignado = list[i].idTurnoAsignado;
						var idPaciente = list[i].idPaciente;
						var fecha = list[i].fecha;
						var hora = list[i].hora;
						var nombre = list[i].nombrePaciente;
						var apellido = list[i].apellidoPaciente;
						var dni = list[i].dniPaciente;
						var tipoConsulta = list[i].tipoConsulta;
						var motivo = list[i].motivoConsulta;
						var estadoPago = list[i].estadoPago;

						debugger;

						/*$("#tbodyAgenda").append('<tr><td style="display: none;">'+idTurnoAsignado+'</td><td style="display: none;">'+idPaciente+'</td><td>'+fecha+'</td><td>'+hora+'</td><td>'+nombre+'</td><td>'+apellido+'</td><td>'+dni+'</td><td>'+tipoConsulta+'</td><td>'+motivo+'</td><<td colspan="2"><div align="center"><i onclick="verDatosPaciente(\'' + dni + '\')"class="material-icons button person" style="margin-right:3px; cursor: pointer;">person</i><i onclick="cancelarTurno(\'' + idTurnoAsignado + '\')"class="material-icons button delete" style="margin-right:3px; cursor: pointer;">delete</i></div></td></tr>');*/

						if (estadoPago == "APROBADO"){

								$("#tbodyAgenda").append('<tr style="background: #b0e8bb"><td style="display: none;">'+idTurnoAsignado+'</td><td style="display: none;">'+idPaciente+'</td><td>'+fecha+'</td><td>'+hora+'</td><td>'+nombre+'</td><td>'+apellido+'</td><td>'+dni+'</td><td>'+tipoConsulta+'</td><td>'+motivo+'</td><<td colspan="2"><div align="center"><i onclick="verDatosPaciente(\'' + dni + '\')"class="material-icons button person" style="margin-right:3px; cursor: pointer;" title="Ver datos del paciente">person</i><i onclick="cancelarTurno(\'' + idTurnoAsignado + '\')"class="material-icons button delete" style="margin-right:3px; cursor: pointer;" title="Cancelar turno">delete</i><i onclick="verificarPagoManual(\'' + idTurnoAsignado + '\')"class="material-icons button done" style="margin-right:3px; cursor: pointer;" title="Marcar como pago pendiente">done</i></div></td></tr>');

						}else{

								$("#tbodyAgenda").append('<tr style="background: #ffe083a3"><td style="display: none;">'+idTurnoAsignado+'</td><td style="display: none;">'+idPaciente+'</td><td>'+fecha+'</td><td>'+hora+'</td><td>'+nombre+'</td><td>'+apellido+'</td><td>'+dni+'</td><td>'+tipoConsulta+'</td><td>'+motivo+'</td><<td colspan="2"><div align="center"><i onclick="verDatosPaciente(\'' + dni + '\')"class="material-icons button person" style="margin-right:3px; cursor: pointer;" title="Ver datos del paciente">person</i><i onclick="cancelarTurno(\'' + idTurnoAsignado + '\')"class="material-icons button delete" style="margin-right:3px; cursor: pointer;" title="Cancelar turno">delete</i><i onclick="verificarPagoManual(\'' + idTurnoAsignado + '\')"class="material-icons button alarm" style="margin-right:3px; cursor: pointer;" title="Confirmar pago de reserva">alarm</i></div></td></tr>');
						}


					}
				}else{
					$("#tbodyAgenda").empty();
				}
			}
		});
	}

}

function buscarPorFechaAgendaGeneral(){
	debugger;

	if($("#idFiltroFecha").val()=="" || $("#idFiltroFecha").val()==null){
		location.reload();
	}else{

		var idProfesional = sessionStorage.getItem("sessionStorage_idProfesional");

		debugger;

		$.ajax({
			type: "GET",
			url: host + "turnos/agendaGeneral/"+$("#idFiltroFecha").val(),
			headers: {
				//"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				var list = response;  

				debugger;

				if (list.length > 0){

					$("#tbodyAgenda").empty();

					for (var i = 0; i < list.length; i++) {

							debugger;
							var idTurnoAsignado = list[i].idTurnoAsignado;
							var idPaciente = list[i].idPaciente;
							var idProfesional = list[i].idProfesional;
							var profesional = list[i].apellidoProfesional + ", " + list[i].nombreProfesional;
							var especialidad = list[i].especialidad
							var fecha = list[i].fecha;
							var hora = list[i].hora;
							var paciente = list[i].apellidoPaciente+ ", " + list[i].nombrePaciente;
							var dni = list[i].dniPaciente;
							var tipoConsulta = list[i].tipoConsulta;
							var motivo = list[i].motivoConsulta;
							var estadoPago = list[i].estadoPago;

							debugger;

							if (estadoPago == "APROBADO"){

								$("#tbodyAgenda").append('<tr style="background: #b0e8bb"><td style="display: none;">'+idTurnoAsignado+'</td><td style="display: none;">'+idPaciente+'</td><td style="display: none;">'+idProfesional+'</td><td>'+fecha+'</td><td>'+hora+'</td><td>'+profesional+'</td><td>'+especialidad+'</td><td>'+paciente+'</td><td>'+dni+'</td><td>'+tipoConsulta+'</td><td>'+motivo+'</td><<td colspan="2"><div align="center"><i onclick="verDatosPaciente(\'' + dni + '\')"class="material-icons button person" style="margin-right:3px; cursor: pointer;" title="Ver datos del paciente">person</i><td>'+estadoPago+'</td></tr>');

							}else{

								$("#tbodyAgenda").append('<tr style="background: #ffe083a3"><td style="display: none;">'+idTurnoAsignado+'</td><td style="display: none;">'+idPaciente+'</td><td style="display: none;">'+idProfesional+'</td><td>'+fecha+'</td><td>'+hora+'</td><td>'+profesional+'</td><td>'+especialidad+'</td><td>'+paciente+'</td><td>'+dni+'</td><td>'+tipoConsulta+'</td><td>'+motivo+'</td><<td colspan="2"><div align="center"><i onclick="verDatosPaciente(\'' + dni + '\')"class="material-icons button person" style="margin-right:3px; cursor: pointer;" title="Ver datos del paciente">person</i><td>'+estadoPago+'</td></tr>');
							}


					}
				}else{
					$("#tbodyAgenda").empty();
				}
			}
		});
	}
}