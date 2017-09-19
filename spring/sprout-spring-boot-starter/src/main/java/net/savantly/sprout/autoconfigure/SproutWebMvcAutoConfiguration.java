package net.savantly.sprout.autoconfigure;

import org.h2.server.web.WebServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;

import net.savantly.sprout.bean.processors.ProgressBeanPostProcessor;
import net.savantly.sprout.bean.processors.SlowBeans;
import net.savantly.sprout.starter.SproutMvcConfiguration;

@Configuration
@AutoConfigureBefore(WebMvcAutoConfiguration.class)
public class SproutWebMvcAutoConfiguration {
	
	private static final Logger log = LoggerFactory.getLogger(SproutWebMvcAutoConfiguration.class);

	@Bean
	public SproutMvcConfiguration sproutMvcAutoConfigurationAdapter(SproutResourceAutoConfiguration  resourcesConfiguration) {
		return new SproutMvcConfiguration(resourcesConfiguration);
	}

	@Bean
	public FreeMarkerViewResolver freemarkerViewResolver() {
		FreeMarkerViewResolver resolver = new FreeMarkerViewResolver();
		resolver.setSuffix(".html");
		return resolver;
	}

	@Bean
	public FreeMarkerConfigurer freemarkerConfigurer(ResourceLoader resourceLoader, SproutResourceAutoConfiguration  resourcesConfiguration) {
		log.info("Creating FreeMarkConfigurer with template loader path: {}", resourcesConfiguration.getWebRoot());
		FreeMarkerConfigurer freeMarkerConfigurer = new FreeMarkerConfigurer();
		freeMarkerConfigurer.setTemplateLoaderPath(resourcesConfiguration.getWebRoot());
		return freeMarkerConfigurer;
	}

	@Bean
	public ServletRegistrationBean h2servletRegistration() {
		ServletRegistrationBean registrationBean = new ServletRegistrationBean(new WebServlet());
		registrationBean.addUrlMappings("/console/*");
		return registrationBean;
	}
	
	@Bean
	SlowBeans slowBeans() {
		return new SlowBeans();
	}

	@Bean
	public static ProgressBeanPostProcessor progressBeanPostProcessor() {
		return new ProgressBeanPostProcessor();
	}

}