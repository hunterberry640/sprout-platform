package net.savantly.sprout.autoconfigure;

import java.io.IOException;

import org.h2.server.web.WebServlet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactory;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;

import freemarker.template.TemplateException;
import net.savantly.sprout.content.contentItem.ContentItemRenderer;
import net.savantly.sprout.content.contentItem.ContentItemRestController;
import net.savantly.sprout.content.contentType.ContentTypeTemplateLoader;
import net.savantly.sprout.content.webPage.WebPageRenderer;
import net.savantly.sprout.content.webPage.WebPageRestController;
import net.savantly.sprout.content.webPageLayout.WebPageLayoutTemplateLoader;
import net.savantly.sprout.controllers.DefaultMvcController;
import net.savantly.sprout.core.content.contentTemplate.ContentTemplateRepository;
import net.savantly.sprout.core.content.webPage.WebPageRepository;
import net.savantly.sprout.core.content.webPageLayout.WebPageLayoutRepository;
import net.savantly.sprout.settings.AppSettingRepository;
import net.savantly.sprout.settings.UISettings;
import net.savantly.sprout.starter.SproutMvcConfiguration;

@Configuration
@AutoConfigureBefore(FreeMarkerAutoConfiguration.class)
public class SproutWebMvcAutoConfiguration {
	
	private static final Logger log = LoggerFactory.getLogger(SproutWebMvcAutoConfiguration.class);
	
	@Bean
	public UISettings uiSettings(AppSettingRepository appSettings) {
		return new UISettings(appSettings);
	}

	@Bean
	public SproutMvcConfiguration sproutMvcAutoConfigurationAdapter() {
		return new SproutMvcConfiguration();
	}
	
	@Bean
	public DefaultMvcController defaultMvcController() {
		return new DefaultMvcController();
	}
	
    @Bean
    public ViewResolver viewResolver() {
        FreeMarkerViewResolver resolver = new FreeMarkerViewResolver();
        resolver.setCache(false);
        resolver.setSuffix(".html");
        return resolver;
    }

    @Bean
    public FreeMarkerConfigurationFactory freemarkerConfigurationFactory() throws IOException, TemplateException {
        FreeMarkerConfigurationFactory factory = new FreeMarkerConfigurationFactoryBean();
        factory.setTemplateLoaderPaths("classpath:/templates", "classpath:/META-INF/templates");
        return factory;
    }
		
	@Bean
	public ContentItemRenderer contentItemRenderer(ContentTemplateRepository repository) throws IOException, TemplateException {
		ContentTypeTemplateLoader loader = new ContentTypeTemplateLoader(repository);
		return new ContentItemRenderer(loader);
	}

	@Bean
	public ServletRegistrationBean h2servletRegistration() {
		ServletRegistrationBean registrationBean = new ServletRegistrationBean(new WebServlet());
		registrationBean.addUrlMappings("/console/*");
		return registrationBean;
	}
	
	@Bean
	public ContentItemRestController contentItemRestController(ContentItemRenderer renderer) {
		return new ContentItemRestController(renderer);
	}
	
	@Bean
	public WebPageRestController webPageRestController(WebPageRenderer renderer, WebPageRepository repository) {
		return new WebPageRestController(renderer, repository);
	}
	
	@Bean
	public WebPageRenderer webPageRenderer(ContentItemRenderer contentItemRenderer, WebPageLayoutRepository webPageLayoutRepository) throws IOException, TemplateException {
		WebPageLayoutTemplateLoader loader = new WebPageLayoutTemplateLoader(webPageLayoutRepository);
		return new WebPageRenderer(loader, contentItemRenderer);
	}
	
/*	@Bean
	SlowBeans slowBeans() {
		return new SlowBeans();
	}*/

/*	@Bean
	public static ProgressBeanPostProcessor progressBeanPostProcessor() {
		return new ProgressBeanPostProcessor();
	}*/

}
