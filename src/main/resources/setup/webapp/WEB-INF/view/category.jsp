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
<c:set var="view" value="/category" scope="session" />

<%-- HTML markup starts below --%>

<div id="categoryLeftColumn">

	<c:forEach var="category" items="${categories}">

		<c:choose>
			<c:when test="${category.name == selectedCategory.name}">
				<div class="categoryButton" id="selectedCategory">
					<span class="categoryText">
						<fmt:message key="${category.name}"/>
					</span>
				</div>
			</c:when>

			<c:otherwise>
				<a href="<c:url value='category?id=${category.id}'/>" 
					 class="categoryButton">
					<span class="categoryText">
						<fmt:message key="${category.name}"/>
					</span>
				</a>
			</c:otherwise>
		</c:choose>

	</c:forEach>

</div>

<div id="categoryRightColumn">

	<!--<p id="categoryTitle"><fmt:message key="${selectedCategory.name}" /></p>-->

	<c:forEach var="promo" items="${catProms}">
		<c:if test="${promo.categoryId == selectedCategory.id}">
			<span class="saleCat"><fmt:message key='pro${promo.description}'/></span>
		</c:if>
	</c:forEach>

	<table id="productTable">

		<c:forEach var="product" items="${categoryProducts}" varStatus="iter">

			<tr class="${((iter.index % 2) == 0) ? 'lightBlue' : 'white'}">
				<td>
					<img src="${initParam.productImagePath}${product.name}.png"
							 alt="<fmt:message key='${product.name}'/>">
				</td>

				<td>
					<fmt:message key="${product.name}"/>
					<br>
					<span class="smallText">
						<fmt:message key='${product.name}Description'/>
					</span>
				</td>

				<c:set var="new_price" value="${product.price}"/>

				<c:if test="${!empty sale}">
					<c:set var="new_price" value="${new_price / (1 - sale.discount/100)}"/>
				</c:if>

				<c:if test="${!empty catProms}">
					<c:forEach var="promo" items="${catProms}">
						<c:if test="${promo.categoryId == selectedCategory.id}">
							<c:set var="new_price" value="${new_price / (1 - promo.discount/100)}"/>
						</c:if>
					</c:forEach>
				</c:if>				

				<c:if test="${!empty sale || !empty catProms}">
					<td>
						<span style="text-decoration: line-through; color: red;">
							<span style="color: gray;">
								<fmt:formatNumber type="currency" currencySymbol="&euro; " 
																	value="${new_price}"/>
							</span>
						</span>							
					</td>
				</c:if>

				<td><fmt:formatNumber type="currency" currencySymbol="&euro; " 
													value="${product.price}"/>
				</td>

				<td>
					<form action="<c:url value='addToCart'/>" method="post">
						<input type="hidden"
									 name="productId"
									 value="${product.id}">

						<button type="submit" class="btn btn-primary btn-sm">
							<fmt:message key='addToCart'/>
						</button>							
					</form>
				</td>

				<c:if test="${!empty prodProms}">
					<c:forEach var="promo" items="${prodProms}">
						<c:if test="${promo.productId == product.id}">
							<td class = "productOffer">
								${promo.description}
							</td>				
						</c:if>
					</c:forEach>
				</c:if>				

			</tr>

		</c:forEach>

	</table>
</div>