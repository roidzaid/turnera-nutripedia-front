function Cancelar(){

	window.location = "index.html";

}


function buscarPaciente(){
	
	$.ajax({
		type: "GET",
		url: host + "pacientes/"+$("#dni").val(),
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;

			$("#datosPersonales").css("display", "block");
			$("#botones").css("display", "block");
			$("#idPaciente").val(response.idPaciente);
			$("#nombre").val(response.nombre);
			$("#apellido").val(response.apellido);
			$("#dniBD").val(response.dni);
			$("#fechaNac").val(response.fechaNac);
			$("#direccion").val(response.direccion);
			$("#localidad").val(response.localidad);
			$("#telefono").val(response.telefono);
			$("#mail").val(response.mail);

			$("#datosPersonales").prop('disabled', true);
			$("#botones").prop('disabled', true);
			$("#idPaciente").prop('disabled', true);
			$("#nombre").prop('disabled', true);
			$("#apellido").prop('disabled', true);
			$("#dniBD").prop('disabled', true);
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
				//window.location = "altaPacientes.html?dni="+$("#dni").val();

				$('#myModal3').modal('show');	


			}else{
				debugger;
			alert("Error al buscar el paciente");
			}

		}
	});
}

function primeraVez() {
	
	$('#myModal3').modal('hide');	
	window.location = "altaPacientes.html?dni="+$("#dni").val();
	

}

function volverAIntentar(){

	$('#myModal3').modal('hide');
}

function guardarPaciente(){

	debugger;

	var datosOk = true;
	if($("#nombre").val() == "" || $("#apellido").val() == "" || $("#dni").val()== "" || $("#fechaNac").val()== "" || $("#direccion").val()== "" || $("#localidad").val()== "" || $("#telefono").val()== "" || $("#mail").val()== ""){
		datosOk = false;
		$('#errorPaciente').css('display', 'block');
       		$("#errorPaciente").fadeTo(2000, 500).slideUp(500, function(){
       		$("#errorPaciente").slideUp(500);
       		});
	}

	if(datosOk){
		debugger;

		var paciente = {
			nombre:$("#nombre").val().toUpperCase(),
			apellido:$("#apellido").val().toUpperCase(),
			dni:$("#dni").val().toUpperCase(),
			fechaNac:$("#fechaNac").val().toUpperCase(),
			direccion:$("#direccion").val().toUpperCase(),
			localidad:$("#localidad").val().toUpperCase(),
			telefono:$("#telefono").val().toUpperCase(),
			mail:$("#mail").val().toUpperCase()
			
		}

		JSON.stringify(paciente);

		debugger;
		$.ajax({
			type: "POST",
			url: host + "pacientes",
			headers: {
				//"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;

				$('#pacienteOk').css('display', 'block');
			      	$("#pacienteOk").fadeTo(2000, 500).slideUp(500, function(){
			      	$("#pacienteOk").slideUp(500);
			      	window.location = "buscarPaciente.html?dni="+$("#dni").val();
			       	});


		       	
			},

			dataType: "json",
			data: JSON.stringify(paciente),

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


function confirmarDatosPersonales(){

	sessionStorage.setItem("sessionStorage_IdPaciente", $("#idPaciente").val());

	var especialidad = sessionStorage.getItem("sessionStorage_especialidad");
			var idProfesional = sessionStorage.getItem("sessionStorage_idProfesional");

			debugger;
			
			$.ajax({
				type: "GET",
				url: host + "profesionales/id/"+idProfesional,
				headers: {
				//	"Authorization": token,
					"Content-Type":"application/json"
				},
				success: function(response)
				{
					debugger;
					
					var nombreProfesional = response.nombre;
					var apellidoProfesional = response.apellido;

					var idPaciente = sessionStorage.getItem("sessionStorage_IdPaciente");

					debugger;
					
					$.ajax({
						type: "GET",
						url: host + "pacientes/id/"+idPaciente,
						headers: {
							//"Authorization": token,
							"Content-Type":"application/json"
						},
						success: function(response)
						{
							debugger;
							
							var nombrePaciente = response.nombre;
							var apellidoPaciente = response.apellido;
							var dniPaciente = response.dni;

							debugger;
							var idHorarioYFecha = sessionStorage.getItem("sessionStorage_idHorarioYFecha");

							var partsArray = idHorarioYFecha.split('-');
							var idHorario = partsArray[0];
							var fecha = partsArray[1]+"-"+partsArray[2]+"-"+partsArray[3];


					        var idConfiguracionTurno = sessionStorage.getItem("sessionStorage_idConfiguracionTurno");

							debugger;
							
							$.ajax({
								type: "GET",
								url: host + "horarios/configuracionTurno/"+idConfiguracionTurno,
								headers: {
									//"Authorization": token,
									"Content-Type":"application/json"
								},
								success: function(response)
								{
									debugger;
									
									var hora = response.hora;

									debugger;
									$("#parrafoConfirmacionTurno").text("Por favor, confirme el turno con: " + apellidoProfesional + ", " + nombreProfesional + " para el/la consultante " +  apellidoPaciente + ", " + nombrePaciente + " el día " + fecha + " a las " + hora + "hs");

									$('#myModal2').modal('show');

								}
							});

						}
					});

					
				}
			});
	

}

function modifcarDatosPaciente(){

	$("#datosPersonales").prop('disabled', false);
	$("#botones").prop('disabled', false);
	$("#idPaciente").prop('disabled', false);
	$("#nombre").prop('disabled', false);
	$("#apellido").prop('disabled', false);
	$("#dniBD").prop('disabled', false);
	$("#fechaNac").prop('disabled', false);
	$("#direccion").prop('disabled', false);
	$("#localidad").prop('disabled', false);
	$("#telefono").prop('disabled', false);
	$("#mail").prop('disabled', false);

	$("#btnconfirmarDatosPersonales").css("display", "none");	
	$("#btnModifcarDatosPaciente").css("display", "none");	
    $("#btnGuardarModifcarDatosPaciente").css("display", "inline-block");	

}


function guardarModifcarDatosPaciente() {
	
	debugger;

	var datosOk = true;
	if($("#nombre").val() == "" || $("#apellido").val() == "" || $("#dni").val()== "" || $("#fechaNac").val()== "" || $("#direccion").val()== "" || $("#localidad").val()== "" || $("#telefono").val()== "" || $("#mail").val()== ""){
		datosOk = false;
		$('#errorPaciente').css('display', 'block');
       		$("#errorPaciente").fadeTo(2000, 500).slideUp(500, function(){
       		$("#errorPaciente").slideUp(500);
       		});
	}

	if(datosOk){
		debugger;

		var paciente = {
			idPaciente:$("#idPaciente").val(),
			nombre:$("#nombre").val().toUpperCase(),
			apellido:$("#apellido").val().toUpperCase(),
			dni:$("#dniBD").val().toUpperCase(),
			fechaNac:$("#fechaNac").val().toUpperCase(),
			direccion:$("#direccion").val().toUpperCase(),
			localidad:$("#localidad").val().toUpperCase(),
			telefono:$("#telefono").val().toUpperCase(),
			mail:$("#mail").val().toUpperCase()
			
		}

		JSON.stringify(paciente);

		debugger;
		$.ajax({
			type: "PUT",
			url: host + "pacientes",
			headers: {
				//"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;

				$('#pacienteOk').css('display', 'block');
			      	$("#pacienteOk").fadeTo(2000, 500).slideUp(500, function(){
			      	$("#pacienteOk").slideUp(500);
			      	
			      	location.reload();
			       	
			       	});


		       	
			},

			dataType: "json",
			data: JSON.stringify(paciente),

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
