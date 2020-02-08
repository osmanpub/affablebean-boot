package com.affablebean;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.stereotype.Component;

@Component
public class CORSFilter extends OncePerRequestFilter {
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		HttpSession session = request.getSession();

		if (session.isNew()) {
			session.setAttribute("SESSIONID", session.getId());
		}

		// CORS "pre-flight" request
		response.addHeader("Access-Control-Allow-Credentials", "true");
		response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
		response.addHeader("Access-Control-Allow-Headers", "Authorization");
		response.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		response.addHeader("Access-Control-Max-Age", "3600000");

		filterChain.doFilter(request, response);
	}

}