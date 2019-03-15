package com.affablebean;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.affablebean.repository.CategoryRepository;

import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@EnableJpaAuditing
@Slf4j
public class Application {

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

}
