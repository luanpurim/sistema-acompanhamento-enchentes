
<h2 style="margin-left:20%;">Sistema de alerta</h2>
<div style="float: right;" class="row">
	<span style="margin-right: 19%; font-size: 20px; padding-top: 10px">Receber Alertas</span>
	<div style="float: right;" class="onoffswitch">
	    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" >
	    <label class="onoffswitch-label" for="myonoffswitch">
	        <span class="onoffswitch-inner"></span>
	        <span class="onoffswitch-switch"></span>
	    </label>
	</div>	
</div>
<script>
	if(alertaAtivo){
		$('#myonoffswitch').prop('checked', true);
	}
	else{
		$('#myonoffswitch').prop('checked', false);
	}
	
	$('#myonoffswitch').click(function() {
		    if($(this).is(':checked')) {
		      ativarAlerta(true);
		    } else {
		       ativarAlerta(false);
		    }
		});
	
</script>
<div class="row">

</div>
<div class="row">
	<table class="table table-striped">
  		<tr >
  			<td>
				<span style="line-height: 50px; font-size: 20px;">Local</span>
			</td>
			<td class="center">
				<button style="float: right;" id="buscarLocal" class="button button-positive" >Buscar Local</button>
			</td>
  		</tr>
	</table>
</div>