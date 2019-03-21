package com.affablebean;

import java.util.Locale;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

@Configuration
@PropertySource(value = { "classpath:parameters.properties" })
public class Config implements WebMvcConfigurer {

	/*
	 * PropertySourcesPlaceHolderConfigurer Bean only required for @Value("{}")
	 * annotations. Remove this bean if you are not using @Value annotations for
	 * injecting properties.
	 */
	@Bean
	public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
		return new PropertySourcesPlaceholderConfigurer();
	}

	@Bean
	public LocaleResolver localeResolver() {
		SessionLocaleResolver slr = new SessionLocaleResolver();
		slr.setDefaultLocale(Locale.US);
		return slr;
	}

	@Bean
	public LocaleChangeInterceptor localeChangeInterceptor() {
	    LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
	    lci.setParamName("lang");
	    return lci;
	}
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
	    registry.addInterceptor(localeChangeInterceptor());
	}	
}

//@Service("fileService")
//public class FileServiceImpl implements FileService {
// 
//    @Value("${sourceLocation:c:/temp/input}")
//    private String source;
// 
//    @Value("${destinationLocation:c:/temp/output}")
//    private String destination;
// 
//    @Autowired
//    private Environment environment;
// 
//    public void readValues() {
//        System.out.println("Getting property via Spring Environment :"
//                + environment.getProperty("jdbc.driverClassName"));
// 
//        System.out.println("Source Location : " + source);
//        System.out.println("Destination Location : " + destination);
//         
//    }
// 
//}