package net.savantly.sprout.autoconfigure;

import java.util.Set;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.spring4.view.ThymeleafViewResolver;
import org.thymeleaf.templateresolver.ITemplateResolver;

import net.savantly.sprout.autoconfigure.controller.SproutThymeleafTemplateResolver;

@EnableOAuth2Sso
@Configuration
@ConditionalOnClass(SpringTemplateEngine.class)
@AutoConfigureAfter(SproutResourceAutoConfiguration.class)
public class SproutThymeleafAutoConfiguration {
	
	@Bean
	public SproutThymeleafTemplateResolver templateResolver() {
		SproutThymeleafTemplateResolver resolver = new SproutThymeleafTemplateResolver();
		resolver.setPrefix("/templates/sprout/thymeleaf/");
		resolver.setSuffix(".html");
		resolver.setTemplateMode("HTML5");
		resolver.setCharacterEncoding("UTF-8");
		return resolver;
	}

	@Bean
	@ConditionalOnMissingBean(SpringTemplateEngine.class)
	public SpringTemplateEngine templateEngineBean(Set<ITemplateResolver> resolverBeans) {
		SpringTemplateEngine templateEngine = new SpringTemplateEngine();
		templateEngine.setTemplateResolvers(resolverBeans);
		return templateEngine;
	}

	@ConditionalOnBean(SpringTemplateEngine.class)
	public void configureSpringTemplateEngine(SpringTemplateEngine templateEngine,
			SproutThymeleafTemplateResolver sproutTemplateResolver) {
		templateEngine.getTemplateResolvers().add(sproutTemplateResolver);
	}

	@Bean
	@ConditionalOnMissingBean(ThymeleafViewResolver.class)
	public ThymeleafViewResolver thymeleafViewResolverBean(SpringTemplateEngine templateEngine) {
		ThymeleafViewResolver resolver = new ThymeleafViewResolver();
		resolver.setTemplateEngine(templateEngine);
		resolver.setOrder(1);
		resolver.setCharacterEncoding("UTF-8");
		return resolver;
	}

}
