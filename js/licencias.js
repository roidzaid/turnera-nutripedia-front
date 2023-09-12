function irAgregarLicencias(){

	idProfesional = sessionStorage.getItem("sessionStorage_idProfesional")

	window.location = "licencias.html?idProfesional="+idProfesional;

}


function irModifLicencia(idProfesional, idLicencia){

	

	window.location = "licencias.html?idProfesional="+idProfesional+"&idLicencia="+idLicencia;

}

function cancelarLicencia(){

	//window.location = "misLicencias.html";
	window.location = "perfilProfesional.html?idProfesional="+idProfesional;


}


function buscarLicencias(idProfesional){
	
	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");

	debugger;

	$.ajax({
			type: "GET",
			url: host + "licencias/lista/"+idProfesional,
			headers: {
				"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;
				$('#tbodyLicencias').empty();
				for (var i = 0; i < response.length; i++) {

					debugger;
					var idLicencia = response[i].idLicencia;
					var idProfesional = response[i].idProfesional;
					var fechaDesde = response[i].diaDesde;
					var fechaHasta = response[i].diaHasta;
					var motivo = response[i].motivoDeLicencia;
					
					debugger;

					$("#tbodyLicencias").append('<tr><td style="display: none;">'+idLicencia+'</td><td style="display: none;">'+idProfesional+'</td><td>'+fechaDesde+'</td><td>'+fechaHasta+'</td><td>'+motivo+'</td><<td colspan="2"><div align="center"><i onclick="irModifLicencia(\'' + idProfesional+ '\', \'' +idLicencia+ '\')"class="material-icons button edit" style="margin-right:3px; cursor: pointer;">edit</i><i onclick="deleteLicencia(\'' + idProfesional+ '\', \'' +idLicencia+ '\')"class="material-icons button delete" style="margin-right:3px; cursor: pointer;">delete</i></div></td></tr>');
				}
			}
		});
}


function buscarLicencia(idProfesional, idLicencia){
	
	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");

	debugger;

	$.ajax({
			type: "GET",
			url: host + "licencias/"+idProfesional+"/"+idLicencia,
			headers: {
				"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;
				

				var paramarr = response.diaDesde.split ("-");

				var diaDesde = paramarr[0];
				var mesDesde = paramarr[1];
				var añoDesde = paramarr[2];

				var paramarr = response.diaHasta.split ("-");

				var diaHasta = paramarr[0];
				var mesHasta = paramarr[1];
				var añoHasta = paramarr[2];


				$("#idLicencia").val(response.idLicencia);
				$("#idProfesional").val(response.idProfesional);
				$("#fechaDesde").val(añoDesde+"-"+mesDesde+"-"+diaDesde);
				$("#fechaHasta").val(añoHasta+"-"+mesHasta+"-"+diaHasta);
				$("#motivoLicencia").val(response.motivoDeLicencia);
					
				
			}
		});
}


function guardarLicencia(){

	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");

	debugger;

	var datosOk = true;
	if($("#fechaDesde").val() == "" || $("#fechaHasta").val() == ""){
		datosOk = false;
		$('#avisoError').css('display', 'block');
       		$("#avisoError").fadeTo(2000, 500).slideUp(500, function(){
       		$("#avisoError").slideUp(500);
       		});
	}

	if(datosOk){
		
	    debugger;

		var LicenciaModel = {
			idLicencia:"",
			idProfesional:$("#idProfesional").val(),
			diaDesde:$("#fechaDesde").val(),
			diaHasta:$("#fechaHasta").val(),
			motivoDeLicencia:$("#motivoLicencia").val(),
			
		}

		JSON.stringify(LicenciaModel);

		debugger;
		$.ajax({
			type: "POST",
			url: host + "licencias",
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

			      	window.location = "perfilProfesional.html?idProfesional="+idProfesional;
			      	//window.location = "misLicencias.html";
			      	
			       	});
			},

			dataType: "json",
			data: JSON.stringify(LicenciaModel),

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


function modifLicencia(){

	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");

	debugger;

	var idProfesional = $("#idProfesional").val()
	var idLicencia = $("#idLicencia").val()

	var datosOk = true;
	if($("#fechaDesde").val() == "" || $("#fechaHasta").val() == ""){
		datosOk = false;
		$('#avisoError').css('display', 'block');
       		$("#avisoError").fadeTo(2000, 500).slideUp(500, function(){
       		$("#avisoError").slideUp(500);
       		});
	}

	if(datosOk){
		
	    debugger;

		var LicenciaModel = {
			idLicencia:"",
			idProfesional:$("#idProfesional").val(),
			diaDesde:$("#fechaDesde").val(),
			diaHasta:$("#fechaHasta").val(),
			motivoDeLicencia:$("#motivoLicencia").val(),
			
		}

		JSON.stringify(LicenciaModel);

		debugger;
		$.ajax({
			type: "PUT",
			url: host + "licencias/"+idProfesional+"/"+idLicencia,
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

			      	window.location = "perfilProfesional.html?idProfesional="+idProfesional;
			      	//window.location = "misLicencias.html";
			      	
			       	});
			},

			dataType: "json",
			data: JSON.stringify(LicenciaModel),

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

function deleteLicencia(idProfesional, idLicencia){

	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");

	debugger;
	
	$.ajax({
		type: "DELETE",
		url: host + "licencias/"+idProfesional+"/"+idLicencia,
		headers: {
			"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
			
			buscarLicencias(idProfesional)

			debugger;
		}
	});
}