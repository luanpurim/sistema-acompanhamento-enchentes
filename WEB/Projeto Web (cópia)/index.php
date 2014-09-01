<!DOCTYPE html>
<!--
Autor: jonathan, luan, roberto

sobre as classes utilizadas acesse
http://bootstrapdocs.com/v3.2.0/docs/
-->
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="Sistema de monitoramento de Enchentes de Timbó">
		<meta name="author" content="Jonathan, Luan e Roberto">
		<link rel="icon" href="icone da barinha">

		<title>SAEnchentes Timbó</title>

		<!-- Bootstrap -->
		<link href="./bootstrap-3.2.0-dist/css/bootstrap.min.css" rel="stylesheet">
		<link href="./bootstrap-3.2.0-dist/css/bootstrap-theme.min.css" rel="stylesheet">
		<!--fim carregamento bootstrap -->

		<!--estilos proprios-->
		<link href="./css/Styles.css" rel="stylesheet" />

	</head>
	<body>
	    <!--NAVEGARDOR-->
		<header class="navbar navbar-default" >
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#">SAEnchentes</a>

				</div>
				<nav class="navbar-collapse collapse">
					<ul class="nav navbar-nav">
						<li class="active">
							<a href="#">Inicio</a>
						</li>
						<li>
							<a href="#">Monitoramentos</a>
						</li>
						<li>
							<a href="#Sobre">Sobre</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
        <!--fim navegador-->
        
		<div class="container-fluid">

			<div id="painel1" class="col-lg-8">
				<div id="mapa"></div>
			</div>

			<div id="painel2" class="col-lg-4">
				 <div class="alert alert-success" id="alerta">
                    <img src="_Imagens/ok2.png" id="alertaImagem"/>
                    <strong>Status: </strong> Rio em condições normais.
                </div>
				
				<div id="clima">
					<iframe src="http://selos.climatempo.com.br/selos/MostraSelo120.php?CODCIDADE=2070&SKIN=padrao" id="climatempo"></iframe>
					<!-- Widget Previs&atilde;o de Tempo CPTEC/INPE -->
					
					<iframe allowtransparency="true" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"
					src="http://www.cptec.inpe.br/widget/widget.php?p=5400&w=h&c=748ccc&f=ffffff" height="200px" width="215px"></iframe>
					<!-- Widget Previs&atilde;o de Tempo CPTEC/INPE -->
				</div>
			</div>
		</div>

		<div class="container-fluid">
		    
			<div id="painel3" class="col-lg-4">
			    <!--BUSCAR RUA-->
                <div id="buscarLocal">
                  Encontre sua rua
                  <form action="./php/funcoes.php">
                      <input type="text" id="nomerua" name="NomeRua">  
                      <input type="submit" name="btnBuscar" value="Buscar">  
                  </form>
                </div>
                
            </div>    
            
            <div id="painel4" class="col-lg-2"> 
                
                <!--botao que abre a tela Modal do sms -->   
                <button type="button" class="btn btn-default" data-toggle="modal" data-target="#myModal">
                        Receber mensagens SMS
                </button>
                
				<!-- tela Modal sms -->

				<div id="myModal" class="modal fade">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
							    
								<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
								</button>
								
								<h4 class="modal-title">Recebimento SMS</h4>
							</div>
							<div class="modal-body">
							    
							    <!--faz o famoso "edit" do delphi-->
								<input type="text" name="entrada" id="entrada">
								<br>

								<p id="resposta"></p>
							</div>
							<div class="modal-footer">
							    <!-- botao fechar tela modal sms-->
								<button type="button" class="btn btn-default" data-dismiss="modal">
									Fechar
								</button>
								
								<!--botao cadastrar da tela modal sms(chama o metodo jquery da arquivo funcoes.js) -->
								<button type="button" class="btn btn-primary" onclick="Alterar_div()">
									Cadastrar
								</button>
							</div>
						</div>
					</div>
				</div>
				<!-- fim tela modal sms-->
			</div>
			
			<div id="painel5" class="col-lg-2" >
			     <div id="textoBaixoDireita">textoBaixoDireita</div>     
			</div>
			    
		</div>

		<!--carrega os arquivos js necessarios -->
        
		<script src="./js/jquery.min.js"></script><!--JQuery-->

		<script src="./bootstrap-3.2.0-dist/js/bootstrap.min.js"></script>

		<script src="./js/funcoes.js"></script>

		<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
		<!--[if lt IE 9]><script src="./js/ie8-responsive-file-warning.js"></script><![endif]-->
		<script src="./js/ie-emulation-modes-warning.js"></script>

		<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
		<script src="./js/ie10-viewport-bug-workaround.js"></script>

		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->

		<!--scripts do mapa-->
		<script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>

		<script type="text/javascript" src="./js/mapa.js"></script>
		
		<!--AJAX-->
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>

	</body>
</html>