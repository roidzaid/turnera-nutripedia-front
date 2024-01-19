function registrarse(){

	//window.location = "altaProfesional.html";
	window.location = "crearUsuario.html";

}


function cancelar(){
	window.location = "login.html";	
}

function ingresar(){

	debugger;

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
			sessionStorage.setItem("usuario", $("#usuario").val());
			sessionStorage.setItem("token", "Bearer " + response);



			$.ajax({
				type: "GET",
				url: hostUsuarios + "usuarios/buscarUsuario/"+$("#usuario").val(),
				headers: {
		            'Authorization':auth,
		            'Content-Type':'application/json'
		        },
				success: function(response)
				{
					debugger;

					if(response.actualizar == true){
						window.location = "actualizarContraseña.html";	
					}else{
						window.location = "siteProfesional.html";						
					}
					
				},
				error: function(xhr, status, error) {
		            debugger;
		            $('#usuYPassNoExiste').css('display', 'block');
		            $("#usuYPassNoExiste").fadeTo(2000, 500).slideUp(500, function(){
		            $("#usuYPassNoExiste").slideUp(500);
		            });
		          
		        }
			});

		},
		error: function(xhr, status, error) {
            debugger;
            $('#usuYPassNoExiste').css('display', 'block');
            $("#usuYPassNoExiste").fadeTo(2000, 500).slideUp(500, function(){
            $("#usuYPassNoExiste").slideUp(500);
            });
          
        }
	});

}


function crearUsuario(){

	debugger;

	var datosOk = true;
	if($("#usuario").val() == "" || $("#contraseña").val() == "" || $("#confirmarContraseña").val()== "" || $("#mail").val()== ""){
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
		
	    debugger;

		var usuario = {
			usuario:$("#usuario").val(),
			pass:$("#contraseña").val(),
			aplicacion:aplicacion,
			mail:$("#mail").val().toUpperCase(),
		}

		JSON.stringify(usuario);

		debugger;
		$.ajax({
			type: "POST",
			url: hostUsuarios + "usuarios",
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
				
				//asiganamos el rol de forma manual por autorizacion
				//asignarRol();		      	
				window.location = "login.html";
		      	
		       	});
			},

			//dataType: "json",
			data: JSON.stringify(usuario),

			error: function(jqXHR, textStatus, errorThrown) {
				debugger;

				if(jqXHR.status == 302){
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


function asignarRol(){

	debugger;

	var rol = {
		rol:"PROFESIONAL",
		aplicacion:aplicacion,
	}

	JSON.stringify(rol);

	debugger;
	$.ajax({
		type: "POST",
		url: hostUsuarios + "usuarios/AddRol/" + $("#usuario").val(),
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;


		},

		//dataType: "json",
		data: JSON.stringify(rol),

		error: function(jqXHR, textStatus, errorThrown) {
			
			debugger;
				datosOk = false;
				$('#error').css('display', 'block');
		       		$("#error").fadeTo(2000, 500).slideUp(500, function(){
		       		$("#error").slideUp(500);
		       		});
		}
	});
}

function recuperar(){

	debugger;

	var recuperarPass = {
		usuario:$("#usuario").val(),
		mail:$("#mail").val().toUpperCase(),
	}
	
	JSON.stringify(recuperarPass);

	debugger;
	$.ajax({
		type: "PUT",
		url: hostUsuarios + "usuarios/recuperarPass/",
		headers: {
			//"Authorization": token,
			"Content-Type":"application/json"
		},
		success: function(response)
		{
			debugger;

			$("#mensajeNuevaPass").text(response)

			$('#envioNuevaPass').css('display', 'block');
		       		$("#envioNuevaPass").fadeTo(2000, 500).slideUp(500, function(){
		       		$("#envioNuevaPass").slideUp(500);
		       		window.location = "login.html";	
		       		});
	       	
		},

		//dataType: "json",
		data: JSON.stringify(recuperarPass),

		error: function(jqXHR, textStatus, errorThrown) {
			
			debugger;
				datosOk = false;
				$('#usuYMailNoExisten').css('display', 'block');
		       		$("#usuYMailNoExisten").fadeTo(2000, 500).slideUp(500, function(){
		       		$("#usuYMailNoExisten").slideUp(500);

		       		cancelar();
		       		});
		}
	});

}


function actulizarPass(){

	if (sessionStorage.getItem("token") == null){
		salir();
	}

	debugger;
	var token = sessionStorage.getItem("token");


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
		
	    debugger;

		var usuario = {
			usuario:$("#usuario").val(),
			pass:$("#contraseña").val(),
		}

		JSON.stringify(usuario);

		debugger;
		$.ajax({
			type: "PUT",
			url: hostUsuarios + "usuarios",
			headers: {
				"Authorization": token,
				"Content-Type":"application/json"
			},
			success: function(response)
			{
				debugger;

				$('#usuarioOk').css('display', 'block');
		      	$("#usuarioOk").fadeTo(2000, 500).slideUp(500, function(){
		      	$("#usuarioOk").slideUp(500);
				
				//asiganamos el rol de forma manual por autorizacion
				//asignarRol();		      	
				window.location = "login.html";
		      	
		       	});
			},

			//dataType: "json",
			data: JSON.stringify(usuario),

			error: function(jqXHR, textStatus, errorThrown) {
				debugger;

				if(jqXHR.status == 302){
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
