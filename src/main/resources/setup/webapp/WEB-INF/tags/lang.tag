<%@tag description="choose language" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%-- The list of normal or fragment attributes can be specified here: --%>
<%@ attribute name="language" required="true"%>
<%@ attribute name="display" required="true"%>
<%@ attribute name="test" required="true"%>

<%-- any content can be specified here e.g.: --%>
<c:choose>
	
	<c:when test="${test}">
		${display}
	</c:when>

	<c:otherwise>
		<c:url var="url" value="chooseLanguage">
			<c:param name="language" value="${language}"/>
		</c:url>

		<div class="bubble"><a href="${url}">${display}</a></div>
	</c:otherwise>

</c:choose>