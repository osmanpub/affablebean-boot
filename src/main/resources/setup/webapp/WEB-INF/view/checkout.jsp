<%--
 * Copyright (c) 2010, Oracle and/or its affiliates. All rights reserved.
 *
 * You may not modify, use, reproduce, or distribute this software
 * except in compliance with the terms of the license at:
 * http://developer.sun.com/berkeley_license.html

 * author: tgiunipero
--%>

<%-- Set session-scoped variable to track the view user is coming from.
     This is used by the language mechanism in the Controller so that
     users view the same page when switching between English and Czech. --%>
<c:set var="view" value="/checkout" scope="session"/>

<script src="js/jquery-validate/jquery.validate.min.js" type="text/javascript"></script>

<%-- Add Czech field validation messages if 'cs' is the chosen locale --%>
<c:choose>

	<%-- When 'language' session attribute hasn't been set, check browser's 
			preferred locale --%>
	<c:when test="${empty language}">
		<c:if test="${pageContext.request.locale.language eq 'cs'}">
			<script src="js/localization/messages_cs.js" type="text/javascript"></script>
		</c:if>
	</c:when>

	<%-- Otherwise, check 'language' session attribute --%>
	<c:otherwise>
		<c:if test="${sessionScope['javax.servlet.jsp.jstl.fmt.locale.session'] eq 'cs'}">
			<script src="js/localization/messages_cs.js" type="text/javascript"></script>
		</c:if>
	</c:otherwise>

</c:choose>

<script type="text/javascript">

	$(document).ready(function() {
		$("#checkoutForm").validate({
			rules: {
				name: {
					minlength: 8,
					maxlength: 45,
					required: true
				},
				email: {
					email: true,
					minlength: 8,
					maxlength: 45,
					required: true
				},
				phone: {
					minlength: 8,
					maxlength: 30,
					required: true,
					number: true
				},
				address: {
					minlength: 8,
					maxlength: 45,
					required: true
				},
				creditcard: {
					creditcard: true,
					minlength: 8,
					maxlength: 19,
					required: true
				}
			}
		});
	});
</script>

<%-- HTML markup starts below --%>

<div id="singleColumn">
	<h2><fmt:message key="checkout"/></h2>
	<p><fmt:message key="checkoutText"/></p>

	<c:if test="${!empty orderFailureFlag}">
		<p class="error"><fmt:message key="orderFailureError"/></p>
	</c:if>

	<table id="checkoutTable">
		<c:if test="${!empty validationErrorFlag}">
			<tr>
				<td colspan="2" style="text-align:left">
					<span class="error smallText"><fmt:message key="validationErrorMessage"/>

						<c:if test="${!empty nameError}">
							<br><span class="indent"><fmt:message key="nameError"/></span>
						</c:if>
						<c:if test="${!empty emailError}">
							<br><span class="indent"><fmt:message key="emailError"/></span>
						</c:if>
						<c:if test="${!empty phoneError}">
							<br><span class="indent"><fmt:message key="phoneError"/></span>
						</c:if>
						<c:if test="${!empty addressError}">
							<br><span class="indent"><fmt:message key="addressError"/></span>
						</c:if>
						<c:if test="${!empty cityRegionError}">
							<br><span class="indent"><fmt:message key="cityRegionError"/></span>
						</c:if>
						<c:if test="${!empty ccNumberError}">
							<br><span class="indent"><fmt:message key="ccNumberError"/></span>
						</c:if>

					</span>
				</td>
			</tr>
		</c:if>
	</table>

	<br>
	<form class="form-horizontal" role="form" 
				action="<c:url value='purchase'/>" method="post">

		<div class="form-group">
			<label for="name" class="col-sm-2 control-label">
				<fmt:message key="customerName"/>
			</label>

			<div class="col-sm-10">
				<input type="text" class="form-control" name="name"
							 maxlength="45" 
							 placeholder="At least 8 chars and no more than 45 chars"									 
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
			<label for="phone" class="col-sm-2 control-label">
				<fmt:message key="phone"/>
			</label>

			<div class="col-sm-10">
				<input type="text" class="form-control" name="phone"
							 maxlength="16" 
							 placeholder="At least 8 chars and no more than 30 chars"									 
							 size="31"
							 value="${param.phone}">
			</div>
		</div>

		<div class="form-group">
			<label for="address" class="col-sm-2 control-label">
				<fmt:message key="address"/>
			</label>

			<div class="col-sm-10">
				<input type="text" class="form-control" name="address"
							 maxlength="45" 
							 placeholder="At least 8 chars and no more than 45 chars"									 
							 size="31"
							 value="${param.address}">
			</div>
		</div>

		<div class="form-group">
			<label for="creditcard" class="col-sm-2 control-label">
				<fmt:message key="creditCard"/>
			</label>

			<div class="col-sm-10">
				<input type="text" class="form-control" name="creditcard"
							 maxlength="19" 
							 placeholder="At least 8 chars and no more than 19 chars"									 
							 size="31"
							 value="${param.creditcard}">
			</div>
		</div>

		<div class="form-group">
			<div class="col-sm-offset-2 col-sm-10">
				<button type="submit" class="btn btn-primary">
					<fmt:message key='submit'/>
				</button>
			</div>
		</div>
	</form>		

	<div id="infoBox">
		<ul>
			<li><fmt:message key="nextDayGuarantee"/></li>
			<li><fmt:message key="deliveryFee1"/>
				<fmt:formatNumber type="currency" currencySymbol="&euro; " 
													value="${initParam.deliverySurcharge}"/>
				<fmt:message key="deliveryFee2"/>
			</li>
		</ul>

		<table id="priceBox">
			<tr>
				<td><fmt:message key="subtotal"/>:</td>
				<td class="checkoutPriceColumn">
					<fmt:formatNumber type="currency" currencySymbol="&euro; " 
														value="${cart.subtotal}"/>
				</td>
			</tr>

			<tr>
				<td><fmt:message key="surcharge"/>:</td>
				<td class="checkoutPriceColumn">
					<fmt:formatNumber type="currency" currencySymbol="&euro; " 
														value="${initParam.deliverySurcharge}"/>
				</td>
			</tr>

			<tr>
				<td class="total"><fmt:message key="total"/>:</td>
				<td class="total checkoutPriceColumn">
					<fmt:formatNumber type="currency" currencySymbol="&euro; " 
														value="${cart.subtotal + initParam.deliverySurcharge}"/>
				</td>
			</tr>
		</table>
	</div>
</div>