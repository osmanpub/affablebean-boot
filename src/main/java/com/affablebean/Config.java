package com.affablebean;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

@Configuration
@PropertySource(value = { "classpath:parameters.properties" })
public class Config {

	/*
	 * PropertySourcesPlaceHolderConfigurer Bean only required for @Value("{}")
	 * annotations. Remove this bean if you are not using @Value annotations for
	 * injecting properties.
	 */
	@Bean
	public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
		return new PropertySourcesPlaceholderConfigurer();
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