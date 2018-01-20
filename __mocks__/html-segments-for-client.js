let rsSelectAll = `
<div class="form-check col-md-5 offset-md-1">
<input class="form-check-input" type="checkbox" name="illuminati2014global" id="illuminati2014global-checkbox" checked>
<input class="form-check-input" type="checkbox" name="illuminati2014en" id="illuminati2014en-checkbox" checked>
<input class="form-check-input" type="checkbox" name="illuminati2012de" id="illuminati2012de-checkbox" checked>
</div>`;

let rsSelectSome = `
<div class="form-check col-md-5 offset-md-1">
<input class="form-check-input" type="checkbox" name="illuminati2014global" id="illuminati2014global-checkbox" checked>
<input class="form-check-input" type="checkbox" name="illuminati2014en" id="illuminati2014en-checkbox">
<input class="form-check-input" type="checkbox" name="illuminati2012de" id="illuminati2012de-checkbox" checked>
</div>`;

let displaySystem = `
<h3 class="display-5"></h3>
<h4 class="lead"></h4>
<div id="rsid-selection">`;

let progressDisplay = `
<div id="progress-view" class="progress">
  <div class="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" aria-valuenow="{{pct}}" aria-valuemin="0" aria-valuemax="100" style="width: {{pct}}%;min-width: 2em;">
  </div>
</div>
`;

let initialFormDisplay = `            
<form id="adobe-action">
	<div class="form-group row">
		<label for="adobe-username" class="col-form-label" for="adobe-username">Adobe Analytics Username</label>
		<input class="form-control" type="text" placeholder="Enter username" id="adobe-username">
		<small class="form-text text-muted">Confused? <a href="#" data-toggle="modal" data-target="#adobe-instructions-modal">Here's how to get this.</a></small>
	</div>
	<div class="form-group row">
	  <label for="adobe-secret" class="col-form-label" for="adobe-secret">Adobe Analytics Secret</label>
	  <input class="form-control" type="text" placeholder="Insert your secret" id="adobe-secret">
	  <small class="form-text text-muted">Confused? <a href="#" data-toggle="modal" data-target="#adobe-instructions-modal">Here's how to get this.</a></small>
	</div>
	<div class="form-group row">
	  <label for="filename" class="col-form-label" for="filename">Filename</label>
	  <div class="input-group">
		<input class="form-control" type="text" value="analytics-config" id="filename">
		<div class="input-group-append">
			<div class="input-group-text">.xlsx</div>
		</DIV>
	  </div>
	  <small class="form-text text-muted">Name it something clear and memorable.</small>
	</div>
	<button type="button" class="btn btn-lg btn-success" data-toggle="modal" data-target="#information-collected-warning" role="button">Let's do this!</button>
</form>
</div>`;

module.exports = {rsSelectAll, rsSelectSome, displaySystem, progressDisplay, initialFormDisplay};