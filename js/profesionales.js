function inicio(){


	window.location = "index.html";

}

function salir() {
    debugger;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    window.location = "login.html";
}


function ModifDatos(){

	window.location = "altaProfesional.html?idProfesional="+$("#idProfesional").val();

}


function irAgregarHorarios(){

	window.location = "horarios.html?idProfesional="+$("#idProfesional").val();

}


function modifHorarios(idHorario){

	debugger;

	sessionStorage.setItem("sessionStorage_idHorario", idHorario);

	$('#myModalModifHorarios').modal('show');

	//window.location = "horarios.html?idProfesional="+$("#idProfesional").val()+"&idHorario="+idHorario;
}



function actualizarFoto(){

	window.location = "fotos.html?idProfesional="+$("#idProfesional").val();
}

function Cancelar(){

	var idProfesional = sessionStorage.getItem("sessionStorage_idProfesional");

	window.location = "perfilProfesional.html?idProfesional="+idProfesional;

}

function perfil(){

	parent.document.getElementById("frameInicio").setAttribute('src', "perfilProfesional.html");

}

function agenda(){

	debugger;

	
	parent.document.getElementById("frameInicio").setAttribute('src', "agenda.html");

}

function agendaGeneral(){

	debugger;

	
	parent.document.getElementById("frameInicio").setAttribute('src', "agendaGeneral.html");

}

function Sobreturnos(){
	parent.document.getElementById("frameInicio").setAttribute('src', "sobreturnos.html");	
}

function gestionProfesionales(){

	debugger;

	
	parent.document.getElementById("frameInicio").setAttribute('src', "gestionProfesionales.html");

}

function gestionEspecialidades(){

	debugger;

	
	parent.document.getElementById("frameInicio").setAttribute('src', "gestionEspecialidades.html");

}



function misHorarios(){

	debugger;

	
	parent.document.getElementById("frameInicio").setAttribute('src', "misHorarios.html");

}

function misPrecios(){

	debugger;
	
	parent.document.getElementById("frameInicio").setAttribute('src', "misValoresDeConsulta.html");

}

function licencias(){

	debugger;
	
	parent.document.getElementById("frameInicio").setAttribute('src', "misLicencias.html");

}




function guardarProfesional(){

	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");


	debugger;

	var datosOk = true;
	if($("#nombre").val() == "" || $("#apellido").val() == "" || $("#dni").val()== "" || $("#matricula").val()== "" || $("#especialidad").val()== "" || $("#telefono").val()== "" || $("#mail").val()== "" || $("#valorConsulta").val()== ""){
		datosOk = false;
		$('#errorProfesional').css('display', 'block');
       		$("#errorProfesional").fadeTo(2000, 500).slideUp(500, function(){
       		$("#errorProfesional").slideUp(500);
       		});
	}

	if(datosOk){
		
	    debugger;

		var profesional = {
			nombre:$("#nombre").val().toUpperCase(),
			apellido:$("#apellido").val().toUpperCase(),
			dni:$("#dni").val().toUpperCase(),
			matricula:$("#matricula").val().toUpperCase(),
			especialidad:$("#especialidad").val().toUpperCase(),
			telefono:$("#telefono").val().toUpperCase(),
			mail:$("#mail").val().toUpperCase(),
			instagram:$("#instagram").val(),
			usuario:sessionStorage.getItem("usuario"),
			aliasMP:$("#aliasMP").val()
			/*valorConsulta:$("#valorConsulta").val().toUpperCase()*/
		}

		JSON.stringify(profesional);

		debugger;
		$.ajax({
			type: "POST",
			url: host + "profesionales",
			headers: {
				"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;

				

				$('#profesionalOk').css('display', 'block');
			      	$("#profesionalOk").fadeTo(2000, 500).slideUp(500, function(){
			      	$("#profesionalOk").slideUp(500);

			      	//sessionStorage.setItem("sessionStorage_idProfesional", response.idProfesional);
			      	window.location = "perfilProfesional.html?idProfesional="+response.idProfesional;;
					
			      	
			      	
			       	});
			},

			dataType: "json",
			data: JSON.stringify(profesional),

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


/*function crearUsuario(){

	debugger;

	var datosOk = true;
	if($("#usuario").val() == "" || $("#contraseña").val() == "" || $("#confirmarContraseña").val()== ""){
		datosOk = false;
		$('#errorAltaUsuario').css('display', 'block');
       		$("#errorAltaUsuario").fadeTo(2000, 500).slideUp(500, function(){
       		$("#errorAltaUsuario").slideUp(500);
       		});
	}else{
		if($("#contraseña").val() != $("#confirmarContraseña").val()){
		datosOk = false;
		$('#errorContraseñaDiferente').css('display', 'block');
       		$("#errorContraseñaDiferente").fadeTo(2000, 500).slideUp(500, function(){
       		$("#errorContraseñaDiferente").slideUp(500);
       		});
		}
	}

	if(datosOk){
		
		var paramstr = window.location.search.substr(1);
   		var paramarr = paramstr.split ("&");
   		var params = {};

    	for ( var i = 0; i < paramarr.length; i++) {
        	var tmparr = paramarr[i].split("=");
        	params[tmparr[0]] = tmparr[1];
    	}

    	var idProf = params["idProfesional"]
		
	    debugger;

		var usuario = {
			usuario:$("#usuario").val(),
			contraseña:$("#contraseña").val(),
			idProfesional:idProf,
		}

		JSON.stringify(usuario);

		debugger;
		$.ajax({
			type: "POST",
			url: host + "usuarios",
			headers: {
				//"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;

				

				$('#usuarioOk').css('display', 'block');
			      	$("#usuarioOk").fadeTo(2000, 500).slideUp(500, function(){
			      	$("#usuarioOk").slideUp(500);
			      	
			      	sessionStorage.setItem("idProfesional", response.idProfesional);
					window.location = "siteProfesional.html";
			      	
			       	});
			},

			dataType: "json",
			data: JSON.stringify(usuario),

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
*/
/*function ingresar(){

	debugger;

	var url = host + 'usuarios/login';
	var credentials = $("#usuario").val() + ":" + $("#contraseña").val();
    var auth = "Basic " + btoa(credentials);

	
	$.ajax({
		type: "GET",
		url: hostUsuarios + "usuarios/login",
		headers: {
            'Authorization':auth,
            'Content-Type':'application/json'
        },
		success: function(response)
		{
			debugger;
			sessionStorage.setItem("idProfesional", response.idProfesional);
			sessionStorage.setItem("token", "Bearer " + response);
			window.location = "siteProfesional.html";
		},
		error: function(xhr, status, error) {
            debugger;
            $('#usuYPassNoExiste').css('display', 'block');
            $("#usuYPassNoExiste").fadeTo(2000, 500).slideUp(500, function(){
            $("#usuYPassNoExiste").slideUp(500);
            });
          
        }
	});

}*/



function modifProfesional(){

	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");

	debugger;

	var datosOk = true;
	if($("#nombre").val() == "" || $("#apellido").val() == "" || $("#dni").val()== "" || $("#matricula").val()== "" || $("#especialidad").val()== "" || $("#telefono").val()== "" || $("#mail").val()== ""){
		datosOk = false;
		$('#errorProfesional').css('display', 'block');
       		$("#errorProfesional").fadeTo(2000, 500).slideUp(500, function(){
       		$("#errorProfesional").slideUp(500);
       		});
	}

	if(datosOk){
	
	    debugger;
	    var idProfesional = sessionStorage.getItem("sessionStorage_idProfesional");

		var profesional = {
			nombre:$("#nombre").val().toUpperCase(),
			apellido:$("#apellido").val().toUpperCase(),
			dni:$("#dni").val().toUpperCase(),
			matricula:$("#matricula").val().toUpperCase(),
			especialidad:$("#especialidad").val().toUpperCase(),
			telefono:$("#telefono").val().toUpperCase(),
			mail:$("#mail").val().toUpperCase(),
			instagram:$("#instagram").val(),
			aliasMP:$("#aliasMP").val()
			/*valorConsulta:$("#valorConsulta").val().toUpperCase()*/
		}

		JSON.stringify(profesional);

		debugger;
		$.ajax({
			type: "PUT",
			url: host + "profesionales/"+idProfesional,
			headers: {
				"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;

				$('#profesionalOk').css('display', 'block');
			      	$("#profesionalOk").fadeTo(2000, 500).slideUp(500, function(){
			      	$("#profesionalOk").slideUp(500);
			      	
			      	
			      	window.location = "perfilProfesional.html?idProfesional="+idProfesional;

			       	});
			},

			dataType: "json",
			data: JSON.stringify(profesional),

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

function buscarHorarios(idProfesional){
	
	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");

	debugger;

	//var idProfesional = $("#idProfesional").val()

	debugger;

	$.ajax({
		type: "GET",
		url: host + "horarios/diasDeAtencion/"+idProfesional,
		headers: {
			"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
			
			$('#tbodyHorarios').empty();
			for (var i = 0; i < response.length; i++) {

				debugger;
				var idHorario = response[i].idHorario;
				var dia = response[i].diaDeSemana;
				var horario = response[i].horaDesde+ " a " + response[i].horaHasta;
				var tipoTurno = response[i].tipoTurno;
				var duracion = response[i].duracionTurnos + " min";
				var eventual = response[i].fechaHorarioEventual;
				debugger;

				$("#tbodyHorarios").append('<tr><td style="display: none;">'+idHorario+'</td><td>'+dia+'</td><td>'+horario+'</td><td>'+tipoTurno+'</td><td>'+duracion+'</td><td>'+eventual+'</td><<td colspan="2"><div align="center"><i onclick="modifHorarios(\'' + idHorario + '\')"class="material-icons button edit" style="margin-right:3px; cursor: pointer;">edit</i><i onclick="deleteHorarios(\'' + idHorario + '\')"class="material-icons button delete" style="margin-right:3px; cursor: pointer;">delete</i></div></td></tr>');
			}
		}
	});

}


function deleteHorarios(idHorario){

	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");

	debugger;
	
	$.ajax({
		type: "DELETE",
		url: host + "horarios/"+idHorario,
		headers: {
			"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;
			
			//window.location = "misHorarios.html";
			var idProfesional = sessionStorage.getItem("sessionStorage_idProfesional");
			window.location = "perfilProfesional.html?idProfesional="+idProfesional;
		}
	});
	
}

function buscarEspecialidades(){
	debugger;
			
		$.ajax({
			type: "GET",
			url: host + "especialidades/all",
			headers: {
				//"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;
				$("#especialidad").append('<option value="">Especialidades</option>');
				for (var i = 0; i < response.length; i++) {

					var especialidades = response[i].especialidad;

					$("#especialidad").append('<option>'+especialidades+'</option>');
				}
			}
		});

}


function darDeBaja(idProfesional){

	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");
	

	debugger;
		$.ajax({
			type: "PUT",
			url: host + "profesionales/OFF/"+idProfesional,
			headers: {
				"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;

				location.reload();
			},

		})
		
}

function darDeAlta(idProfesional){

	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");
	

	debugger;
		$.ajax({
			type: "PUT",
			url: host + "profesionales/ON/"+idProfesional,
			headers: {
				"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;

				location.reload();
			},

		})
		
}