package com.affablebean;

import java.util.EnumSet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.SessionTrackingMode;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.affablebean.repository.CategoryRepository;

import lombok.extern.slf4j.Slf4j;

@EnableCaching
@EnableJpaAuditing
@SpringBootApplication
@Slf4j
public class Application extends SpringBootServletInitializer {

	private static final int SESSION_TIMEOUT = 15;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public CommandLineRunner demo(CategoryRepository repository) {
		return (args) -> {
			// fetch all categories
			log.info("Categories found with findAll():");
			log.info("-------------------------------");
			repository.findAll().forEach(category -> {
				log.info(category.toString());
			});
			log.info("");

			// fetch an individual category by ID
			repository.findById((short) 1).ifPresent(category -> {
				log.info("Category found with findById(1):");
				log.info("--------------------------------");
				log.info(category.toString());
				log.info("");
			});

			// fetch category by name
			log.info("Category found with findByName('bakery'):");
			log.info("--------------------------------------------");
			repository.findByName("bakery").forEach(category -> {
				log.info(category.toString());
			});
			log.info("");
		};
	}

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		super.onStartup(servletContext);

		servletContext.addListener(new HttpSessionListener() {
			@Override
			public void sessionCreated(HttpSessionEvent event) {
				event.getSession().setMaxInactiveInterval(SESSION_TIMEOUT);
			}

			@Override
			public void sessionDestroyed(HttpSessionEvent event) {
			}
		});

		servletContext.setSessionTrackingModes(EnumSet.of(SessionTrackingMode.COOKIE));
	}
}
