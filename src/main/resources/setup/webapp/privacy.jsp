<%-- Set session-scoped variable to track the view user is coming from.
     This is used by the language mechanism in the Controller so that
     users view the same page when switching between English and Czech. --%>
<c:set var="view" value="/privacy" scope="session"/>

<%-- HTML markup starts below --%>

<div id="singleColumn">

	<p><fmt:message key="pr1"/></p>

	<div id="contents">
		<button class="btn btn-link" 
						onclick="location.href = '<c:url value='#pr2'/>'">
			&#8226; <fmt:message key="pr2" />
		</button>
		<br>
		<button class="btn btn-link" 
						onclick="location.href = '<c:url value='#pr3'/>'">
			&#8226; <fmt:message key="pr3" />
		</button>
		<br>
		<button class="btn btn-link" 
						onclick="location.href = '<c:url value='#pr4'/>'">
			&#8226; <fmt:message key="pr4" />
		</button>
		<br>
		<button class="btn btn-link" 
						onclick="location.href = '<c:url value='#pr5'/>'">
			&#8226; <fmt:message key="pr5" />
		</button>
		<br>
		<button class="btn btn-link" 
						onclick="location.href = '<c:url value='#pr6'/>'">
			&#8226; <fmt:message key="pr6" />
		</button>
		<br>
		<button class="btn btn-link" 
						onclick="location.href = '<c:url value='#pr7'/>'">
			&#8226; <fmt:message key="pr7" />
		</button>
		<br>
		<button class="btn btn-link" 
						onclick="location.href = '<c:url value='#pr8'/>'">
			&#8226; <fmt:message key="pr8" />
		</button>
		<br>
		<button class="btn btn-link" 
						onclick="location.href = '<c:url value='#pr9'/>'">
			&#8226; <fmt:message key="pr9" />
		</button>
		<br>
		<button class="btn btn-link" 
						onclick="location.href = '<c:url value='#pr10'/>'">
			&#8226; <fmt:message key="pr10" />
		</button>
		<br>
	</div>
	<br>

	<div id="pr2">
		<p><b><fmt:message key="pr2"/></b></p>
		<p><fmt:message key="pr12"/></p>
	</div>

	<button class="btn btn-link" 
					onclick="location.href = '<c:url value='#contents'/>'">
		<fmt:message key="pr22" />
	</button>

	<div id="pr3">
		<p><b><fmt:message key="pr3"/></b></p>
		<p><fmt:message key="pr13"/></p>
	</div>

	<button class="btn btn-link" 
					onclick="location.href = '<c:url value='#contents'/>'">
		<fmt:message key="pr22" />
	</button>

	<div id="pr4">
		<p><b><fmt:message key="pr4"/></b></p>
		<p><fmt:message key="pr14"/></p>
	</div>

	<button class="btn btn-link" 
					onclick="location.href = '<c:url value='#contents'/>'">
		<fmt:message key="pr22" />
	</button>

	<div id="pr5">
		<p><b><fmt:message key="pr5"/></b></p>
		<p><fmt:message key="pr15"/></p>
	</div>

	<button class="btn btn-link" 
					onclick="location.href = '<c:url value='#contents'/>'">
		<fmt:message key="pr22" />
	</button>

	<div id="pr6">
		<p><b><fmt:message key="pr6"/></b></p>
		<p><fmt:message key="pr16"/></p>
	</div>

	<button class="btn btn-link" 
					onclick="location.href = '<c:url value='#contents'/>'">
		<fmt:message key="pr22" />
	</button>

	<div id="pr7">
		<p><b><fmt:message key="pr7"/></b></p>
		<p><fmt:message key="pr17"/></p>
	</div>

	<button class="btn btn-link" 
					onclick="location.href = '<c:url value='#contents'/>'">
		<fmt:message key="pr22" />
	</button>

	<div id="pr8">
		<p><b><fmt:message key="pr8"/></b></p>
		<p><fmt:message key="pr18"/></p>
	</div>

	<button class="btn btn-link" 
					onclick="location.href = '<c:url value='#contents'/>'">
		<fmt:message key="pr22" />
	</button>

	<div id="pr9">
		<p><b><fmt:message key="pr9"/></b></p>
		<p><fmt:message key="pr19"/></p>
	</div>

	<button class="btn btn-link" 
					onclick="location.href = '<c:url value='#contents'/>'">
		<fmt:message key="pr22" />
	</button>

	<div id="pr10">
		<p><b><fmt:message key="pr10"/></b></p>
		<p><fmt:message key="pr20"/></p>
	</div>

	<button class="btn btn-link" 
					onclick="location.href = '<c:url value='#contents'/>'">
		<fmt:message key="pr22" />
	</button>
</div>