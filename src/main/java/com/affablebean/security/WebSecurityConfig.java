package com.affablebean.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.SessionManagementConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Override
	protected void configure(HttpSecurity http) throws Exception {
        http
        .authorizeRequests()
            .antMatchers("/", "/index", "/addToCart", "/cart", "/category", "/checkout", "/confirmation", "/contact", 
            		"/feedback", "/privacy", "/purchase", "/updateCart", "/viewCart").permitAll()
            .antMatchers("/css/**", "/img/**").permitAll()
//            .antMatchers("/**").permitAll()
            .anyRequest().authenticated()
            .and()
        .formLogin()
            .loginPage("/login")
            .permitAll()
            .and()
        .logout()
            .permitAll();
		
		http.csrf().disable(); // allow $.post from updateCart script

		SessionManagementConfigurer<HttpSecurity> sessionManagement = http.sessionManagement();

		sessionManagement.invalidSessionUrl("/index.html").maximumSessions(2);

		sessionManagement.sessionFixation().migrateSession();
	}

	@SuppressWarnings("deprecation")
	@Bean
	@Override
	public UserDetailsService userDetailsService() {
		UserDetails user = User.withDefaultPasswordEncoder().username("admin").password("letmein").roles("USER")
				.build();

		return new InMemoryUserDetailsManager(user);
	}
}