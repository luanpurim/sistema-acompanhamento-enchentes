var timer; // variavel que recebe o timer de alertas
var alertaAtivo = false; //define o alerta desativado antes de ler cfg

var alturaAlerta;// altura do alerta salvo pelo usuario
var local;//local do alerta salvo pelo usuario

var alturaRio; //altura do fundo do rio

var altitude;//altitude do local
var latitude;// latitude do local atual
var longitude;//longitude do local atual

var nivelRio; // nivel do rio atual

var altEnc = 5.35;

/**
 * preenche tabela com as ultimas medições
 */
function preencheTabela() {
	$.getJSON("funcoes.php?getDadosCeops=12", function (leituras) {
	    var key, object ;
	    for (key in leituras) {
	        if (leituras.hasOwnProperty(key)) {
	            object = leituras[key];
		        $('#tabela').append('<tr><td>' + object['data'] + '</td> <td>' + object['vlr_nivel'] + ' m</td>S </tr>');
	        }
   		}	
	});
}

/**
 * Gera o grafico
 */
function carregaGrafico(){	
	$.getJSON("funcoes.php?getDadosCeops=24", function (data) { 
		data = MG.convert.date(data, 'data',"%Y-%m-%dT%H:%M:%S");	
        MG.data_graphic({
		  	data: data,
		  	animate_on_load: true,
	        area: false,
	        right: 40,
	        left: 120,
		  	min_y_from_data: true,
		  	width: 800,
		  	height: 600,
		  	xax_count:6,
		  	y_extended_ticks: true,
		  	x_extended_ticks: true,
			target: document.getElementById('graficoRio'),
	    	x_accessor: 'data',
	    	y_accessor: 'vlr_nivel',
        	y_label: 'Nivel do Rio em Metros',
		});
    });
}

/**
 * altera o design da barra de alerta no rodapé
 */
function barraAlerta() { 
	$.getJSON("funcoes.php?getDadosCeops=1", function (dados) { 
	    var medicoes = dados[0];
	    if ( medicoes["vlr_nivel"] <= ( altEnc / 2 ) ) {
	        $("#alerta").attr('class',"button button-full button-positive BFontSize	");
	        $("#alerta").html('Nivel do rio: ' + medicoes['vlr_nivel']+ ' Metros');
	    }
	    else if ( ( medicoes['vlr_nivel'] < altEnc ) && ( medicoes['vlr_nivel'] > ( altEnc / 2 ) ) ) {
	        $("#alerta").attr('class',"button button-full button-energized BFontSize");
	        $("#alerta").html('Nivel do rio: ' + medicoes['vlr_nivel'] + ' Metros');
	    }
	    else if ( medicoes['vlr_nivel'] >= altEnc ) {  
	        $("#alerta").attr('class',"button button-full button-assertive BFontSize");   
	        $("#alerta").html('Nivel do rio: ' + medicoes['vlr_nivel'] + ' Metros');
	    }
	    else{     
	        $("#alerta").attr('class',"button button-full button-assertive BFontSize");
	        
	        $("#alerta").html("Dados indisponíveis");
	    }
	});
}

/**
 * Metodo que preenche a tabela na tela de verificação de locais
 */
function trataEnchentes(data) {
    var cont; //contador
    var alturaEnchente;
	for (cont in data) {
		alturaEnchente = data[cont];
		$("#tabelaHistoricoInundacoes").append('<tr> <td>' + alturaEnchente[0] + '</td> </tr>');
	}
}

/**
 * Metodo que busca no banco o histórico de datas e alturas enchentes
 */
function getEnchentes(data) {
	var nivelEnchente = altitude-data;
	$("#nivelRioLocal").html(nivelEnchente);
	
	$.ajax({
		url : "http://54.232.207.63/Comum/php/funcoes.php?getEnchentes=?",
		data : { 'elevAtual' : nivelEnchente},
		dataType : 'jsonp',
		crossDomain : true,
		
		success : function(data) {
			trataEnchentes(data);
		}
	});
}

/**
 *  Função que carrega a aultura zero do rio
 */
function getAlturaRio() {
    $.ajax({
        url : "http://54.232.207.63/Comum/php/funcoes.php?getAlturaRio=?",
        dataType : 'jsonp',
        crossDomain : true,
        
         success: function (data) {
            alturaRio = data;
            getEnchentes(data);
        }
    });
}

function getAltura(gps) {
    var locations = [];
    
    var latlng;

    var elevator = new google.maps.ElevationService();
    
    if(gps){
        latlng = new google.maps.LatLng(latitude, longitude);
    }
    else{
        latlng = geolocationBusca;
    }
    
    locations.push(latlng);
    var positionalRequest = {
        'locations' : locations
    };

    elevator.getElevationForLocations(positionalRequest, function(results, status) {
        if (status == google.maps.ElevationStatus.OK) {
            if (results[0]) {
                $("#elevacaoLocal").html(results[0].elevation);
                $("#divbotao").hide();
                $("#tabela").show();
                altitude = results[0].elevation;
                getAlturaRio();
            }
            else {
                alert('No results found');
            }
        }
        else{
            alert('Elevation service failed due to: ' + status);
        }
    });
        
}

/**
 * Metodo que utiliza as cordenadas de geolocalização para captar o endereço
 */
function geocodificacaoReversa(gps) {
    var geocoder;
    var latlng;
    
    geocoder = new google.maps.Geocoder();
    
    if(gps){
       latlng = new google.maps.LatLng(latitude, longitude);
    }
    else{
        latlng = geolocationBusca;
    }
    
    geocoder.geocode ({
        'latLng' : latlng
    }, 
    function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                local = results[0].formatted_address;
                if(!gps){
                   local = $("#pesquisar").val();
                }
                $("#enderecoLocal").html(local);
                
                if(gps){
                   getAltura(true);
                }
                else{
                    getAltura(false);
                }
            } 
            else {
                alert("Geocoder failed due to: " + status);
            }
        }
    });
}

/**
 * Metodo que busca as cordenadas de geolocalização com gps ou pela rede
 */

function coordenadas() {
	var onSuccess = function(position) {
		
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		
		geocodificacaoReversa(true);
		
		$("#latitudeLocal").html(latitude);
	
		$("#longitudeLocal").html(longitude);
	};

	function onError(error) {
		console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
	}

	var options = {
		maximumAge : 3,
		timeout : 60000,
		enableHighAccuracy : true
	};
    
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}

/*Erro para leitura ou escrita de arquivos*/
function fail(error) {
    console.log(error.code);
}

/**
 * escrevendo arquivo
 * */
function gotFileWriter(writer) {
    writer.write(altitude+";"+local+":"+alertaAtivo);
}

function gotFileEntry(fileEntry) {
    fileEntry.createWriter(gotFileWriter, fail);
}

function gotFS(fileSystem) {
    fileSystem.root.getFile("sae", {create: true, exclusive: false}, gotFileEntry, fail);
}

/**
 * ler arquivo cfg
 * */
function readAsText(file) {
    /*
alert("readastext");
    var reader;
    reader = new FileReader();
    
    reader.onload = function(evt) {
       var texto = evt.target.result;
       
       var doisPontos = texto.indexOf(":");
       var pontoVirgula = texto.indexOf(";");
       */
       alturaAlerta = 6//texto.substring(0,pontoVirgula);
       
       local = "Rua Seara 278, Imigrantes, Timbó" //texto.substring(pontoVirgula,doisPontos);
              
       $("#enderecoLocal").html(local);       
              
       //if (texto.substring(doisPontos,texto.length) == "false") {       
            $('#myonoffswitch').prop('checked', true);
            alertaAtivo = true;
/*      // }
    };*/
    reader.onload = function(e) {
       alert(reader.result);
       alert(e);
    };
    
    reader.readAsText(file);
}

function gotFile(file){
    alert("gfile");
    readAsText(file);
}

function gotEntry(fileEntry) {
    alert("gotentre");
    fileEntry.file(gotFile, fail);
}

function gotFileSystem(fileSystem) {
    alert("gotfiles");
    fileSystem.root.getFile("sae", gotEntry, fail);
}

/**
 * adiciona local na pagina Serviços
 * */
function addLocal(gps){
    if(gps){
        try{
            coordenadas();
        }
        catch(exception){
            console.log(exception);
        }   
        finally{
           // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        }
    }
    else{
        geocodificacaoReversa(false);
        
       // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }
    
    $("#forma").show();
    $("#buscaLocal").hide();  
    $("#buscarLocal").html("Alterar Local");
}

/**
 * abrir modal
 * */
function abrirModal(){
    $('#modalBuscaLocal').show();
	$("#buscaLocal").hide();
   	$("#forma").show();
}

/**
 * Metodo que mostra e esconde o gif no mapa metereologico
 */

function OpcoesMapaMetereologico() {
	if ($("#painelOpcoesMapa").html() == "Mais Informações") {
		$("#painelOpcoesMapa").html("Fechar");
		$("#painelInfo").show();
	} 
	else {
		$("#painelOpcoesMapa").html("Mais Informações");
		$("#painelInfo").hide();
	}

}

/**
 *  o alerta
 */
function alerta() {
    var now = new Date();
    window.plugin.notification.local.add({
        id:      1,
        date : now,
        title:   'SAEmóvel Alerta',
        message: 'Atenção! Água a caminho!',
        autoCancel: true
    });
}

/**
 * Ativa o modo background e manten um timer de alerta
 */
function ativarAlerta(sim) {
    if (sim) {
        timer = setInterval(
            function () {
                getAlturaRio();
                alteraBarraAlerta();
                
                nivelLocal = 66.2 - alturaRio;
                
                if(nivelLocal - 2 <= nivelRio ){
                    alerta();
                }
            },
            1000 /*5*/ * 2
        );

        alertaAtivo = true;

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
  }
  else{
    clearInterval(timer);
		 
    alertaAtivo = false;
		
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
  }
}

//usado para busca o local digitado para o  alerta
function buscaLocal(){
    $("#forma").hide();
    $("#buscaLocal").show();
    
    initializeBusca();
}

/**
 * exibi o menu +
 */
function exibirMenuPlus() {
	$("#menuPlus").slideToggle("fast");
}

/**
 * Abre um conteudo dentro do div 'conteudos'
 * @param tela: nome do arquivo html sem a extenção
 * @param nome: nome a ser exibido no topo do App
 * */
function alterarConteudo(tela, nome) {
	$("#menuPlus").hide("fast");
	$("#mapaconteiner").show('fast');
	$("strong").html(nome);

	if (tela == "home") {
		$("#mapaconteiner").show();

		$("#conteudo").hide();
		$("#divClima").hide();
		$("#divSimulacao").hide();
		
		barraAlerta();
		
		google.maps.event.addDomListener(window, 'load', initialize);

	} else if (tela == "previsao") {
		$("#conteudo").hide();
		$("#mapaconteiner").hide();

		$("#divClima").show();
		
		initializeWeather();
	} else if (tela == "simulacao") {
		$("#conteudo").hide();
		$("#divClima").hide();

		$("#mapaconteiner").show();
		$("#divSimulacao").css("display", "inline-flex");
		passarImg('+');
	} else {
		$("#mapaconteiner").hide();
		$("#divSimulacao").hide();
		$("#divClima").hide();

		$("#conteudo").load(tela + ".html");
		$("#conteudo").show();
	}
}