$(document).ready(function() {
	//$("#error-alert").hide();
	
	let socket = io();

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
	// [GET] USER
	$('#getUser').on('click', function(){
		let apiToken = $('#apiToken').val();
		if (apiToken){
			$.ajax({
				url:'https://api.moj.io/v2/me',

				headers:{
					'Accept' : 'application/json',
					'Authorization': `Bearer ${apiToken}`,
					'Content-Type': 'application/json'
				},
				method:'GET',
				success: function(data){
					createUserTable(data);
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

	// [PUT] USER ID
	$('body').on('click', 'button.update-user', function(){
		let id = $(this).closest("tr").find('.id').find('input').val();
		let userName = $(this).closest("tr").find('.un').find('input').val();
		let firstName = $(this).closest("tr").find('.fn').find('input').val();
		let lastName = $(this).closest("tr").find('.ln').find('input').val();
		let email = $(this).closest("tr").find('.em').find('input').val();
		// Ajax call to save the entity
		let apiToken = $('#apiToken').val();
		if (apiToken){
			$.ajax({
				url:`https://api.moj.io/v2/users/${id}`,
				headers:{
					'Authorization': `Bearer ${apiToken}`,
					'Content-Type': 'application/json'
				},
				method:'PUT',
				data:`
				{
					UserName: '${userName}',
					FirstName: '${firstName}',
					LastName: '${lastName}'
				}
				`,
				success: function(data){
					successAlert('Success', 'User\'s been updated!');

				},
				error: function(xhr, text, err){
					console.log(xhr.responseJSON.Message);
					console.log(xhr.status);
					console.log(xhr.statusCode);
					errorAlert('Error', 'Updating user failed');
				}
			});
		}
		else{
			warningAlert('Darn!', 'I need an API token to begin with');
		}
	});

	// [GET] MOJIO
	$('#getMojios').on('click', function(){
		let apiToken = $('#apiToken').val();
		if (apiToken){
			$.ajax({
				url:'https://api.moj.io/v2/Mojios',
				headers:{
					'Authorization': `Bearer ${apiToken}`,
					'Content-Type': 'application/json'
				},
				method:'GET',
				success: function(data){
					createMojioTable(data);
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

	// [PUT] MOJIO ID
	$('body').on('click', 'button.update-mojio', function(){
		let id = $(this).closest("tr").find(".id").find('input').val();
		let imei = $(this).closest("tr").find(".imei").find('input').val();
		let n = $(this).closest("tr").find(".n").find('input').val();
		let lct = $(this).closest("tr").find(".lct").find('input').val();
		let vid = $(this).closest("tr").find(".vid").find('input').val();
		// Ajax call to save the entity
		let apiToken = $('#apiToken').val();
		if (apiToken){
			$.ajax({
				url:`https://api.moj.io/v2/mojios/${id}`,
				headers:{
					'Authorization': `Bearer ${apiToken}`,
					'Content-Type': 'application/json'
				},
				method:'PUT',
				data:`
				{
					Name: '${n}'
				}
				`,
				success: function(data){
					successAlert('Success', 'Mojio has been updated!');

				},
				error: function(xhr, text, err){
					console.log(xhr.responseJSON.Message);
					console.log(xhr.status);
					console.log(xhr.statusCode);
					errorAlert('Error', 'Updating user failed');
				}
			});
		}
		else{
			warningAlert('Darn!', 'I need an API token to begin with');
		}
	});

	// [DELETE] MOJIO ID
	$('body').on('click', 'button.remove-mojio-button', function(){		
		let id = $(this).closest("tr").find(".id").find('input').val();
		let imei = $(this).closest("tr").find(".imei").find('input').val();

		bootbox.confirm({
			title: "Unclaiming a Mojio!",
			message: `Are you sure you want to unclaim Mojio with IMEI - ${imei}?`,
			buttons: {
				cancel: {
					label: '<i class="fa fa-times"></i> Cancel'
				},
				confirm: {
					label: '<i class="fa fa-check"></i> Confirm'
				}
				},
				callback: function (result) {
					console.log('This was logged in the callback: ' + result);
					if (result){
						// Ajax call to save the entity
						let apiToken = $('#apiToken').val();
						if (apiToken){
							$.ajax({
								url:`https://api.moj.io//v2/mojios/${id}`,
								headers:{
									'Authorization': `Bearer ${apiToken}`,
									'Content-Type': 'application/json'
								},
								method:'DELETE',
								success: function(data){
									successAlert('Success', 'Mojio has been deleted!');
									// TODO: DELETE THAT ROW
									// TODO: TEST THIS FUNCTIONALITY
								},
								error: function(xhr, text, err){
									console.log(xhr.responseJSON.Message);
									console.log(xhr.status);
									console.log(xhr.statusCode);
									errorAlert('Error', 'Deleting mojio failed');
									// TODO: HANDEL ERROR CASES AND PROVIDE FEEDBACK
								}
							});
						}
						else{
							warningAlert('Darn!', 'I need an API token to begin with');
						}
					}
				}
		});
	});

	// [GET] VEHICLES
	$('#getVehicles').on('click', function(){
		let apiToken = $('#apiToken').val();
		if (apiToken){
			$.ajax({
				url:'https://api.moj.io/v2/Vehicles',
				headers:{
					'Authorization': `Bearer ${apiToken}`,
					'Content-Type': 'application/json'
				},
				method:'GET',
				success: function(data){
					createVehicleTable(data);
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

	// [PUT] VEHICILE ID
	$('body').on('click', 'button.update-vehicle', function(){
		let id = $(this).closest("tr").find(".id").find('input').val();
		let mojid = $(this).closest("tr").find(".mojid").find('input').val();
		let n = $(this).closest("tr").find(".n").find('input').val();
		let lc = $(this).closest("tr").find(".lc").find('input').val();
		let vin = $(this).closest("tr").find(".vin").find('input').val();
		let odo = $(this).closest("tr").find(".odo").find('input').val();
		odo *= 1000; // Convert to meters
		let ign = $(this).closest("tr").find(".ign").find('input').val();
		let del = $(this).closest("tr").find(".d").find('input').val();
		// Ajax call to save the entity
		let apiToken = $('#apiToken').val();
		if (apiToken){
			$.ajax({
				url:`https://api.moj.io/v2/vehicles/${id}`,
				headers:{
					'Authorization': `Bearer ${apiToken}`,
					'Content-Type': 'application/json'
				},
				method:'PUT',
				data:`
				{
					Name: '${n}',
					LicensePlate: '${lc}',
					Odometer: {Value: '${odo}'}
				}
				`,
				success: function(data){
					successAlert('Success', 'Vehicles has been updated!');
				},
				error: function(xhr, text, err){
					console.log(xhr.responseJSON.Message);
					console.log(xhr.status);
					console.log(xhr.statusCode);
					errorAlert('Error', 'Updating vehicle failed');
				}
			});
		}
		else{
			warningAlert('Darn!', 'I need an API token to begin with');
		}
	});

	// [DELETE] VEHICLE ID
	$('body').on('click', 'button.delete-vehicle', function(){
		let id = $(this).closest("tr")
			.find(".id")
			.find('input')
			.val();
		// Ajax call to save the entity
		let apiToken = $('#apiToken').val();
		if (apiToken){
			$.ajax({
				url:`https://api.moj.io/v2/vehicles/${id}`,
				headers:{
					'Authorization': `Bearer ${apiToken}`,
					'Content-Type': 'application/json'
				},
				method:'DELETE',
				success: function(data){
					successAlert('Success', 'Vehicles has been deleted!');
					// TODO: DELETE THAT ROW
					// TODO: TEST THIS FUNCTIONALITY
				},
				error: function(xhr, text, err){
					console.log(xhr.responseJSON.Message);
					console.log(xhr.status);
					console.log(xhr.statusCode);
					errorAlert('Error', 'Deleting vehicle failed');
					// TODO: HANDEL ERROR CASES AND PROVIDE FEEDBACK
				}
			});
		}
		else{
			warningAlert('Darn!', 'I need an API token to begin with');
		}
	});

	// Handler for disabling checkboxes if more than 2 vehicle is selected
	let mergeCandidates = [];
	$('body').on('change', '#mergeCheckBox', function(){
	    if(this.checked) {
	        // Push to array
	        let id = $(this).closest("tr")
			.find(".id")
			.find('input')
			.val();
			mergeCandidates.push(id);
			
			if(mergeCandidates.length == 2){
				// Disable other check box.
				$('#vehicleTable').find('.merge').find('#mergeCheckBox:checkbox:not(:checked)').attr("disabled", "disabled");
				$('#mergeButton').attr('disabled', false);
			}
	    }
	    if(!this.checked){
	    	// enable everyone except for already checked

	    	// Enable all the check boxes
	    	$('#vehicleTable').find('.merge').find('#mergeCheckBox:checkbox:disabled').attr("disabled", false);
	    	let vehicleId = $(this).closest("tr")
							.find(".id")
							.find('input')
							.val();
			// remove vehicle id from the collection
	    	let indexToRemove = mergeCandidates.indexOf(vehicleId);
	    	if (indexToRemove > -1) {
	    		mergeCandidates.splice(indexToRemove, 1);
	    	}
	    	$('#mergeButton').attr('disabled', 'disabled');
	    }
	});

	$('body').on('click', 'button.merge-vehicle', function(){
		console.log(mergeCandidates);
	});

	$('#clear').on('click', function(){
		$('*[id*=userTable]:visible').each(function() {
		    $(this).remove();
		});
		$('*[id*=mojioTable]:visible').each(function() {
		    $(this).remove();
		});
		$('*[id*=vehicleTable]:visible').each(function() {
		    $(this).remove();
		});
	});

	$('#btnClaimMojio').on('click', function(){
		//let id = $(this).closest("tr").find(".id").find('input').val();
		let imeiString = $('#textBulkClaimImei').val();
		let imeiArray = imeiString.split(',');
		imeiArray.forEach(function(imei){
			let imeiDirty = imei.replace(/["']/g, '');
			let imeiClean = imeiDirty.trim();
			console.log(imeiClean)
			// ajax call to claim all the mojios
			// Ajax call to save the entity
			let apiToken = $('#apiToken').val();
			if (apiToken){
				$.ajax({
					url:`https://api.moj.io/v2/mojios/`,
					headers:{
						'Authorization': `Bearer ${apiToken}`,
						'Content-Type': 'application/json'
					},
					method:'POST',
					data:
					`{
						IMEI: '${imeiClean}'
					}`,
					success: function(data){
						successAlert('Success', `${imeiClean} Mojio has been claimed!`);
						// TODO: TEST THIS FUNCTIONALITY
					},
					error: function(xhr, text, err){
						console.log(xhr.responseJSON.Message);
						console.log(xhr.status);
						console.log(xhr.statusCode);
						errorAlert('Error', 'Deleting mojio failed');
						console.log(`Failed to unclaim ${imei}`);
						// TODO: HANDEL ERROR CASES AND PROVIDE FEEDBACK
					}
				});
			}
			else{
				warningAlert('Darn!', 'I need an API token to begin with');
			}
		});
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

	let createUserTable = function(data){
		$('#mojio-User').append(
			`
			<table class='table table-striped table-hover table-responsive' id='userTable' style="width:100%; margin=auto">
				<thead class="thead-default">
					<tr>
						<th style='display:none;'>Id</th>
						<th>User Name</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Update</th>
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
							<input class="form-control input-sm" type="text" value='${data.Emails[0].Address}' disabled>
						</td>
						<td><button class='btn btn-success update-user'>Update</button></td>
					</tr>
				</tbody>
			</table>
			`
		);
	};
	
	let createMojioTable = function(data){
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
								<th>Update</th>
								<th>Remove Device</th>
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
						<td><button class='btn btn-success update-mojio'>Update</button></td>
						<td class='remove-mojio'><button type="button" class="btn btn-outline-danger remove-mojio-button" id="removeMojioButton">Remove</button></td>

					</tr>
					`
				);
			});
		}
	};
	
	let createVehicleTable = function(data){
		if (data.Data.length>0){
			$('#mojio-Vehicles').append(
					`
					<table class='table table-striped table-hover table-responsive' id='vehicleTable' style="width:100%">
						<thead class="thead-default">
							<tr>
								<th>Merge</th>
								<th style='display:none;'>ID</th>
								<th style='display:none;'>MojioID</th>
								<th>Name</th>
								<th>License Plate</th>
								<th>VIN</th>
								<th>Odometer (KM)</th>
								<th>Driving</th>
								<th>Deleted</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
					`
				);
			data.Data.forEach(function(vehicle){
				let id = vehicle.Id;
				let mojid = vehicle.MojioId;
				let vehicleName = vehicle.Name;
				let vehicleLicensePlate = vehicle.LicensePlate;
				let vehicleVin = vehicle.VIN;
				let vehicleOdoObj = vehicle.Odometer;
				let vehicleOdo = 'N/A'
				if (typeof vehicleOdoObj != 'undefined'){
					vehicleOdo = vehicle.Odometer.Value / 1000; // Convert to KM
				}
				
				let vehicleIgnitionState = vehicle.IgnitionState.Value === false ? 'Parked' : 'Driving';
				let vehicleDeleted = vehicle.Deleted === false ? 'No' : 'Yes';
				$('#vehicleTable > tbody:last-child').append(
					`
					<tr>
						<td class='merge'>
							<div class="input-group">
								<span class="input-group-addon">
									<input id='mergeCheckBox' type="checkbox" aria-label="Checkbox for following text input">
								</span>
							</div>
						</td>
						<td class='id' style='display:none;'>
							<input class="form-control input-sm" type="text" value='${id}'>
						</td>
						<td class='mojid' style='display:none;'>
							<input class="form-control input-sm" type="text" value='${mojid}'>
						</td>
						<td class='n'>
							<input class="form-control input-sm" type="text" value='${vehicleName}'>
						</td>
						<td class='lc'>
							<input class="form-control input-sm" type="text" value='${vehicleLicensePlate}'>
						</td>
						<td class='vin'>
							<input class="form-control input-sm" type="text" value='${vehicleVin}' disabled>
						</td>
						<td class='odo'>
							<input class="form-control input-sm" type="text" value='${vehicleOdo}'>
						</td>
						<td class='ign'>
							<input class="form-control input-sm" type="text" value='${vehicleIgnitionState}' disabled>
						</td>
						<td class='d'>
							<input class="form-control input-sm" type="text" value='${vehicleDeleted}' disabled>
						</td>
						<td><button class='btn btn-success update-vehicle'>Update</button></td>
						<td><button class='btn btn-outline-danger delete-vehicle'>Delete</button></td>
					</tr>
					`
				);
				if (mojid){
					$('.delete-vehicle').attr('disabled', 'disabled');
					$('.delete-vehicle').attr('title', 'This vehicle is connected to a Mojio');
				}
			});
			// $('#mojio-Vehicles').append(
			// 		`<button type="button" class="btn btn-outline-danger">Merge</button>`
			// );
			$('#vehicleTable > tbody:last-child').append(
				`
				<tr>
					<td class='merge-button'><button type="button" class="btn btn-outline-danger merge-vehicle" id="mergeButton" disabled>Merge</button></td>
				</tr>
				`
			)
		}
	};

	
});

$( document ).ajaxError(function( event, request, settings ) {
  console.log("Triggered ajaxError handler." );
  console.log("Error requesting page " + settings.url);
  console.log("Request: " + request.responseJSON.Message);
});

// Features:
// Unclaim, Bulk Claim