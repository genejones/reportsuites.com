let modal = `            
<div class="modal fade" tabindex="-1" role="dialog" id="adobe-instructions-modal">
	<div class="modal-dialog modal-lg" role="document">
	<div class="modal-content">
	  <div class="modal-header">
		<h4 class="modal-title">How to Obtain your Adobe Credentials</h4>
		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	  </div>
	  <div class="modal-body">
		<!-- add smallest transparent gif to the images, along with the actual source. Lazy load the images later -->
		<span id="cred-instructions-0" data-current-instruction="true" data-next-step="cred-instructions-1"><h5>Find your user profile on the top menu</h5><i class="far fa-4x fa-spin fa-spinner"></i><img class="img-responsive img-thumbnail" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-src="0.jpg" /></span>
		<span id="cred-instructions-1" data-prev-step="cred-instructions-0" data-next-step="cred-instructions-2" class="collapse"><h5>Click "Edit your profile"</h5><img class="img-responsive img-thumbnail" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-src="1.jpg" /></span>
		<span id="cred-instructions-2" data-prev-step="cred-instructions-1" class="collapse"><h5>Scroll to "Web Service". Your credentials are located here.</h5><img class="img-responsive img-thumbnail" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-src="2.jpg" /></span>
	  </div>
	  <div class="modal-footer">
		<nav aria-label="Instructions navigation">
		  <ul class="pagination justify-content-center">
			<li class="page-item disabled previous"><a class="page-link" href="#"><span aria-hidden="true">&larr;</span> Previous Step</a></li>
			<li class="page-item next"><a class="page-link" href="#">Next Step <span aria-hidden="true">&rarr;</span></a></li>
		  </ul>
		</nav>
		<button style="display:none;" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	  </div>
	</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->`;

let modal_at_step_1 = `            
<div class="modal fade" tabindex="-1" role="dialog" id="adobe-instructions-modal">
	<div class="modal-dialog modal-lg" role="document">
	<div class="modal-content">
	  <div class="modal-header">
		<h4 class="modal-title">How to Obtain your Adobe Credentials</h4>
		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	  </div>
	  <div class="modal-body">
		<!-- add smallest transparent gif to the images, along with the actual source. Lazy load the images later -->
		<span id="cred-instructions-0"  class="collapse"><h5>Find your user profile on the top menu</h5><img class="img-responsive img-thumbnail" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-src="0.jpg" /></span>
		<span id="cred-instructions-1" data-current-instruction="true" data-prev-step="cred-instructions-0" data-next-step="cred-instructions-2" data-next-step="cred-instructions-2"><h5>Click "Edit your profile"</h5><img class="img-responsive img-thumbnail" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-src="1.jpg" /></span>
		<span id="cred-instructions-2" data-prev-step="cred-instructions-1"><h5>Scroll to "Web Service". Your credentials are located here.</h5><img class="img-responsive img-thumbnail" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" data-src="2.jpg" /></span>
	  </div>
	  <div class="modal-footer">
		<nav aria-label="Instructions navigation">
		  <ul class="pagination justify-content-center">
			<li class="page-item disabled previous"><a class="page-link" href="#"><span aria-hidden="true">&larr;</span> Previous Step</a></li>
			<li class="page-item next"><a class="page-link" href="#">Next Step <span aria-hidden="true">&rarr;</span></a></li>
		  </ul>
		</nav>
		<button style="display:none;" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	  </div>
	</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->`;

module.exports = {modal, modal_at_step_1};