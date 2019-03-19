<%-- Set session-scoped variable to track the view user is coming from.
     This is used by the language mechanism in the Controller so that
     users view the same page when switching between English and Czech. --%>
<c:set var="view" value="/contact" scope="session"/>

<%-- HTML markup starts below --%>

<script 
	src="js/jquery-validate/jquery.validate.min.js" type="text/javascript">
</script>

<div id="singleColumn">
	<div>
		<h2><fmt:message key="co1"/></h2>
		<p><fmt:message key="co2"/></p>
	</div>

	<script type="text/javascript">

		$(document).ready(function() {
			$("#feedbackForm").validate({
				rules: {
					name: "required",
					email: {
						required: true,
						email: true
					},
					msg: {
						required: true
					}
				}
			});
		});
	</script>

	<div>
			<!--<p><fmt:message key="co8"/></p>-->

		<table id="feedbackTable">
			<c:if test="${!empty validationErrorFlag}">

				<tr>
					<td colspan="2" style="text-align:left">
						<span class="error smallText">
							<fmt:message key="validationErrorMessage"/>

							<c:if test="${!empty nameError}">
								<br><span class="indent"><fmt:message key="nameError"/></span>
							</c:if>

							<c:if test="${!empty emailError}">
								<br><span class="indent"><fmt:message key="emailError"/></span>
							</c:if>

							<c:if test="${!empty msgError}">
								<br><span class="indent"><fmt:message key="msgError"/></span>
							</c:if>

						</span>
					</td>
				</tr>

			</c:if>							
		</table>
	</div>

	<form class="form-horizontal" role="form" 
				action="<c:url value='feedback'/>" method="post">

		<div class="form-group">
			<label for="subject_sel" class="col-sm-2 control-label">
				<fmt:message key="co3"/>
			</label>

			<div class="col-sm-10">
				<select name="subject_sel" class="form-control">
					<option><fmt:message key="coPlease select"/></option>

					<c:forEach var="subject" items="${subjects}">
						<option value="${subject.id}">
							<fmt:message key="co${subject.name}"/>
						</option>
					</c:forEach>  

				</select>	
			</div>			
		</div>

		<div class="form-group">
			<label for="name" class="col-sm-2 control-label">
				<fmt:message key="customerName"/>
			</label>

			<div class="col-sm-10">
				<input type="text" class="form-control" name="name"
							 maxlength="45" 
							 placeholder="At least 5 chars and no more than 45 chars"									 
							 size="31"
							 value="${param.name}">
			</div>
		</div>

		<div class="form-group">
			<label for="email" class="col-sm-2 control-label">
				<fmt:message key="email"/>
			</label>

			<div class="col-sm-10">
				<input type="email" class="form-control" name="email"
							 maxlength="45" 
							 placeholder="At least 8 chars one of which must be '@' and no more than 45 chars"
							 size="31"
							 value="${param.email}">
			</div>
		</div>

		<div class="form-group">
			<label for="msg" class="col-sm-2 control-label">
				<fmt:message key="coMsg"/>
			</label>

			<div class="col-sm-10">
				<textarea dir="ltr" class="form-control" name="msg"
									cols="25"
									rows="5">
				</textarea>
			</div>
		</div>

		<div class="form-group">
			<div class="col-sm-offset-2 col-sm-10">
				<button type="submit" class="btn btn-primary">
					<fmt:message key='coSubmit'/>
				</button>
			</div>
		</div>
	</form>

	<div>
		<h3><fmt:message key="co4"/></h3>
		<p><fmt:message key="co5"/></p>
		<p><fmt:message key="co6"/></p>

		<p>
			<fmt:message key="co7"/>
			<span class="privacy"> 
				<a href="<c:url value="privacy"/>"><fmt:message key="co9"/></a>
			</span>
		</p>

	</div>
</div>