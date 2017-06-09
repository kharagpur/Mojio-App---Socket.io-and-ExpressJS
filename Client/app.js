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
		$('#history').append(`<li>${data.initial} says: ${data.message}</li>`);
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
							</thead>
							<tbody>
								<tr>
									<th>First Name</th>
									<th>Last Name</th>
									<th>User Name</th>
									<th>Jurisdiction</th>
									<th>DefaultLanguage</th>
									<th>Update User</th>
								</tr>
								<tr>
									<td class='fn'>${data.FirstName}</td>
									<td class='ln'>${data.LastName}</td>
									<td class='un'>${data.UserName}</td>
									<td class='jr'>${data.Jurisdiction}</td>
									<td class='dl'>${data.DefaultLanguage}</td>
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
		let firstName = $(this).closest("tr")
			.find(".fn")
			.text();
		alert(firstName);
		let lastName = $(this).closest("tr")
			.find(".ln")
			.text();
		alert(lastName);
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
									<tbody>
										<tr>
											<th>Created On</th>
											<th>Deleted</th>
											<th>IMEI</th>
											<th>ID</th>
											<th>LastContactTime</th>
											<th>LastModified</th>
											<th>Name</th>
											<th>OwnerId</th>
											<th>Vehicle Id</th>
											<th>Update Mojoi</th>
										</tr>
									</tbody>
								</table>
								`
							);
						data.Data.forEach(function(mojio){
							$('#mojioTable > tbody:last-child').append(
								`
								<tr>
									<td class='co'>${mojio.CreatedOn}</td>
									<td class='d'>${mojio.Deleted}</td>
									<td class='imei'>${mojio.IMEI}</td>
									<td class='id'>${mojio.Id}</td>
									<td class='lct'>${mojio.LastContactTime}</td>
									<td class='lm'>${mojio.LastModified}</td>
									<td class='n'>${mojio.Name}</td>
									<td class='oid'>${mojio.OwnerId}</td>
									<td class='vid'>${mojio.VehicleId}</td>
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
		let createdOn = $(this).closest("tr")
			.find(".co")
			.text();
		alert(createdOn);
		let name = $(this).closest("tr")
			.find(".n")
			.text();
		alert(name);
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
									<tbody>
										<tr>
											<th>ID</th>
											<th>Deleted</th>
											<th>DetectedVIN</th>
											<th>In Trip?</th>
											<th>Owner ID</th>
											<th>VIN</th>
											<th>Update Vehicle</th>
										</tr>
									</tbody>
								</table>
								`
							);
						data.Data.forEach(function(vehicle){
							$('#vehicleTable > tbody:last-child').append(
								`
								<tr>
									<td class='id'>${vehicle.Id}</td>
									<td class='d'>${vehicle.Deleted}</td>
									<td class='dv'>${vehicle.DetectedVIN}</td>
									<td class='ign'>${vehicle.IgnitionState.Value}</td>
									<td class='oid'>${vehicle.OwnerId}</td>
									<td class='vid'>${vehicle.VIN}</td>
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
		let detectedVin = $(this).closest("tr")
			.find(".dv")
			.text();
		alert(detectedVin);
		let deleted = $(this).closest("tr")
			.find(".ign")
			.text();
		alert(deleted);
		// Ajax call to save the entity
	});

	$('#clear').on('click', function(){
		$('#userTable').remove();
		$('#mojioTable').remove();
		$('#vehicleTable').remove();
	});

	// Custom Functions
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