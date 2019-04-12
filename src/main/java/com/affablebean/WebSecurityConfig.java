package com.affablebean;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Value("${username:admin}")
	private String username;

	@Value("${password:admin}")
	private String password;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/", "/index").permitAll()
				.antMatchers("/addToCart", "/addToCart2", "/cart", "/category", "/checkout", "/confirmation",
						"/contact", "customerOrders", "/feedback", "/privacy", "/purchase", "/updateCart",
						"/updateCart2", "/viewCart")
				.permitAll().antMatchers("/api/**", "/css/**", "/img/**").permitAll().anyRequest().authenticated().and()
				.formLogin().loginPage("/login").permitAll().and().logout().permitAll();

		http.csrf().disable(); // allow $.post from updateCart script

		SessionManagementConfigurer<HttpSecurity> sessionManagement = http.sessionManagement();

		sessionManagement.invalidSessionUrl("/index.html").maximumSessions(2);
		sessionManagement.sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
		sessionManagement.sessionFixation().migrateSession();
	}

	@SuppressWarnings("deprecation")
	@Bean
	@Override
	public UserDetailsService userDetailsService() {
		UserDetails user = User.withDefaultPasswordEncoder().username(username).password(password).roles("USER")
				.build();

		return new InMemoryUserDetailsManager(user);
	}
}