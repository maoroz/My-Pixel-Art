var myPixelDraw = {
	colorPicked: 0,
	cellColor: "#ffffff",
	defaultCells: 30,
	coloring: false,
	balde: false,
	fns: {
		calcSize: function(cantCells)
		{
			//if (typeof cantCells !== typeof myPixelDraw.defaultCells) 
			if (typeof cantCells === "undefined"){
				cantCells = myPixelDraw.defaultCells;
				console.log("El valor es " + cantCells);
			}
			var totalCeldas = cantCells * cantCells;
			myPixelDraw.container.empty();
			for (var i = 0; i < totalCeldas; i++) {
				myPixelDraw.container.append( $("<div class='celda' draggable></div>") );
			}

			var tamanioDeCelda = myPixelDraw.container.width() / cantCells;
			$(".celda").width(tamanioDeCelda);
			$(".celda").height(tamanioDeCelda);
		},
		reSize: function()
		{
			$("#botonTamanio").click(function(){
				var nuevoTamanio = $("#valorTamanio").val();
				if (!isNaN(nuevoTamanio)) {
					if ( (nuevoTamanio <= 50) && (nuevoTamanio >= 1) )
					//if !(nuevoTamanio >50 || nuevoTamanio < 1) 
					{
						// quita decimal myPixelDraw.fns.calcSize( Math.floor(nuevoTamanio) );
						myPixelDraw.fns.calcSize( Math.round(nuevoTamanio) );
					}
					else{
						alert("El valor debe estar entre 1 y 50.");
					}
				}	
				else{
					if (nuevoTamanio === "") { alert("Ingrese un valor."); }
					else{ alert(nuevoTamanio + " no es correcto."); }
				}
			});
		},
		detectMouseUp: function()
		{
			$(document).mouseup(function(){
				myPixelDraw.coloring = false;
			});
		},
		colorPalette: function()
		{
			$("#color-pick>div").each(function(posicion, elemento){
				var color = $(elemento).attr("class");
				$(elemento).css("background-color", color);
				//$(elemento).css({backgroundColor: color});
			});
		},
		pickColor: function()
		{	
			$("#color-pick div").click(function(){
				myPixelDraw.colorPicked = $(this).attr("class").split(" ")[0];
				$("#color-pick div.colorSeleccionado").removeClass("colorSeleccionado");
				$(this).addClass("colorSeleccionado");
				myPixelDraw.balde = false;
			});
		},
		colorIt: function()
		{
			//.on(); función interna a la cual llama click();
			//1er parametro: evento/s, entre comillas sin comas (p/+ de 2 eventos)
			//2do parametro: elemento
			//3er parametro: función
			$(document).on( 'mousedown', '.celda' , function(evento){
				evento.preventDefault();
				myPixelDraw.coloring = true;
				/*if (evento.button === 0) {
				//if ( (evento.button === 1) || (evento.button === 2) || ( (evento.keyCode === 90) && (evento.ctrlKey) ) ) {
					$(this).css("background-color", myPixelDraw.cellColor);
				}*/
				if (evento.button === 0)
				{
					//pinta
					$(this).css("background-color", myPixelDraw.colorPicked);
				}
				else
				{
					//borrar con button 1 y 2
					$(this).css("background-color", myPixelDraw.cellColor);
				}
				
			});
		},
		colorOnDrag: function()
		{
			//$(document).on('mousemove', '.celda', function(){})
			$(document).mousemove(function(evento){
				var x = evento.clientX;
				var y = evento.clientY;
				var elementoSeleccionado = document.elementFromPoint(x, y);
				if ( $(elementoSeleccionado).hasClass("celda") && myPixelDraw.coloring === true) {
					if (evento.button === 0)
					{
						//pinta
						$(elementoSeleccionado).css("background-color", myPixelDraw.colorPicked);
					}
					else
					{
						//borrar con button 1 y 2
						$(elementoSeleccionado).css("background-color", myPixelDraw.cellColor);
					}
				}
			});
		},
		reset: function()
		{
			$("#reset").click(function(){
				$(".celda").css("background-color", myPixelDraw.cellColor);
			});
		},
		toggleBorders: function()
		{
			$("#toggle-border").click(function(){
				$(".celda").toggleClass("sinBorde");
			});
		},
		disableRightclick: function()
		{
			//habilita el click derecho
			myPixelDraw.container.on("contextmenu", function(){
				return false;
			});
		},
		grabImage: function()
		{
			$("#save-image").click(function(){
				$("#imgApareceDentro").empty();
				$("#contenedorImg").css("visibility" , "visible");
				html2canvas( document.getElementById("container") , {
					onrendered: function(canvas){
						document.getElementById("imgApareceDentro").appendChild(canvas);
						$("canvas").css({
							"background-color" : "#ffffff",
						});
					}
				});
			});
			$("#fondoContenedorImg").click(function(){
				$("#contenedorImg").css("visibility" , "hidden");
			});
			/*
			$("#save-image").click(function(){
				html2canvas( document.getElementById("container") , {
					onrendered: function(canvas){
						document.body.appendChild(canvas);
						$("canvas").css({
							"background-color" : "#ffffff",
						});
					}
				});
			});*/
		},
		//($(document).innerHeight() - $(".contenedorPadre").height())/2
		pintarTodo: function(){
			$("#pintarTodasGrillas").click(function(){
				myPixelDraw.balde = true;				
				$(document).on( 'mousedown', '.celda' , function(evento){
					evento.preventDefault();
					myPixelDraw.coloring = true;
					if (evento.button === 0 && myPixelDraw.balde === true)
					{
						//pinta
						$(".celda").css("background-color", myPixelDraw.colorPicked);
					}
				});
			});
		},
		centrar: function()
		{
			var marginVertical = ($(document).innerHeight() - $("body").height())/2;
			$("#contenedorPadre").css("margin", (marginVertical + "px auto"));
			//$("#contenedorPadre").css("margin", "66px auto");
		},
		mostrarMenu: function()
		{
			$("#btnMenu").click(function(){
				$(".nav").toggleClass("visibleNav");
			});
			$("#btnMenuClose").click(function(){
				$(".nav").toggleClass("visibleNav");
			});
		}
	},
	init: function($contenedor)
	{
		this.container = $contenedor;
		var arrayFunciones = Object.keys(this.fns);
		//for (var i = 0; i < Object.keys(this.fns).length; i++)
		//myPixelDraw.fns["x"]();
		//myPixelDraw.x();
		for (var i = 0; i < arrayFunciones.length; i++) {
			this.fns[arrayFunciones[i]]();
		}
	}
};

$(document).ready( function(){
	myPixelDraw.init($("#container"));
});