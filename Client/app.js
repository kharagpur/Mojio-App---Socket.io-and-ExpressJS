$(document).ready(function() {
	//$("#error-alert").hide();
	
	var socket = io();

	// Submit message
	$('#chat').on('submit', function () {
	  	let initial = $('#initials').val().toUpperCase();
	  	let msg = $('#message').val();
	 	if (msg && initial){
	 		socket.emit('message', initial, msg);
			$('#message').val('');// Clear message
			
		}
	  return false;
	});

	socket.on('message', function (data) {
		$('#history').append(`<li class='history-message'>${data.initial} says: ${data.message}</li>`);
	});

	// MOJIO JAVASCRIPT
	// Get Mojio user information
	$('#getUser').on('click', function(){
		var apiToken = $('#apiToken').val();
		if (apiToken){
			$.ajax({
				url:'https://api.moj.io/v2/me',
				headers:{
					'Authorization': `Bearer ${apiToken}`,
					'Content-Type': 'application/json'
				},
				method:'GET',
				success: function(data){
					$('#mojio-User').append(
						`
						<table class='table table-striped table-hover table-responsive' id='userTable' style="width:100%">
							<thead class="thead-default">
								<tr>
									<th style='display:none;'>Id</th>
									<th>User Name</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Email</th>
									<th>Update User</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class='id' style='display:none;'>
										<input class="form-control input-sm" type="text" value='${data.Id}'>
									</td>
									<td class='un'>
										<input class="form-control input-sm" type="text" value='${data.UserName}'>
									</td>
									<td class='fn'>
										<input class="form-control input-sm" type="text" value='${data.FirstName}'>
									</td>
									<td class='ln'>
										<input class="form-control input-sm" type="text" value='${data.LastName}'>
									</td>
									<td class='em'>
										<input class="form-control input-sm" type="text" value='${data.Emails[0].Address}'>
									</td>
									<td><button class='btn btn-secondary update-user'>Update</button></td>
								</tr>
							</tbody>
						</table>
						`
					);
				},
				error: function(xhr, text, err){
					console.log(xhr.responseJSON.Message);
					console.log(xhr.status);
					console.log(xhr.statusCode);
					errorAlert('Oh snap!', 'Mojio API Token is not valid.');
				}
			});
		}
		else{
			warningAlert('Darn!', 'I need an API token to begin with');
		}
	});

	$('body').on('click', 'button.update-user', function(){
		let id = $(this).closest("tr")
			.find('.id')
			.find('input')
			.val();;
		alert(id);
		let userName = $(this).closest("tr")
			.find('.un')
			.find('input')
			.val();;
		alert(userName);
		let firstName = $(this).closest("tr")
			.find('.fn')
			.find('input')
			.val();
		alert(firstName);
		let lastName = $(this).closest("tr")
			.find('.ln')
			.find('input')
			.val();
		alert(lastName);
		let email = $(this).closest("tr")
			.find('.em')
			.find('input')
			.val();
		alert(email);

		// Ajax call to save the entity
	});

	$('#getMojios').on('click', function(){
		var apiToken = $('#apiToken').val();
		if (apiToken){
			$.ajax({
				url:'https://api.moj.io/v2/Mojios',
				headers:{
					'Authorization': `Bearer ${apiToken}`,
					'Content-Type': 'application/json'
				},
				method:'GET',
				success: function(data){
					if (data.Data.length>0){
						$('#mojio-Mojios').append(
								`
								<table class='table table-striped table-hover table-responsive' id='mojioTable' style="width:100%">
									<thead class="thead-default">
										<tr>
											<th style='display:none;'>ID</th>
											<th>IMEI</th>
											<th>Name</th>
											<th>LastContactTime</th>
											<th style='display:none;'>Vehicle Id</th>
											<th>Update Mojio</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
								`
							);
						data.Data.forEach(function(mojio){
							$('#mojioTable > tbody:last-child').append(
								`
								<tr>
									<td class='id' style='display:none;'>
										<input class="form-control input-sm" type="text" value='${mojio.Id}'>
									</td>
									<td class='imei'>
										<input class="form-control input-sm" type="text" value='${mojio.IMEI}' disabled>
									</td>
									<td class='n'>
										<input class="form-control input-sm" type="text" value='${mojio.Name}'>
									</td>
									<td class='lct'>
										<input class="form-control input-sm" type="text" value='${mojio.LastContactTime}' disabled>
									</td>
									<td class='vid' style='display:none;'>
										<input class="form-control input-sm" type="text" value='${mojio.VehicleId}'>
									</td>
									<td><button class='btn btn-secondary update-mojio'>Update</button></td>
								</tr>
								`
							);
						});
					}
				},
				error: function(xhr, text, err){
					console.log(xhr.responseJSON.Message);
					console.log(xhr.status);
					console.log(xhr.statusCode);
					errorAlert('Oh snap!', 'Mojio API Token is not valid.');
				}
			});
		}
		else{
			warningAlert('Darn!', 'I need an API token to begin with');
		}
	});

	$('body').on('click', 'button.update-mojio', function(){
		let id = $(this).closest("tr")
			.find(".id")
			.find('input')
			.val();
		alert(id);
		let imei = $(this).closest("tr")
			.find(".imei")
			.find('input')
			.val();
		alert(imei);
		let n = $(this).closest("tr")
			.find(".n")
			.find('input')
			.val();
		alert(n);
		let lct = $(this).closest("tr")
			.find(".lct")
			.find('input')
			.val();
		alert(lct);
		let vid = $(this).closest("tr")
			.find(".vid")
			.find('input')
			.val();
		alert(vid);
		// Ajax call to save the entity
	});

	$('#getVehicles').on('click', function(){
		var apiToken = $('#apiToken').val();
		if (apiToken){
			$.ajax({
				url:'https://api.moj.io/v2/Vehicles',
				headers:{
					'Authorization': `Bearer ${apiToken}`,
					'Content-Type': 'application/json'
				},
				method:'GET',
				success: function(data){
					if (data.Data.length>0){
						$('#mojio-Vehicles').append(
								`
								<table class='table table-striped table-hover table-responsive' id='vehicleTable' style="width:100%">
									<thead class="thead-default">
										<tr>
											<th style='display:none;'>ID</th>
											<th>Name</th>
											<th>License Plate</th>
											<th>VIN</th>
											<!--<th>Odometer (Meters)</th>-->
											<th>In Trip?</th>
											<th>Deleted</th>
											<th>Update Vehicle</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
								`
							);
						data.Data.forEach(function(vehicle){
							$('#vehicleTable > tbody:last-child').append(
								`
								<tr>
									<td class='id' style='display:none;'>
										<input class="form-control input-sm" type="text" value='${vehicle.Id}'>
									</td>
									<td class='n'>
										<input class="form-control input-sm" type="text" value='${vehicle.Name}'>
									</td>
									<td class='lc'>
										<input class="form-control input-sm" type="text" value='${vehicle.LicensePlate}'>
									</td>
									<td class='vin'>
										<input class="form-control input-sm" type="text" value='${vehicle.VIN}'>
									</td>
									<!--<td class='Odometer'>
										<input class="form-control input-sm" type="text" value='${vehicle.Odometer.Value}'>
									</td>-->
									<td class='ign'>
										<input class="form-control input-sm" type="text" value='${vehicle.IgnitionState.Value}' disabled>
									</td>
									<td class='d'>
										<input class="form-control input-sm" type="text" value='${vehicle.Deleted}' disabled>
									</td>
									<td><button class='btn btn-secondary update-vehicle'>Update</button></td>
								</tr>
								`
							);
						});
					}
				},
				error: function(xhr, text, err){
					console.log(xhr.responseJSON.Message);
					console.log(xhr.status);
					console.log(xhr.statusCode);
					errorAlert('Oh snap!', 'Mojio API Token is not valid.');
				}
			});
		}
		else{
			warningAlert('Darn!', 'I need an API token to begin with');
		}
	});

	$('body').on('click', 'button.update-vehicle', function(){
		let id = $(this).closest("tr")
			.find(".id")
			.find('input')
			.val();
		alert(id);
		let n = $(this).closest("tr")
			.find(".n")
			.find('input')
			.val();
		alert(n);
		let lc = $(this).closest("tr")
			.find(".lc")
			.find('input')
			.val();
		alert(lc);
		let vin = $(this).closest("tr")
			.find(".vin")
			.find('input')
			.val();
		alert(vin);
		let odo = $(this).closest("tr")
			.find(".odo")
			.find('input')
			.val();
		alert(odo);
		let ign = $(this).closest("tr")
			.find(".ign")
			.find('input')
			.val();
		alert(ign);
		let del = $(this).closest("tr")
			.find(".d")
			.find('input')
			.val();
		alert(del);
		// Ajax call to save the entity
	});

	$('#clear').on('click', function(){
		$('#userTable').remove();
		$('#mojioTable').remove();
		$('#vehicleTable').remove();
	});

	// Custom Functions
	let successAlert = function(header, msg) {
		$('#success-message').append(`
			<strong>${header} </strong>
			${msg}
		`);
		$("#success-alert").alert();
		$("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
			$("#success-alert").slideUp(500);
			$('#success-message').html('');
		});
	};

	let warningAlert = function(header, msg) {
		$('#warning-message').append(`
			<strong>${header} </strong>
			${msg}
		`);
		$("#warning-alert").alert();
		$("#warning-alert").fadeTo(2000, 500).slideUp(500, function(){
			$("#warning-alert").slideUp(500);
			$('#warning-message').html('');
		});
	};

	let errorAlert = function(header, msg) {
		$('#error-message').append(`
			<strong>${header} </strong>
			${msg}
		`);
		$("#error-alert").alert();
		$("#error-alert").fadeTo(2000, 500).slideUp(500, function(){
			$("#error-alert").slideUp(500);
			$('#error-message').html('');
		});
	};
});