function Cancelar(){

	var idProfesional = sessionStorage.getItem("sessionStorage_idProfesional");

	window.location = "perfilProfesional.html?idProfesional="+idProfesional;


}


function guardarHorario(){

	debugger;

	var datosOk = true;
	if($("#comboDiaDeSemana").val() == "Seleccione dia de la semana" || $("#tipoTurno").val() == "" || $("#horaDesde").val()== "" || $("#minutosDesde").val()== "" || $("#horaHasta").val()== "" || $("#minutosHasta").val()== "" || $("#duracionTurnos").val()== ""){
		datosOk = false;
		$('#errorHorario').css('display', 'block');
       		$("#errorHorario").fadeTo(2000, 500).slideUp(500, function(){
       		$("#errorHorario").slideUp(500);
       		});
	}

	if(datosOk){
		
		idProfesional = sessionStorage.getItem("sessionStorage_idProfesional");
	    debugger;

		var horario = {
			diaDeSemana:$("#comboDiaDeSemana").val().toUpperCase(),
			tipoTurno:$("#comboTipoTurno").val().toUpperCase(),
			horaDesde:$("#horaDesde").val(),
			minutosDesde:$("#minutosDesde").val(),
			horaHasta:$("#horaHasta").val(),
			minutosHasta:$("#minutosHasta").val(),
			duracionTurnos:$("#duracionTurnos").val()
		}

		JSON.stringify(horario);

		debugger;
		$.ajax({
			type: "PUT",
			url: host + "profesionales/horario/"+idProfesional,
			headers: {
				//"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;

				

				$('#horarioOk').css('display', 'block');
			      	$("#horarioOk").fadeTo(2000, 500).slideUp(500, function(){
			      	$("#horarioOk").slideUp(500);

			      	window.location = "perfilProfesional.html?idProfesional="+idProfesional;
			      	
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


function modifHorario(){

	debugger;

	var datosOk = true;
	if($("#comboDiaDeSemana").val() == "Seleccione dia de la semana" || $("#tipoTurno").val() == "" || $("#horaDesde").val()== "" || $("#minutosDesde").val()== "" || $("#horaHasta").val()== "" || $("#minutosHasta").val()== "" || $("#duracionTurnos").val()== ""){
		datosOk = false;
		$('#errorHorario').css('display', 'block');
       		$("#errorHorario").fadeTo(2000, 500).slideUp(500, function(){
       		$("#errorHorario").slideUp(500);
       		});
	}

	if(datosOk){
		
		var idProfesional = sessionStorage.getItem("sessionStorage_idProfesional");
		var idHorario = sessionStorage.getItem("sessionStorage_idHorario");

	    debugger;

		var horario = {
			diaDeSemana:$("#comboDiaDeSemana").val().toUpperCase(),
			tipoTurno:$("#comboTipoTurno").val().toUpperCase(),
			horaDesde:$("#horaDesde").val(),
			minutosDesde:$("#minutosDesde").val(),
			horaHasta:$("#horaHasta").val(),
			minutosHasta:$("#minutosHasta").val(),
			duracionTurnos:$("#duracionTurnos").val()
		}

		JSON.stringify(horario);

		debugger;
		$.ajax({
			type: "PUT",
			url: host + "horarios/"+idHorario,
			headers: {
				//"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;

				

				$('#horarioOk').css('display', 'block');
			      	$("#horarioOk").fadeTo(2000, 500).slideUp(500, function(){
			      	$("#horarioOk").slideUp(500);

			      	window.location = "perfilProfesional.html?idProfesional="+idProfesional;
			      	
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
	debugger;
			
		$.ajax({
			type: "GET",
			url: host + "tipoTurno/all",
			headers: {
				//"Authorization": token,
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