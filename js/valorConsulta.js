function irAgregarValorConsulta(){

	window.location = "valorConsulta.html?idProfesional="+$("#idProfesional").val();

}


function buscarTipoTurnoValorConsulta(idProfesional){
	debugger;

	$("#comboTipoTurno").empty();

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
			$("#comboTipoTurno").append('<option value="">Tipo de turno</option>');
			for (var i = 0; i < response.length; i++) {

				debugger;
				var tipoTurno = response[i].tipoTurno;

				$("#comboTipoTurno").append('<option>'+tipoTurno+'</option>');

			}
			debugger;
		}
	});
}

function guardarValorConsulta(){

	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");

	debugger;

	var datosOk = true;
	if($("#comboTipoTurno").val() == "Tipo de turno" || $("#comboTipoTurno").val() == "" || $("#valorConsulta").val() == "$" || $("#valorConsulta").val() == ""){
		datosOk = false;
		$('#avisoError').css('display', 'block');
       		$("#avisoError").fadeTo(2000, 500).slideUp(500, function(){
       		$("#avisoError").slideUp(500);
       		});
	}

	if(datosOk){
		
	    debugger;
	    
		var valorTurnoModel = {
			idValorConsulta:"",
			idProfesional:sessionStorage.getItem("idProfesional"),
			tipoConsulta:$("#comboTipoTurno").val().toUpperCase(),
			valorConsulta:$("#valorConsulta").val(),
			
		}

		JSON.stringify(valorTurnoModel);

		debugger;
		$.ajax({
			type: "POST",
			url: host + "valorConsulta",
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

			      	//window.location = "perfilProfesional.html?idProfesional="+idProfesional;
			      	window.location = "misValoresDeConsulta.html";
			      	
			       	});
			},

			dataType: "json",
			data: JSON.stringify(valorTurnoModel),

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

function buscarValoresDeConsultas(idProfesional){
	debugger;

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
				$('#tbodyValorConsulta').empty();
				for (var i = 0; i < response.length; i++) {

					debugger;
					var idValorConsulta = response[i].idValorConsulta;
					var tipoConsulta = response[i].tipoConsulta;
					var valorConsulta = response[i].valorConsulta;
					
					debugger;

					$("#tbodyValorConsulta").append('<tr><td style="display: none;">'+idValorConsulta+'</td><td>'+tipoConsulta+'</td><td>'+valorConsulta+'</td><<td colspan="2"><div align="center"><i onclick="irModifValorConsulta(\'' + idValorConsulta + '\')"class="material-icons button edit" style="margin-right:3px; cursor: pointer;">edit</i><i onclick="deleteValorConsulta(\'' + idValorConsulta + '\')"class="material-icons button delete" style="margin-right:3px; cursor: pointer;">delete</i></div></td></tr>');
				}
			}
		});

}


function irModifValorConsulta(idValorConsulta){

	debugger;

	window.location = "valorConsulta.html?idValorConsulta="+idValorConsulta;

}

function modifValorConsulta(){

	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");

	debugger;

	var datosOk = true;
	if($("#comboTipoTurno").val() == "Tipo de turno" || $("#comboTipoTurno").val() == "" || $("#valorConsulta").val() == "$" || $("#valorConsulta").val() == ""){
		datosOk = false;
		$('#avisoError').css('display', 'block');
       		$("#avisoError").fadeTo(2000, 500).slideUp(500, function(){
       		$("#avisoError").slideUp(500);
       		});
	}

	if(datosOk){

	    debugger;

		var valorTurnoModel = {
			idValorConsulta:"",
			idProfesional:sessionStorage.getItem("sessionStorage_idProfesional"),
			tipoConsulta:$("#comboTipoTurno").val().toUpperCase(),
			valorConsulta:$("#valorConsulta").val(),
			
		}

		JSON.stringify(valorTurnoModel);

		debugger;
		$.ajax({
			type: "PUT",
			url: host + "valorConsulta/"+$("#idValorConsulta").val(),
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

			      	//window.location = "perfilProfesional.html?idProfesional="+idProfesional;
			      	window.location = "misValoresDeConsulta.html";
			      	
			       	});
			},

			dataType: "json",
			data: JSON.stringify(valorTurnoModel),

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


function cancelarValorConsulta(){

	//var idProfesional = sessionStorage.getItem("sessionStorage_idProfesional");
	//window.location = "perfilProfesional.html?idProfesional="+idProfesional;

	window.location = "misValoresDeConsulta.html";

}


function deleteValorConsulta(idValorConsulta){

	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");

	var idProfesional = sessionStorage.getItem("sessionStorage_idProfesional");

	debugger;
	
	$.ajax({
		type: "DELETE",
		url: host + "valorConsulta/"+idValorConsulta,
		headers: {
			"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
			
			buscarValoresDeConsultas(idProfesional);

			debugger;
		}
	});
}